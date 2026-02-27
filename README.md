# Sultana's Heritage Kitchen

**A brand website for a 50-year-old family tea room on Meenakshi Koil Street, Shivajinagar, Bengaluru.**

---

## Get it running

Pre-Requisite Include: (having nodejs 16+ version downloaded)


```bash
git clone https://github.com/mdrayaanpasha/sultanas-chai.git
cd sultanas-chai
npm install
npm run dev
```

Open `http://localhost:5173`. That's it.

---

## The brand

I didn't pick a generic café concept. I built **Sultana's Heritage Kitchen** — a narrow-corner tea room in Shivajinagar that's been there since 1974. Founded by Sultana Begum with ₹600 and a spice blend she memorised by watching her mother cook. Her son Imran runs the front of house now. Nothing else has changed.

The personality brief I wrote for myself before opening a single file:

> *Refined Nostalgia. Deep emerald walls. Brass kettles. Hand-pulled Sulemani chai. The kind of place your grandmother would have loved if she had better taste in interiors.*

The three things the site needed to do, in order: **appetite → warmth → trust**. Every layout decision runs through that filter.

---

## Pages

| Route | What it does |
|---|---|
| `/` | Hero, about snippet, 4 featured items, opening hours, find us |
| `/menu` | Full categorised menu — Chai, Samosas, Mithais, Kitchen Specials |
| `/about` | Brand story, 3 values, founder + team section |
| `/contact` | Map, contact info, hours table, catering enquiry form |
| `/404` | Custom 404 — because even error pages should feel on-brand |

---

## Stack

- **React 18** + **Vite**
- **Tailwind CSS v3** — utility-first with arbitrary values for brand-specific colours
- **No UI libraries.** Every component — cards, forms, maps, illustrations — is hand-written.
- **No image dependencies.** All illustrations are SVG drawn inline. No broken `<img>` tags, no placeholder services.

---

## Design decisions

### Palette — three colours, one rule

```
Deep Emerald   #0C1A10  — background, the room itself
Warm Saffron   #E67E22  — every accent, hover, price, signature
Creamy Parchment #F5ECD7 — all text, at varying opacities
```

The rule: saffron is used *exactly as much as cardamom in chai* — present, never overpowering. The whole palette came from one mental image: afternoon light through a brass kettle.

### Typography — serif + sans, no web fonts needed

- Headings: `Georgia, Times New Roman, serif` — classic, available everywhere, no FOUT, has the character of a printed menu
- Body: `system-ui, sans-serif` — clean, light-weighted at `font-light`, handles long descriptions without fatigue

The combination reads like a restaurant that knows what it is: traditional where it matters, clean where clarity matters.

### No images — by design

Every "photo" placeholder is a hand-drawn SVG illustration — the samosa, the chai glass, the brass kettle, the founder photo backgrounds. This was a deliberate constraint. Food photography either elevates a site or destroys it. With no real photography available, SVG line illustrations in the brand's saffron palette are more cohesive than stock images.

### The signature

Sultana Begum's signature appears in the About section, the footer, and the About page. It's a custom SVG — each letter is a separate `<path>` that animates in sequentially like a real pen stroke, timed with `stroke-dashoffset` transitions. Small thing. The one people remember.

### Motion — exactly enough

- Page-load staggered reveals via `IntersectionObserver` + CSS transitions
- The hero Urdu word cycles (`چائے → سموسہ → ورثہ → محبت`) with a fade-float on interval
- Menu item rows slide in on scroll with staggered delay
- The kettle on the 404 page bobs on a sine loop
- Nothing auto-plays audio. Nothing bounces. Nothing spins.

### The map

The map on the Contact and Location pages is a fully hand-built SVG — Meenakshi Koil Street as a diagonal saffron road, Russell Market as a green landmark block, a pulsing animated pin, compass rose, scale bar. No Google Maps API key needed. No iframe. No CORS issue. It loads instantly.

---

## Component structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── assets/
├── components/          ← shared/global components
└── pages/
    ├── home/
    │   ├── main.jsx         ← home page entry
    │   ├── components/      ← home-specific components
    │   └── about/           ← about section (nested under home?)
    ├── menu/
    ├── contact/
    └── 404/

---

```


## Assumptions

- No routing library — pages are individual components. Drop them into React Router if needed; each is self-contained.
- No real form submission. The catering enquiry form validates fields and shows a success state. Wire up Formspree, Resend, or similar to make it live.
- Prices are in ₹ (INR). Menu items are fictional but culturally accurate to Hyderabadi-Bengaluru tea room cuisine.
- The "Open Now" indicator reads `new Date()` — it works correctly in the browser, not during SSR.

---

## Known limitations

- The scrolling ticker on the 404 page uses a `setInterval` approach — fine for this, but would need a CSS-only `@keyframes` animation to be truly performant at scale.
- Tailwind arbitrary values (`text-[rgba(...)]`, `border-[rgba(...)]`) are used extensively. This is deliberate for design precision but means a full Tailwind purge pass is recommended before production.
- No dark/light mode toggle — the site *is* dark mode. The brand demanded it.

---

## On the brief

> *"A great restaurant website makes you hungry before you've seen the menu. That's the bar."*

The test for every decision in this project was: **does it make you want to sit down?** The copy is written in first person because it's Sultana's voice. The illustrations are warm because the room is warm. The 404 page tells you the samosas are ready because that's what this place would actually say.

The code is the brand. The brand is the code.

---

*Built for the Frontend Developer assignment — 3 days, 5 pages, one family kitchen.*
