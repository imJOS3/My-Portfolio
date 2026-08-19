# Portfolio — Jose Benjumea

Personal cyberpunk portfolio: a React SPA with snap-scroll home, hobbies, color theory, and recruiter FAQs.

- **Live site:** [josebenjumea.dev](https://josebenjumea.dev)
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
| **Analytics** | Google Tag Manager (`GTM-NP9PSDH5`), including `contact_button_click` |

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

## Roadmap

- **UTM campaign tracking — pending.** GTM is already on the site (`GTM-NP9PSDH5`) and contact CTAs push `contact_button_click`, but campaign parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) are not captured, stored, or sent with events yet. This is required before outbound or paid campaigns so sessions and conversions can be attributed in Analytics.

---

## Contact

- Email: [josebenjuema2005@gmail.com](mailto:josebenjuema2005@gmail.com)
- Phone / WhatsApp: +57 318 289 3475
- GitHub: [imJOS3](https://github.com/imJOS3)
- LinkedIn: [jose-benjumea-5167b8271](https://www.linkedin.com/in/jose-benjumea-5167b8271/)

---

## License

Personal project — free to use as reference or inspiration for your own portfolio.
