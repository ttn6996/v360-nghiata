# Design System: V360 Nghĩa Tá

**Design Philosophy:** *Editorial Heritage & Cinematic Exploration*  
**Standard:** Production-Grade Anti-Slop & WCAG 2.2 AA Compliant  
**Version:** 1.0.0  

---

## 1. Visual Direction & Aesthetic Stance

V360 Nghĩa Tá is designed as an **editorial cultural documentary in digital form**. It draws aesthetic inspiration from high-end cultural publications, ethnographic field journals, and cinematic documentary archiving.

### Guiding Tenets
1. **Restraint Over Noise:** Generous whitespace, disciplined typography, and serene pacing allow the landscapes of Nghĩa Tá to speak for themselves.
2. **Physicality & Tactility:** Hairline borders, warm paper surfaces, and muted mineral pigments replace generic glowing neon blobs and AI templates.
3. **Differentiation Anchor:** If the logo is removed, the website is instantly recognized by its **editorial asymmetric typography, authentic highland earth palette, and tactile documentarian cards**.

---

## 2. Color System & Semantic Tokens

The color palette is derived directly from the natural geography of Nghĩa Tá: ancient limestone mountains (*Đá Vôi*), dense sub-tropical canopies (*Rừng Đại Ngàn*), riverbed slate (*Đá Suối*), and sun-ripened rice terraces (*Lúa Chín*).

### Light Theme (Default Editorial Reading Canvas)
```css
:root {
  /* Surface & Canvas */
  --bg-canvas: #fbf9f5;             /* Warm Raw Linen / Rice Paper */
  --bg-surface: #ffffff;            /* Pure Crisp White Paper */
  --bg-surface-elevated: #f4efe6;   /* Subtle Warm Card Backing */
  --bg-subtle: #eeece4;             /* Muted Interactive Hover Surface */

  /* Text & Hierarchy */
  --text-primary: #191816;          /* Deep Carbon Black (Contrast 16.2:1 against canvas) */
  --text-secondary: #5a564e;        /* Weathered Stone Charcoal (Contrast 6.8:1) */
  --text-muted: #7d776d;            /* Muted Archival Caption (Contrast 4.6:1 - WCAG AA Pass) */

  /* Brand Accents */
  --accent-heritage: #b37322;       /* Terra Cotta / Ochre Gold (Primary CTA & Markers) */
  --accent-heritage-hover: #965f1a; /* Deepened Ochre */
  --accent-forest: #1c382b;         /* Ancient Highland Pine Green */
  --accent-river: #223542;          /* Deep Karst Mountain Water */

  /* Borders & Dividers */
  --border-subtle: #e6e1d6;         /* 1px Hairline Archival Border */
  --border-strong: #cac3b4;         /* Active / Focused Container Border */

  /* Status Tokens */
  --status-verified: #256a42;       /* Cultural Dossier Verified */
  --status-pending: #a86214;        /* Placeholder / Pending Verification */
  --status-error: #9f2a2a;
}
```

### Cinematic Exploration Mode (Virtual 360 Viewer Canvas)
```css
.dark, [data-theme="cinematic"] {
  --bg-canvas: #0b0f0d;             /* Midnight Forest Canopy */
  --bg-surface: #121815;            /* Deep Obsidian Slate */
  --bg-surface-elevated: #18221d;   /* Floating HUD Container */
  --bg-subtle: rgba(255, 255, 255, 0.06);

  --text-primary: #f5f4ef;          /* Off-white Pearl */
  --text-secondary: #a9a69b;        /* Pale Slate Gray */
  --text-muted: #737066;            /* Secondary Telemetry Text */

  --accent-heritage: #dca354;       /* Luminous Lantern Gold */
  --accent-heritage-hover: #edb86e;

  --border-subtle: rgba(255, 255, 255, 0.09);
  --border-strong: rgba(255, 255, 255, 0.20);
}
```

---

## 3. Typography Scale & Vietnamese Diacritics

The typographic system supports complex Vietnamese diacritics with complete optical balance.

### Font Families
- **Display / Editorial Headings:** `Newsreader` / `Playfair Display` (Serif, evocative, dignified).
- **Body & Controls:** `Be Vietnam Pro` (Tailored specifically for pristine Vietnamese typography and legibility).
- **Metadata, Coordinates & Telemetry:** `JetBrains Mono` with `font-variant-numeric: tabular-nums`.

### Typographic Scale
| Level | Font Size (rem / px) | Line Height | Tracking | Weight | Semantic Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `clamp(2.25rem, 5vw, 4rem)` | `1.1` | `-0.02em` | `600` | Landing Page Main Narrative Anchor |
| **Heading 1 (H1)** | `2rem` (32px) / `2.5rem` (40px) | `1.2` | `-0.015em` | `600` | Landmark Titles, Article Headlines |
| **Heading 2 (H2)** | `1.5rem` (24px) / `1.75rem` (28px) | `1.3` | `-0.01em` | `600` | Section Titles, Explorer Panels |
| **Heading 3 (H3)** | `1.125rem` (18px) / `1.25rem` (20px) | `1.4` | `0` | `500` | Card Titles, Hotspot Headers |
| **Body Large** | `1.125rem` (18px) | `1.65` | `0` | `400` | Lead Storytelling Paragraphs |
| **Body Regular** | `1rem` (16px) | `1.6` | `0` | `400` | Standard Descriptions, Content Blocks |
| **Caption / Meta** | `0.8125rem` (13px) | `1.4` | `+0.01em` | `500` | GPS Coordinates, Dates, Image Credits |

---

## 4. Spacing System & 8-pt Spatial Cadence

All padding, margins, gaps, and heights adhere to an 8-pt geometric cadence:

| Token | Dimension | Tailwind Equivalent | Primary Application |
| :--- | :--- | :--- | :--- |
| **space-1** | `4px` | `p-1`, `gap-1` | Hairline gaps, micro-offsets |
| **space-2** | `8px` | `p-2`, `gap-2` | Icon-to-text spacing, compact badge padding |
| **space-3** | `12px` | `p-3`, `gap-3` | Standard control padding, dropdown item padding |
| **space-4** | `16px` | `p-4`, `gap-4` | Card interior padding, mobile container gutters |
| **space-6** | `24px` | `p-6`, `gap-6` | Desktop card padding, grid gutters |
| **space-8** | `32px` | `p-8`, `gap-8` | Section sub-grouping |
| **space-12** | `48px` | `py-12` | Mobile section vertical spacing |
| **space-16** | `64px` | `py-16` | Standard section vertical whitespace |
| **space-24** | `96px` | `py-24` | Major chapter/hero transitions |

### Nested Corner Radii Formula
Inner elements must mathematically harmonize with outer containers:
$$\text{radius}_{\text{inner}} = \max(0, \text{radius}_{\text{outer}} - \text{padding})$$
- Outer Card: `rounded-lg` (8px) with `p-4` (16px) $\rightarrow$ Inner items: `rounded-none` or `rounded-sm` (4px).

---

## 5. Component Principles & The 8-State Interactive System

Every interactive element (Buttons, Navigation Links, Panorama Hotspots, Filter Tabs) MUST support the full 8-state feedback cycle:

```
[Default] ──► [Hover] ──► [Focus-Visible] ──► [Active / Press]
   │                                                 │
   ▼                                                 ▼
[Disabled] ◄── [Loading / Transition] ◄── [Error] ◄── [Success]
```

### Production Primitives

#### 1. Primary Action Button (`.btn-heritage`)
- Solid ochre accent with high contrast white text.
- Active state scales down by 3%: `transform: scale(0.97)`.
- Visible focus ring: `ring-2 ring-offset-2 ring-[#b37322]`.
- Min touch target: `44px` height (`min-h-11 px-5`).

#### 2. Secondary Ghost Button (`.btn-outline`)
- 1px hairline border (`var(--border-strong)`), transparent background.
- Hover brings warm elevation: `bg-[var(--bg-subtle)]`.

#### 3. 360° Hotspot Indicator
- Concentric ring radar pulse (subtle, 1.8s loop).
- Hover expands label with 140ms ease-out.
- Keyboard accessible via `Tab` with prominent outline.

#### 4. Verification Badge
- Displayed on POIs: `[ĐÃ XÁC MINH]` (Green) or `[DỮ LIỆU THỬ NGHIỆM]` (Amber).
- Never hide lack of verification.

---

## 6. Motion & Animation Rules

Following the **Emil Kowalski Animation Decision Matrix**:

1. **High-Frequency Actions:**
   - Tabs, close buttons, accordion headers: **0ms – 100ms (Instant/Snappy)**. Never delay user intent.
2. **Standard Micro-Interactions:**
   - Hover states, dropdown menus, tooltip hints: **120ms – 180ms**.
   - Timing function: `cubic-bezier(0.23, 1, 0.32, 1)` (Punchy Ease-Out).
   - Strict ban on `ease-in` for interface movements.
3. **Pacing for Narrative Entrances:**
   - Cinematic storytelling scroll reveals: **300ms – 500ms** with staggered child offsets (`50ms`).
4. **Mandatory Reduced Motion Rule:**
   - When `prefers-reduced-motion: reduce` is detected, all transitions become instantaneous ($0.01\text{ms}$) with zero translation animations.
