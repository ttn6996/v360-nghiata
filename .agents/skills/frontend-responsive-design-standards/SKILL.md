---
name: frontend-responsive-design-standards
description: Mobile-first responsive design standards with standard Tailwind CSS breakpoints, fluid layouts, relative units, and minimum 44x44px touch targets.
---

# Frontend Responsive Design Standards

> **Rule:** Mobile-first development with consistent breakpoints, fluid layouts, relative units, and touch-friendly targets.

---

## 1. When to Use This Skill
- Creating or modifying layouts that need to adapt seamlessly across mobile, tablet, and desktop viewports.
- Implementing mobile-first design patterns starting with the base mobile layout before scaling up.
- Writing Tailwind CSS responsive classes or media queries.
- Ensuring touch targets meet minimum accessible sizes (minimum 44x44px) on mobile and touch devices.
- Testing and verifying layouts at key viewport widths (375px, 640px, 768px, 1024px, 1280px).

---

## 2. Mobile-First Development (Mandatory)

**Always write styles starting with mobile as the default baseline, then use min-width breakpoints for larger screens.**

### Anti-Pattern (Desktop-first):
```css
/* Bad: Defaulting to desktop and overriding for mobile */
.container {
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 768px) {
  .container {
    width: 100%;
    grid-template-columns: 1fr;
  }
}
```

### Production Standard (Mobile-first with Tailwind):
```html
<!-- Good: Mobile baseline, progressive enhancement for md and lg -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  ...
</div>
```

**Why mobile-first:**
- Forces ruthless content prioritization.
- Better performance on mobile devices (no heavy desktop CSS to override).
- Progressive enhancement over graceful degradation.

---

## 3. Standard Breakpoint System

Use the project's standard Tailwind breakpoints consistently:

| Breakpoint | Min-Width | Primary Target Devices | Layout Behavior |
| :--- | :--- | :--- | :--- |
| **base** | `< 640px` | Mobile phones (portrait) | Single-column, linear reading rhythm, full-width touch cards |
| **`sm:`** | `640px` | Large phones, phablets | 1–2 columns, compact gutters |
| **`md:`** | `768px` | Tablets, iPad portrait | 2 columns, visible desktop-style subnav |
| **`lg:`** | `1024px` | Laptops, iPad landscape | 3 columns or split-panel editorial layouts |
| **`xl:`** | `1280px` | Standard desktops | Max-container containment, generous breathing room |
| **`2xl:`** | `1536px` | Large screens / high-res displays | Centered bounded container (`max-w-7xl mx-auto`) |

---

## 4. Touch Targets & Ergonomics

1. **Minimum Touch Size:** All interactive elements on mobile must have a minimum clickable area of **44x44px** (`min-h-11 min-w-11` or padded container).
2. **Thumb Zone Awareness:**
   - High-frequency navigation controls (back button, panorama view toggles, main audio/guide triggers) must be easily reachable with one thumb (bottom half of screen on mobile).
   - Destructive or secondary actions belong in top bars or secondary drawers.
3. **Spacing Between Targets:** Maintain at least `8px` (`gap-2`) between adjacent interactive elements to prevent accidental miss-taps.

---

## 5. Fluid Typography & Relative Spacing

1. **Fluid Typography:** Use `clamp()` for hero headings so they scale smoothly without breaking across 3 lines on small screens:
   ```css
   font-size: clamp(2rem, 5vw + 1rem, 3.75rem);
   ```
2. **Relative Sizing:**
   - Body font sizes, line heights, and margins should use `rem` or `em`, allowing user browser zoom preferences to scale naturally.
   - Container max widths: `max-w-prose` (65ch) for readable editorial content.

---

## 6. Responsive Media & Zero Layout Shifts (CLS)

1. **Explicit Dimensions:** Always set `width` and `height` (or CSS `aspect-ratio`) on images, panorama containers, and video embeds to prevent Cumulative Layout Shift (CLS).
2. **Next.js `<Image />`:**
   - Use `sizes` attribute accurately: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`.
   - Never load desktop 4K images on a 375px mobile device.
3. **No Horizontal Overflow:**
   - Explicitly guard against accidental horizontal scrollbars caused by fixed-width children:
   - Audit viewports with `overflow-x: clip` or proper flex/grid wrapping.
