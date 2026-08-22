'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { LANGUAGES_BADGES, TECH_STACK } from '@/lib/constants';
import { GithubIcon, GoogleIcon } from '@/lib/ui';

const EASE = [0.25, 0.4, 0.25, 1] as const;

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: EASE, delay },
});

export const HeroSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const rawX = useMotionValue(0.5);
    const rawY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(rawY, [0, 1], [12, -12]), {
        stiffness: 100,
        damping: 22,
    });
    const rotateY = useSpring(useTransform(rawX, [0, 1], [-12, 12]), {
        stiffness: 100,
        damping: 22,
    });

    const shineBackground = useTransform(
        [rawX, rawY],
        ([x, y]) =>
            `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(64,69,239,0.07) 0%, transparent 55%)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sectionRef.current) return;
        const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
        rawX.set((e.clientX - left) / width);
        rawY.set((e.clientY - top) / height);
    };

    const handleMouseLeave = () => {
        rawX.set(0.5);
        rawY.set(0.5);
    };

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-white px-6 py-20 lg:py-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Soft radial gradient backdrop */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 90% 55% at 50% -5%, #EBEBFF 0%, transparent 65%)',
                }}
            />

            {/* Ambient blobs */}
            <motion.div
                className="pointer-events-none absolute -left-56 -top-56 size-[640px] rounded-full bg-primary-container-1/40"
                animate={{ scale: [1, 1.07, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="pointer-events-none absolute -bottom-72 right-0 size-[720px] rounded-full bg-primary-container-2/25"
                animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />

            <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:min-h-[620px] lg:grid-cols-2 lg:gap-20">
                {/* ── Left copy ── */}
                <div className="py-20 lg:py-0">
                    <motion.div {...fadeUp(0)}>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-container-3 px-3.5 py-1.5">
                            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                            <span className="font-mono text-body-xs text-primary">
                                v1.0 · Open Source · MIT
                            </span>
                        </div>
                    </motion.div>

                    <motion.div {...fadeUp(0.1)}>
                        <h1 className="mb-5 font-bold text-[52px] leading-[1.05] tracking-tight text-foreground lg:text-headline">
                            Stop configuring.
                            <br />
                            <span className="text-primary">Start shipping.</span>
                        </h1>
                    </motion.div>

                    <motion.div {...fadeUp(0.2)}>
                        <p className="mb-8 max-w-[420px] text-body-l text-secondary-foreground">
                            A production-ready Next.js boilerplate with a complete auth flow, strict
                            layered architecture, and every tool already configured.
                        </p>
                    </motion.div>

                    <motion.div {...fadeUp(0.3)}>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-body-m font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                            >
                                <GithubIcon className="size-4" />
                                Use this template
                            </a>
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-2.5 text-body-m font-medium text-foreground shadow-xs transition-colors hover:bg-secondary"
                            >
                                <KeyRound className="size-4" />
                                Preview auth
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div {...fadeUp(0.4)}>
                        <div className="mt-10 flex flex-wrap gap-1.5">
                            {TECH_STACK.map((tech, i) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.5 + i * 0.05,
                                        ease: EASE,
                                    }}
                                    className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-body-xs text-muted-foreground"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── Right 3D mockup ── */}
                <motion.div
                    className="hidden lg:flex lg:items-center lg:justify-end"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                    style={{ perspective: '1100px' }}
                >
                    <motion.div
                        className="relative w-full max-w-[460px]"
                        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        {/* Glow behind card */}
                        <motion.div
                            className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-primary/12 blur-3xl"
                            style={{ z: -30 }}
                            animate={{ opacity: [0.4, 0.85, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Card */}
                        <div
                            className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-xl"
                            style={{ transform: 'translateZ(0px)' }}
                        >
                            {/* Browser chrome */}
                            <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-4 py-2.5">
                                <span className="size-2.5 rounded-full bg-red-400/80" />
                                <span className="size-2.5 rounded-full bg-yellow-400/80" />
                                <span className="size-2.5 rounded-full bg-green-400/80" />
                                <span className="ml-2 font-mono text-body-xs text-muted-foreground">
                                    localhost:3000/login
                                </span>
                            </div>

                            <div className="flex h-[380px]">
                                {/* Left hero panel */}
                                <div className="relative w-[38%] overflow-hidden bg-primary p-6">
                                    <div className="pointer-events-none absolute -left-10 -top-10 size-32 rounded-full bg-white/10" />
                                    <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 size-40 rounded-full bg-primary-2/50" />
                                    <div className="relative z-10 flex h-full flex-col justify-between">
                                        <svg
                                            width="22"
                                            height="22"
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
                                        <p className="font-bold text-[15px] leading-snug text-white">
                                            Start Your
                                            <br />
                                            Journey
                                            <br />
                                            <span className="text-primary-container-2">
                                                with Us
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Mini form */}
                                <div className="flex flex-1 flex-col justify-center bg-white p-5">
                                    <p className="mb-0.5 font-bold text-[15px] text-foreground">
                                        Welcome Back
                                    </p>
                                    <p className="mb-4 text-[11px] text-muted-foreground">
                                        Sign in to your account
                                    </p>
                                    <div className="mb-3 space-y-2">
                                        <div className="h-7 rounded-md border border-border bg-secondary" />
                                        <div className="h-7 rounded-md border border-border bg-secondary" />
                                    </div>
                                    <div className="mb-3 h-7 rounded-md bg-primary" />
                                    <div className="mb-3 flex items-center gap-2">
                                        <div className="h-px flex-1 bg-border" />
                                        <span className="text-[10px] text-muted-foreground">
                                            or
                                        </span>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>
                                    <div className="flex h-7 items-center justify-center gap-1.5 rounded-md border border-border bg-white">
                                        <GoogleIcon />
                                        <span className="text-[10px] text-muted-foreground">
                                            Sign in with Google
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Mouse-tracking shine */}
                            <motion.div
                                className="pointer-events-none absolute inset-0 rounded-2xl"
                                style={{ background: shineBackground }}
                            />
                        </div>

                        {/* Floating depth badges */}
                        {LANGUAGES_BADGES.map(({ label, z, delay, ...pos }) => (
                            <motion.div
                                key={label}
                                className="absolute rounded-lg border border-border bg-white px-2.5 py-1 font-mono text-body-xs text-foreground shadow-sm"
                                style={{ z, ...pos }}
                                animate={{ y: [0, -7, 0] }}
                                transition={{
                                    duration: 3.5 + delay,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay,
                                }}
                            >
                                {label}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
