# Portfolio security review

**Review date:** 23 November 2026  
**Scope:** `portfolio/` React/Vite frontend and `contact-backend/` Cloudflare Worker  
**Review type:** Source-level implementation review. This is not an independent penetration test or an external security assessment.

## Architecture and exposure

The portfolio is a public, client-rendered website. Its only application API is the public contact-form Worker. The site has no user accounts, private user records, database-backed authorization, payment flow, file upload endpoint or inbound webhook route.

Authentication is therefore not required for the public contact submission. Origin validation is a browser-origin restriction, not authentication. The Worker continues to validate the request body and apply rate limits independently of the frontend.

## Database row-level security

Row-level security (RLS) is not applicable to the current endpoints: the Worker has no database binding, does not persist contact submissions in a database and has no user-owned rows to authorize. It forwards validated inquiries to Resend. If a database or authenticated user data is added later, enable and test database-native RLS policies before exposing those records through an endpoint.

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
- The frontend and Worker dependency trees were audited after compatible updates; both reported zero npm audit findings in the hosted Node 24 repair-validation run.
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

Plausible tracking is optional. It loads only when `VITE_PLAUSIBLE_DOMAIN` is set at frontend build time. No `VITE_PLAUSIBLE_DOMAIN` value was present in the inspected Vercel project environment, so analytics remains inactive until the site is registered with Plausible and this value is configured. The privacy notice describes this conditional behavior.

## Website and link review

- The custom 404 route is registered as the React Router wildcard and receives `noindex, follow` metadata.
- Project pages link to related blog articles and service pages; relevant blog articles link back to their related project case studies.
- The footer exposes registered site routes, GitHub, LinkedIn, email and the legal notice. The logo and email are clickable. No phone number is published in the current site content, so a `tel:` link cannot be added without a verified number.
- The source checker found no missing `alt` attributes. The About page skill icons use `alt=""` because those icons are decorative and the adjacent text names each skill.
- The placeholder scan excludes normal form-field `placeholder` attributes, so labels such as “Your name” and “you@example.com” do not trigger false positives.
- The public GitHub profile and all seven project repository links were confirmed to resolve to accessible repositories through the connected GitHub account. The Google Drive certifications folder and six Devicon SVG assets also responded with HTTP 200. The no-`www` LinkedIn profile URL responded with HTTP 200 and is now used consistently in the site; LinkedIn's `www` hostname returned an automated-request block, not a missing-page response.
- The earlier Playwright smoke test passed for 13 routes at six viewport widths (320, 360, 390, 768, 1024 and 1440 pixels), plus mobile-menu open/Escape/focus restoration and custom 404 metadata. The current branch extends this test to audit internal links, unique titles, meta descriptions, accessible button names, image alt attributes and contact success/error states. Those new checks still require a fresh CI run.
- Plausible tracking is implemented but remains inactive until `VITE_PLAUSIBLE_DOMAIN` is configured. No analytics domain was present in the inspected Vercel project settings.
- Current visual assets are SVG diagrams and vector artwork rather than raster photographs, so raster compression is not applicable. Architecture diagrams use explicit dimensions and lazy loading.
- Page content is bundled locally and no remote page-data API exists, so intent-based data prefetching would add requests without improving data availability.

## Verification still required

- GitHub Actions run 297 checked commit `501c0a4`: frontend dependency installation, audit, route/content checks and ESLint passed. The frontend build then failed because `useScrollToTop.ts` still imported the removed Lenis hook. That stale import was replaced with native browser scrolling in commit `b01af20`; a fresh complete run for that latest head is still required. Worker dependency audit, source/test type checks and Worker tests completed successfully in run 297 before the run was cancelled. CodeQL and Playwright did not complete on that run.
- No Vercel deployment exists for the latest branch head. The latest branch deployment records still point to commit `96e3ce1` and are in `ERROR`; the TypeScript renderer issue found there was corrected later, but no fresh deployment has verified the current branch. The current Vercel status contexts also report a build-rate-limit failure. Re-run CI and obtain a successful deployment for the latest branch head before merge.
- The `personal-portfolio-xtda` preview deployment built successfully, but its preview hostname is protected by Vercel SSO. The public production custom domain still serves the previous production build and did not return the new CSP or Referrer-Policy headers during this review. Confirm both headers and the contact flow after the feature branch is promoted to production.
- Activate Turnstile with production widget credentials and test the deployed contact form.
- Arrange an independent security review before describing this portfolio as independently assessed. CodeQL and an AI-assisted source review do not replace that review.

## Risk boundaries

Cloudflare rate limiting is an abuse control, not a strict globally consistent quota. Turnstile complements request validation and rate limiting; it does not authenticate a visitor. CORS does not stop direct clients from forging an Origin header. No claim is made that the portfolio has been penetration-tested or that all third-party dependencies are vulnerability-free.
