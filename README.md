# Portfolio — Jose Benjumea

Personal cyberpunk portfolio: a React SPA with snap-scroll home, hobbies, color theory, and recruiter FAQs.

- **Live site:** [josebenjumea.dev](https://josebenjumea.dev/gh)
- **Repo:** [imJOS3/My-Portfolio](https://github.com/imJOS3/My-Portfolio)
- **Author:** Jose Benjumea ([`imJOS3`](https://github.com/imJOS3))
- **Location:** Bogotá, Colombia (born and raised in Barranquilla)
- **Status:** Software Engineering student (Universidad Manuela Beltrán), open to internships

The UI is in **English**. This README is in English so GitHub visitors and recruiters can scan it quickly.

---

## What it is

A one-page snap-scroll portfolio with extra routes for hobbies, color theory, and FAQs. The homepage is built so each section fills the viewport (`100dvh`) and snaps into place — content is meant to fit without scrolling inside a section.

The public site is **frontend-only**. Projects, skills, certificates, hobbies, and FAQs are static data in React. Contact is email or WhatsApp from the homepage — no API required.

---

## Features

| Area | What you get |
|------|----------------|
| **Home** | Typing intro, internship badge, stack pills, CTAs, desktop terminal aside |
| **Projects** | 3D coverflow of screenshots, details card, inspect modal with terminal chrome |
| **About** | Polaroid + bio, facts (Bogotá, university, internship), CV PDF, FAQs, classmate links |
| **Skills** | Four groups always visible (Frontend, Databases, Backend, Cloud & tools) with bars |
| **Certificates** | List of diplomas / Credly badges (SENA, Oracle, Google Cloud, Cisco) |
| **Contact** | Business card with cartoon photo; **Write me** opens Email or WhatsApp |
| **Theme** | Night / day cyberpunk tokens via CSS variables (`data-theme`) |
| **Colors** | `/theme` explains the palette (void, cyan, purple, fuchsia, gradient) |
| **Hobbies** | `/open` archive: games, anime, sports, music — each with its own layout |
| **FAQs** | `/faq` recruiter checklist: age, availability, languages, stack, contact |
| **Analytics** | GTM (`GTM-NP9PSDH5`): UTMs, referrer (GitHub, LinkedIn, job boards), manual vs referred, `contact_button_click` |

---

## Tech stack

| | |
|---|---|
| UI | React 18, TypeScript, Vite 6 |
| Styling | Tailwind CSS 3, CSS variables in `src/index.css` |
| Routing | React Router 7 |
| Icons | `react-icons`, `lucide-react` |
| Hosting | Vercel (SPA rewrite in `frontend/vercel.json`) |

Dev server: **port 5171** (`vite.config.ts`, `host: true`).

---

## Repo layout

```
portfolio/
├── README.md
└── frontend/                 # Vite + React app
    ├── src/
    │   ├── App.tsx           # Routes
    │   ├── index.css         # Themes, snap scroll, surfaces
    │   ├── lib/attribution.ts # UTM + referrer capture
    │   ├── context/          # Night / day theme
    │   ├── data/
    │   │   ├── faqs.ts       # Recruiter FAQs
    │   │   └── hobbies.ts    # Hobby catalog
    │   ├── components/
    │   │   ├── navbar/       # Mobile / tablet / desktop
    │   │   └── sections/     # Home, Projects, About, Skills, Certificates, Contact
    │   ├── pages/            # Home, FAQs, hobbies, theme, 404
    │   └── assets/           # Photos, project shots, certificates, CV
    └── vercel.json
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Snap home (Home → Projects → About → Skills → Certificates → Contact) |
| `/cv` `/gh` `/in` `/ct` `/mg` | Quiet source landings (redirect to `/`) |
| `/open` | Hobbies hub |
| `/open/:hobbyId` | Category (games, anime, sports, music) |
| `/open/:hobbyId/:itemId` | Single hobby item |
| `/theme` | Color system story |
| `/faq` | Recruiter FAQs (static) |
| `*` | 404 |

Main contact on the homepage is **email** (`mailto:josebenjuema2005@gmail.com`) or **WhatsApp** (`+57 318 289 3475`).

---

## Homepage sections

1. **Home** — “Hello world! / I'm Jose Benjumea / Software Engineering student”. Stack: Node.js, Java, Spring Boot, React, PostgreSQL, Docker.
2. **Projects** — Coverflow + modal. Data lives in `frontend/src/components/sections/projects/Projects.tsx`.
3. **About** — Bio, CV, FAQs, links to classmate portfolios.
4. **Skills** — HTML, CSS, JS, React, TypeScript, Tailwind · Oracle, MySQL, PostgreSQL, MongoDB · Java, Spring Boot, Node, Express, Python · AWS, GCP, Linux, Git, Docker.
5. **Certificates** — Java (SENA / Oracle), HTML & JS (SENA), Google Cloud Computing Foundations, Cisco Ethical Hacker.
6. **Contact** — Email, phone, Bogotá, GitHub / LinkedIn / Instagram / Facebook.

### Featured projects (static)

| Project | Stack | Notes |
|---------|--------|--------|
| **EcoTurismo** | React, Vite, Node, Express, PostgreSQL, Zustand, Redis | Ecotourism booking (Airbnb-style) |
| **Old West** | Next.js, TypeScript, Prisma | Barbershop appointments |
| **Bingo Online** | Preact, Vite, Tailwind, Socket.io | Real-time multiplayer bingo |
| **NexusFlow** | Next.js, NestJS, PostgreSQL, Prisma, Redis, Docker | Modular SaaS (in progress) |
| **Battio Lab** | Flask, MySQL | Scooter workshop API |
| **Event Agency — ERP** | Java 21, Spring Boot, Node, React, MySQL, Docker | Team ERP (in progress) |

---

## Theme

- `night` (default) and `day`, stored in `localStorage` (`portfolio-theme`).
- Tokens: `--bg-*`, `--surface-*`, `--text-*`, `--accent-cyan` / `--accent-purple` / `--accent-fuchsia`.
- Components use classes like `themed-surface`, `themed-btn-gradient`, `themed-accent-text`.
- Home snap is scoped to `html.home-snap` so other routes do not inherit mandatory snap.
- Project modal uses `html.modal-lock` so closing the modal does not jump to the top.

---

## Hobbies (`/open`)

Static catalog in `frontend/src/data/hobbies.ts`:

- **Games** — mobile (Clash Royale, Free Fire), PC (Space Marine 2, Limbo, Little Nightmares, Hollow Knight, Left 4 Dead), Geometry Dash
- **Anime** — shelf layout
- **Sports** — football (Junior de Barranquilla, Tottenham, Dortmund, and more)
- **Music** — deck / now-playing style

---

## Getting started

### Requirements

- Node.js 18+ and npm

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5171](http://localhost:5171).

| Script | What it does |
|--------|----------------|
| `npm run dev` | Vite dev server (port **5171**) |
| `npm run build` | Production build (`tsc -b && vite build`) |
| `npm run preview` | Preview the build |
| `npm run lint` | ESLint |

---

## Deployment

Frontend on **Vercel**. Root directory: `frontend`. `vercel.json` rewrites all paths to `index.html` so React Router works on refresh.

---

## Attribution (UTMs)

The site records **how someone arrived** and sends it to Google Tag Manager.

| Field | Meaning |
|------|---------|
| `traffic_source` | github, cv, linkedin, computrabajo, magneto, google, direct, … |
| `traffic_medium` | social, document, job_board, organic, referral, none |
| `traffic_campaign` | Employer or campaign name (you set this in the link) |
| `traffic_content` | Extra detail (vacancy title, button, etc.) |
| `traffic_kind` | `campaign` · `organic` · `referral` · `direct` |
| `traffic_entry` | `tagged` (has UTMs) · `referred` (clicked a link, no UTMs) · `manual` (typed the URL, bookmark, or the browser hid the referrer) |

First touch is kept 90 days (`localStorage`). Last touch is the current tab (`sessionStorage`). Internal clicks (Home → FAQ) do not reset the source. Contact clicks reuse the same fields.

Events in `dataLayer`: `portfolio_landing` (before GTM), `portfolio_attribution` (classified), `contact_button_click` (includes traffic fields).

### Links to paste (short — no UTMs in the bar)

Share a short path. The site records the source and immediately shows a clean `josebenjumea.dev`. Query strings are stripped if someone still uses them.

| Where you paste it | URL |
|--------------------|-----|
| GitHub (repo / profile) | `https://josebenjumea.dev/gh` |
| CV / hoja de vida | `https://josebenjumea.dev/cv` |
| LinkedIn (featured / About) | `https://josebenjumea.dev/in` |
| LinkedIn + empresa | `https://josebenjumea.dev/in/globant` |
| Computrabajo | `https://josebenjumea.dev/ct` or `/ct/empresa` |
| Magneto | `https://josebenjumea.dev/mg` or `/mg/empresa` |

`/in/globant` looks like a normal page, not a tracker. The second segment is the employer (`traffic_campaign`).

If someone opens the site **without** a short path or UTMs, the code still classifies GitHub, LinkedIn, Computrabajo, Magneto, Indeed, and search from `document.referrer`. Typed URL / bookmark shows as `direct` + `manual`.

In local dev, the classified visit is logged in the browser console as `[attribution]`. In production, read the same fields in GTM Preview or GA4.

### See it in Google Analytics (GA4) — step by step

Short paths (`/cv`, `/gh`) never show `?utm_=` in the URL. If you skip this mapping, GA4 will count those visits as **Direct**. The site already pushes the fields into `dataLayer` **before** GTM loads (`portfolio_landing`). You only need to map them.

Container: `GTM-NP9PSDH5`. You also need a GA4 property with a **Measurement ID** (`G-XXXXXXXX`).

#### 1. Confirm GA4 is wired in GTM

1. Open [tagmanager.google.com](https://tagmanager.google.com) → container `GTM-NP9PSDH5`.
2. **Tags** → you should already have a **Google tag** (or “GA4 Configuration”) with your `G-` ID.
3. If you don’t: **Tags → New → Google tag** → paste the Measurement ID → Trigger: **Initialization - All Pages** → Save.

#### 2. Create Data Layer variables

**Variables → New → Data Layer Variable** for each name (the “Data Layer Variable Name” must match exactly):

| Variable name in GTM | Data Layer Variable Name |
|----------------------|--------------------------|
| `DLV - traffic_source` | `traffic_source` |
| `DLV - traffic_medium` | `traffic_medium` |
| `DLV - traffic_campaign` | `traffic_campaign` |
| `DLV - traffic_content` | `traffic_content` |
| `DLV - traffic_kind` | `traffic_kind` |
| `DLV - traffic_entry` | `traffic_entry` |
| `DLV - traffic_referrer` | `traffic_referrer` |
| `DLV - first_traffic_source` | `first_traffic_source` |
| `DLV - first_traffic_campaign` | `first_traffic_campaign` |
| `DLV - button_name` | `button_name` |

Version on each variable: **Version 2**.

#### 3. Attach source / medium / campaign to the first page view

This is what fills the default **Acquisition** reports (`Session source / medium`).

1. Open your **Google tag**.
2. **Shared event settings** (or “Event parameters” / “Fields to set”).
3. Add parameters (only send them when the landing was tagged — `/cv`, `/gh`, `/in/globant`, …):

| Event parameter | Value |
|-----------------|--------|
| `source` | `{{DLV - traffic_source}}` |
| `medium` | `{{DLV - traffic_medium}}` |
| `campaign` | `{{DLV - traffic_campaign}}` |
| `content` | `{{DLV - traffic_content}}` |

4. Save. Do **not** force `source = direct` on every page — if `traffic_entry` is `manual`, leave campaign fields empty so Google / LinkedIn organic is not overwritten.

If GTM sends empty strings and they show up as `(not set)`, wrap the value in a **Custom JavaScript** variable:

```javascript
function () {
  return {{DLV - traffic_entry}} === "tagged" ? {{DLV - traffic_source}} : undefined;
}
```

Repeat for medium and campaign. Use those CJS variables in the Google tag instead of the raw DLVs.

#### 4. Event tag for the classified hit

1. **Tags → New → Google Analytics: GA4 Event**.
2. Measurement ID: same `G-` (or “Event Settings Variable” from the Google tag).
3. Event name: `portfolio_attribution`.
4. Event parameters:

| Parameter | Value |
|-----------|--------|
| `traffic_source` | `{{DLV - traffic_source}}` |
| `traffic_medium` | `{{DLV - traffic_medium}}` |
| `traffic_campaign` | `{{DLV - traffic_campaign}}` |
| `traffic_kind` | `{{DLV - traffic_kind}}` |
| `traffic_entry` | `{{DLV - traffic_entry}}` |
| `traffic_referrer` | `{{DLV - traffic_referrer}}` |
| `first_traffic_source` | `{{DLV - first_traffic_source}}` |
| `first_traffic_campaign` | `{{DLV - first_traffic_campaign}}` |

5. Trigger: **Custom Event** → Event name `portfolio_attribution`.
6. Save.

#### 5. Event tag for contact clicks

1. **Tags → New → GA4 Event**.
2. Event name: `contact_button_click`.
3. Parameters: `button_name` + the same `traffic_*` fields as above.
4. Trigger: Custom Event `contact_button_click`.
5. Save.

#### 6. Register custom dimensions in GA4

Custom params do not appear in reports until you register them.

1. Open [analytics.google.com](https://analytics.google.com) → your property.
2. **Admin** (gear) → **Data display** → **Custom definitions** → **Create custom dimension**.
3. Event-scoped, one per row:

| Dimension name | Event parameter |
|----------------|-----------------|
| Traffic source | `traffic_source` |
| Traffic medium | `traffic_medium` |
| Traffic campaign | `traffic_campaign` |
| Traffic kind | `traffic_kind` |
| Traffic entry | `traffic_entry` |
| Traffic referrer | `traffic_referrer` |
| First traffic source | `first_traffic_source` |
| First traffic campaign | `first_traffic_campaign` |
| Contact button | `button_name` |

4. Save. New hits only — history is not backfilled.

#### 7. Publish GTM

**Submit → Publish** the container. Preview is not enough for production data.

#### 8. Test

1. GTM → **Preview** → enter `https://josebenjumea.dev/cv` (or `http://localhost:5171/cv` if the localhost origin is allowed in GTM).
2. You should see `portfolio_landing`, then `page_view` with `source = cv`, `medium = document`, then `portfolio_attribution`.
3. In GA4: **Admin → DebugView** (keep Preview open). Confirm the same params.
4. After 24–48 hours: **Reports → Acquisition → Traffic acquisition**. Session source / medium should show `cv / document`, `github / social`, `linkedin / job_board`, …
5. For employer + manual vs tagged: **Explore → Blank → Free form**.
   - Rows: `Traffic source`, `Traffic campaign`, `Traffic entry`
   - Values: Sessions, `contact_button_click`

`traffic_entry = tagged` → short link (`/cv`, `/gh`, `/in/globant`).  
`referred` → they clicked from GitHub/LinkedIn without your short URL.  
`manual` → typed the URL, bookmark, or the browser hid the referrer.

---

## Contact

- Email: [josebenjuema2005@gmail.com](mailto:josebenjuema2005@gmail.com)
- Phone / WhatsApp: +57 318 289 3475
- GitHub: [imJOS3](https://github.com/imJOS3)
- LinkedIn: [jose-benjumea-5167b8271](https://www.linkedin.com/in/jose-benjumea-5167b8271/)

---

## License

Personal project — free to use as reference or inspiration for your own portfolio.
