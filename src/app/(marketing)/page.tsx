import type { Metadata } from 'next';
import { Home } from '@/lib/components/home/home.component';

export const metadata: Metadata = {
    title: {
        absolute: 'hello-next — Stop configuring. Start shipping.',
    },
    description:
        'A production-ready Next.js 16 boilerplate with a complete auth flow, strict layered architecture, Zustand, React Query, Zod, and Tailwind CSS v4 — all wired up and ready to ship.',
    openGraph: {
        type: 'website',
        siteName: 'hello-next',
        title: 'hello-next — Stop configuring. Start shipping.',
        description:
            'A production-ready Next.js 16 boilerplate with a complete auth flow, strict layered architecture, Zustand, React Query, Zod, and Tailwind CSS v4 — all wired up and ready to ship.',
        url: '/',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'hello-next — Stop configuring. Start shipping.',
        description:
            'A production-ready Next.js 16 boilerplate with a complete auth flow, strict layered architecture, Zustand, React Query, Zod, and Tailwind CSS v4 — all wired up and ready to ship.',
    },
    alternates: {
        canonical: '/',
    },
};

export default function HomePage() {
    return <Home />;
}
