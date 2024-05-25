// middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Example: Check if the user is authenticated
    const isAuthenticated = false; // Replace with your actual authentication check

    // Detect if the path starts with /user
    if (pathname.startsWith('/user')) {

        if (pathname === '/user/forget-password' ) {
            return NextResponse.next();
        }

        // Redirect authenticated users from /user/login or /user/signup to their user page
        if ((pathname === '/user/login' || pathname === '/user/signup' || pathname === '/user') && isAuthenticated) {
            const userID = '123'; // Replace with actual user ID retrieval logic
            return NextResponse.redirect(new URL(`/user/${userID}`, request.url));
        }

        // Redirect to login if not authenticated and trying to access any /user path except /user/login or /user/signup
        if (!isAuthenticated && pathname !== '/user/login' && pathname !== '/user/signup') {
            return NextResponse.redirect(new URL('/user/login', request.url));
        }
    }

    // Continue with the request for other paths
    return NextResponse.next();
}

// Specify the paths to which the middleware should be applied
export const config = {
    matcher: ['/user/:path*'],
};
