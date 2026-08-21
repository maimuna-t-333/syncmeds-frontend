import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = [
    '/dashboard',
    '/customers',
    '/products',
    '/inventory',
    '/sales',
    '/settings',
    '/users',
];
const publicRoutes = ['/login', '/sign-in'];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('syncmeds-auth-token')?.value;

    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    // Protect dashboard routes
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('expired', 'true');
        return NextResponse.redirect(loginUrl);
    }

    // Redirect logged-in users away from login page
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
