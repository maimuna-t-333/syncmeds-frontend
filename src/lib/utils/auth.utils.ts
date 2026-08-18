import { AUTH_COOKIE_KEYS, AUTH_COOKIE_MAX_AGE } from '@/lib/constants/auth.constants';
import { cookieStorage } from '@/lib/storages/cookie.storage';
import type { TAuthTokens } from '@/lib/types';

export const writeAuthCookies = ({ accessToken, refreshToken }: TAuthTokens) => {
    cookieStorage.setItem(AUTH_COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
        maxAge: AUTH_COOKIE_MAX_AGE.ACCESS_TOKEN,
    });
    cookieStorage.setItem(AUTH_COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
        maxAge: AUTH_COOKIE_MAX_AGE.REFRESH_TOKEN,
    });
};

export const clearAuthCookies = () => {
    cookieStorage.removeItem(AUTH_COOKIE_KEYS.ACCESS_TOKEN);
    cookieStorage.removeItem(AUTH_COOKIE_KEYS.REFRESH_TOKEN);
};
