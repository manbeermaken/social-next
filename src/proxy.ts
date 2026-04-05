import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest){
    const accessToken = request.cookies.get("accessToken")?.value
    const refreshToken = request.cookies.get("refreshToken")?.value

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!accessToken && refreshToken) {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token:refreshToken })
            });

            if (!res.ok) {
                const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
                redirectResponse.cookies.delete('accessToken');
                redirectResponse.cookies.delete('refreshToken');
                return redirectResponse;
            }

            const data = await res.json();
            const newAccessToken = data.accessToken; 

            if (newAccessToken) {
                const requestHeaders = new Headers(request.headers);
                requestHeaders.set("x-access-token",newAccessToken)

                const response = NextResponse.next({
                    request: {
                        headers: requestHeaders
                    }
                })
                response.cookies.set({
                    name: 'accessToken',
                    value: newAccessToken,
                    httpOnly: true,
                    secure: process.env.NODE_ENV == "production",
                    path: '/',
                    maxAge: 60 * 14  
                });

                return response
            }
        } catch (error) {
            console.error("Token refresh network error:", error);
            const errorResponse = NextResponse.redirect(new URL('/login', request.url));
            return errorResponse;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [/*
         * Match all request paths except for the ones starting with:
         * - login (your login page)
         * - signup (your signup page)
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (Metadata files)
         */
        '/((?!login|signup|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}