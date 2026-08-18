import { QueryClient } from '@tanstack/react-query';

import type { ApiError } from './error.config';

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: ApiError;
    }
}

const STALE_TIME = 1000 * 60 * 5;
const GC_TIME = 1000 * 60 * 10;
const MAX_RETRIES = 3;

const shouldRetry = (failureCount: number, error: ApiError) => {
    if (error.status >= 400 && error.status < 500) return false;
    return failureCount < MAX_RETRIES;
};

export const makeQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: STALE_TIME,
                gcTime: GC_TIME,
                retry: shouldRetry,
                retryDelay: (i) => Math.min(1000 * 2 ** i, 30_000),
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
                refetchOnMount: true,
            },
            mutations: { retry: false, gcTime: GC_TIME },
        },
    });
