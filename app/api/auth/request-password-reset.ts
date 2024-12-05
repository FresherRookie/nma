import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';
import { Resend } from 'resend';
import ResetPasswordEmail from '@/emails/ResetPasswordEmail';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;
  await connectToDatabase(process.env.DB_NAME as string);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('No user with that email address');
  }
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000);
  await user.save();
  const resetLink = `http://${req.headers.host}/api/auth/reset-password/${token}`;

  try {
    await resend.emails.send({
      to: user.email,
      from: process.env.EMAIL_USER as string,
      subject: 'Password Reset',
      react: ResetPasswordEmail({ resetLink }),
    });
    res.status(200).send('Password reset email sent');
  } catch (error: any) {
    res.status(500).send(error.toString());
  }
}
