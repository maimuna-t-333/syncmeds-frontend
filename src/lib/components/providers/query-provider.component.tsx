'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';

import { makeQueryClient } from '@/lib/config/query-client.config';

type QueryProviderProps = { children: ReactNode };

export const QueryProvider = ({ children }: QueryProviderProps) => {
    const [client] = useState(makeQueryClient);
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
