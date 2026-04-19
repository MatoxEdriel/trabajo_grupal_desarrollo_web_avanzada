# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common commands

- `npm start` (or `ng serve`) — dev server on `http://localhost:4200` with HMR.
- `npm run build` — production build via `@angular/build:application` (Vite-based). Initial-bundle budgets: 500 kB warn / 1 MB error; per-component styles: 4 kB / 8 kB.
- `npm run watch` — development build in watch mode (no optimization, source maps).
- `npm test` (or `ng test`) — Karma + Jasmine.
- Single spec: `ng test --include='**/login.component.spec.ts'` (swap the glob).
- Scaffold code: `ng generate component modules/<Feature>/<name>` — selector prefix is `app` (see `angular.json`).

No lint script and no e2e runner are configured.

## Architecture

- **Angular 20.2, standalone + zoneless + signals.** There are no `NgModule`s. Bootstrap is the root `App` component (`src/app/app.ts`) wired through `ApplicationConfig` in `src/app/app.config.ts`, which registers `provideBrowserGlobalErrorListeners()`, `provideZonelessChangeDetection()`, and `provideRouter(routes)`. Because change detection is zoneless, prefer signals / `AsyncPipe` / `toSignal` over patterns that assume `zone.js` will trigger CD.
- **Root shell.** `src/app/app.html` composes `<app-nav>`, a `<router-outlet>`, and `<app-footer>`. The root component imports those three directly in its `imports: []` array — there is no shared shell module.
- **Routing.** Defined in `src/app/app.routes.ts` as a flat `Routes` array and consumed by `provideRouter`. Add new routes there; lazy-load with `loadComponent` when feature folders grow.
- **Folder conventions.**
  - `src/app/modules/<Feature>/<feature>/` — feature code. Feature folders are PascalCase (`Auth`, `Config`); the inner component folder is lowercase (`login`). Current features: `Auth/login`. `Config/` is an empty placeholder.
  - `src/app/shared/components/<name>/` — reusable UI (`nav`, `footer`).
- **Strict compilation.** `tsconfig.json` enables `strict`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, plus Angular's `strictTemplates` and `typeCheckHostBindings`. Expect template type errors to fail the build; fix them at the source rather than loosening the config.

## Formatting

Prettier config is inline in `package.json` — `printWidth: 100`, `singleQuote: true`, and the `angular` parser for `*.html`. There is no separate `.prettierrc`.

## Gotchas (ask before "fixing")

- `src/app/app.routes.ts` currently has two entries for `path: 'login'` — the first is a self-redirect (`login` → `login`). This looks mid-edit; confirm intent before rewriting.
- `modules/Config/` is intentionally empty for now.
- `LoginComponent`, `NavComponent`, `FooterComponent` don't set `standalone: true` in their decorators. That's fine in Angular 20 (standalone is the default) and they are used as standalone imports from `App`. Don't add `standalone: true` as a "fix" — and don't reintroduce `NgModule` declarations.
