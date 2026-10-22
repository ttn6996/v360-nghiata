---
name: accessibility-audit
description: WCAG 2.2 AA accessibility audit guidelines covering color contrast, keyboard navigation, visible focus indicators, prefers-reduced-motion, and semantic HTML.
---

# Accessibility Audit (WCAG 2.2 AA Standard)

> **Mandate:** Ensure web interfaces meet international accessibility standards, guaranteeing complete usability for keyboard users, screen reader users, and people with visual or motor impairments.

---

## 1. When to Use This Skill
- Auditing UI components, pages, navigation menus, or modal dialogs for accessibility compliance.
- Designing or implementing color palettes and verifying contrast ratios.
- Implementing interactive elements (buttons, links, toggles, form fields) with keyboard and screen reader support.
- Verifying motion accessibility and `prefers-reduced-motion` compliance.

---

## 2. WCAG 2.2 AA Core Checklist

### 1. Perceivable
- **Text Color Contrast:**
  - Normal text (< 18pt or < 14pt bold): minimum **4.5:1** contrast ratio against its background.
  - Large text ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold): minimum **3:1** contrast ratio.
  - Verify subtle/muted text: never let secondary text drop below `4.5:1`.
- **UI Component & Icon Contrast:**
  - Interactive icons, input borders, and active status indicators must meet at least **3:1** against adjacent background colors.
- **Color Independence:**
  - Never convey critical information (success, warning, error, active status) solely via color. Pair color with a descriptive label or distinct icon.
- **Text Alternatives (Images & Panoramas):**
  - Every `<img>` or Next.js `<Image />` must have a meaningful `alt` attribute describing the content or context.
  - Purely decorative images must have an empty `alt=""` and `aria-hidden="true"`.
  - Interactive 360° panoramas must have descriptive text summaries or transcriptions for screen readers.

### 2. Operable
- **Touch Targets:**
  - Minimum clickable/tappable area: **44x44px** (`min-h-11 min-w-11`).
  - Icon-only buttons must pad their bounding box to at least 44x44px.
- **Keyboard Operability:**
  - All interactive elements must be accessible via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`).
  - Never trap keyboard focus inside widgets without a clear escape key (`Escape` to close modals, drawers, or panorama fullscreen).
- **Visible Focus Indicators:**
  - Every focusable element must have a clear, high-contrast focus indicator when navigated by keyboard:
  - `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`.
  - Never set `outline: none` without providing an explicit replacement.
- **Motion Reduction (`prefers-reduced-motion`):**
  - Always respect user system settings for reduced motion:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### 3. Understandable
- **Form Controls & Labels:**
  - Every form input must have an explicitly associated `<label>` (via `htmlFor` / `id`) or an unambiguous `aria-label`.
  - Error messages must be programmatically linked via `aria-describedby="error-id"`.
- **Language Declaration:**
  - Page root must declare the proper document language: `<html lang="vi">` (or appropriate language code).

### 4. Robust
- **Semantic HTML Elements:**
  - Use native HTML elements for their intended semantics:
    - `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
    - `<button>` for actions triggering JavaScript; `<a>` with `href` for navigation between pages or anchors.
- **ARIA Primitives:**
  - Use ARIA only when native HTML does not provide the required role or state (`aria-expanded`, `aria-selected`, `aria-controls`).
  - Never add redundant ARIA roles (e.g., `<nav role="navigation">`).

---

## 3. Pre-Ship Accessibility Verification Workflow

1. **Contrast Check:** Test all text and icon colors against their background surfaces using WCAG ratio formulas.
2. **Tab Flow Check:** Unplug mouse/touchpad and navigate the entire page using only `Tab`, `Shift+Tab`, `Enter`, and `Space`. Verify focus order is logical and focus rings are visible.
3. **Screen Reader Smoke Test:** Verify landmark structure (`banner`, `navigation`, `main`, `contentinfo`) and ensure all dynamic state changes announce correctly.
4. **Reduced Motion Test:** Enable reduced motion in OS/browser simulation and confirm transitions disable gracefully without breaking interactive functionality.
