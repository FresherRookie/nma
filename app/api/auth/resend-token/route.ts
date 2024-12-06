import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';
import sendVerificationEmail from '@/helpers/sendVerificationEmail';
import crypto from 'crypto';

const dbName = process.env.DB_NAME as string;

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const headers = req.headers;
  const host = headers.get('host');

  if (!token) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
  }

  await connectToDatabase(dbName);

  const user = await User.findOne({
    resetPasswordToken: token,
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  // Generate a new token (implement your own token generation logic)
  const newToken = crypto.randomBytes(20).toString('hex'); // Replace with actual token generation logic
  user.resetPasswordToken = newToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Send new verification email
  await sendVerificationEmail({
    to: user.email,
    verificationUrl: `http://${host}/api/auth/verify-email?token=${newToken}`,
  });

  return NextResponse.json(
    { message: 'New verification email sent' },
    { status: 200 }
  );
}
