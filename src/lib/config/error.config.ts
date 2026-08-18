import type { TErrorResponse } from '@/lib/types';

export class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        public body: TErrorResponse | null = null
    ) {
        super(body?.message ?? `HTTP ${status}: ${statusText}`);
        this.name = 'ApiError';
    }

    get code() {
        return this.body?.data?.code;
    }

    get errorData() {
        return this.body?.data ?? null;
    }
}
