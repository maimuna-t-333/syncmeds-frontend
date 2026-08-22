import { AppSidebar } from '@/lib/components/common/app-sidebar.component';
import { SidebarProvider } from '@/lib/ui/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <div className="flex flex-1 flex-col">
                    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
