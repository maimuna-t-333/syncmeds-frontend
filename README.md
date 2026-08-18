# hello-next

An opinionated Next.js starter with a complete authentication flow, strict layered architecture, and a curated modern stack. Clone it, wire your API, and ship.

---

## Stack

| Concern | Tool |
|---|---|
| Framework | Next.js 16.2.6 — App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 — CSS-first, no `tailwind.config.js` |
| Global state | Zustand v5 |
| Server state | TanStack React Query v5 |
| Forms | react-hook-form v7 + Zod v4 |
| Icons | lucide-react |
| Toast | sonner |
| Theming | next-themes (class strategy) |
| HTTP client | Custom `Api` class wrapping `fetch` |
| Linting & formatting | Biome (no ESLint, no Prettier) |
| Commits | commitizen + commitlint + Husky (Conventional Commits) |
| Package manager | **bun** |

---

## Features

- **Full auth flow** — sign-up, sign-in, OTP verification, forgot password, reset password
- **Protected routes** — middleware-free route groups with layout-level auth guards
- **Cookie-based sessions** — tokens stored in secure cookies, never in `localStorage`
- **Layered architecture** — enforced import boundaries between UI, components, services, stores, and config
- **Single stylesheet** — all design tokens in `globals.css` via Tailwind `@theme`
- **Light / dark mode** — class-based theming via `next-themes`
- **Strict code style** — Biome lint + format, Husky pre-commit hooks, Conventional Commits

---

## Getting started

### Prerequisites

- [Bun](https://bun.sh) >= 1.0

### Install

```bash
bun install
```

### Configure environment

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_API_URL` to your backend base URL:

```env
NEXT_PUBLIC_API_URL=https://rn-starter-api.onrender.com/api
```

A hosted API is available for development and testing:

| | URL |
|---|---|
| Base URL | `https://rn-starter-api.onrender.com/api` |
| API Docs | [https://rn-starter-api.onrender.com/api/docs](https://rn-starter-api.onrender.com/api/docs) |

### Run

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | Lint with Biome |
| `bun run format` | Format with Biome |
| `bun run check` | Lint + format in one pass |
| `bun run commit` | Guided commit (commitizen) |
| `bun run changeset` | Create a changeset for a release |

---

## Project structure

```
src/
├── app/
│   ├── (app)/              # Protected routes
│   │   ├── dashboard/
│   │   └── profile/
│   ├── (auth)/             # Authentication pages
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── otp-verification/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (marketing)/        # Public pages
│   ├── globals.css         # Only stylesheet — all @theme tokens here
│   └── layout.tsx
└── lib/
    ├── config/             # API client, env, query client, error class
    ├── types/              # T-prefixed type aliases (no runtime exports)
    ├── constants/          # UPPER_SNAKE_CASE exports, always `as const`
    ├── schemas/            # Zod schemas + inferred types
    ├── hooks/              # use-*.hook.ts — selector hooks over stores
    ├── stores/             # Zustand stores
    ├── services/           # React Query mutation/query hooks
    ├── storages/           # Local, secure, and cookie storage adapters
    ├── ui/                 # Primitive components (one file per primitive)
    ├── components/         # Feature components + providers
    └── utils/              # Pure helpers
```

Path alias: `@/*` -> `./src/*`

---

## Architecture notes

**Layer rule** — imports only flow downward:

```
app -> components -> services -> stores -> config / types / constants
               ↘ ui (no upward imports)
```

**File naming** follows a strict suffix convention:

| Layer | Pattern | Example |
|---|---|---|
| Primitive UI | `kebab.ui.tsx` | `button.ui.tsx` |
| Feature component | `kebab-name.component.tsx` | `sign-in.component.tsx` |
| Hook | `use-kebab-name.hook.ts` | `use-auth.hook.ts` |
| Service | `feature.service.ts` | `auth.service.ts` |
| Store | `feature.store.ts` | `auth.store.ts` |
| Schema | `name.schemas.ts` | `auth.schemas.ts` |

See [AGENTS.md](AGENTS.md) for the full set of rules covering naming, styling, stores, services, commits, and more.

---

## Committing

This project enforces [Conventional Commits](https://www.conventionalcommits.org). Use the guided prompt to stay compliant:

```bash
bun run commit
```

Never use `--no-verify`. If a pre-commit hook fails, fix the underlying issue.
