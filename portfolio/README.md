# Yash Malik Portfolio

A React portfolio for presenting AI engineering, full-stack development, selected projects, and research interests. The interface uses React, TypeScript, Vite, React Router, Lenis, and custom CSS animations.

## Repository layout

- `portfolio/`: React application, pages, reusable components, visual assets, and styling.
- `contact-backend/`: Cloudflare Worker that validates contact submissions and sends notifications through Resend.

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

The desktop/mobile hero check uses Playwright. Install it only if you want to run this check:

```bash
cd portfolio
npm install --save-dev playwright
npx playwright install chromium
npm run preview -- --host 127.0.0.1
```

With the preview server running, open a second terminal in `portfolio/` and run:

```bash
node qa-hero.mjs
```

The script checks the scroll-driven hero state, captures desktop and mobile screenshots, and fails if the mobile viewport has horizontal overflow.

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
```

The `.dev.vars` file is ignored by Git. For deployment, add the key as a Cloudflare Worker secret:

```bash
npx wrangler secret put RESEND_API_KEY
npm run deploy
```

Do not commit API keys or other secrets.

## Contact request limits

The Worker accepts JSON `POST` requests with a name, email address, and message. It validates field types and lengths, caps request bodies at 24 KB, escapes user input before rendering the notification email, and returns generic provider errors.

The endpoint currently allows cross-origin requests because the portfolio's production origin is not configured as an environment-specific allowlist. CORS is not spam protection; add Cloudflare rate limiting or Turnstile before relying on the form for high-volume public traffic.

## Motion and accessibility

The portfolio keeps its scroll-driven hero and section animations. Smooth scrolling, the custom cursor, and the showcase video respect the user's reduced-motion preference. Interactive navigation and service disclosures expose their expanded or current state to assistive technology.
