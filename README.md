# Yash Malik | Personal Portfolio

Personal portfolio and contact service. The repository is a small monorepo with a React frontend and a Cloudflare Worker that handles contact-form submissions.

## Applications

- **Portfolio:** `portfolio/` — React 19, TypeScript, Vite and React Router.
- **Contact API:** `contact-backend/` — Cloudflare Worker, Resend email delivery and Cloudflare rate limiting.

## Local development

### Portfolio

```bash
cd portfolio
npm ci
npm run dev
```

The Vite development server runs at `http://localhost:5173`.

### Contact Worker

```bash
cd contact-backend
npm ci
```

Copy `.dev.vars.example` to `.dev.vars` and add a Resend API key:

```dotenv
RESEND_API_KEY=your_resend_api_key
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Start the Worker:

```bash
npm run dev
```

For local end-to-end testing, copy `portfolio/.env.example` to `portfolio/.env.local`, then set `VITE_CONTACT_API_URL=http://127.0.0.1:8787`. Restart Vite after changing environment variables.

## Documentation

See [portfolio/README.md](portfolio/README.md) for frontend architecture, routes, builds, Vercel deployment and contact Worker deployment.

## Security notes

- Contact submissions require an exact allowed `Origin`. This is a browser-origin control, not authentication; non-browser clients can forge the header.
- Input is type-checked, length-limited and HTML-escaped before insertion into the notification email.
- The Worker applies a 20-per-minute per-IP abuse cap and a five-per-minute per-IP-and-email submission cap. Cloudflare counters are approximate and regional, not strict global quotas.
- The rate-limit `namespace_id` in `contact-backend/wrangler.jsonc` must be unique in your Cloudflare account. Change it if that identifier is already in use.
- Store `RESEND_API_KEY` as a Wrangler secret in production. Do not commit secrets or local `.dev.vars` / `.env.local` files.
