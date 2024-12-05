import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { JWT } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Explicitly type the token as JWT or null
  const token = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as JWT | null;

  // Log the token and role for debugging

  const url = req.nextUrl.clone();
  // Handle token being null or missing the role
  if (
    !token ||
    typeof token.role !== 'string' ||
    !['admin', 'manager'].includes(token.role)
  ) {
    url.pathname = '/no-access';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ['/management/:path*'] };
