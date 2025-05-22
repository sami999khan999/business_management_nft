import { NextResponse } from "next/server";

export function middleware() {
  // const authToken = request.cookies.get("userSession");

  // const isLoginOrSignupPage =
  //   request.nextUrl.pathname === "/login" ||
  //   request.nextUrl.pathname === "/signup";

  // // console.log(request.nextUrl.pathname);

  // if (authToken && isLoginOrSignupPage) {
  //   console.log("Auth Token:", authToken);
  //   const homepageUrl = new URL("/", request.url);
  //   return NextResponse.redirect(homepageUrl);
  // }

  // if (!authToken && !isLoginOrSignupPage) {
  //   const loginUrl = new URL("/login", request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
