export const AUTH_PAGES = [
    { label: 'Sign In', href: '/sign-in', desc: 'Email + password, remember me, Google OAuth' },
    { label: 'Sign Up', href: '/sign-up', desc: 'Name, email, password — Zod validated' },
    {
        label: 'Forgot Password',
        href: '/forgot-password',
        desc: 'Sends a reset link to the user email',
    },
    {
        label: 'OTP Verification',
        href: '/otp-verification',
        desc: '6-digit code input with resend countdown',
    },
    {
        label: 'Reset Password',
        href: '/reset-password',
        desc: 'New password + confirm, schema-validated',
    },
] as const;

export const TREE = [
    { depth: 0, name: 'src/lib/', comment: '' },
    { depth: 1, name: 'config/', comment: '# API client · env · query client' },
    { depth: 1, name: 'types/', comment: '# T-prefixed aliases, no runtime exports' },
    { depth: 1, name: 'constants/', comment: '# UPPER_SNAKE_CASE, as const' },
    { depth: 1, name: 'schemas/', comment: '# Zod schemas + inferred types' },
    { depth: 1, name: 'hooks/', comment: '# Selector hooks over stores' },
    { depth: 1, name: 'stores/', comment: '# Zustand — auth.store.ts' },
    { depth: 1, name: 'services/', comment: '# React Query mutations & queries' },
    { depth: 1, name: 'storages/', comment: '# local · secure storage' },
    { depth: 1, name: 'ui/', comment: '# Primitive components' },
    { depth: 1, name: 'components/', comment: '# Feature components · providers' },
    { depth: 1, name: 'utils/', comment: '# Pure helpers' },
] as const;

export const TECH_STACK = [
    'Next.js 16',
    'TypeScript',
    'Tailwind CSS v4',
    'Zustand v5',
    'React Query v5',
    'Zod v4',
    'react-hook-form',
    'Biome',
] as const;

export const LANGUAGES_BADGES = [
    { label: 'TypeScript', top: '-14px', left: '-24px', z: 50, delay: 0 },
    { label: 'Zod v4', top: '24px', right: '-24px', z: 70, delay: 0.6 },
    { label: 'Zustand v5', bottom: '80px', left: '-28px', z: 55, delay: 1.1 },
    { label: 'React Query', bottom: '-12px', right: '40px', z: 45, delay: 0.3 },
] as const;
