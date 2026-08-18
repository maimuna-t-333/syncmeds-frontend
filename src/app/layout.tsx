import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

import { QueryProvider } from '@/lib/components/providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
    title: {
        default: 'hello-next',
        template: '%s | hello-next',
    },
    description:
        'A production-ready Next.js 16 boilerplate with a complete auth flow, strict layered architecture, Zustand, React Query, Zod, and Tailwind CSS v4 — all wired up and ready to ship.',
    keywords: [
        'Next.js',
        'Next.js boilerplate',
        'TypeScript',
        'Tailwind CSS',
        'Zustand',
        'React Query',
        'Zod',
        'authentication',
        'starter template',
    ],
    authors: [{ name: 'hello-next' }],
    creator: 'hello-next',
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body>
                <QueryProvider>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
