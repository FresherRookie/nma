import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { z } from 'zod';
import { signUpSchema } from '@/schemas/signup';

import sendVerificationEmail from '@/helpers/sendVerificationEmail';

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const headers = req.headers;
  const host = headers.get('host');
  // console.log('Host', host);
  // console.log('Request Body', requestBody);

  const parsedBody = signUpSchema.parse(requestBody);
  //console.log(parsedBody);
  await connectToDatabase(process.env.DB_NAME as string);

  const existingUser = await User.findOne({ email: parsedBody.email });

  if (existingUser) {
    return NextResponse.json(
      { error: 'User already exists with this email.' },
      { status: 400 }
    );
  }
  const salt = await bcrypt.genSalt(12);
  const password = parsedBody.password;
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: parsedBody.name,
    email: parsedBody.email,
    password: hashedPassword,
    role: parsedBody.role || 'user',
    emailVerified: false,
    resetPasswordToken: null,
    resetPasswordExpire: null,
  });

  await user.save();
  //create email verification token
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000);
  await User.updateOne(
    { _id: user.id },
    {
      resetPasswordToken: user.resetPasswordToken,
      resetPasswordExpires: user.resetPasswordExpires,
    }
  );

  //send Verification email

  const verificationUrl = `http://${host}/api/auth/verify-email/${token}`;

  try {
    await sendVerificationEmail({ to: user.email, verificationUrl });
    return NextResponse.json(
      { message: 'User created successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during Signup', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
