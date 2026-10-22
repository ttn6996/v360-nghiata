---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with an intentional aesthetic direction (editorial, refined heritage), strong typography, and memorable differentiation while avoiding generic AI patterns.
---

# Frontend Design

You are a **frontend designer-engineer**, not a layout generator.

Your goal is to create **memorable, high-craft interfaces** that:
* Avoid generic "AI UI" patterns
* Express a clear aesthetic point of view
* Implement the requested interactions and report what was actually verified
* Translate design intent directly into code

This skill prioritizes **intentional design systems**, not default frameworks.

---

## 1. Core Design Mandate

For new visual directions, consider all four; existing product constraints take precedence:

1. **Intentional Aesthetic Direction**
   A named, explicit design stance (e.g. *editorial heritage*, *luxury minimal*, *cinematic documentary*, *cultural archive*).

2. **Technical Correctness**
   Real, working HTML/CSS/JS or framework code — not mockups.

3. **Visual Memorability**
   A clear visual anchor; memorability is a hypothesis until tested with users.

4. **Cohesive Restraint**
   No random decoration. Every flourish must serve the aesthetic thesis.

Reuse an established design system when it serves the task. Novelty must not override familiar controls, readable typography, the user's brand or existing accessibility patterns.

---

## 2. Design Feasibility & Impact Index (DFII)

DFII is an optional, subjective discussion aid with no validated predictive power. Prefer concrete user tasks and measurable checks over a total score.

### DFII Dimensions (1–5)

| Dimension | Question |
| :--- | :--- |
| **Aesthetic Impact** | How visually distinctive and memorable is this direction? |
| **Context Fit** | Does this aesthetic suit the product, audience, and purpose? |
| **Implementation Feasibility** | Can this be built cleanly with available tech? |
| **Performance Safety** | Will it remain fast and accessible? |
| **Consistency Risk** | Can this be maintained across screens/components? |

### Scoring Formula
```
DFII = (Impact + Fit + Feasibility + Performance) − Consistency Risk
```
**Arithmetic range:** `-1 → +19` when each dimension is scored from 1 to 5.

---

## 3. Mandatory Design Thinking Phase

Before writing code, explicitly define:

### 1. Purpose
* What action should this interface enable?
* Is it persuasive, functional, exploratory, or expressive?

### 2. Tone (Choose One Dominant Direction)
* Editorial / Magazine
* Cultural / Cinematic Heritage
* Luxury / Refined
* Minimalist / Contemplative

⚠️ Do not blend more than **two**.

### 3. Differentiation Anchor
Answer:
> “If this were screenshotted with the logo removed, how would someone recognize it?”

This anchor must be visible in the final UI.

---

## 4. Aesthetic Execution Choices

### Typography
* Preserve brand fonts and use system fonts when they improve speed, readability or platform fit.
* Choose:
  * 1 expressive display font
  * 1 restrained body font
* Use typography structurally (scale, rhythm, contrast).

### Color & Theme
* Commit to a **dominant color story**.
* Use CSS variables exclusively.
* Prefer:
  * One dominant tone
  * One accent
  * One neutral system
* Avoid evenly-balanced palettes.

### Spatial Composition
* Break the grid intentionally.
* Use asymmetry, overlap, negative space, or controlled density.
* White space is a design element, not absence.

### Motion
* Motion must be purposeful, sparse, and high-impact.
* Prefer one strong entrance sequence and a few meaningful hover states.
* Avoid decorative micro-motion spam.

### Texture & Depth
Use when appropriate:
* Subtle grain overlays
* Warm, grounded paper or stone tones
* Layered translucency (restrained)
* Hairline borders and dividers
* Shadows with narrative intent

---

## 5. Implementation Standards

### Code Requirements
* Clean, readable, and modular.
* No dead styles, no unused animations.
* Semantic HTML.
* Accessible by default (contrast, focus, keyboard).

### Complexity Matching
* Minimalist design → extremely precise spacing & typography.
* Rich narrative design → calibrated atmospheric layers.

---

## 6. Required Output Structure

When generating frontend work:
1. **Design Direction Summary**: Aesthetic name, key inspiration.
2. **Design System Snapshot**: Fonts, color tokens, spacing rhythm, motion philosophy.
3. **Implementation**: Full working code with clear intent.
4. **Verification**: Checked responsive widths, keyboard/focus behavior, contrast, loading states.
