import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./db/utils/jwt";

const isProtectedRoute = createRouteMatcher(["/plannings", "/ai-recommendation", "/paypal", "/my-plan"]);
const isApiRoute = createRouteMatcher(["/api/posts/[posts]"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    // Custom redirect to /sign-in
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  if (isApiRoute(req)) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Please login first" }, { status: 401 });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      return NextResponse.json({ message: "Invalid credential" }, { status: 401 });
    }

    try {
      const decode = await verifyToken<{
        id: string;
        name: string;
        username: string;
        email: string;
      }>(token);

      // Create a new headers object from the request headers
      const requestHeaders = new Headers(req.headers);

      // Create a NextResponse object to proceed with the request
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      // Set new response headers
      response.headers.set("x-user-email", decode.email);
      response.headers.set("x-user-id", decode.id);
      response.headers.set("x-user-username", decode.username);
      response.headers.set("x-user-name", decode.name);
      return response;
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  }

  // If not protected or API route, just continue
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
