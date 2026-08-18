import type { ReactNode } from 'react';
import { AppHeader } from '@/lib/components/common/app-header.component';
import { AppSidebar } from '@/lib/components/common/app-sidebar.component';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-secondary">
            <AppSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <AppHeader />
                <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
        </div>
    );
}
