import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default function checkRole(allowedRoles: string[]) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
  ) => {
    console.log('checkRole middleware triggered');
    const token = await getToken({ req });
    if (
      !token ||
      typeof token.role !== 'string' ||
      !allowedRoles.includes(token.role)
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    } else {
      next();
    }
  };
}
