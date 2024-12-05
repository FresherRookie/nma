import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectToDatabase from '@/lib/mongodb';
import Course from '@/models/Course';

export async function GET() {
  await connectToDatabase(process.env.DB_NAME as string);
  const courses = await Course.find({}).populate('instrument');
  return NextResponse.json(courses, { status: 200 });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  console.log(token?.role);
  const userRole = token?.role || 'user';

  if (userRole !== 'admin' && userRole !== 'manage') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const body = await req.json();

    console.log('creating New Course', body);
    const { courseData } = body;
    const {
      name,
      instrument,
      sessionsPerWeek,
      grade,
      description,
      userId,
      createdDate,
      backgroundColor,
    } = courseData;
    const newCourse = new Course({
      name,
      instrument,
      sessionsPerWeek,
      grade,
      description,
      userId,
      createdDate,
      backgroundColor,
    });
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('Error parsing JSON', error);
    return NextResponse.json({ error: 'Invalid Json Data' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  const userRole = token?.role || 'user';

  if (userRole !== 'admin' && userRole !== 'manage') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();

  const { courseData } = body;

  const {
    id,
    name,
    instrument,
    sessionsPerWeek,
    grade,
    description,
    userId,
    createdDate,
    backgroundColor,
  } = courseData;

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      name,
      instrument,
      sessionsPerWeek,
      grade,
      description,
      userId,
      createdDate,
      backgroundColor,
    },
    { new: true }
  );

  if (!updatedCourse) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json(updatedCourse, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  const userRole = token?.role || 'user';

  if (userRole !== 'admin' && userRole !== 'manage') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Course ID is required' },
      { status: 400 }
    );
  }

  await Course.findByIdAndDelete(id);
  return NextResponse.json(
    { message: 'Course deleted successfully' },
    { status: 200 }
  );
}
