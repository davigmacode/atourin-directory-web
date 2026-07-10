# AGENTS.md — Atourin Directory Web

## Stack & Conventions

- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Inline style objects (JS modules in `src/styles/`). CSS vars defined in `src/app/globals.css`.
- **Components**: `"use client"` directive on every interactive component. No server/client mixing in a single file.
- **Data**: Static data in `src/data/` as ES modules. Canonical data (`canon.js`) is single source of truth.
- **i18n**: `src/lib/i18n.js` — bilingual ID/EN via `localStorage`. Use `t()` for UI strings, `cat()` for glossary terms.
- **Routing**: Kebab-case folder names (`explore-hub`). Add `async redirects()` in `next.config.mjs` for legacy URL paths.
- **Imports**: Use `@/` path alias for `src/`. Order: React → Next.js → third-party → `@/components` → `@/styles` → `@/data` → `@/lib`.

## Component Rules

- One component per file. Export as `default`.
- SVG icons live in `src/components/icons.jsx` as named exports.
- Style objects stay in `src/styles/` — never inline large style blocks in component files.
- Keep components focused: if a section has multiple sub-components (e.g. hero with search + autocomplete), split them into the same file only if tightly coupled.
- No `any` types if migrating to TypeScript. Use proper interfaces.

## Atomic Design Rules

### Structure

```
src/
├── app/
│   └── [feature]/
│       ├── _components/    ← page-specific components (used in 1 route only)
│       └── page.jsx
└── components/
    ├── cards/
    │   ├── atoms/          ← primitive, stateless UI units
    │   ├── molecules/      ← small compositions of atoms
    │   └── organisms/      ← full card variants (AttractionCardGrid, GuideCard, …)
    ├── layout/             ← TopNav, SiteFooter (every page)
    └── icons.jsx           ← all SVG icons as named exports
```

### Placement Rule

> **Used in ≥ 2 routes** → `src/components/`  
> **Used in 1 route only** → `src/app/[feature]/_components/`

Never create a component in `src/components/` for something only one page uses.  
Never duplicate an existing `src/components/` component into a `_components/` folder.

### Layer Definitions

| Layer | Location | Rule |
|---|---|---|
| **Atoms** | `src/components/cards/atoms/` | Stateless, single-responsibility. No data imports. Accept only primitive props. |
| **Molecules** | `src/components/cards/molecules/` | Compose 2–4 atoms. Still no domain data. |
| **Organisms** | `src/components/cards/organisms/` | Full card variants. May import from `@/data` and `@/lib/i18n`. |
| **Page-specific** | `app/[feature]/_components/` | Section components tied to one route. Not exported outside their feature folder. |
| **Layout** | `src/components/layout/` | Global shell components rendered on every page. |

### Barrel Export

- Every `atoms/`, `molecules/`, `organisms/` group MUST be re-exported from `src/components/cards/index.js`.
- `_components/` folders do **not** have a barrel — import directly from the file.
- Import shared cards via the barrel: `import { AttractionCardGrid } from "@/components/cards"`.

### Storybook

- Atoms and molecules MUST have a `*.stories.jsx` file colocated in the same folder.
- Organisms SHOULD have stories; page-specific `_components` do not need them.

## Data Rules

- All prices, ratings, booking codes, and product names MUST come from `src/data/canon.js`.
- Glossary terms MUST use `cat()` from `src/lib/i18n.js` — never hardcode "Atraksi" or "Attraction".
- UI labels MUST use `t()` — never hardcode navigation or footer strings.

## Commit Message Generation

1. **Trigger**: When the user types `cm`, generate an **English** conventional commit message.
2. **Logic**: Check staged changes first (`git diff --staged`). If nothing staged, check unstaged (`git diff`). If nothing at all, respond "Nothing to commit".
3. **Output format** — exactly **1 fenced code blocks**, nothing else (no outer wrapping):

```
type(scope): concise imperative summary

Optional body wrapped at 72 chars. Include what and why,
not how. Omit this block if the subject says it all.
```

4. **Style rules**:
   - Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`, `test`.
   - Scope is optional — use it when the change is scoped to a module/component (e.g. `feat(explore): add island tiles`).
   - Subject line: max 50 chars, imperative mood, no period at end, capitalize first word.
   - Body: only include if it adds useful context beyond the subject. Wrap at 72 chars. Use bullet lists (`- item`) when enumerating multiple changes. Keep each bullet concise.
   - Never include the raw diff in the output.
   - Never add meta-commentary, explanations, or conversational text outside the two blocks.
