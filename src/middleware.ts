import { NextRequest, NextResponse } from "next/server";

/** 비로그인시 로그인 페이지로 리디렉션 해줘야할 경로들 */
export const config = {
  matcher: ["/recruit", "/mypage", "/auth/reset", "/outcome"],
};
export default function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");

  // if (!refreshToken) {
  //   return NextResponse.redirect(new URL("/auth/signin", request.url));
  // }

  return NextResponse.next();
}
