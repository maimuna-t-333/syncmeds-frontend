import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { AUTH_COOKIE_KEYS } from '@/lib/constants/auth.constants';
import { AUTH_ROUTES, PROTECTED_ROUTES } from '@/lib/constants/routes.constants';
import { isJwtExpired } from '@/lib/utils';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(AUTH_COOKIE_KEYS.ACCESS_TOKEN)?.value;
    const isAuthed = !!token && !isJwtExpired(token);

    if (PROTECTED_ROUTES.some((p) => pathname.startsWith(p)) && !isAuthed) {
        const url = request.nextUrl.clone();
        url.pathname = '/sign-in';
        const res = NextResponse.redirect(url);
        if (token) {
            res.cookies.delete(AUTH_COOKIE_KEYS.ACCESS_TOKEN);
            res.cookies.delete(AUTH_COOKIE_KEYS.REFRESH_TOKEN);
        }
        return res;
    }

    if (AUTH_ROUTES.some((p) => pathname.startsWith(p)) && isAuthed) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
