import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/recruit', '/mypage', '/outcome'],
};

export default function middleware(request: NextRequest) {
    /*
    const refreshToken = request.cookies.get('refreshToken');
    
    if (!refreshToken) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    */
    return NextResponse.next();
}
