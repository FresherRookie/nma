import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;
  const { password } = req.body;
  await connectToDatabase(process.env.DB_NAME as string);
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return res
      .status(400)
      .send('Password reset link is invalid or has expired');
  }
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
}
