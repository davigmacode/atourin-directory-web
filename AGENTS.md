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

## Data Rules

- All prices, ratings, booking codes, and product names MUST come from `src/data/canon.js`.
- Glossary terms MUST use `cat()` from `src/lib/i18n.js` — never hardcode "Atraksi" or "Attraction".
- UI labels MUST use `t()` — never hardcode navigation or footer strings.

## Commit Message Generation

1. **Trigger**: When the user types `cm`, generate an **English** conventional commit message.
2. **Logic**: Check staged changes first (`git diff --staged`). If nothing staged, check unstaged (`git diff`). If nothing at all, respond "Nothing to commit".
3. **Output format** — exactly **2 fenced code blocks**, nothing else:

````
```subject
type(scope): concise imperative summary
```

```body
Optional body wrapped at 72 chars. Include what and why,
not how. Omit this block if the subject says it all.
```
````

4. **Style rules**:
   - Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`, `test`.
   - Scope is optional — use it when the change is scoped to a module/component (e.g. `feat(explore): add island tiles`).
   - Subject line: max 50 chars, imperative mood, no period at end, capitalize first word.
   - Body: only include if it adds useful context beyond the subject. Wrap at 72 chars. Use bullet lists (`- item`) when enumerating multiple changes. Keep each bullet concise.
   - Never include the raw diff in the output.
   - Never add meta-commentary, explanations, or conversational text outside the two blocks.
