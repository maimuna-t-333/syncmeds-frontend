'use client';

import { Bell, Search } from 'lucide-react';
import type { ReactNode } from 'react';

import { useAuth } from '@/lib/hooks';
import { Avatar } from '@/lib/ui';

type AppHeaderProps = { actions?: ReactNode };

export const AppHeader = ({ actions }: AppHeaderProps) => {
    const { user } = useAuth();

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-8">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 w-60">
                <Search className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="text-body-m text-muted-foreground">Search...</span>
            </div>

            <div className="flex items-center gap-2">
                {actions}

                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                    <Bell className="size-4" />
                    <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
                </button>

                <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 cursor-pointer transition-colors hover:bg-accent">
                    <Avatar name={user?.name ?? 'User'} size="sm" />
                    <div className="hidden md:block">
                        <p className="text-body-s font-medium text-foreground leading-none">
                            {user?.name ?? 'User'}
                        </p>
                        <p className="mt-0.5 text-label-s text-muted-foreground">
                            {user?.email ?? ''}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};
