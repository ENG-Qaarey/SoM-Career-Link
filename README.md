<img width="1536" height="1024" alt="CareerLink Somalia Banner" src="https://github.com/user-attachments/assets/9efa7006-5914-41ee-8f1f-3f1f80ff2ea0" />

# CareerLink Somalia

**Connect. Grow. Succeed.**

CareerLink Somalia is a career platform that connects students, graduates, universities, and employers across Somalia with internships, graduate programs, entry-level jobs, and career events.

This repository is a monorepo containing the **marketing web app** and the **mobile app** (in progress).

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Web App (`career_web`)](#web-app-career_web)
  - [Pages & Routes](#pages--routes)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Design System](#design-system)
  - [Opportunities Data](#opportunities-data)
  - [Scripts](#scripts)
- [Mobile App (`mobile`)](#mobile-app-mobile)
- [Brand Assets](#brand-assets)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contact](#contact)
- [License](#license)

---

## Overview

CareerLink Somalia helps:

| Audience                 | Value                                                                 |
| ------------------------ | --------------------------------------------------------------------- |
| **Students & graduates** | Discover opportunities, build profiles, apply, and track applications |
| **Employers**            | Post jobs, internships, and graduate programs; review applicants      |
| **Universities**         | Connect students with employers, events, and career resources         |

The web application is a premium landing and marketing site built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**, with dark/light theme support and modular page sections.

---

## Features

### Web (`career_web`)

- **Premium landing page** with hero, stats, opportunity categories, featured listings, how-it-works, audience sections, 3D career network, mobile showcase, testimonials, partners, and CTA
- **Dedicated pages** for Opportunities, Students, Employers, Universities, Resources, About, Login, Register, Terms, and Privacy
- **Full opportunities browser** with search, filters, and Unsplash cover images on cards
- **Auth UI** — login and registration forms (frontend ready; backend not wired yet)
- **Contact form** on the About page
- **Dark / light mode** with persistent preference (`localStorage` key: `cl-theme`)
- **Phone mockups** — splash, home dashboard, and job details previews
- **Responsive layout** — mobile-first navbar, footer, and section grids
- **Framer Motion** scroll animations with `prefers-reduced-motion` support
- **Three.js / R3F** career network scene (hero uses CSS gradient; 3D used in dedicated section)

### Mobile (`mobile`)

- Expo / React Native app scaffold (development in progress)

---

## Repository Structure

```
SoM-CaReeR-Link/
├── career_web/          # Next.js marketing & platform web app
├── mobile/              # Expo React Native mobile app
└── README.md            # This file
```

---

## Web App (`career_web`)

### Pages & Routes

| Page             | Route            | Description                                         |
| ---------------- | ---------------- | --------------------------------------------------- |
| Home             | `/`              | Full landing page with all sections                 |
| Opportunities    | `/opportunities` | Browse all listings with search & filters           |
| For Students     | `/students`      | Student & graduate features                         |
| For Employers    | `/employers`     | Employer hiring tools                               |
| Universities     | `/universities`  | University partnership info                         |
| Career Resources | `/resources`     | CV, interview, and career guidance                  |
| About Us         | `/about`         | Mission, testimonials, contact form                 |
| Login            | `/login`         | Sign-in form                                        |
| Create Account   | `/register`      | Registration form (Student / Employer / University) |
| Terms of Service | `/terms`         | Full legal terms                                    |
| Privacy Policy   | `/privacy`       | Full privacy policy                                 |

Route constants live in `career_web/lib/routes.ts`.

### Tech Stack

| Layer     | Technology                                                                                                                                         |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router)                                                                                                      |
| Language  | TypeScript                                                                                                                                         |
| Styling   | Tailwind CSS v4                                                                                                                                    |
| Animation | [Framer Motion](https://www.framer.com/motion/)                                                                                                    |
| 3D        | [Three.js](https://threejs.org), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) |
| Icons     | [Lucide React](https://lucide.dev)                                                                                                                 |
| Font      | Inter (via `next/font`)                                                                                                                            |
| Images    | Next.js `Image`, [Unsplash](https://unsplash.com) for opportunity covers                                                                           |

### Getting Started

**Prerequisites:** Node.js 20.9+ and npm

```bash
cd career_web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production build:**

```bash
npm run build
npm start
```

**Lint:**

```bash
npm run lint
```

### Project Structure

```
career_web/
├── app/
│   ├── layout.tsx           # Root layout, metadata, theme init script
│   ├── page.tsx             # Home landing page
│   ├── globals.css          # Design tokens, utilities, section styles
│   ├── about/page.tsx
│   ├── opportunities/page.tsx
│   ├── students/page.tsx
│   ├── employers/page.tsx
│   ├── universities/page.tsx
│   ├── resources/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── terms/page.tsx
│   └── privacy/page.tsx
├── components/
│   ├── auth/                # Login & register forms, auth shell
│   ├── landing/             # Navbar, hero, sections, mockups, footer
│   ├── legal/               # Terms & privacy document layout
│   ├── three/               # R3F scenes (career network, particles)
│   └── ui/                  # Button, section heading, motion wrapper
├── lib/
│   ├── routes.ts            # Central route map
│   └── opportunities.ts     # Demo opportunity listings & helpers
├── public/
│   └── brand/               # Logos and icons
└── next.config.ts           # Unsplash remote image config
```

### Design System

CSS custom properties in `app/globals.css`:

| Token        | Dark      | Light     |
| ------------ | --------- | --------- |
| `--cl-main`  | `#050a14` | `#ffffff` |
| `--cl-text`  | `#f8fafc` | `#0b1f4b` |
| `--cl-blue`  | `#0d6efd` | `#0d6efd` |
| `--cl-muted` | `#94a3b8` | `#64748b` |

Theme toggle is in the navbar. Preference is stored under `cl-theme` in `localStorage`.

Utility classes: `cl-container`, `cl-heading`, `cl-subtext`, `cl-card`, `cl-btn`, `cl-input`, `section-main`, `hero-highlight`, etc.

### Opportunities Data

Demo listings are defined in `lib/opportunities.ts`:

```ts
import {
  OPPORTUNITIES,
  getFeaturedOpportunities,
  unsplashPhoto,
} from "@/lib/opportunities";
```

Each opportunity supports:

- `title`, `company`, `location`, `type`, `description`, `date`
- Optional `image` (Unsplash URL or public URL path such as `/brand/icon.png`)
- Optional `featured` flag for the home page

Replace this file with API calls when the backend is ready.

### Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm start`     | Serve production build   |
| `npm run lint`  | Run ESLint               |

---

## Mobile App (`mobile`)

Expo-based React Native app for iOS and Android.

```bash
cd mobile
npm install
npx expo start
```

See `mobile/README.md` for Expo-specific documentation.

---

## Brand Assets

Located in `career_web/public/brand/`:

| File                  | Usage                                |
| --------------------- | ------------------------------------ |
| `icon.png`            | Favicon, splash, white mark on black |
| `CareerIcon.png`      | Colored CL mark                      |
| `careerlink-mark.svg` | SVG mark                             |
| `careerlink-logo.svg` | Full wordmark SVG                    |

Primary brand colors: **CareerLink Blue** `#0D6EFD`, **Navy** `#0B1F4B`, deep background `#050A14`.

---

## Deployment

The web app is a standard Next.js application and can be deployed to:

- [Vercel](https://vercel.com) (recommended)
- Any Node.js host supporting Next.js 16

Build command: `npm run build`  
Output: `.next` (default Next.js standalone not configured)

Ensure `images.unsplash.com` remains allowed in `next.config.ts` for opportunity cover images.

---

## Roadmap

- [ ] Backend API and database (Supabase or custom)
- [ ] Real authentication (login / register)
- [ ] Live opportunity CRUD for employers
- [ ] Application tracking for students
- [ ] University dashboard
- [ ] Mobile app feature parity
- [ ] Email notifications for contact & auth forms
- [ ] Somali language support

---

## Contact

**CareerLink Somalia**

- Email: [hello@careerlink.so](mailto:hello@careerlink.so)
- Location: Mogadishu, Somalia
- Web: [About / Contact](/about#contact) (`/about#contact`)

---

## License

Copyright © 2026 CareerLink Somalia. All rights reserved.

---

<p align="center"><strong>Connect. Grow. Succeed.</strong></p>
