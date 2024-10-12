import type { NextRequest } from "next/server";
import { verifyToken } from "@/utils/jwt";

export default async function middleware(request: NextRequest) {
	// get token from cookies
	const token = request.cookies.get("token")?.value;

	const validToken = token ? (await verifyToken(token)) as any : null;
	const currentUserId = validToken?.userId;

	// if no current user and not on login page or signup page, redirect to login
	if (
		!currentUserId &&
		!request.nextUrl.pathname.startsWith("/login") &&
		!request.nextUrl.pathname.startsWith("/signup")
	) {
		const url = request.nextUrl.clone();
		url.pathname = "/signup";
		return Response.redirect(url);
	}

	// if user is logged in and tries to go to login or signup page, redirect to dashboard
	if (
		currentUserId &&
		(request.nextUrl.pathname.startsWith("/login") ||
		 request.nextUrl.pathname.startsWith("/signup"))
	) {
		const url = request.nextUrl.clone();
		url.pathname = "/dashboard";
		return Response.redirect(url);
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
