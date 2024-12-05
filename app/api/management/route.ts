import { NextApiRequest, NextApiResponse } from 'next';
import checkRole from '@/middleware/checkrole';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await checkRole(['admin', 'manager'])(req, res, () => {
    res.status(200).json({ message: 'Welcome to the admin page' });
  });
}
