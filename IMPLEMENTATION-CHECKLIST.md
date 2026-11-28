# Portfolio implementation checklist

Status reflects code changes on `portfolio/v2-engineering-refinement`. Browser and CI checks must pass before merging.

## Layout and navigation

- [x] Remove horizontal scrolling: global overflow clipping, constrained root/media elements, and narrow-screen layout guards.
- [x] Find broken internal links: all in-app destinations map to registered routes; project GitHub repositories were checked and returned successfully.
- [x] Add mobile menu: existing menu retained, with Escape handling, scroll locking, hidden-state focus prevention, and responsive viewport handling.
- [x] Fix footer links: internal links map to registered routes; email remains a `mailto:` link. Social destinations and the Google Drive credentials folder remain externally permissioned links; their availability was not confirmed by public fetch.
- [x] Remove unused navigation: audited the navigation; retained the links that serve mobile navigation and real pages rather than deleting valid destinations.
- [x] Make the logo and email clickable: logo links home; email links use `mailto:`.
- [ ] Make a phone number clickable: no phone number is present in the repository. Add a number only after the owner supplies the public contact number.
- [x] Add breadcrumbs to pages that use the shared page header.
- [x] Add intent-based route prefetching on pointer hover and keyboard focus.

## Content, SEO, and accessibility

- [x] Add a portfolio-branded SVG favicon, replacing the previous purple starter icon.
- [x] Add unique route-specific page titles and meta descriptions.
- [x] Add canonical URLs, Open Graph and Twitter metadata, Person structured data, and a crawler access policy.
- [x] Add build-time sitemap generation and a matching robots.txt Sitemap directive when `VITE_SITE_URL` is configured.
- [x] Set `VITE_SITE_URL` on the Vercel project serving `personal-portfolio-yashmalik.vercel.app` for production and preview builds.
- [x] Remove form placeholder copy; visible labels now carry the field instructions.
- [x] Add contact success and error states with live-region announcements.
- [x] Add alt attributes to image elements; decorative technology icons use empty alt text and are hidden from assistive technology.
- [x] Keep the copyright year dynamic.
- [x] Audit buttons and give interactive buttons explicit button types where required.
- [x] Standardize shared typography tokens, text wrapping, and responsive section spacing.

## Performance and responsive behavior

- [x] Add responsive guards for mobile overflow and long text.
- [x] Add a Playwright QA script for nine routes and six viewport widths, including mobile menu and internal-link checks.
- [x] Lazy-load page modules and prefetch route chunks when users show intent.
- [x] Stop the skills rotator while it is offscreen and disable its automatic motion for reduced-motion users.
- [x] Remove permanent GPU promotion from reveal and hero elements; remove the idle service-pill float animation.
- [x] Respect reduced-motion preferences in smooth scrolling, cursor behavior, video playback, and marquee animation.
- [x] Audit and optimize image assets: the new favicon is a compact SVG, the existing showcase poster is already about 27 KB, and the icon sprite is about 5 KB. No oversized raster image assets were found. The 2.34 MB MP4 is a video asset, not an image, and remains unchanged.

## Analytics and endpoint security

- [x] Add optional Cloudflare Web Analytics integration.
- [ ] Activate analytics: add `VITE_CF_WEB_ANALYTICS_TOKEN` to the Vercel project after creating a Cloudflare Web Analytics token.
- [x] Restrict the contact Worker to an exact configured `ALLOWED_ORIGIN`, validate fields, reject a honeypot submission, cap request size, and escape HTML email content.
- [x] Configure `ALLOWED_ORIGIN` in `contact-backend/wrangler.jsonc` for `https://personal-portfolio-yashmalik.vercel.app`. Deploy the Worker to apply it.
- [ ] Add Cloudflare rate limiting or Turnstile: this requires a Cloudflare dashboard rule or site/secret keys.
- [x] Review RLS applicability: the current Worker has no database binding or database-backed endpoint, so row-level security does not apply. If a database is added later, enable RLS on its exposed tables.

## Validation status

- [x] Run `npm ci && npm run lint && npm run build` in `portfolio/` (GitHub Actions passed).
- [x] Run `npm ci && npm test` in `contact-backend/` (GitHub Actions passed).
- [x] Run `npm audit --omit=dev` for production dependencies (zero production vulnerabilities after upgrading React Router to 7.18.2).
- [x] Run `npm run qa:site` against the production preview (GitHub Actions passed: nine routes across six viewport widths, internal links, titles, image alt attributes, and mobile menu open/Escape-close).
- [ ] Verify the deployed contact form after setting the production allowed origin.
