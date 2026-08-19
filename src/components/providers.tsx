'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { queryClient } from '@/lib/api/query-client';

interface ProvidersProps{
    children: React.ReactNode;
}

export function Providers({children}:ProvidersProps){
    return(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
            <Toaster />
        </ThemeProvider>
    </QueryClientProvider>
    )
}