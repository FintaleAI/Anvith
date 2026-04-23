# AnvithBizCap — Website Build

A production-intent static website for **AnvithBizCap**, an AMFI-registered Mutual Fund Distributor dealing in Mutual Funds, Corporate Bonds, NBFC / Bank Fixed Deposits, Sovereign Gold Bonds, and Specialized Investment Funds (SIFs) — plus a dedicated Corporate Treasury desk.

Built from the two research reports in the parent directory:
- `Financial Distributor Website Development Report.docx`
- `Website Strategy Report for AnvithBizCap.docx`

---

## How to run

No build step. Every file is plain HTML, CSS and JS.

```bash
# From the site/ directory:
python -m http.server 8080
# → open http://localhost:8080
```

Or open `index.html` directly in a browser (fonts require internet — falls back to system serif/sans otherwise).

---

## Deliverable at a glance

| | |
|---|---|
| Pages | 12 distinct HTML files |
| CSS | One design-system file (`main.css`, ~1,500 lines) |
| JavaScript | Two files (`main.js` + `calculators.js`) |
| Total lines | ~6,900 |
| External deps | Google Fonts only (Fraunces + Inter + JetBrains Mono) |
| Framework | None — deliberately framework-free for direct review |
| Build | Not required |
| Responsive | Yes, mobile-first, breakpoints at 560 / 720 / 900 / 980 |
| Accessibility | Skip links, reduced-motion support, focus-visible rings, semantic HTML, ARIA labels on nav |

---

## Site map

```
/                                       index.html           Home
/mutual-funds                            mutual-funds.html
/bonds                                   bonds.html
/fixed-deposits                          fixed-deposits.html
/sovereign-gold-bonds                    sovereign-gold-bonds.html
/specialized-investment-funds            specialized-investment-funds.html   (dark variant, premium treatment)
/corporate-treasury                      corporate-treasury.html
/tools                                   tools.html                           (5 working calculators)
/insights                                insights.html                        (reading room)
/about                                   about.html
/contact                                 contact.html                         (callback form + grievance)
/compliance                              compliance.html                      (12 regulatory sections)
```

---

## Design direction

Research reports specifically called out the need to avoid "AI template" patterns — generic purple-gradient hero + card-card-card grids. The build takes the opposite route deliberately.

### Visual language

- **Palette.** Deep ink navy (`#0B1220`), warm bone cream (`#F7F3EA`), aged brass gold (`#B48A37`, HNI accent), deep jade (`#1F4A3C`, growth/trust). Stark whites are reserved for paper surfaces; the body uses cream. This is editorial-financial — *The Economist* or Bridgewater territory — not Robinhood fintech-bro.
- **Typography.** `Fraunces` (variable serif) for all display and editorial headings, `Inter` (variable sans) for body, `JetBrains Mono` for tabular numbers, labels, and the ticker. Tabular numbers enabled via `font-feature-settings: "tnum"` — critical for financial data.
- **Layout.** Asymmetric editorial grids, deep vertical rhythm, intentional whitespace. 12-column container at 1240px, narrower 960 / 760 containers for editorial-width content.
- **Motion.** Restrained and purposeful — never frivolous. Scroll-reveal on opacity + translate-y (280–900ms, custom `--ease-editorial` curve), number count-up on Intersection Observer, hero donut ring that draws in on load via `stroke-dashoffset`, hero parallax on mousemove (±6px), infinite horizontal marquee for the NAV ticker. **Every animation respects `prefers-reduced-motion`.**

### Layouts that separate this build from a template

- **Ticker strip.** A real NAV-style ticker across every page showing NIFTY, SENSEX, 10Y G-Sec, gold, representative FD rates, and product-specific live status (e.g., "PAN-LEVEL MIN ₹10,00,000" on the SIF page).
- **Hero donut visualization.** Five animated stroke-dasharray rings representing the five product rails, with staggered legend labels fading in over ~900ms.
- **Risk badges.** A reusable 5-segment riskmeter component (Low / Mod / High / Very High) used consistently across product pages.
- **SIF page — dark variant.** The SIF page is the only page rendered on a dark ink background with gold accents, visually separating the HNI tier from the retail shelf. It also carries a threshold-gate block with the `₹10,00,000` statutory minimum rendered in 120px display serif.
- **Step-numbered "method" strips.** Steps 01–04 are shown as a bordered horizontal table, not a 4-card grid.
- **Fact-row dl/dt/dd** pattern for all metric lists — semantic HTML, not divs.

### Motion principles

```
--dur-fast:       160ms   hover transitions
--dur-base:       280ms   scroll reveal, card lift
--dur-slow:       480ms   chart bars, section intros
--dur-cine:       900ms   hero donut, staggered legends
--ease-swift:     cubic-bezier(0.2, 0.8, 0.2, 1)
--ease-editorial: cubic-bezier(0.65, 0, 0.25, 1)
```

---

## Compliance architecture

Every requirement surfaced in the research reports is implemented in the build:

| Requirement | Where it lives |
|---|---|
| "AMFI-registered Mutual Fund Distributor" tagline, min 12pt font | Footer of **every** page (`.footer-disclosures .amfi-line`) |
| ARN displayed prominently | ARN-187432 shown on every page + hero on `index.html` |
| Commission disclosure (full schedule) | `compliance.html#commission` + linked from `mutual-funds.html#costs` |
| No scheme-specific recommendations on public pages | Enforced throughout; reading room is explainer-only |
| DICGC ₹5L cover vs NBFC non-insurance distinction | Dedicated hero section on `fixed-deposits.html` with red-flag banner |
| NBFC mandatory RBI statement | Verbatim on `fixed-deposits.html` and `compliance.html#risk` |
| Corporate bond OBPP routing disclosure | Banner + settlement-flow diagram on `bonds.html` |
| SGB tax-exemption conditional logic | Four-gate visual explainer on `sovereign-gold-bonds.html` |
| SIF ₹10L PAN-level threshold | Threshold-gate hero block on `specialized-investment-funds.html` |
| NISM Series-XIII certification disclosure | Footer + dedicated `compliance.html#sif` section |
| DPDP Act 2023 granular consent | `compliance.html#dpdp` + consent checkboxes on every form |
| SEBI CSCRF 2025 alignment | `compliance.html#cyber` |
| Grievance → SEBI SCORES → ODR escalation | `contact.html#grievance` + `compliance.html#grievance` with contact emails and SLA stats |
| "We never hold client money" | Homepage step 3 + `compliance.html#funds` fund-flow table |
| Risk disclaimer every product | Risk-meter badge per product, category-specific disclaimer in footer |

---

## Interactive elements

| Component | Behaviour |
|---|---|
| **Sticky nav** | Transparent on top, adds border + increases opacity when scrolled >12px |
| **Mega-menu** | Hover + click, staggered reveal, closes on outside click / ESC |
| **Mobile drawer** | Full-screen overlay, slide-down animation, dismissible via button / ESC |
| **Ticker rail** | Duplicated in JS for seamless infinite CSS animation, pauses on hover |
| **Number count-up** | Intersection Observer, cubic ease-out, respects `data-prefix` / `data-suffix` / `data-decimals` / `data-duration` |
| **Hero donut** | SVG stroke-dasharray initial state hidden, animated to final offset on load |
| **Scroll reveal** | `.reveal` class + `.reveal-delay-N`; all sections fade-up as they enter viewport |
| **Calculators** | 5 tools (SIP, Lumpsum, FD, Goal, SGB) with real-time range slider inputs, live output, stacked bar for invested-vs-gain ratio |
| **Callback form** | Demo handler: simulates server submission, shows reference ID on success, 5-second reset |
| **FAQ accordions** | Native `<details>` with custom plus/minus indicator |

---

## Accessibility

- Skip-to-content link on every page (`.skip`)
- Semantic HTML (`nav`, `main`, `section`, `article`, `aside`, `header`, `footer`, `address`)
- ARIA labels on nav, ticker, breadcrumb
- Focus-visible rings on all interactive elements (2px gold outline, 3px offset)
- `prefers-reduced-motion` respected — reveals, ticker, count-up, hero donut all fall back to static
- Colour contrast — verified against WCAG AA for all text / background combinations
- Native `<details>` for FAQ (keyboard accessible)
- Proper `<form>` semantics with labels, required attributes, consent checkboxes
- Mobile-first responsive — touch targets sized 40px minimum

---

## Content approach

Research report insight driving the copy voice:

> *"A distributor-led website can win in a different lane: guided discovery, assisted execution, transparent disclosures, multi-product curation, and strong post-sale servicing."*

Copy is deliberately:
- **Editorial, not marketing.** No exclamation marks, no "grow your wealth!" clichés, no bulleted feature lists where prose would do.
- **Self-aware about commission.** The Regular-vs-Direct comparison on `tools.html` explicitly shows how much the TER differential costs the investor over 20 years.
- **Honest about risk.** Every product page has a dedicated "the honest risk conversation" or equivalent section.
- **Declining to recommend on public pages.** The homepage testimonial leads with *"They declined to recommend the fund our RM at the bank had sold us"* — which is also what AMFI's distributor code mandates.

---

## Technical notes for review

### File organisation
```
site/
├── index.html
├── mutual-funds.html
├── bonds.html
├── fixed-deposits.html
├── sovereign-gold-bonds.html
├── specialized-investment-funds.html
├── corporate-treasury.html
├── tools.html
├── insights.html
├── about.html
├── contact.html
├── compliance.html
├── README.md   (this file)
└── assets/
    ├── css/main.css
    ├── js/main.js
    ├── js/calculators.js
    └── img/favicon.svg
```

### CSS organisation

`main.css` is a single file because the site has no build step. It is organised into **30 numbered sections** (see the comment headers), from tokens → reset → typography → layout → components → page-specific patterns. Design tokens live on `:root` as CSS custom properties.

### JS organisation

- `main.js` — nav state, mega-menu, mobile drawer, scroll reveal (Intersection Observer), number count-up, hero donut draw-in, ticker duplication, smooth anchor scroll, form demo handler, parallax, tabs. Wrapped in an IIFE, no global pollution. Respects `prefers-reduced-motion`.
- `calculators.js` — 5 calculators (SIP, Lumpsum, FD, Goal, SGB). Formulae match industry convention (quarterly compounding for FDs, monthly for SIPs, back-solve for goal). Formats INR with L / Cr suffixes.

### Known simplifications (deliberate for a static deliverable)

- **No back-end.** Callback form is demo-handled client-side and does not persist. Production would POST to a CRM endpoint with server-side validation.
- **No auth.** The "Client login" link is a placeholder — production would handoff to an authenticated portal.
- **Placeholder credentials.** ARN-187432, EUIN E-338207, CIN, GSTIN are all illustrative. Replace before going live.
- **Tranche / rate data is static.** Ticker values, FD rate cards, SGB series data are hand-entered at build time. Production would feed from a CMS or market-data API.
- **No analytics.** GA4 / consent banner not wired — to be added when live per DPDP consent flow.
- **Images.** All illustration is inline SVG (no bitmap assets). Team photos are letter avatars; swap for real portraits.

---

## Roadmap (from research report, matched to Phase 1 MVP)

This build is **Phase 1 (content + lead-gen + trust)** per the research recommendation. Phase 2 additions would include:

- Live CAS upload and automated portfolio parse
- Actual BSE StAR MF execution integration (SOAP 1.2 XML)
- Real-time NAV feed in ticker
- Consent ledger write-through
- WhatsApp Business API for SIP bounce / maturity alerts
- Bi-monthly SIF portfolio disclosures pulled from AMC APIs

The current build is scaffolded such that these integrations can slot in without design rework.

---

## Credits

Design direction, UX, HTML / CSS / JS authorship — built from the research reports in the parent directory, dated April 23, 2026. Fonts via Google Fonts. Icons are hand-written inline SVG. No third-party JS libraries.
