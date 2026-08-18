import type { ReactNode } from 'react';

import { BrandMark } from '@/lib/ui';

type AuthLayoutProps = {
    title: string;
    description: string;
    children: ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, description, children }) => (
    <div className="flex min-h-screen gap-5 bg-secondary p-6">
        {/* Left hero panel */}
        <div className="relative hidden flex-1 overflow-hidden rounded-2xl bg-primary-3 lg:flex lg:flex-col lg:justify-between lg:p-16">
            <div className="pointer-events-none absolute -left-[274px] -top-[317px] size-[836px] rounded-full bg-primary/10" />
            <div className="pointer-events-none absolute -bottom-[174px] left-1/2 -translate-x-1/2 size-[754px] rounded-full bg-primary-2/50" />
            <div className="pointer-events-none absolute -bottom-[220px] left-1/2 -translate-x-1/2 size-[920px] rounded-full bg-primary-2/25" />

            <h1 className="relative z-10 font-bold text-[64px] leading-none text-white">{title}</h1>

            <div className="relative z-10 flex items-center gap-4">
                <BrandMark />
                <p className="max-w-xs text-body-l text-white/90">{description}</p>
            </div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-1 items-center justify-center rounded-2xl bg-background px-6 py-16 md:px-16 lg:px-20">
            <div className="w-full max-w-[420px]">{children}</div>
        </div>
    </div>
);
