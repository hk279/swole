import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie") ?? undefined,
    },
  };

  console.log(`Received ${request.method} request to ${request.url}`);

  const session = await getSession({ req: requestForNextAuth });

  if (session?.user?.email == null) {
    console.log("Session not found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log(`Session user: ${session.user.email}`);

  const headers = new Headers(request.headers);
  headers.set("sessionEmail", session.user.email);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}
