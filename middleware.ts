import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthed = request.cookies.get("tp_session")?.value === "1";

  if (!isAuthed && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAuthed && request.nextUrl.pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"]
};
