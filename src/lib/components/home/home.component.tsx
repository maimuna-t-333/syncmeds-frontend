import { ArrowUpRight, FolderOpen, Layers, ShieldCheck, Sliders, Zap } from 'lucide-react';
import Link from 'next/link';
import { MotionDiv } from '@/lib/components/common/motion-div.component';
import { HeroSection } from '@/lib/components/home/hero-section.component';
import { AUTH_PAGES, TREE } from '@/lib/constants';
import { BrandMark, GithubIcon } from '@/lib/ui';

export const Home = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            {/* ── Nav ── */}
            <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-sm">
                <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-md bg-primary">
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 48 48"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M8 44V24C8 14.059 15.163 6 24 6C32.837 6 40 14.059 40 24V44"
                                    stroke="white"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M16 44V30C16 23.373 19.582 18 24 18C28.418 18 32 23.373 32 30V44"
                                    stroke="white"
                                    strokeOpacity="0.5"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <span className="text-body-m font-semibold text-foreground">
                            hello-next
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-body-m text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            <GithubIcon className="size-4" />
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                        <Link
                            href="/login"
                            className="rounded-lg bg-primary px-4 py-1.5 text-body-m font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            Live preview
                        </Link>
                    </div>
                </nav>
            </header>

            <HeroSection />

            {/* ── Features bento ── */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <MotionDiv>
                        <div className="mb-3 font-mono text-body-s text-muted-foreground">
                            {"// what's included"}
                        </div>
                        <h2 className="mb-12 font-bold text-title-l text-foreground">
                            Everything wired up.
                            <br className="hidden sm:block" /> Nothing left to configure.
                        </h2>
                    </MotionDiv>

                    <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <MotionDiv delay={0} className="lg:col-span-2">
                            <div className="flex h-full flex-col justify-between rounded-2xl bg-primary p-7">
                                <div>
                                    <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white/15">
                                        <ShieldCheck className="size-5 text-white" />
                                    </div>
                                    <h3 className="mb-2 font-bold text-title-m text-white">
                                        Complete Auth Flow
                                    </h3>
                                    <p className="text-body-m text-white/65">
                                        Five screens — sign in, sign up, forgot password, OTP
                                        verification, reset password. One shared layout. All hooked
                                        up to React Query and Zustand.
                                    </p>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {AUTH_PAGES.map(({ label, href }) => (
                                        <Link
                                            key={label}
                                            href={href}
                                            className="rounded-md border border-white/15 bg-white/10 px-3 py-1 text-body-s text-white/70 transition-colors hover:border-white/30 hover:bg-white/15 hover:text-white"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </MotionDiv>

                        <MotionDiv delay={0.08}>
                            <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-card">
                                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent">
                                    <Layers className="size-5 text-primary" />
                                </div>
                                <h3 className="mb-2 font-bold text-title-m text-foreground">
                                    Layered Architecture
                                </h3>
                                <p className="text-body-m text-secondary-foreground">
                                    UI never touches services. Stores never import services. Layer
                                    boundaries enforced by naming convention.
                                </p>
                            </div>
                        </MotionDiv>

                        <MotionDiv delay={0.16}>
                            <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-card">
                                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent">
                                    <Zap className="size-5 text-primary" />
                                </div>
                                <h3 className="mb-2 font-bold text-title-m text-foreground">
                                    State Management
                                </h3>
                                <p className="text-body-m text-secondary-foreground">
                                    Zustand v5 with selectors and hydration guards. React Query v5
                                    for server state with a pre-configured client.
                                </p>
                            </div>
                        </MotionDiv>

                        <MotionDiv delay={0.24}>
                            <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-card">
                                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent">
                                    <FolderOpen className="size-5 text-primary" />
                                </div>
                                <h3 className="mb-2 font-bold text-title-m text-foreground">
                                    Schema-first Forms
                                </h3>
                                <p className="text-body-m text-secondary-foreground">
                                    Every form backed by a Zod v4 schema. Types are inferred — never
                                    written twice. react-hook-form handles field state.
                                </p>
                            </div>
                        </MotionDiv>

                        <MotionDiv delay={0.32}>
                            <div className="h-full rounded-2xl border border-border bg-card p-7 shadow-card">
                                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent">
                                    <Sliders className="size-5 text-primary" />
                                </div>
                                <h3 className="mb-2 font-bold text-title-m text-foreground">
                                    Developer Experience
                                </h3>
                                <p className="text-body-m text-secondary-foreground">
                                    Biome lint + format, Husky pre-commit hooks, Conventional
                                    Commits enforced, and{' '}
                                    <code className="font-mono text-body-s">@/*</code> path aliases.
                                </p>
                            </div>
                        </MotionDiv>
                    </div>
                </div>
            </section>

            {/* ── Structure ── */}
            <section className="border-y border-border bg-secondary px-6 py-20">
                <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
                    <MotionDiv className="lg:sticky lg:top-24">
                        <div className="mb-3 font-mono text-body-s text-muted-foreground">
                            {'// src/lib'}
                        </div>
                        <h2 className="mb-5 font-bold text-title-l text-foreground">
                            Every file has
                            <br />a clear purpose
                        </h2>
                        <p className="mb-5 text-body-l text-secondary-foreground">
                            The{' '}
                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-body-s">
                                src/lib
                            </code>{' '}
                            directory is divided into strict layers. File names are suffixed with
                            their role —{' '}
                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-body-s">
                                .service.ts
                            </code>
                            ,{' '}
                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-body-s">
                                .store.ts
                            </code>
                            ,{' '}
                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-body-s">
                                .ui.tsx
                            </code>{' '}
                            — so the responsibility of any file is obvious at a glance.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 text-body-m font-medium text-primary transition-opacity hover:opacity-70"
                        >
                            Explore the auth flow
                            <ArrowUpRight className="size-4" />
                        </Link>
                    </MotionDiv>

                    <MotionDiv delay={0.15} x={32} y={0}>
                        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-md">
                            <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-5 py-3">
                                <span className="size-3 rounded-full bg-red-400/70" />
                                <span className="size-3 rounded-full bg-yellow-400/70" />
                                <span className="size-3 rounded-full bg-green-400/70" />
                                <span className="ml-3 font-mono text-body-xs text-muted-foreground">
                                    ~/hello-next/src/lib
                                </span>
                            </div>
                            <ul className="px-5 py-5">
                                {TREE.map(({ depth, name, comment }, i) => (
                                    <MotionDiv key={name} delay={i * 0.04}>
                                        <li
                                            className="flex items-baseline gap-3 py-[3px]"
                                            style={{ paddingLeft: `${depth * 20}px` }}
                                        >
                                            <span className="shrink-0 font-medium font-mono text-body-s text-primary">
                                                {name}
                                            </span>
                                            {comment && (
                                                <span className="truncate font-mono text-body-xs text-muted-foreground">
                                                    {comment}
                                                </span>
                                            )}
                                        </li>
                                    </MotionDiv>
                                ))}
                            </ul>
                        </div>
                    </MotionDiv>
                </div>
            </section>

            {/* ── Auth pages grid ── */}
            <section className="px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <MotionDiv>
                        <div className="mb-3 font-mono text-body-s text-muted-foreground">
                            {'// auth pages'}
                        </div>
                        <div className="mb-10 flex items-end justify-between gap-4">
                            <h2 className="font-bold text-title-l text-foreground">
                                Auth flow,
                                <br className="sm:hidden" /> ready to use
                            </h2>
                            <Link
                                href="/login"
                                className="hidden shrink-0 items-center gap-1.5 text-body-m font-medium text-primary transition-opacity hover:opacity-70 sm:flex"
                            >
                                Preview all pages
                                <ArrowUpRight className="size-4" />
                            </Link>
                        </div>
                    </MotionDiv>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {AUTH_PAGES.map(({ label, href, desc }, i) => (
                            <MotionDiv key={label} delay={i * 0.08}>
                                <Link
                                    href={href}
                                    className="group flex h-full items-start justify-between rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary/30 hover:shadow-md"
                                >
                                    <div>
                                        <p className="mb-1 font-semibold text-body-l text-foreground">
                                            {label}
                                        </p>
                                        <p className="text-body-m text-secondary-foreground">
                                            {desc}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                                </Link>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="px-6 pb-20">
                <MotionDiv>
                    <div
                        className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl p-16 text-center"
                        style={{ background: 'linear-gradient(135deg, #1216B3 0%, #4045EF 100%)' }}
                    >
                        <div className="pointer-events-none absolute -left-32 -top-32 size-72 rounded-full bg-white/5" />
                        <div className="pointer-events-none absolute -bottom-32 -right-32 size-72 rounded-full bg-primary-1/20" />
                        <div className="relative z-10 mx-auto max-w-md">
                            <div className="mb-5 flex justify-center">
                                <BrandMark />
                            </div>
                            <h2 className="mb-3 font-bold text-title-l text-white">
                                Clone it. Own it. Ship it.
                            </h2>
                            <p className="mb-8 text-body-l text-white/60">
                                No hidden magic. Every decision is documented. Fork it, adapt it,
                                and make it yours.
                            </p>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 font-semibold text-body-l text-primary transition-opacity hover:opacity-90"
                            >
                                <GithubIcon className="size-5" />
                                Use this template
                            </a>
                        </div>
                    </div>
                </MotionDiv>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-border px-6 py-6">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <p className="font-mono text-body-s text-muted-foreground">hello-next</p>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-body-s text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <GithubIcon className="size-3.5" />
                        GitHub
                    </a>
                </div>
            </footer>
        </div>
    );
};
