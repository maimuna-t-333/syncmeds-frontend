export const isJwtExpired = (token: string): boolean => {
    try {
        const payload = token.split('.')[1];
        if (!payload) return true;
        const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as {
            exp?: number;
        };
        if (typeof json.exp !== 'number') return true;
        return Date.now() >= json.exp * 1000;
    } catch {
        return true;
    }
};
