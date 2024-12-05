import { NextRequest, NextResponse } from 'next/server';
import checkRole from '@/middleware/checkrole';

export async function GET(req: NextRequest) {
  const response = NextResponse.next();

  await checkRole(['admin', 'manager'])(req, response, () => {
    NextResponse.json(
      { message: 'Welcome to the admin page' },
      { status: 200 }
    );
  });

  return response;
}
