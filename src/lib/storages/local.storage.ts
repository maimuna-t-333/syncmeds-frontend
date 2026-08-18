export class LocalStorage {
    async setItem(key: string, value: string): Promise<void> {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(key, value);
    }

    async getItem(key: string): Promise<string | null> {
        if (typeof window === 'undefined') return null;
        return window.localStorage.getItem(key);
    }

    async removeItem(key: string): Promise<void> {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem(key);
    }

    async clear(): Promise<void> {
        if (typeof window === 'undefined') return;
        window.localStorage.clear();
    }
}

export const storage = new LocalStorage();
