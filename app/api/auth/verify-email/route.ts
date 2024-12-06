import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';

const dbName = process.env.DB_NAME as string;

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { message: 'Invalid token format' },
      { status: 400 }
    );
  }

  await connectToDatabase(dbName);

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json(
      { message: 'Verification token is invalid or has expired' },
      { status: 400 }
    );
  }

  user.emailVerified = true;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return NextResponse.json(
    { message: 'Email has been verified' },
    { status: 201 }
  );
}
