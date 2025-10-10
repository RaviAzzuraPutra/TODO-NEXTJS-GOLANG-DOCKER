import { NextResponse } from "next/server";

export function authMiddleware(req) {
    const token = req.cookies.get("access_token") || req.headers.get("Authorization");
    const url = req.nextUrl.clone();

    if (!token && url.pathname.startsWith("/todo")) {
        url.pathname = 'login'
        return NextResponse.redirect(url);
    }

    if (token && url.pathname === "/login") {
        const slug = req.cookies.get("slug");
        url.pathname = `/todo/${slug}/home`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/todo/:path*"]
}