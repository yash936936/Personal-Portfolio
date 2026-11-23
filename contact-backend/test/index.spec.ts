import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker, { type Env } from "../src/index";

const ALLOWED_ORIGIN = "https://personal-portfolio-yashmalik.vercel.app";
const EXECUTION_CONTEXT = {} as ExecutionContext;

function createEnv(allowSubmission = true, allowIp = true): Env {
  return {
    RESEND_API_KEY: "test-resend-key",
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

describe("contact worker", () => {
  let resendFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    resendFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "email-test-id" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
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
});
