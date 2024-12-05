import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';
import { Resend } from 'resend';
import ResetPasswordEmail from '@/emails/ResetPasswordEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    await connectToDatabase(process.env.DB_NAME as string);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'No user with that email address' },
        { status: 400 }
      );
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    const resetLink = `http://${req.headers.get(
      'host'
    )}/api/auth/reset-password/${token}`;

    await resend.emails.send({
      to: user.email,
      from: process.env.EMAIL_USER as string,
      subject: 'Password Reset',
      react: ResetPasswordEmail({ resetLink }),
    });

    return NextResponse.json(
      { message: 'Password reset email sent' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
