import { AUTH_COOKIE_KEYS } from '@/lib/constants/auth.constants';
import { cookieStorage } from '@/lib/storages/cookie.storage';
import type { TApiResponse } from '@/lib/types';
import { env } from './env.config';
import { ApiError } from './error.config';

export class Api {
    constructor(private baseUrl: string) {}

    private async getHeaders(): Promise<HeadersInit> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
        const token = cookieStorage.getItem(AUTH_COOKIE_KEYS.ACCESS_TOKEN);
        if (token) headers.Authorization = `Bearer ${token}`;
        return headers;
    }

    async request<T = unknown>(url: string, options?: RequestInit): Promise<TApiResponse<T>> {
        const headers = await this.getHeaders();
        const res = await fetch(`${this.baseUrl}${url}`, {
            credentials: 'include',
            ...options,
            headers: { ...headers, ...options?.headers },
        });
        const body = await res.json().catch(() => null);
        if (!res.ok) throw new ApiError(res.status, res.statusText, body);
        return body as TApiResponse<T>;
    }

    get<T = unknown>(url: string, options?: RequestInit) {
        return this.request<T>(url, { ...options, method: 'GET' });
    }

    post<T = unknown>(url: string, body: unknown, options?: RequestInit) {
        return this.request<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) });
    }

    put<T = unknown>(url: string, body: unknown, options?: RequestInit) {
        return this.request<T>(url, { ...options, method: 'PUT', body: JSON.stringify(body) });
    }

    delete<T = unknown>(url: string, options?: RequestInit) {
        return this.request<T>(url, { ...options, method: 'DELETE' });
    }
}

export const api = new Api(env.apiUrl);
