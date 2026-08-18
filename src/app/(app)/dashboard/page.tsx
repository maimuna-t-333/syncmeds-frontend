import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Your dashboard overview',
};

export default function DashboardPage() {
    return (
        <div>
            <h1 className="font-bold text-title-l text-foreground">Dashboard</h1>
            <p className="mt-2 text-body-m text-muted-foreground">
                Welcome back. You&apos;re all caught up.
            </p>
        </div>
    );
}
