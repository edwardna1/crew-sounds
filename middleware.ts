import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log(session);
  console.log(path);
  if (!session && path === "/protected" || path === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  return NextResponse.next();
}
