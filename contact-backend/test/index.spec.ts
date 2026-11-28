import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker, { type Env } from "../src/index";

const ALLOWED_ORIGIN = "https://personal-portfolio-yashmalik.vercel.app";
const EXECUTION_CONTEXT = {} as ExecutionContext;

function createEnv(
  allowSubmission = true,
  allowIp = true,
  requireTurnstile = false,
): Env {
  return {
    RESEND_API_KEY: "test-resend-key",
    TURNSTILE_SECRET_KEY: "test-turnstile-secret",
    REQUIRE_TURNSTILE: requireTurnstile ? "true" : "false",
    ALLOWED_ORIGINS: ALLOWED_ORIGIN,
    CONTACT_RATE_LIMITER: {
      limit: vi.fn().mockResolvedValue({ success: allowSubmission }),
    },
    CONTACT_IP_RATE_LIMITER: {
      limit: vi.fn().mockResolvedValue({ success: allowIp }),
    },
  };
}

function createRequest(
  body?: string,
  options: { method?: string; origin?: string; contentType?: string; ip?: string } = {},
): Request {
  const headers = new Headers();
  if (options.origin !== undefined) headers.set("Origin", options.origin);
  if (options.contentType !== undefined) headers.set("Content-Type", options.contentType);
  if (options.ip !== undefined) headers.set("cf-connecting-ip", options.ip);

  return new Request("https://contact-backend.test/", {
    method: options.method ?? "POST",
    headers,
    body: options.method === "OPTIONS" || options.method === "GET" ? undefined : body,
  });
}

const validPayload = {
  name: "Alex Example",
  email: "alex@example.com",
  message: "I would like to discuss a project.",
};

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("contact worker", () => {
  let resendFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    resendFetch = vi.fn().mockResolvedValue(jsonResponse({ id: "email-test-id" }));
    vi.stubGlobal("fetch", resendFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("accepts a valid contact submission and sends the notification", async () => {
    const env = createEnv();
    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.10",
      }),
      env,
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(ALLOWED_ORIGIN);
    expect(await response.json()).toEqual({ success: true });
    expect(resendFetch).toHaveBeenCalledTimes(1);
    expect(env.CONTACT_IP_RATE_LIMITER.limit).toHaveBeenCalledWith({
      key: "portfolio-contact-ip:203.0.113.10",
    });
    expect(env.CONTACT_RATE_LIMITER.limit).toHaveBeenCalledWith({
      key: "portfolio-contact:203.0.113.10:alex@example.com",
    });
  });

  it("escapes user-controlled HTML before sending the email", async () => {
    const payload = {
      ...validPayload,
      name: '<img src=x onerror="alert(1)">',
      message: "<script>alert('x')</script>",
    };

    await worker.fetch(
      createRequest(JSON.stringify(payload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.11",
      }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    const emailRequest = resendFetch.mock.calls[0][1] as RequestInit;
    const emailPayload = JSON.parse(String(emailRequest.body)) as { html: string };
    expect(emailPayload.html).toContain("&lt;img");
    expect(emailPayload.html).toContain("&lt;script&gt;");
    expect(emailPayload.html).not.toContain("<script>");
    expect(emailPayload.html).not.toContain("<img");
  });

  it("rejects requests without an Origin header", async () => {
    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), { contentType: "application/json" }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(403);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("rejects untrusted origins", async () => {
    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: "https://attacker.example",
        contentType: "application/json",
      }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("answers preflight requests only for an allowed origin", async () => {
    const response = await worker.fetch(
      createRequest(undefined, { method: "OPTIONS", origin: ALLOWED_ORIGIN }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("rejects unsupported content types", async () => {
    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "text/plain",
      }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(415);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("rejects malformed and invalid fields", async () => {
    const response = await worker.fetch(
      createRequest(JSON.stringify({ ...validPayload, email: "not-an-email" }), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
      }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(400);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("rejects oversized request bodies", async () => {
    const response = await worker.fetch(
      createRequest("x".repeat(16 * 1024 + 1), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
      }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(413);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("returns 429 when the per-submission rate limit is reached", async () => {
    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.12",
      }),
      createEnv(false, true),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(429);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("returns 429 when the per-IP abuse cap is reached", async () => {
    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.14",
      }),
      createEnv(true, false),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(429);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("requires a token when Turnstile is enabled", async () => {
    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.15",
      }),
      createEnv(true, true, true),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(400);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("verifies Turnstile on the server before sending the contact email", async () => {
    resendFetch
      .mockResolvedValueOnce(jsonResponse({
        success: true,
        hostname: "personal-portfolio-yashmalik.vercel.app",
        action: "contact",
      }))
      .mockResolvedValueOnce(jsonResponse({ id: "email-test-id" }));

    const response = await worker.fetch(
      createRequest(JSON.stringify({ ...validPayload, turnstileToken: "single-use-token" }), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.16",
      }),
      createEnv(true, true, true),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(200);
    expect(resendFetch).toHaveBeenCalledTimes(2);
    expect(String(resendFetch.mock.calls[0][0])).toContain("/turnstile/v0/siteverify");
    expect(String(resendFetch.mock.calls[0][1].body)).toContain("single-use-token");
    expect(String(resendFetch.mock.calls[0][1].body)).toContain("test-turnstile-secret");
  });

  it("rejects a valid-looking token issued for an unexpected hostname", async () => {
    resendFetch.mockResolvedValueOnce(jsonResponse({
      success: true,
      hostname: "attacker.example",
      action: "contact",
    }));

    const response = await worker.fetch(
      createRequest(JSON.stringify({ ...validPayload, turnstileToken: "forged-host-token" }), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.17",
      }),
      createEnv(true, true, true),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(403);
    expect(resendFetch).toHaveBeenCalledTimes(1);
  });

  it("rejects a Turnstile token with an unexpected action", async () => {
    resendFetch.mockResolvedValueOnce(jsonResponse({
      success: true,
      hostname: "personal-portfolio-yashmalik.vercel.app",
      action: "login",
    }));

    const response = await worker.fetch(
      createRequest(JSON.stringify({ ...validPayload, turnstileToken: "wrong-action-token" }), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.18",
      }),
      createEnv(true, true, true),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(403);
    expect(resendFetch).toHaveBeenCalledTimes(1);
  });

  it("fails closed if Turnstile is required but the server secret is missing", async () => {
    const env = createEnv(true, true, true);
    delete env.TURNSTILE_SECRET_KEY;

    const response = await worker.fetch(
      createRequest(JSON.stringify({ ...validPayload, turnstileToken: "token" }), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
      }),
      env,
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(503);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("returns a temporary error if Siteverify is unavailable", async () => {
    resendFetch.mockResolvedValueOnce(new Response("upstream unavailable", { status: 503 }));

    const response = await worker.fetch(
      createRequest(JSON.stringify({ ...validPayload, turnstileToken: "single-use-token" }), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
      }),
      createEnv(true, true, true),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(503);
    expect(resendFetch).toHaveBeenCalledTimes(1);
  });

  it("does not expose upstream email-provider errors", async () => {
    resendFetch.mockResolvedValueOnce(new Response("provider detail", { status: 500 }));

    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.13",
      }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: "Unable to send your message right now" });
  });
  it("fails closed when the IP rate-limit binding throws", async () => {
    const env = createEnv();
    env.CONTACT_IP_RATE_LIMITER.limit = vi.fn().mockRejectedValue(new Error("binding unavailable"));

    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.21",
      }),
      env,
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(503);
    expect(env.CONTACT_RATE_LIMITER.limit).not.toHaveBeenCalled();
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("fails closed when the per-submission rate-limit binding throws", async () => {
    const env = createEnv();
    env.CONTACT_RATE_LIMITER.limit = vi.fn().mockRejectedValue(new Error("binding unavailable"));

    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.22",
      }),
      env,
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(503);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("returns a safe gateway error when Resend times out", async () => {
    resendFetch.mockRejectedValueOnce(new DOMException("The operation was aborted", "AbortError"));

    const response = await worker.fetch(
      createRequest(JSON.stringify(validPayload), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.23",
      }),
      createEnv(),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: "Unable to send your message right now" });
    expect(resendFetch).toHaveBeenCalledTimes(1);
    expect(resendFetch.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });

  it("fails closed when Siteverify returns malformed JSON", async () => {
    resendFetch.mockResolvedValueOnce(new Response("not-json", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));

    const response = await worker.fetch(
      createRequest(JSON.stringify({ ...validPayload, turnstileToken: "single-use-token" }), {
        origin: ALLOWED_ORIGIN,
        contentType: "application/json",
        ip: "203.0.113.24",
      }),
      createEnv(true, true, true),
      EXECUTION_CONTEXT,
    );

    expect(response.status).toBe(503);
    expect(resendFetch).toHaveBeenCalledTimes(1);
  });

});
