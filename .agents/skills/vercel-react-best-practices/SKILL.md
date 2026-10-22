---
name: vercel-react-best-practices
description: Official Vercel React and Next.js App Router performance rules across 8 categories including waterfall elimination, bundle size optimization, server-side caching, and rendering performance.
---

# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 45 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Use
Reference these guidelines when:
- Writing new React components or Next.js App Router pages
- Implementing data fetching (Server Components vs Client Components)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
| :--- | :--- | :--- | :--- |
| **1** | Eliminating Waterfalls | CRITICAL | `async-` |
| **2** | Bundle Size Optimization | CRITICAL | `bundle-` |
| **3** | Server-Side Performance | HIGH | `server-` |
| **4** | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| **5** | Re-render Optimization | MEDIUM | `rerender-` |
| **6** | Rendering Performance | MEDIUM | `rendering-` |
| **7** | JavaScript Performance | LOW-MEDIUM | `js-` |
| **8** | Advanced Patterns | LOW | `advanced-` |

---

## Core Rules Reference

### 1. Eliminating Waterfalls (CRITICAL)
- `async-defer-await`: Move `await` into branches where actually used.
- `async-parallel`: Use `Promise.all()` for independent operations.
- `async-api-routes`: Start promises early, await late in API routes.
- `async-suspense-boundaries`: Use `<Suspense>` to stream content and unblock the shell.

### 2. Bundle Size Optimization (CRITICAL)
- `bundle-barrel-imports`: Import directly from specific files, avoid heavy barrel files.
- `bundle-dynamic-imports`: Use `next/dynamic` for heavy components (e.g. 360 viewer, rich interactive maps, heavy charts).
- `bundle-defer-third-party`: Load analytics/logging after hydration.
- `bundle-conditional`: Load modules only when feature is activated by the user.

### 3. Server-Side Performance (HIGH)
- `server-cache-react`: Use `React.cache()` for per-request deduplication.
- `server-serialization`: Minimize data passed across the Server-to-Client component boundary (pass IDs/primitives, not bloated payloads).
- `server-parallel-fetching`: Restructure components to parallelize fetches in Server Components.

### 4. Client-Side Data Fetching (MEDIUM-HIGH)
- `client-swr-dedup`: Use SWR or TanStack Query for automatic request deduplication and cache sharing.
- `client-event-listeners`: Deduplicate global event listeners.

### 5. Re-render Optimization (MEDIUM)
- `rerender-defer-reads`: Don't subscribe to state only used in event callbacks.
- `rerender-memo`: Extract expensive subtrees into memoized components.
- `rerender-dependencies`: Use primitive values in effect/hook dependency arrays.
- `rerender-derived-state`: Subscribe to derived booleans, not raw high-frequency values.
- `rerender-functional-setstate`: Use functional `setState(prev => ...)` for stable callbacks.
- `rerender-lazy-state-init`: Pass an initializer function `useState(() => expensive())` for costly initial states.
- `rerender-transitions`: Use `startTransition` for non-urgent UI updates.

### 6. Rendering Performance (MEDIUM)
- `rendering-animate-svg-wrapper`: Animate an outer HTML wrapper element, not raw SVG child elements.
- `rendering-content-visibility`: Use `content-visibility: auto` for long off-screen lists.
- `rendering-hoist-jsx`: Extract static JSX elements outside the component render function.
- `rendering-conditional-render`: Use ternary `condition ? <A /> : null`, never `condition && <A />` (prevents rendering `0`).

### 7. JavaScript Performance (LOW-MEDIUM)
- `js-batch-dom-css`: Group CSS changes via classes or CSS variables.
- `js-index-maps`: Build a `Map` or `Set` for repeated $O(1)$ lookups.
- `js-early-exit`: Return early from functions to avoid unnecessary nested computations.
- `js-tosorted-immutable`: Use immutable array methods like `toSorted()`.
