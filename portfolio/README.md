# Personal Portfolio

A React and TypeScript portfolio for AI systems engineering, applied machine learning, software architecture and technical research. The frontend is built with Vite and React Router. Contact-form submissions are handled by a separate Cloudflare Worker.

## Requirements

- Node.js 20.19+ or 22.12+ (Vite 8 requirement)
- npm
- A Cloudflare account and Wrangler access only when running or deploying the contact Worker
- A Resend API key for contact-form email delivery

## Frontend setup

```bash
cd portfolio
npm ci
npm run dev
```

Vite starts the development server at `http://localhost:5173`.

Optional: copy `.env.example` to `.env.local` when using a local contact Worker:

```dotenv
VITE_CONTACT_API_URL=http://127.0.0.1:8787
```

Restart Vite after changing environment variables. When this variable is omitted, the frontend uses the deployed contact Worker URL in `src/pages/Contact.tsx`.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Run TypeScript project checks and create the production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

Build locally with:

```bash
npm run build
npm run preview
```

The production output is written to `portfolio/dist/`.

## Architecture

```text
portfolio/
├── public/
│   ├── og-image.svg        # Social sharing image
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
└── src/
    ├── components/
    │   ├── sections/       # Homepage sections
    │   ├── Nav.tsx         # Responsive site navigation
    │   ├── Footer.tsx
    │   └── RouteMetadata.tsx
    ├── data/
    │   ├── content.ts      # Homepage and project content
    │   └── editorial.ts    # Blog posts and article content
    ├── hooks/              # Scroll and reveal behavior
    ├── pages/
    │   ├── Home.tsx
    │   ├── Work.tsx
    │   ├── Blog.tsx
    │   ├── About.tsx
    │   └── Contact.tsx
    ├── App.tsx             # Route definitions and app shell
    └── index.css           # Design tokens, global styles, reduced motion
```

### Main routes

| Route | Content |
| --- | --- |
| `/` | Homepage and service overview |
| `/work` | Project case studies with implementation details and repository links |
| `/blog` | Blog index with technical articles |
| `/blog/:slug` | Individual blog article |
| `/about` | Background, skills and professional links |
| `/contact` | Contact form and profile links |
| `/services/ai` | AI and agentic systems |
| `/services/web` | Full-stack web development |
| `/services/infrastructure` | Deployment and infrastructure |

## Contact API

The contact form sends JSON to the Cloudflare Worker in `contact-backend/`. The Worker validates the request, enforces an origin allowlist and rate limit, escapes user-controlled values for HTML email, and sends the notification through Resend.

### Local Worker setup

```bash
cd contact-backend
npm ci
```

Copy `.dev.vars.example` to `.dev.vars` and add the Resend key:

```dotenv
RESEND_API_KEY=your_resend_api_key
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Run the Worker:

```bash
npm run dev
```

In another terminal, set `VITE_CONTACT_API_URL=http://127.0.0.1:8787` in `portfolio/.env.local` and run the Vite dev server. The local Worker only accepts origins in its `ALLOWED_ORIGINS` list.

Run Worker tests once with:

```bash
npm test -- --run
```

### Production secrets and deployment

Set the Resend API key as a Worker secret:

```bash
npx wrangler secret put RESEND_API_KEY
```

The production origin allowlist is configured in `contact-backend/wrangler.jsonc`. Review it before deployment and include only exact trusted site origins.

Deploy the Worker:

```bash
npx wrangler deploy
```

The Worker applies two Cloudflare Rate Limiting bindings: a 20-request-per-60-second per-IP abuse cap and a five-request-per-60-second cap for each IP-and-email pair. Each binding uses a distinct `namespace_id`; both IDs must be unique within your Cloudflare account, so replace the example identifiers if either conflicts with an existing binding. Cloudflare describes these counters as approximate and regional, so they are an abuse-control layer rather than a strict global quota.

The Origin allowlist constrains browser-origin requests. It is not authentication, because non-browser clients can forge an Origin header. Payload validation and rate limiting remain necessary.

## Vercel deployment

The frontend is a Vite single-page application. The `vercel.json` file rewrites nested browser-history routes to `index.html` so direct visits and refreshes reach React Router. In Vercel, configure:

| Setting | Value |
| --- | --- |
| Root Directory | `portfolio` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Deploy after confirming that the production domain matches the `ALLOWED_ORIGINS` value in the Worker configuration. The current contact form endpoint is configured in `src/pages/Contact.tsx`.

For a custom domain, update all of the following together:

1. `ALLOWED_ORIGINS` in `contact-backend/wrangler.jsonc`.
2. The canonical site URL and social image URL in `src/components/RouteMetadata.tsx` and `index.html`.
3. The canonical URLs in `public/sitemap.xml` and the sitemap reference in `public/robots.txt`.
4. The frontend contact endpoint only if the Worker hostname changes.

## SEO and accessibility

Route metadata updates the title, description, canonical URL, Open Graph values and Twitter card values for each page. `public/og-image.svg` provides the social preview graphic. `robots.txt` and `sitemap.xml` expose the public route set to crawlers.

This is a client-rendered single-page application. Page-specific metadata is updated on navigation after React loads; crawlers that do not execute JavaScript will initially see the static homepage metadata. Consider prerendering or server rendering if full per-route metadata is required for those crawlers.

The navigation supports keyboard dismissal, focus containment and focus return. A skip link and visible focus indicators are provided, and motion-heavy behavior is disabled when the user requests reduced motion.

## Project content policy

Project descriptions are based on linked repository documentation and implementation. Evaluation results are only presented where the source project records them. Work in progress is described as such; repository presence is not presented as proof of production deployment or independent validation.
