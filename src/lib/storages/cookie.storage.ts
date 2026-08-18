'use client';

type TSameSite = 'lax' | 'strict' | 'none';

type TCookieOptions = {
    maxAge?: number;
    path?: string;
    sameSite?: TSameSite;
    secure?: boolean;
};

export class CookieStorage {
    setItem(key: string, value: string, options?: TCookieOptions): void {
        if (typeof document === 'undefined') return;

        const path = options?.path ?? '/';
        const sameSite = options?.sameSite ?? 'lax';
        const secure = options?.secure ?? process.env.NODE_ENV === 'production';

        const parts = [
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
            `Path=${path}`,
            `SameSite=${sameSite[0].toUpperCase()}${sameSite.slice(1)}`,
        ];
        if (typeof options?.maxAge === 'number') parts.push(`Max-Age=${options.maxAge}`);
        if (secure) parts.push('Secure');

        // biome-ignore lint/suspicious/noDocumentCookie: This is a client-side storage class, so document.cookie is expected to be used.
        document.cookie = parts.join('; ');
    }

    getItem(key: string): string | null {
        if (typeof document === 'undefined') return null;
        const encoded = encodeURIComponent(key);
        const match = document.cookie.split('; ').find((row) => row.startsWith(`${encoded}=`));
        if (!match) return null;
        return decodeURIComponent(match.slice(encoded.length + 1));
    }

    removeItem(key: string, path = '/'): void {
        if (typeof document === 'undefined') return;
        // biome-ignore lint/suspicious/noDocumentCookie: This is a client-side storage class, so document.cookie is expected to be used.
        document.cookie = `${encodeURIComponent(key)}=; Path=${path}; Max-Age=0`;
    }

    has(key: string): boolean {
        return this.getItem(key) !== null;
    }
}

export const cookieStorage = new CookieStorage();
