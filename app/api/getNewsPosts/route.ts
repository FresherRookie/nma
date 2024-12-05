import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import NewsPostForm from '@/models/NewsPost';

export const GET = async () => {
  try {
    await connectToDatabase(process.env.DB_NAME as string);
    const posts = await NewsPostForm.find().sort({ createdDate: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch posts', error },
      { status: 500 }
    );
  }
};
