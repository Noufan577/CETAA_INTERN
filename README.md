# CETAA - College of Engineering Trivandrum Alumni Association

Official alumni web presence for the College of Engineering Trivandrum Alumni Association (CETAA) -
a global fellowship of 50,000+ CETians across 22 chapters worldwide, celebrating 86 years of legacy since 1939.

---

## About the Project

This is the official website for **CETAA** (College of Engineering Trivandrum Alumni Association), built to:

- Showcase the rich **86-year legacy** of CET (est. 3 July 1939)
- Connect alumni worldwide through a modern, premium web experience
- Drive fundraising for the **Diamond Jubilee Hall Renovation** initiative
- Display past CETAA events and milestones

---

## Features

| Feature | Description |
|---|---|
| Hero Section | Cinematic grayscale-to-color scroll animation with animated stats |
| About Section | Parallax image layout with institution history |
| Legacy Timeline | Interactive vertical timeline of key milestones (1939 to 2026) |
| Painting Reveal | Scroll-hijacked full-screen reveal of the CET painting |
| Previous Events | Fan-arc carousel with 7 event cards, pointer-driven rotation, full-screen lightbox |
| Diamond Jubilee Initiative | Dedicated fundraising page for the Hall renovation |
| Alumni Impact | Animated counter stats (50K+ alumni, 22 chapters, 86 yrs, 250+ events) |
| Responsive Navbar | Sticky glass navbar with highlighted Diamond Jubilee CTA |
| Footer | Horizontal nav, social links, CETAA branding |

---

## Project Structure

`
src/
+-- assets/                      Images, videos, event posters
|   +-- event-*.png.asset.json   Event poster stubs (7 events)
|   +-- cet-front.jpg            CET main building
|   +-- cet-arch.jpg             CET archway
|   +-- cet-aerial.jpg           Aerial campus view
|   +-- cet-painting.png         Painting reveal asset
|   +-- diamond-jubilee-hall-*   Hall renovation images
|
+-- components/
|   +-- Navbar.tsx               Sticky top navigation
|   +-- PaintingReveal.tsx       Scroll-hijacked painting animation
|   +-- sections/
|       +-- Hero.tsx             Hero with parallax + stats
|       +-- About.tsx            About CET section
|       +-- Timeline.tsx         Historical milestones timeline
|       +-- AlumniImpact.tsx     Animated counter stats
|       +-- PreviousEvents.tsx   Fan-arc event carousel + lightbox
|       +-- CurrentEvent.tsx     Diamond Jubilee fundraising banner
|       +-- Footer.tsx           Site footer
|
+-- routes/
    +-- __root.tsx               Root layout + global meta tags
    +-- index.tsx                Home page
    +-- diamond-jubilee.tsx      Diamond Jubilee Hall renovation page
`

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TanStack Router | v1 | File-based routing + head/meta |
| TanStack Start | v1 | SSR-ready meta framework |
| Framer Motion | 12 | Animations, springs, carousel physics |
| Lenis | 1.3 | Smooth scroll + scroll-hijacking |
| Tailwind CSS | v4 | Utility-first styling |
| TypeScript | 5.8 | Type safety |
| Vite | 8 | Dev server + bundler |

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm or bun

### Install dependencies

`ash
npm install
`

### Start development server

`ash
npm run dev
`

The app runs at http://localhost:8080 by default.

### Build for production

`ash
npm run build
`

### Preview production build

`ash
npm run preview
`

---

## Events in the Carousel

| # | Event | Year | Venue |
|---|---|---|---|
| 1 | CETAA Day 2023 | 2023 | Diamond Jubilee Hall, CET |
| 2 | Swaralahari Online Relay Singing | 2022 | Galaxy Hall, Trivandrum |
| 3 | Annual General Body Meeting | 2024 | CETAA Hall, CET |
| 4 | CETAA Award Nite | 2021 | Online (Zoom) |
| 5 | CETAA Guruvandanam | 2021 | Online (Zoom) |
| 6 | CETAA Day 2022 | 2022 | Diamond Jubilee Hall, CET |
| 7 | HVAC Finishing Program | 2020 | Online (Zoom) |

---

## Adding New Events

1. Place the event poster image in src/assets/
2. Create an asset stub JSON file:

`json
{ "url": "/src/assets/your-event-image.png" }
`

Save it as: src/assets/event-NAME.png.asset.json

3. Import and add to the events array in src/components/sections/PreviousEvents.tsx

---

## Key Historical Facts

| Fact | Detail |
|---|---|
| CET Founded | 3 July 1939 |
| First Principal | Maj T.H. Mathewman |
| Campus shifted | 1960 (125-acre campus, Kulathoor) |
| CETAA Established | 1976 |
| Diamond Jubilee Hall built | ~1999 (CET 60th anniversary) |
| CETAA Golden Jubilee | 2026 (50 years of CETAA) |
| Alumni worldwide | 50,000+ |
| Global chapters | 22 (India, Gulf, Australia, USA) |
| Departments | 8 full-fledged |

---

## Design Tokens

| Token | Usage |
|---|---|
| --gold | Primary accent, warm gold |
| --navy-deep | Dark background / primary surface |
| --ivory | Light background |
| font-display | Display / heading typeface |
| shadow-elegant | Soft elegant shadow |
| shadow-gold | Gold glow shadow |
| text-gradient-gold | Gold gradient text |

---

## External Links

- Official CETAA Alumni Network: https://alumni.cet.ac.in
- CET Official Website: https://www.cet.ac.in
- LinkedIn: https://www.linkedin.com/school/college-of-engineering-trivandrum
- Facebook: https://www.facebook.com/College-of-Engineering-Trivandrum-Alumni-Association-595120010597674
- YouTube: https://www.youtube.com/channel/UCJI_IdamgOdlw8ZcyDpQeRg

---

## Contact

CETAA - College of Engineering Trivandrum Alumni Association
Thiruvananthapuram - 695016, Kerala, India
Email: secretarycetaa@cet.ac.in
Web: alumni.cet.ac.in
Phone: 0471-2515685

---

Built for the CETians of every batch, every border, every generation.