import { NextResponse } from 'next/server';

const ipCache = new Map();

// Simple in-memory rate limiter (Token Bucket)
// Production: Use Redis/Upstash
function rateLimit(ip) {
    const limit = 10; // 10 requests
    const windowMs = 10 * 1000; // per 10 seconds

    const now = Date.now();
    const record = ipCache.get(ip) || { count: 0, startTime: now };

    if (now - record.startTime > windowMs) {
        // Reset window
        ipCache.set(ip, { count: 1, startTime: now });
        return true;
    }

    if (record.count >= limit) {
        return false;
    }

    record.count += 1;
    ipCache.set(ip, record);
    return true;
}

export default function proxy(request) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Only rate limit API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        if (!rateLimit(ip)) {
            return new NextResponse(
                JSON.stringify({ error: 'Too many requests' }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    const response = NextResponse.next();

    // Add Security Headers
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
