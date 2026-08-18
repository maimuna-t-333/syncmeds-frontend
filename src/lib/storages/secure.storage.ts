export class SecureStorage {
    async setItem(_key: string, _value: string): Promise<void> {}
    async getItem(_key: string): Promise<string | null> {
        return null;
    }
    async removeItem(_key: string): Promise<void> {}
}

export const secureStorage = new SecureStorage();
