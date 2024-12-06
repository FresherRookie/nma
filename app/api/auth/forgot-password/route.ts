import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';
import sendResetPassword from '@/helpers/sendResetPassword';

const dbName = process.env.DB_NAME as string;

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const headers = req.headers;
  const host = headers.get('host');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  await connectToDatabase(dbName);

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Set token and expiration
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  // Send the reset email
  const resetUrl = `http://${host}/auth/reset-password?token=${resetToken}`;
  await sendResetPassword({ to: user.email, resetLink: resetUrl });

  return NextResponse.json(
    { message: 'Password reset email sent' },
    { status: 200 }
  );
}
