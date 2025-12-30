# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/` with `components/` for reusable UI, `pages/` for Astro routes, `layouts/` for shells, `styles/` for global CSS, `utils/` for helpers, and `lang/` for translations.
- Static assets are under `public/`; shared icons and images used by components are in `src/assets/`.
- Spanish (`es`) is the default locale; English (`en`) mirrors the same key structure. Add new keys to `src/lang/es.ts` first to keep types in sync.

## Build, Test, and Development Commands
- Install deps: `npm install`.
- Local dev with HMR: `npm run dev`.
- Production bundle: `npm run build`.
- Preview the built site: `npm run preview`.
- Astro CLI utilities: `npm run astro -- <command>` (e.g., `npm run astro -- check` when enabled).

## Coding Style & Naming Conventions
- Write TypeScript-first components; keep functions in `camelCase`, components in `PascalCase`, files in `kebab-case`.
- Favor small, composable Astro/TSX components; avoid duplicating layout or translation logic.
- Use Tailwind classes for styling where possible; keep bespoke CSS in `src/styles/`.
- Keep translations flattened with dot-notation paths (e.g., `t("home.nav.about")`); maintain identical key shapes across locales.
- Run formatters/lint tools before committing (Prettier-compatible formatting, 2-space indentation).

## Testing Guidelines
- There is no automated test suite yet; when adding features, prefer lightweight unit tests (Vitest + Astro Testing) and component coverage for interactive pieces.
- Name test files `*.test.ts` near the code under test; keep fixtures small and i18n-aware.
- For manual QA, verify both `/es` and `/en` routes render without missing keys.

## Commit & Pull Request Guidelines
- Follow the existing Conventional Commits style (`feat: ...`, `chore: ...`) seen in history; keep messages imperative and scoped.
- PRs should describe the user-facing change, mention affected pages/components, and include before/after screenshots for UI tweaks.
- Link related issues or TODOs when applicable; note any translation updates or new keys added.

## Architecture & Content Tips
- Prefer composition over prop drilling; share common layout/state via `layouts/` and small utilities in `utils/`.
- When adding content blocks, co-locate copy in translations and keep language detection via `Astro.url` helpers intact.
