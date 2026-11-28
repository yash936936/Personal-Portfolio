import { describe, it, expect, vi, afterEach } from "vitest";
import worker from "../src/index";

const testEnv = { RESEND_API_KEY: "test-resend-key" };
const validPayload = {
  name: "Yash",
  email: "hello@example.com",
  message: "I would like to discuss a project.",
};

function makeRequest(
  body: unknown,
  options: { method?: string; contentType?: string } = {},
): Request {
  return new Request("https://contact.example.com", {
    method: options.method ?? "POST",
    headers: options.contentType === undefined
      ? { "Content-Type": "application/json" }
      : { "Content-Type": options.contentType },
    body: options.method === "GET" || options.method === "HEAD"
      ? undefined
      : typeof body === "string" ? body : JSON.stringify(body),
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("portfolio contact worker", () => {
  it("allows CORS preflight requests", async () => {
    const response = await worker.fetch(
      new Request("https://contact.example.com", { method: "OPTIONS" }),
      testEnv,
    );

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST, OPTIONS");
  });

  it("rejects methods other than POST", async () => {
    const response = await worker.fetch(makeRequest(null, { method: "GET" }), testEnv);

    expect(response.status).toBe(405);
    expect(await response.json()).toEqual({ error: "Method not allowed" });
  });

  it("requires JSON content", async () => {
    const response = await worker.fetch(
      makeRequest("name=Yash", { contentType: "application/x-www-form-urlencoded" }),
      testEnv,
    );

    expect(response.status).toBe(415);
  });

  it("rejects malformed JSON and invalid contact fields", async () => {
    const malformed = await worker.fetch(makeRequest("{invalid"), testEnv);
    const invalid = await worker.fetch(
      makeRequest({ ...validPayload, email: "not-an-email" }),
      testEnv,
    );

    expect(malformed.status).toBe(400);
    expect(invalid.status).toBe(400);
  });

  it("rejects oversized request bodies before contacting the email provider", async () => {
    const fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
    const response = await worker.fetch(
      makeRequest({ ...validPayload, message: "x".repeat(30_000) }),
      testEnv,
    );

    expect(response.status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("escapes user input before inserting it into the email HTML", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await worker.fetch(
      makeRequest({
        name: '<img src=x onerror="alert(1)">',
        email: "hello@example.com",
        message: "<script>alert(1)</script>",
      }),
      testEnv,
    );

    expect(response.status).toBe(200);
    const init = fetchMock.mock.calls[0]?.[1];
    expect(init).toBeDefined();
    const email = JSON.parse(String(init?.body));
    expect(email.html).toContain("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
    expect(email.html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(email.html).not.toContain("<script>");
  });

  it("returns a generic provider error without leaking provider details", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response("private provider diagnostic", { status: 429 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await worker.fetch(makeRequest(validPayload), testEnv);

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: "Email delivery failed. Please try again later.",
    });
  });

  it("does not call the provider when the API key is missing", async () => {
    const fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);

    const response = await worker.fetch(
      makeRequest(validPayload),
      { RESEND_API_KEY: "" },
    );

    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
