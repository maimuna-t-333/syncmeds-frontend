export const AUTH_STORAGE_KEYS = {
    USER: 'user',
} as const;

export const AUTH_COOKIE_KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
} as const;

export const AUTH_COOKIE_MAX_AGE = {
    ACCESS_TOKEN: 60 * 60 * 24,
    REFRESH_TOKEN: 60 * 60 * 24 * 30,
} as const;
