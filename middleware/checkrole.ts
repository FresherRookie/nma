import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default function checkRole(allowedRoles: string[]) {
  return async (req: NextRequest, res: NextResponse, next: () => void) => {
    console.log('checkRole middleware triggered');
    const token = await getToken({ req });

    if (
      !token ||
      typeof token.role !== 'string' ||
      !allowedRoles.includes(token.role)
    ) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    } else {
      next();
    }
  };
}
