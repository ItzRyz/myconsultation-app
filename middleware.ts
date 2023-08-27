import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

class getRoute {
  request: NextRequest;
  isStartWith: boolean = true;

  constructor(request: NextRequest) {
    this.request = request;
  }

  is(route: string) {
    this.isStartWith =
      this.isStartWith && this.request.nextUrl.pathname.startsWith(route);
    return this;
  }

  except(route: string) {
    this.isStartWith =
      this.isStartWith && !this.request.nextUrl.pathname.startsWith(route);

    console.log(this.isStartWith);
    return this;
  }

  get() {
    return this.isStartWith;
  }
}

export function middleware(request: NextRequest) {
  if (new getRoute(request).is("/").except("/login").except("/register")) {
    if (!request.cookies.get("token") && !request.cookies.get("user"))
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/transfer", "/history"],
};
