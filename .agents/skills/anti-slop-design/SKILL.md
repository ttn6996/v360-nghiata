---
name: anti-slop-design
description: Principal design technologist guardrails eliminating 12 generic AI design tropes, enforcing 1-to-3 UX hierarchy, 8-pt spatial cadence, 8-state interactive feedback, and Emil Kowalski animation rules.
---

# Anti-Slop Design: Production UI/UX Engineering Skill

> **Mandate:** Eliminate generic AI design tropes ("AI slop", boilerplate styling, cookie-cutter templates) and engineer distinctive, tactile, accessible, and commercially viable software.

---

## 1. Trigger Protocol & Agent Persona

### When to Activate This Skill
Invoke this skill automatically when:
- Designing, scaffolding, or refactoring user interfaces (Web, Landing Pages, Mobile).
- Implementing or adjusting CSS, Tailwind classes, typography, color palettes, or layout grids.
- Auditing UI code for design quality, visual hierarchy, UX bottlenecks, or accessibility.
- Eliminating AI clichés: generic purple gradient blobs, raw emoji buttons, unstyled card grids.

### Autonomous Agent Mindset
1. **Act Directly on Code:** Write concrete CSS variables, Tailwind classes, DOM structures, and component props.
2. **Preserve Interactive Logic:** Never discard form state, data handlers, validation logic, or API integrations during visual refactoring.
3. **Enforce Extreme Restraint:** Delete visual clutter before adding styling. If an element does not deliver immediate user utility, remove it.

---

## 2. The Anti-Slop Banned Matrix (Strictly Prohibited AI Tropes)

| AI Slop Anti-Pattern | Manifestation in Vibe-Coded UI | Mandatory Production Replacement |
| :--- | :--- | :--- |
| **The "AI Dark Mode" Blob** | `radial-gradient` from indigo-600 or purple-900 blurred in corners of dark backgrounds. | Deep, deliberate monochrome surfaces (`#09090b`, `#121214`) or warm tactile neutrals with subtle 1px hairline borders (`rgba(255,255,255,0.08)` or `#e5e5e5`). |
| **Monotonous Slate/Indigo** | Generic `bg-slate-900 text-slate-400 bg-indigo-600` cookie-cutter templates. | Curated semantic tokens (OKLCH/HSL/HEX) with distinct brand personality (e.g., Deep Forest, Lacquer Black, Terra Cotta, Burnished Bronze). |
| **Cookie-Cutter 3-Card Grid** | Three identical rectangular cards with glowing borders on hover. | Dynamic, content-driven layouts: asymmetric bento grids, dense split-panels, or narrative sequential flow. |
| **Raw Emojis as Icons** | Plastering raw emojis (`🚀`, `🔥`, `💡`, `📊`) inside buttons, cards, and navigation. | Crisp, single-weight vector SVG icons (Lucide, Heroicons, Phosphor) with unified 1.5px/2px stroke widths. |
| **Fabricated Vanity Stats** | Meaningless filler cards: `"+99.9% Uptime"`, `"10x Faster"`, `"50k+ Users"` with no verified source. | Real domain facts or remove the metric entirely. Zero vanity metrics. |
| **Screaming Eyebrow Labels** | Tracked-out uppercase labels above every heading: `OVERVIEW`, `FEATURES`, `HERITAGE`. | Sentence-case hierarchy, subtle metadata tags, or omit entirely if the heading is self-explanatory. |
| **Single-Word Italic/Color Accents** | Headlines with one arbitrary word italicized or highlighted in glowing gradient text. | Uniform, confident typographic weight. Let the whole statement carry authority. |
| **Redundant Metric Duplication** | Repeating same numbers in header, sidebar, and inside multiple individual cards. | **Single Source of Metric Truth.** One primary KPI summary per viewport; drill-downs below. |
| **Card-Level Filter Pollution** | Duplicating date pickers or dropdowns inside every card rather than at the page level. | Unified **Page-Level Control Bar** that synchronizes all underlying views. |
| **Vanity Visual Space-Wasters** | Giant widgets that occupy 60% of the screen with zero actionable data. | Compact, meaningful data representations or informative narrative sections. |
| **Missing Interactive States** | Buttons with only hover effects, lacking `:focus-visible`, `:active`, loading, and disabled states. | **8-State Interactive Feedback System** on all interactive primitives. |
| **Broken Placeholders & Links** | `via.placeholder.com`, broken Unsplash URLs, or blurry stock photos. | High-fidelity inline SVGs, semantic CSS abstract shapes, or verified local assets. |

---

## 3. Core UX Axioms

### Axiom 1: The "1-to-3" Rule (Triangle of Focus)
Every meaningful screen zone or component container must follow the 1-to-3 scaling law:
- **1 Primary Element / Action** (The unambiguous focal anchor).
- **Max 3 Secondary Logics** (Supporting metadata, controls, or links).

### Axiom 2: The 85% Statistical Prioritization Law
Design interfaces for real usage frequency, not theoretical edge cases:
- Primary scenario used by 85% of users must be prominent, instantaneous, and zero-click accessible.
- Secondary actions have reduced visual weight.

### Axiom 3: The Strict Ban on Duplication
- Exactly **one** brand mark in the viewport.
- Exactly **one** primary CTA per card or section.
- Exactly **one** global filter bar controlling the active view.

### Axiom 4: Mobile Linearity on Desktop
Avoid placing two complex, competing horizontal logic blocks side-by-side. Follow sequential, top-to-bottom reading rhythm.

---

## 4. Spacing Geometry & 8-pt Spatial Rhythm

- **The 8-pt Spatial Cadence:** Pad containers using exact steps: `4px` (hairline), `8px` (compact), `12px` (standard control pad), `16px` (card pad), `24px` (section gutter), `32px` / `48px` / `64px` (macro section whitespace).
- **Zero Inconsistent Radii:** An inner element's radius must equal the outer container's radius minus the padding between them:
  $$\text{radius}_{\text{inner}} = \max(0, \text{radius}_{\text{outer}} - \text{padding})$$
- **Optical Button Alignment:** Buttons with icons must have `gap-1.5` to `gap-2`, with the icon optically sized to match the font x-height.

---

## 5. Micro-Interactions & The Emil Kowalski Animation Decision Matrix

### 1. Frequency Check
- **Actions triggered 100+ times/day** (keyboard shortcuts, quick toggles, tab switching): **0ms duration (INSTANT). NEVER animate.**
- **Standard interactions** (tooltips, dropdowns, popovers): **120ms – 180ms**.
- **Modals and full-screen drawers**: **200ms – 250ms**.

### 2. Easing Rules
- **Never use `ease-in` for UI.** It starts slow and feels sluggish.
- Use punchy, high-tension **`ease-out`**: `cubic-bezier(0.23, 1, 0.32, 1)`.
- Popovers and dropdowns MUST scale from their trigger point (`transform-origin: top left/right`).

### 3. Tactile Feedback
- On `:active`, scale down by 2–3%: `transform: scale(0.97); transition: transform 60ms ease-out;`.

### 4. 8-State Interactive Feedback Standard
Every interactive primitive MUST support:
1. Default
2. Hover (`filter: brightness(1.08)`)
3. Focus-Visible (`ring-2 ring-offset-2 ring-brand outline-none`)
4. Active / Press (`scale(0.97)`)
5. Disabled (`opacity-50 pointer-events-none`)
6. Loading / Spinner
7. Error
8. Success

---

## 6. The 7-Axis Pre-Emit Quality Gate Checklist

Every axis must achieve $\ge 4$ before completion:
1. **Anti-Slop Purity:** Zero purple blobs, zero raw emojis, zero vanity stats, zero single-word italics.
2. **UX Speed & 1-to-3 Rule:** 1 primary action per section, max 3 secondary actions.
3. **Typographic Discipline:** Max 2 font families, tabular numbers on all telemetry, body line length $\le 75\text{ch}$.
4. **Spacing & Geometric Math:** Strict 4px/8pt grid adherence, nested corner radius formula respected.
5. **Micro-Interactions & Motion:** Transitions snappy (< 200ms), tactile `:active` state, no `ease-in`.
6. **Accessibility & Keyboard Flow:** Visible focus rings (`:focus-visible`), `aria-label` on icon-only buttons, semantic HTML.
7. **Mobile Linearity:** Clean vertical stacking, zero horizontal overflow, minimum 44x44px touch targets.
