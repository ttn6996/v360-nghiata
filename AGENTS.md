# V360 Nghĩa Tá — Frontend Agent Rules & Architecture Guidelines

> **Project Mandate:** V360 Nghĩa Tá is a digital heritage and tourism exploration web platform for Nghĩa Tá (Định Hóa, Thái Nguyên).
> The aesthetic direction combines **cinematic heritage storytelling** with an **interactive exploration experience**.
> All interface code must feel authored with intentional editorial craft by an expert human designer, strictly avoiding generic AI templates, boilerplate slop, or deceptive content.

---

## 1. Technical Stack & Architecture

- **Framework:** Next.js (App Router) with TypeScript (strict mode).
- **Styling:** Vanilla Tailwind CSS configured with a semantic design token system.
- **Component Architecture:**
  - **Server Components by default:** Fetch data, render initial semantic HTML shells, and execute layout logic on the server.
  - **Client Components (`'use client'`) only when strictly necessary:** Restrict client boundaries to interactive leaves (e.g. 360 viewer controller, audio player, interactive filters, mobile drawer toggle).
  - Never convert an entire route or page into a client component.
- **Component Sizing & Cohesion:**
  - Keep components small, cohesive, single-responsibility, and reusable.
  - Strictly avoid monolithic page files (> 200 lines) and over-engineered, premature abstractions.
- **Dependency Discipline:**
  - Zero arbitrary dependencies. Do not install libraries (e.g. animation libs, panorama viewers, icon packs, map libraries) without prior evaluation and justification.
  - Heavy client features (such as 360° panorama viewers or map renderers) must be lazy-loaded using `next/dynamic` with `ssr: false`.

---

## 2. Visual Direction & Design Philosophy

- **Aesthetic Direction:** **Restrained, Editorial, Cinematic Heritage-Tourism**.
  - Evoke the deep cultural atmosphere of Nghĩa Tá: lush karst highlands, historic ATK revolutionary roots, Tay/Nung ethnic traditions, and tranquil forest rivers.
  - Think high-end editorial cultural documentary (e.g., National Geographic, Monocle, Kinfolk) rather than a commercial tech SaaS.
- **Banned AI Slop Anti-Patterns (Strictly Enforced):**
  - ❌ **No raw emojis as UI icons** (e.g. 🚀, 🔥, 🏯). Use crisp, single-stroke SVG icons (Lucide / Phosphor style, 1.5px stroke).
  - ❌ **No AI neon/purple gradient blobs** or generic dark mode glowing shadows.
  - ❌ **No excessive glassmorphism** or gimmicky 3D isometric card tilts.
  - ❌ **No generic 3-card boilerplate grids** with glowing borders.
  - ❌ **No fake vanity statistics** (e.g. "99.9% Authentic", "10x Faster Exploration"). Only display verified domain telemetry.
  - ❌ **No single-word italicized or rainbow-gradient headlines**.
- **Visual Palette & Typography:**
  - Follow the **5-Token Semantic Color System** defined in [`docs/DESIGN_SYSTEM.md`](file:///docs/DESIGN_SYSTEM.md).
  - Ground the palette in authentic earth tones: Deep Forest Green, Slate River Stone, Warm Earth Tan, Lacquer Dark, and Antique Gold / Ochre accent.
  - Use max two font families: an expressive serif/display font for cinematic titles and a clean, legible sans-serif for body reading.

---

## 3. Heritage Truthfulness & Content Integrity

- **Zero Fabrication:**
  - Do not invent historical facts, battle chronologies, landmark names, coordinates, or ethnic traditions.
  - Clearly distinguish between **verified local facts** and **project assumptions or placeholders**.
- **Transparency on 360° Assets:**
  - Never claim a real interactive 360° tour is complete when only placeholder equirectangular panoramas or mock coordinates are in use.
  - Mark placeholder assets clearly in code and development UI with an explicit badge: `[DEMO / PLACEHOLDER ASSET]`.
- **Authentic & Licensed Media:**
  - Use authentic, properly licensed imagery or high-craft SVG compositions. Avoid broken stock photo links (`via.placeholder.com` or broken Unsplash URLs).

---

## 4. Accessibility & Responsive Engineering

- **Mobile-First Implementation:**
  - All styling must be written mobile-first (`base:`, `sm:`, `md:`, `lg:`, `xl:`).
  - Ensure single-column linear reading order on mobile before expanding into multi-column layouts on desktop.
  - Guard against horizontal page overflow (`overflow-x: clip`).
- **Touch Ergonomics & Accessibility (WCAG 2.2 AA):**
  - All interactive elements must maintain a minimum touch target of **44x44px** (`min-h-11 min-w-11`).
  - Interactive elements must possess clear, high-contrast keyboard focus indicators (`focus-visible:ring-2 focus-visible:ring-offset-2`).
  - Color contrast ratios must meet $\ge 4.5:1$ for body text and $\ge 3:1$ for large text and UI controls.
- **Motion Restraint & `prefers-reduced-motion`:**
  - High-frequency interactions (close, tabs, toggles) must feel instantaneous (0–150ms).
  - Micro-animations must use punchy `ease-out` curves, never sluggish `ease-in`.
  - Always respect `prefers-reduced-motion: reduce`: disable or collapse all decorative motion into instant transitions.

---

## 5. Performance, Verification & Quality Gates

- **Eliminating Waterfalls:** Start data promises in parallel using `Promise.all()` where independent.
- **Image Optimization:** Always use Next.js `<Image />` with explicit dimensions (`width`, `height`), modern formats (AVIF/WebP), and accurate `sizes` attributes to eliminate Cumulative Layout Shift (CLS).
- **Core Web Vitals Thresholds:**
  - **LCP (Largest Contentful Paint):** $< 2.5\text{s}$
  - **INP (Interaction to Next Paint):** $\le 200\text{ms}$
  - **CLS (Cumulative Layout Shift):** $< 0.1$
- **Mandatory Pre-Commit Checks:**
  - TypeScript compilation: zero type errors (`tsc --noEmit`).
  - ESLint verification: zero linter warnings or errors.
  - Production build verification (`npm run build`).

---

## 6. Installed Skills Reference

The agent must consult and adhere to the specialized skills installed in [`.agents/skills/`](file:///.agents/skills/):

1. [**`frontend-design`**](file:///.agents/skills/frontend-design/SKILL.md): Directs intentional aesthetic direction, editorial tone, differentiation anchors, and typography craft.
2. [**`anti-slop-design`**](file:///.agents/skills/anti-slop-design/SKILL.md): Enforces the 12 Banned AI Tropes, 1-to-3 UX rule, 8-pt spatial cadence, 8-state feedback, and Emil Kowalski animation rules.
3. [**`vercel-react-best-practices`**](file:///.agents/skills/vercel-react-best-practices/SKILL.md): Manages Next.js App Router performance, eliminates waterfalls, optimizes bundles, and secures Server/Client boundaries.
4. [**`frontend-responsive-design-standards`**](file:///.agents/skills/frontend-responsive-design-standards/SKILL.md): Enforces mobile-first layouts, Tailwind breakpoints, fluid units, and touch ergonomics.
5. [**`accessibility-audit`**](file:///.agents/skills/accessibility-audit/SKILL.md): Governs WCAG 2.2 AA compliance, color contrast, keyboard tab order, and screen reader friendliness.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
