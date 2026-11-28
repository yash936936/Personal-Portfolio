export interface Env {
  RESEND_API_KEY: string;
  ALLOWED_ORIGIN: string;
}

const MAX_BODY_BYTES = 24 * 1024;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5_000;

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function jsonResponse(body: Record<string, unknown>, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...jsonHeaders, ...corsHeaders(origin) },
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

function isContactPayload(value: unknown): value is ContactPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const payload = value as Record<string, unknown>;
  if (
    typeof payload.name !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.message !== "string"
  ) {
    return false;
  }

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    name.length > 0 &&
    name.length <= MAX_NAME_LENGTH &&
    email.length > 0 &&
    email.length <= MAX_EMAIL_LENGTH &&
    emailPattern.test(email) &&
    !/[\r\n]/.test(email) &&
    message.length > 0 &&
    message.length <= MAX_MESSAGE_LENGTH
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    if (!env.ALLOWED_ORIGIN) {
      return new Response("Contact endpoint is not configured", { status: 503 });
    }
    if (!origin || origin !== env.ALLOWED_ORIGIN) {
      return new Response("Origin not allowed", { status: 403 });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, origin);
    }

    const contentType = request.headers.get("Content-Type") ?? "";
    if (contentType.toLowerCase().split(";")[0].trim() !== "application/json") {
      return jsonResponse({ error: "Content-Type must be application/json" }, 415, origin);
    }

    const contentLength = Number(request.headers.get("Content-Length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request body is too large" }, 413, origin);
    }

    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return jsonResponse({ error: "Unable to read request body" }, 400, origin);
    }

    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request body is too large" }, 413, origin);
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ error: "Invalid or missing JSON body" }, 400, origin);
    }

    if (!isContactPayload(parsedBody)) {
      return jsonResponse(
        {
          error:
            "Provide a valid name, email address, and message. Name must be at most 120 characters and message at most 5000 characters.",
        },
        400,
      );
    }

    if (!env.RESEND_API_KEY) {
      return jsonResponse({ error: "Email service is not configured" }, 503, origin);
    }

    const name = parsedBody.name.trim();
    const email = parsedBody.email.trim();
    const message = parsedBody.message.trim();
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    try {
      const notifyAdmin = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: "yashm15082005@gmail.com",
          subject: `New portfolio inquiry from ${name.replace(/[\r\n]/g, " ")}`,
          html: `
            <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #0f1115; color: #e6e6e6; border-radius: 12px;">
              <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #8b8f9a;">
                Portfolio Contact Form
              </p>
              <h2 style="margin: 0 0 24px; font-size: 22px; color: #ffffff;">
                New project inquiry from ${safeName}
              </h2>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #8b8f9a; width: 90px; vertical-align: top;">Name</td>
                  <td style="padding: 8px 0; font-size: 14px; color: #e6e6e6;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #8b8f9a; vertical-align: top;">Email</td>
                  <td style="padding: 8px 0; font-size: 14px;">
                    <a href="mailto:${safeEmail}" style="color: #6ea8ff; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
              </table>

              <div style="background: #181b21; border-radius: 8px; padding: 16px 18px; margin-bottom: 24px;">
                <p style="margin: 0 0 6px; font-size: 13px; color: #8b8f9a;">Message</p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e6e6e6; white-space: pre-wrap;">${safeMessage}</p>
              </div>

              <a href="mailto:${safeEmail}" style="display: inline-block; padding: 10px 18px; background: #6ea8ff; color: #0f1115; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                Reply to ${safeName}
              </a>

              <p style="margin: 28px 0 0; font-size: 12px; color: #5b5f6a;">
                Sent automatically from your portfolio's contact form.
              </p>
            </div>
          `,
          reply_to: email,
        }),
      });

      if (!notifyAdmin.ok) {
        return jsonResponse({ error: "Email delivery failed. Please try again later." }, 502, origin);
      }

      return jsonResponse({ success: true }, 200, origin);
    } catch {
      return jsonResponse({ error: "Email delivery failed. Please try again later." }, 502, origin);
    }
  },
};
