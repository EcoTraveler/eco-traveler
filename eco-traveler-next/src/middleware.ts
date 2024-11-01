import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./db/utils/jwt";

export async function middleware(request: NextRequest) {
  const auth = cookies().get("Authorization")?.value;
  if (request.nextUrl.pathname.startsWith("/api/posts/[posts]") && !auth) {
    return NextResponse.json({ message: "Please Login first" });
  }
  if (!auth) return NextResponse.json({ message: "Please Login first" });
  const [type, token] = auth.split(" ");
  if (type !== "Bearer") {
    return NextResponse.json(
      { message: "Invalid credential" },
      { status: 401 }
    );
  }
  const decode = await verifyToken<{
    id: string;
    name: string;
    username: string;
    email: string;
  }>(token);

  const requestHeaders = new Headers(request.headers);

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set("x-user-email", decode.email);
  response.headers.set("x-user-id", decode.id);
  response.headers.set("x-user-username", decode.username);
  response.headers.set("x-user-name", decode.name);
  return response;
}
export const config = {
  matcher: ["/api/posts/:path*"],
};
