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
- GitHub Actions runs npm audit, Worker tests, the frontend link checker, lint, a production build and CodeQL source analysis.

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

## Verification still required

- Run the GitHub Actions workflow and review npm audit findings before merging.
- Confirm the Vercel deployment returns the configured security headers on the real custom domain.
- Activate Turnstile with production widget credentials and test the deployed contact form.
- Run browser-based viewport and keyboard tests on desktop, mobile and tablet. The source-level link checker is not a visual/browser test.
- Manually follow external links. GitHub profile and LinkedIn are referenced from the public GitHub profile; the Google Drive credentials link could not be validated by the available browser inspection.
- Arrange an independent security review before describing this portfolio as independently assessed. CodeQL and an AI-assisted source review do not replace that review.

## Risk boundaries

Cloudflare rate limiting is an abuse control, not a strict globally consistent quota. Turnstile complements request validation and rate limiting; it does not authenticate a visitor. CORS does not stop direct clients from forging an Origin header. No claim is made that the portfolio has been penetration-tested or that all third-party dependencies are vulnerability-free.
