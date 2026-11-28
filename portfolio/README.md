# Yash Malik Portfolio

A React portfolio for presenting AI engineering, full-stack development, selected projects, and research interests. The interface uses React, TypeScript, Vite, React Router, Lenis, and custom CSS animations.

## Repository layout

- `portfolio/`: React application, pages, reusable components, visual assets, and styling.
- `contact-backend/`: Cloudflare Worker that validates contact submissions and sends notifications through Resend.

## Environment configuration

Copy `.env.example` to `.env.local`. Set `VITE_SITE_URL` to the production HTTPS origin so the build can generate an absolute sitemap and matching robots.txt entry. Set `VITE_CF_WEB_ANALYTICS_TOKEN` to the Cloudflare Web Analytics token to enable analytics. Leave the token empty to keep analytics disabled. These are public build-time settings, not secrets.

## Run the portfolio

```bash
cd portfolio
npm install
npm run dev
```

Available application commands:

```bash
npm run lint
npm run build
npm run preview
```


## Optional browser QA

The responsive and navigation check uses Playwright. Install it only if you want to run this check:

```bash
cd portfolio
npm install --save-dev playwright
npx playwright install chromium
npm run preview -- --host 127.0.0.1
```

With the preview server running, open a second terminal in `portfolio/` and run:

```bash
node qa-site.mjs
```

The script checks all app routes at six viewport widths, unique page titles, internal navigation targets, image alt attributes, and mobile menu open/close behavior. It fails on horizontal overflow.

## Run the contact Worker

```bash
cd contact-backend
npm install
npm test
npm run dev
```

For local Worker development, create a `.dev.vars` file inside `contact-backend/`:

```dotenv
RESEND_API_KEY=your_resend_api_key
ALLOWED_ORIGIN=http://localhost:5173
```

The `.dev.vars` file is ignored by Git. For deployment, add the key as a Cloudflare Worker secret:

```bash
npx wrangler secret put RESEND_API_KEY
npm run deploy
```

Do not commit API keys or other secrets.

For production, configure `ALLOWED_ORIGIN` in Cloudflare Worker settings to the exact HTTPS origin serving the portfolio. Do not use a wildcard. Set `VITE_CF_WEB_ANALYTICS_TOKEN` in the portfolio build environment to enable Cloudflare Web Analytics. Analytics remains disabled when the token is absent.

## Contact request limits

The Worker accepts JSON `POST` requests with a name, email address, and message. It validates field types and lengths, caps request bodies at 24 KB, escapes user input before rendering the notification email, and returns generic provider errors.

The Worker requires an exact `ALLOWED_ORIGIN` match and rejects unconfigured or foreign browser origins. The production `ALLOWED_ORIGIN` is configured in `contact-backend/wrangler.jsonc`; update it if the portfolio domain changes. For local development, `.dev.vars` overrides it. The endpoint also uses a hidden honeypot, field validation, a 24 KB request cap, and HTML escaping.

CORS and a honeypot are not rate limiting or database authorization. The current Worker has no database binding, so row-level security (RLS) does not apply. If a database is added later, enable RLS on every exposed table and keep service-role credentials server-side. Add a Cloudflare WAF rate-limit rule or Turnstile before opening the form to high-volume public traffic.

## Motion and accessibility

The portfolio keeps its scroll-driven hero and section animations. Smooth scrolling, the custom cursor, and the showcase video respect the user's reduced-motion preference. Interactive navigation and service disclosures expose their expanded or current state to assistive technology.
