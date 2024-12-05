import { NextApiRequest, NextApiResponse } from 'next';

import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';
const dbName = process.env.DB_Name as string;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.query;
  await connectToDatabase(dbName);
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) {
    return res.status(400).send('Verification token is invalid or has expired');
  }

  user.emailVerified = true;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
  res.send('Email has been verified');
}
