import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: any) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("Benjwt")?.value;

  if (!token) return NextResponse.redirect(new URL("/404", req.url));

  try {
    const decoded: any = jwtDecode(token);
    if (decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/404", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*"],
};

