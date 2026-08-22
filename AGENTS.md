# Agent Rules — hello-next

## Before writing any code

This project runs **Next.js 16.2.6** — beyond most training cutoffs. APIs, file conventions, and behaviour may differ from what you know. Before writing any Next.js-specific code, read the relevant guide:

```
node_modules/next/dist/docs/01-app/   ← App Router (use this project's router)
node_modules/next/dist/docs/index.md  ← top-level index
```

Heed deprecation notices. When in doubt, read the source.

---

## Stack

| Concern | Tool |
|---|---|
| Framework | Next.js 16.2.6 — App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 — CSS-first, no `tailwind.config.js` |
| Global state | Zustand v5 |
| Server state | TanStack React Query v5 |
| Forms | react-hook-form v7 + zod v4 |
| Variants | class-variance-authority + clsx |
| Icons | lucide-react |
| Toast | sonner |
| Theming | next-themes (class strategy) |
| HTTP client | `Api` class wrapping `fetch` (`src/lib/config/api.config.ts`) |
| Package manager | **bun** — use `bun` / `bunx`, never `npm` or `pnpm` |
| Lint + format | Biome (`biome.json`) — no ESLint, no Prettier |
| Commit tooling | commitizen + commitlint (Conventional Commits) + Husky |

---

## Path alias

`@/*` → `./src/*`

```ts
import { Button } from '@/lib/ui';          // src/lib/ui/index.ts
import { useAuth } from '@/lib/hooks';      // src/lib/hooks/index.ts
import { api }    from '@/lib/config';      // src/lib/config/index.ts
```

Never use relative paths across layer boundaries.

---

## Project layout

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── otp-verification/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── globals.css          ← the ONLY stylesheet in the project
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    ├── config/              # env, api client, query client, error class
    ├── types/               # T-prefixed type aliases (no runtime exports)
    ├── constants/           # UPPER_SNAKE_CASE exports, always `as const`
    ├── schemas/             # zod schemas + inferred types
    ├── hooks/               # use-*.hook.ts — selector hooks over stores
    ├── storages/            # local.storage.ts, secure.storage.ts
    ├── stores/              # zustand stores (auth.store.ts)
    ├── services/            # feature.service.ts — React Query hooks
    ├── ui/                  # primitive components (folder-per-primitive)
    ├── components/          # feature components + providers
    └── utils/               # pure helpers (index.ts barrel)
```

Layer rule: **never mix layers**. A service never imports a component. A store never imports a service. A UI primitive never imports a service.

---

## Filename conventions

| Layer | Pattern | Example |
|---|---|---|
| Primitive UI | `kebab.ui.tsx` | `button.ui.tsx` |
| Feature component | `kebab-name.component.tsx` | `login.component.tsx` |
| Hook | `use-kebab-name.hook.ts` | `use-auth.hook.ts` |
| Service | `feature.service.ts` | `auth.service.ts` |
| Store | `feature.store.ts` | `auth.store.ts` |
| Config | `name.config.ts` | `api.config.ts` |
| Constants | `name.constants.ts` | `endpoints.constants.ts` |
| Schema | `name.schemas.ts` | `auth.schemas.ts` |
| Types | `name.types.ts` | `api.types.ts` |
| Storage | `name.storage.ts` | `local.storage.ts` |
| Barrel | `index.ts` | one per folder |

All filenames: **lowercase, hyphenated, suffixed with their layer**. Never `Button.tsx`, never `useAuth.ts`.

---

## Naming rules

- **Constants** (`/lib/constants`): `UPPER_SNAKE_CASE` top-level bindings, always `as const`. Inner keys follow the data shape (`lowerCamel` for grouped paths, `UPPER_SNAKE` for enum-like keys).
- **Types** (`/lib/types`): `T`-prefixed PascalCase. `TUser`, `TApiResponse<T>`, `TSignInResponse`. Use `type` aliases, not `interface` (except for declaration merging). No runtime exports.
- **Form data types** (in `/lib/schemas`): also `T`-prefixed — `TSignInFormData = z.infer<typeof signInSchema>`.
- **No schemas in components.** Every zod schema — including UI-only extensions (e.g. adding a `rememberMe` field) — lives in `/lib/schemas`. Components only import schemas and types; they never define them.
- **Generic type parameters**: single-letter, no prefix — `<T>`, `<K>`.

---

## Styling rules

- `src/app/globals.css` is the **only** stylesheet. No `.module.css`, `.scss`, or component-level CSS files.
- All design tokens live in `@theme` inside `globals.css`. Current tokens: `--color-primary`, `--color-base-{20,40,60,80}`, `--color-base-black-100`, `--color-error`, `--color-error-20`, `--radius-card`, `--radius-pill`, `--font-sans`, `--text-body-{xs,s,m,l}`, `--text-heading-2`.
- No `tailwind.config.{js,ts}` — extend `@theme` instead.
- No inline `style` prop (one allowed exception: runtime-computed values that cannot live in `@theme`, expressed as CSS variables).
- Use `clsx` for class composition, never string interpolation.
- No CSS-in-JS. No competing UI frameworks (Bootstrap, Material UI, Chakra, etc.). Headless primitives (Radix, vaul) are fine.

---

## Code style rules

1. **No default exports** outside Next.js page/layout files.
2. **Arrow function** for React components and exported functions; `function` keyword for top-level type-narrowing helpers.
3. **Import order**: external packages → internal (`@/...`). Biome's `organizeImports` enforces this.
4. **`import type`** for type-only imports — always.
5. **Props type alias** above the component: `type XProps = { … }`, never inline.
6. **One component per file** in `/ui` and `/components`.
7. **No comments** describing what code does. Only comment a non-obvious *why*.
8. **No `any`** — use `unknown` and narrow, or a discriminated union.
9. **Magic strings are constants.** Promote any literal used in two or more places to `/lib/constants`.
10. **All async calls are awaited.** Never fire-and-forget unless explicit.
11. **`type` over `interface`** everywhere, except when declaration merging is required.

---

## Stores

- Every store file starts with `'use client'`.
- Store-state type (`T<Feature>Store`) lives **inside** the store file — the one exception to "types live in `/lib/types`".
- Actions live on the store (`signOut: () => set(...)`), never as standalone exports.
- **Always use selectors** — never destructure the whole store. Use `useShallow` when selecting multiple values.
- Persisted stores expose an `isHydrated` flag; consumers gate UI on it to prevent hydration mismatch.
- Tokens never go in a persisted store. Only the user profile and derived booleans are safe for `localStorage`.
- Services access store actions by destructuring from the hook at the top of the service hook: `const { setX } = useXStore()`. Zustand actions are stable references so there is no stale-closure risk. Only fall back to `useXStore.getState()` when the store must be accessed outside of a React hook (e.g., a plain utility function).

---

## Services

- Every service file starts with `'use client'`.
- Services are **hooks** that return React Query mutations/queries.
- Side effects (`router.push`, `toast`, `storage`) live in `onSuccess` / `onError` callbacks — never in the component.
- Components consume services by destructuring: `const { mutateAsync, isPending } = useSignIn()`.

---

## UI primitives

- Each primitive is a flat file: `lib/ui/<name>.ui.tsx`, exported from `lib/ui/index.ts`.

---

## shadcn MCP

This project has the **shadcn MCP server** connected. Use it to browse and install shadcn/ui components without leaving the agent.

Key tools:
- `mcp__shadcn__list_items_in_registries` — list all available components from `@shadcn`
- `mcp__shadcn__search_items_in_registries` — search by keyword
- `mcp__shadcn__view_items_in_registries` — inspect a component's source before installing
- `mcp__shadcn__get_add_command_for_items` — get the exact `bunx shadcn@latest add <component>` command to run

**When to use shadcn components:**
- Reach for shadcn when a primitive (dialog, dropdown, tooltip, popover, etc.) would require significant Radix boilerplate to build from scratch.
- Prefer the project's own `/lib/ui` primitives for simple elements already covered (Button, Input, Avatar, Badge, Checkbox).
- Never install a shadcn component that duplicates an existing `/lib/ui` primitive.

**After installing:**
- shadcn drops generated files into `src/components/ui/`. Re-export or co-locate as needed; follow the existing layer rules.
- Installed components use the project's CSS variables (`--background`, `--primary`, etc.) automatically — no extra theming needed.

---

## Commit and tooling rules

- **Conventional Commits only**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `style:`, `perf:`, `build:`, `ci:`, `revert:`.
- Use `bun commit` (commitizen) for guided prompts. Direct `git commit -m "..."` works if it conforms.
- **Never `--no-verify`.** If a hook fails, fix the cause.
- Pre-commit hook auto-formats with Biome and writes fixes back to disk — review the diff before pushing.
- Every user-visible PR ships with a changeset (`bun changeset`). Internal-only changes (lint config, test refactors) skip it.
<!-- END:nextjs-agent-rules -->
