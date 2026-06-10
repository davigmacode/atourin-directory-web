# Styling Migration Strategy: Inline Objects → Tailwind CSS + CSS Modules

> **Status:** Draft — not yet implemented.
> **Target:** Maintain exact visual fidelity throughout migration.

---

## 1. Rationale

### Current approach (inline style objects)
- Style objects in `src/styles/*.js` referenced by `style={F.xxx}` in JSX
- Dynamic styles (e.g. `background: catBg`) handled via spread + override
- Hover effects managed via React `useState` (`onMouseEnter`/`onMouseLeave`)
- Responsive overrides in `<style>` tags inside components and `globals.css`

### Target approach (Tailwind + CSS Modules)
- **Tailwind utility classes** for ~85% of styles (layout, spacing, color, type, hover, responsive)
- **CSS Modules** for complex/dynamic styles that Tailwind cannot express
- **Inline `style`** only as last resort for truly dynamic values (e.g. `background: catBg`)

---

## 2. Industry Standards & Rationale

### Why Tailwind + CSS Modules (not pure CSS Modules, not styled-components)

| Concern | Recommendation | Why |
|---------|---------------|-----|
| Colocation | Tailwind classes inline | Single file, no context-switching |
| Dynamic values | CSS Modules / inline `style` | Tailwind does not generate dynamic classes at runtime |
| Theming | CSS custom properties | Already have `var(--atr-purple)` — can map to Tailwind `theme.extend` |
| Responsive | Tailwind breakpoint prefixes | `md:grid-cols-2`, `lg:text-lg` — no media query noise |
| Hover/focus | Tailwind variant prefixes | `hover:shadow-lg`, `focus:ring` — no JS state needed |
| Reusable patterns | `@apply` in CSS Modules (judiciously) | Avoid `@apply` for everything — that's just writing CSS in a string |
| Bundle size | Tailwind purge | Production CSS ~10-15 kB gzipped |

### Industry consensus (2024–2025)
- **Tailwind + headless UI library** is the dominant stack for new Next.js projects
- **CSS Modules** are preferred over styled-components for colocation without runtime cost
- **Hybrid is normal** — pragmatic mix of utility classes and CSS Modules is recommended by the Tailwind team themselves

---

## 2a. Tailwind Usage Convention

### Rule of thumb: utilities langsung di `className`

```jsx
{/* ✅ Correct — utilities inline */}
<div className="grid grid-cols-3 gap-6 p-4 bg-white rounded-xl" />

{/* ❌ Avoid — composing utilities into a custom class via @apply */}
{/* .card-box { @apply grid grid-cols-3 gap-6 p-4 bg-white rounded-xl; } */}
<div className="card-box" />
```

### Why inline utilities (not `@apply` composition)

| Concern | Inline utilities | `@apply` composition |
|---------|-----------------|---------------------|
| **Purge safety** | ✅ Purge scans `className` strings directly | ❌ Can't trace utilities inside `@apply`; risks dead CSS or bundle bloat |
| **Naming fatigue** | ✅ None | ❌ `cardBox`, `cardWrapper`, `cardContainer`, `cardWrap`… |
| **Refactor confidence** | ✅ Change `p-4` → `p-6` right in JSX | ❌ Change in CSS file, hoping nothing else shares that class |
| **Readability** | ✅ Good for ~3-5 utilities | ✅ Can hide complexity |
| **Bundle size** | ✅ Purge removes what's unused | ⚠️ Must safelist all used utilities — cancels purge benefit |

### When `@apply` is acceptable (rare)

1. **Third-party overrides** — libraries that don't accept `className`

```css
.react-datepicker__day--selected {
  @apply bg-purple-600 text-white rounded-lg;
}
```

2. **CSS Module pseudo-elements** — Tailwind can't express `::before`/`::after`

```css
.timelineLine::before {
  content: '';
  @apply absolute left-1/2 w-0.5 h-full bg-purple-200 -translate-x-1/2;
}
```

3. **Highly repeated patterns only after measurable duplication** (3+ occurrences _and_ >6 utilities) — but even then, prefer a React component instead of a CSS class.

### Dynamic styles (colors from props)

Tailwind cannot generate classes at runtime. For prop-driven colors, use CSS Modules + inline `style`:

```css
/* Component.module.css */
.tag {
  border-radius: 9999px;
  padding: 4px 10px;
  font-size: 10px;
  font-weight: 700;
}
```

```jsx
<span className={styles.tag} style={{ background: catBg, color: catFg }}>
  {cat}
</span>
```

---

## 3. Migration Phases

### Phase 0 — Setup (safe, no visual impact)

```
1. `npm install -D tailwindcss postcss autoprefixer`
2. `npx tailwindcss init -p`
3. Configure `tailwind.config.js`:
   - content paths: `src/**/*.{jsx,tsx}`
   - theme.extend.colors mapped to existing CSS vars
   - theme.extend.fontFamily matching --atr-font-sans
4. Add Tailwind directives to `src/app/globals.css`
5. Verify: existing pages unchanged, Tailwind classes work in new JSX
```

**No migration yet.** Tailwind can coexist with inline styles. Verify build succeeds.

### Phase 1 — New pages only (zero risk)

All newly converted pages (e.g. those yet to be added) use Tailwind + CSS Modules:
- Layout → Tailwind grid/flex utilities
- Static visual → Tailwind utility classes
- Dynamic/dependent on prop → CSS Modules with custom properties
- Hover → `hover:` variants (eliminates `useState` for hover)

### Phase 2 — Piggyback migration (medium risk)

When a page needs functional changes anyway, migrate its styling at the same time:
- One component file at a time
- Verify against screenshot / visual diff
- Commit separately: `refactor(component): migrate to Tailwind`

### Phase 3 — Stable module migration (low priority)

Style modules in `src/styles/` that rarely change may be left as-is indefinitely.
No forced migration.

---

## 4. Migration Pattern: Before → After

### Simple static component

**Before** — inline objects + JS hover state:

```jsx
// styles/explore-styles.js
const ex = {
  card: {
    background: '#fff',
    borderRadius: 16,
    border: '1px solid var(--atr-outline)',
    padding: '16px',
    transition: 'transform .2s, box-shadow .2s',
  },
};

// component
const [hover, setHover] = useState(false);
<article
  style={ex.card}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
/>
```

**After** — Tailwind utilities:

```jsx
<article
  className="bg-white rounded-xl border border-[var(--atr-outline)] p-4
             transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-lg"
/>
```

### Dynamic color from prop

**Before:**

```jsx
<span style={{ background: catBg, color: catFg, ...cardStyles.cardTag }}>
  {cat}
</span>
```

**After** — CSS Module + custom property:

```css
/* Component.module.css */
.tag {
  border-radius: 9999px;
  padding: 4px 10px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
```

```jsx
<span
  className={styles.tag}
  style={{ background: catBg, color: catFg }}
>
  {cat}
</span>
```

### Responsive grid

**Before:**

```jsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
}} />
```

**After:**

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" />
```

---

## 5. Migration Checklist per Component

- [ ] Remove `import F from '@/styles/xxx-styles'` (or keep for shared)
- [ ] Replace static style refs with Tailwind classes
- [ ] Replace `useState` hover with `hover:` variants
- [ ] Replace `<style>` responsive overrides with breakpoint prefixes
- [ ] Extract dynamic-only styles into CSS Module (or inline `style`)
- [ ] Remove unused properties from style module
- [ ] Visual diff against production
- [ ] Remove hover state management

---

## 6. Risk Register

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Visual regression (border-radius, spacing) | High | Phase 1 — new pages only. For existing pages, diff before/after |
| Tailwind purge removes dynamic class | Low | Use `safelist` in config for any generated class names |
| Hybrid code confusion (inline + tailwind) | Medium | Document clearly: "new pages use Tailwind, existing pages stay inline" |
| Transition/animation differences | Medium | Keep `transition` utilities explicit rather than relying on defaults |
| CSS specificity conflicts with globals.css | Low | Add `@layer` directives in Tailwind config |

---

## 7. Decision Record

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-10 | Defer migration | 30+ pages active; risk of regression outweighs DX benefit at this stage. Strategy documented for future reference. |

---

*Document maintained in `.docs/styling_migration.md`. Update this file when Phase 0 begins.*
