export interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  RESEND_API_KEY: string;
  ALLOWED_ORIGINS?: string;
  REQUIRE_TURNSTILE?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_RATE_LIMITER: RateLimitBinding;
  CONTACT_IP_RATE_LIMITER: RateLimitBinding;
}

const DEFAULT_ALLOWED_ORIGIN = "https://personal-portfolio-yashmalik.vercel.app";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_BODY_BYTES = 16 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;
const MAX_TURNSTILE_TOKEN_LENGTH = 2_048;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type TurnstileResult = "valid" | "invalid" | "unavailable";

function getAllowedOrigins(env: Env): Set<string> {
  const configured = env.ALLOWED_ORIGINS ?? DEFAULT_ALLOWED_ORIGIN;
  return new Set(configured.split(",").map((origin) => origin.trim()).filter(Boolean));
}

function responseHeaders(origin: string | null, allowed: boolean): Headers {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Vary": "Origin",
  });

  if (allowed && origin) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Max-Age", "86400");
  }

  return headers;
}

function jsonResponse(
  payload: Record<string, unknown>,
  status: number,
  origin: string | null,
  allowed: boolean,
): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: responseHeaders(origin, allowed),
  });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasForbiddenControls(value: string, allowLineBreaks = false): boolean {
  const pattern = allowLineBreaks
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
    : /[\u0000-\u001F\u007F]/;
  return pattern.test(value);
}

async function verifyTurnstile(
  token: string,
  request: Request,
  env: Env,
): Promise<TurnstileResult> {
  if (!env.TURNSTILE_SECRET_KEY) return "unavailable";

  const allowedHostnames = new Set<string>();
  for (const origin of getAllowedOrigins(env)) {
    try {
      allowedHostnames.add(new URL(origin).hostname);
    } catch {
      // Invalid origins are rejected by the origin check before this function.
    }
  }

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) body.set("remoteip", remoteIp);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5_000);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller.signal,
    });

    if (!response.ok) return "unavailable";

    const result = await response.json() as {
      success?: boolean;
      hostname?: string;
      action?: string;
    };

    const valid =
      result.success === true &&
      result.action === "contact" &&
      typeof result.hostname === "string" &&
      allowedHostnames.has(result.hostname);

    return valid ? "valid" : "invalid";
  } catch {
    return "unavailable";
  } finally {
    clearTimeout(timeoutId);
  }
}

export default {
  async fetch(request: Request, env: Env, _ctx?: ExecutionContext): Promise<Response> {
    const origin = request.headers.get("Origin");
    const allowed = Boolean(origin && getAllowedOrigins(env).has(origin));

    if (!allowed) {
      return jsonResponse({ error: "Origin not allowed" }, 403, origin, false);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: responseHeaders(origin, true),
      });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin, true);
    }

    const contentType = request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase();
    if (contentType !== "application/json") {
      return jsonResponse({ error: "Content-Type must be application/json" }, 415, origin, true);
    }

    const clientIp = request.headers.get("cf-connecting-ip") ?? "unknown-client";
    try {
      const ipLimit = await env.CONTACT_IP_RATE_LIMITER.limit({
        key: "portfolio-contact-ip:" + clientIp,
      });
      if (!ipLimit.success) {
        return jsonResponse({ error: "Too many submissions. Please try again shortly." }, 429, origin, true);
      }
    } catch {
      console.error("Contact IP rate-limit service unavailable");
      return jsonResponse({ error: "Contact service is temporarily unavailable" }, 503, origin, true);
    }

    const declaredLength = Number(request.headers.get("Content-Length") ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request body is too large" }, 413, origin, true);
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return jsonResponse({ error: "Unable to read request body" }, 400, origin, true);
    }

    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request body is too large" }, 413, origin, true);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody) as unknown;
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400, origin, true);
    }

    if (!isRecord(payload)) {
      return jsonResponse({ error: "Request body must be a JSON object" }, 400, origin, true);
    }

    const nameValue = payload.name;
    const emailValue = payload.email;
    const messageValue = payload.message;

    if (typeof nameValue !== "string" || typeof emailValue !== "string" || typeof messageValue !== "string") {
      return jsonResponse({ error: "Name, email and message must be strings" }, 400, origin, true);
    }

    const name = nameValue.trim();
    const email = emailValue.trim();
    const message = messageValue.trim();

    if (
      name.length < 1 ||
      name.length > MAX_NAME_LENGTH ||
      hasForbiddenControls(name) ||
      email.length < 3 ||
      email.length > MAX_EMAIL_LENGTH ||
      hasForbiddenControls(email) ||
      !EMAIL_PATTERN.test(email) ||
      message.length < 1 ||
      message.length > MAX_MESSAGE_LENGTH ||
      hasForbiddenControls(message, true)
    ) {
      return jsonResponse({ error: "Please provide a valid name, email and message" }, 400, origin, true);
    }

    try {
      const submissionLimit = await env.CONTACT_RATE_LIMITER.limit({
        key: "portfolio-contact:" + clientIp + ":" + email.toLowerCase(),
      });
      if (!submissionLimit.success) {
        return jsonResponse({ error: "Too many submissions for this contact address. Please try again shortly." }, 429, origin, true);
      }
    } catch {
      console.error("Contact submission rate-limit service unavailable");
      return jsonResponse({ error: "Contact service is temporarily unavailable" }, 503, origin, true);
    }

    if (env.REQUIRE_TURNSTILE === "true") {
      if (!env.TURNSTILE_SECRET_KEY) {
        console.error("Turnstile is required but its server secret is not configured");
        return jsonResponse({ error: "Contact protection is temporarily unavailable" }, 503, origin, true);
      }

      const token = payload.turnstileToken;
      if (typeof token !== "string" || token.length < 1 || token.length > MAX_TURNSTILE_TOKEN_LENGTH) {
        return jsonResponse({ error: "Please complete the bot check and try again" }, 400, origin, true);
      }

      const validation = await verifyTurnstile(token, request, env);
      if (validation === "unavailable") {
        console.error("Turnstile verification service unavailable");
        return jsonResponse({ error: "Contact protection is temporarily unavailable" }, 503, origin, true);
      }
      if (validation !== "valid") {
        return jsonResponse({ error: "Bot check failed. Please try again" }, 403, origin, true);
      }
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const emailHtml = [
      '<div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #0f1115; color: #e6e6e6; border-radius: 12px;">',
      '<p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #8b8f9a;">Portfolio Contact Form</p>',
      '<h2 style="margin: 0 0 24px; font-size: 22px; color: #ffffff;">New project inquiry from ' + safeName + '</h2>',
      '<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">',
      '<tr><td style="padding: 8px 0; font-size: 13px; color: #8b8f9a; width: 90px; vertical-align: top;">Name</td><td style="padding: 8px 0; font-size: 14px; color: #e6e6e6;">' + safeName + '</td></tr>',
      '<tr><td style="padding: 8px 0; font-size: 13px; color: #8b8f9a; vertical-align: top;">Email</td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:' + safeEmail + '" style="color: #6ea8ff; text-decoration: none;">' + safeEmail + '</a></td></tr>',
      '</table>',
      '<div style="background: #181b21; border-radius: 8px; padding: 16px 18px; margin-bottom: 24px;">',
      '<p style="margin: 0 0 6px; font-size: 13px; color: #8b8f9a;">Message</p>',
      '<p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e6e6e6; white-space: pre-wrap;">' + safeMessage + '</p>',
      '</div>',
      '<a href="mailto:' + safeEmail + '" style="display: inline-block; padding: 10px 18px; background: #6ea8ff; color: #0f1115; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">Reply to ' + safeName + '</a>',
      '<p style="margin: 28px 0 0; font-size: 12px; color: #5b5f6a;">Sent automatically from your portfolio contact form.</p>',
      '</div>',
    ].join("\n");

    try {
      const notifyAdmin = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + env.RESEND_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "yashm15082005@gmail.com",
          subject: "New lead: " + name + " wants to talk about a project",
          html: emailHtml,
          reply_to: email,
        }),
      });

      if (!notifyAdmin.ok) {
        console.error("Resend rejected contact notification:", notifyAdmin.status);
        return jsonResponse({ error: "Unable to send your message right now" }, 502, origin, true);
      }

      return jsonResponse({ success: true }, 200, origin, true);
    } catch {
      console.error("Contact notification request failed");
      return jsonResponse({ error: "Unable to send your message right now" }, 502, origin, true);
    }
  },
};
