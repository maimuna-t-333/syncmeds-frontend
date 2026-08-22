'use client';

import { clsx } from 'clsx';
import {
    BarChart3,
    ChevronRight,
    FolderOpen,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/lib/hooks';
import { useSignOut } from '@/lib/services/auth.service';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Avatar,
} from '@/lib/ui';

const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/projects', label: 'Projects', icon: FolderOpen },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
] as const;

const SECONDARY_NAV = [{ href: '/profile', label: 'Settings', icon: Settings }] as const;

export const AppSidebar = () => {
    const pathname = usePathname();
    const { user } = useAuth();
    const signOut = useSignOut();

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <aside className="flex w-[240px] shrink-0 flex-col bg-background border-r border-border">
            {/* Logo */}
            <Link
                href="/dashboard"
                className="flex h-16 items-center gap-3 px-5 border-b border-border shrink-0"
            >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                    <svg width="15" height="15" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <path
                            d="M8 44V24C8 14.059 15.163 6 24 6C32.837 6 40 14.059 40 24V44"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                        <path
                            d="M16 44V30C16 23.373 19.582 18 24 18C28.418 18 32 23.373 32 30V44"
                            stroke="white"
                            strokeOpacity="0.6"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <span className="font-semibold text-body-m text-foreground tracking-tight">
                    hello-next
                </span>
            </Link>

            {/* Main nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6">
                <div className="flex flex-col gap-0.5">
                    <p className="mb-1.5 px-3 text-label-s font-semibold uppercase tracking-widest text-muted-foreground">
                        Menu
                    </p>
                    {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                        const active = isActive(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={clsx(
                                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-m transition-colors duration-150',
                                    active
                                        ? 'bg-accent text-accent-foreground font-medium'
                                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                )}
                            >
                                {active && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary" />
                                )}
                                <Icon
                                    className={clsx('size-4 shrink-0', active && 'text-primary')}
                                />
                                {label}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-0.5">
                    <p className="mb-1.5 px-3 text-label-s font-semibold uppercase tracking-widest text-muted-foreground">
                        General
                    </p>
                    {SECONDARY_NAV.map(({ href, label, icon: Icon }) => {
                        const active = isActive(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={clsx(
                                    'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-body-m transition-colors duration-150',
                                    active
                                        ? 'bg-accent text-accent-foreground font-medium'
                                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                )}
                            >
                                {active && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary" />
                                )}
                                <Icon
                                    className={clsx('size-4 shrink-0', active && 'text-primary')}
                                />
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* User footer */}
            <div className="border-t border-border p-3 shrink-0">
                <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-secondary transition-colors">
                    <Link
                        href="/profile"
                        className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-md"
                    >
                        <Avatar name={user?.name ?? 'User'} size="sm" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-body-s font-medium text-foreground leading-none">
                                {user?.name ?? 'User'}
                            </p>
                            <p className="mt-0.5 truncate text-label-s text-muted-foreground">
                                {user?.email ?? ''}
                            </p>
                        </div>
                        <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                    </Link>

                    <div className="w-px h-6 bg-border shrink-0" />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button
                                type="button"
                                aria-label="Sign out"
                                className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            >
                                <LogOut className="size-3.5" />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Sign out?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You'll be redirected to the login page.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction variant="destructive" onClick={signOut}>
                                    Sign out
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </aside>
    );
};
