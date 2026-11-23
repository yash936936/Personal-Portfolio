# Portfolio security review

**Review date:** 23 November 2026  
**Scope:** `portfolio/` React/Vite frontend and `contact-backend/` Cloudflare Worker  
**Review type:** Source-level implementation review. This is not an independent penetration test or an external security assessment.

## Architecture and exposure

The portfolio is a public, client-rendered website. Its only application API is the public contact-form Worker. The site has no user accounts, private user records, database-backed authorization, payment flow, file upload endpoint or inbound webhook route.

Authentication is therefore not required for the public contact submission. Origin validation is a browser-origin restriction, not authentication. The Worker continues to validate the request body and apply rate limits independently of the frontend.

## Implemented or configured in this branch

- Exact Origin allowlist and restricted CORS response headers on the contact Worker.
- Request content-type, JSON shape, body-size, field-length, email and control-character validation.
- HTML escaping before user-provided text is included in the notification email.
- Per-IP and per-IP/email Cloudflare rate-limit bindings.
- Optional Turnstile integration with server-side Siteverify validation, hostname and action checks, token length limits and a five-second timeout.
- Worker logs omit contact form values, Turnstile tokens and exception objects. Provider failures log a status code or a generic event.
- Vercel response headers include a Content Security Policy, HSTS, Referrer Policy, X-Content-Type-Options, X-Frame-Options, Permissions Policy and Cross-Origin-Opener-Policy.
- Unknown client-side routes have a custom 404 page and are marked `noindex`.
- A static link/content checker validates internal route targets, blog sitemap paths, image alt attributes and links opened in a new tab.
- Dependabot configuration checks both npm workspaces and GitHub Actions weekly.
- The frontend and Worker dependency trees were audited after compatible updates; both report zero npm audit findings in the local Node 24 validation environment.
- The Worker test harness now uses `@cloudflare/vitest-plugin` with Vitest 4.1.12. A clean `npm ci`, zero-finding `npm audit`, all 17 Worker tests and TypeScript checks for source and tests passed.
- The frontend passed a clean `npm ci`, zero-finding `npm audit`, the link/content check (35 source files, 14 routes and 3 blog slugs), ESLint and a production build.
- GitHub Actions runs npm audit, Worker tests and type checks, the frontend link checker, lint, a production build, Playwright responsive-route tests and CodeQL source analysis.

## Turnstile activation is a deployment step

The integration is intentionally disabled until a real widget is configured. The current Worker setting is `REQUIRE_TURNSTILE=false`, and no Turnstile credentials are present in the Vercel project.

To activate it:

1. Create a Cloudflare Turnstile widget for the production hostname and any local development hostnames needed.
2. Set `VITE_TURNSTILE_SITE_KEY` in the Vercel frontend build environment.
3. Add the corresponding secret with `npx wrangler secret put TURNSTILE_SECRET_KEY`.
4. Change the Worker variable `REQUIRE_TURNSTILE` to `true` and deploy the Worker.
5. Redeploy the frontend and test a valid token, an expired token and a missing token.

Do not enable `REQUIRE_TURNSTILE` until both the frontend sitekey and Worker secret are configured. When Turnstile is required, the Worker fails closed if the secret is missing or Siteverify is unavailable.

## Analytics configuration

Plausible tracking is optional. It loads only when `VITE_PLAUSIBLE_DOMAIN` is set at frontend build time. The Vercel project currently has no environment variables configured, so analytics is not active from this change alone. The privacy notice describes this conditional behavior.

## Website and link review

- The custom 404 route is registered as the React Router wildcard and receives `noindex, follow` metadata.
- Project pages link to related blog articles and service pages; relevant blog articles link back to their related project case studies.
- The footer exposes only registered site routes, GitHub, LinkedIn, email and the legal notice.
- The source checker found no missing `alt` attributes. The About page skill icons use `alt=""` because those icons are decorative and the adjacent text names each skill.
- The placeholder scan excludes normal form-field `placeholder` attributes, so labels such as “Your name” and “you@example.com” do not trigger false positives.
- Public GitHub profile and all five project repository URLs responded with HTTP 200. The Google Drive certifications folder and six Devicon SVG assets also responded with HTTP 200. The no-`www` LinkedIn profile URL responded with HTTP 200 and is now used consistently in the site; LinkedIn's `www` hostname returned an automated-request block, not a missing-page response.
- The Playwright smoke test is configured for 13 routes at six viewport widths (320, 360, 390, 768, 1024 and 1440 pixels), plus mobile-menu Escape/focus behavior and 404 metadata. It must pass in GitHub Actions before treating browser-level overflow checks as verified.
- Plausible tracking is implemented but remains inactive until `VITE_PLAUSIBLE_DOMAIN` is configured. No analytics environment variable was present in the inspected Vercel project settings.

## Verification still required

- Confirm the latest GitHub Actions run passes all three jobs, including the Playwright browser job, after this branch update.
- Confirm the Vercel deployment returns the configured security headers on the real custom domain and inspect the deployed contact flow.
- Activate Turnstile with production widget credentials and test the deployed contact form.
- Run browser-based viewport and keyboard tests on desktop, mobile and tablet. The source-level link checker is not a visual/browser test.
- Arrange an independent security review before describing this portfolio as independently assessed. CodeQL and an AI-assisted source review do not replace that review.

## Risk boundaries

Cloudflare rate limiting is an abuse control, not a strict globally consistent quota. Turnstile complements request validation and rate limiting; it does not authenticate a visitor. CORS does not stop direct clients from forging an Origin header. No claim is made that the portfolio has been penetration-tested or that all third-party dependencies are vulnerability-free.
