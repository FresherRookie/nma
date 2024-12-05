import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectToDatabase from '@/lib/mongodb';
import Instrument from '@/models/Instrument';

export async function GET(req: NextRequest) {
  await connectToDatabase(process.env.DB_NAME as string);
  const instruments = await Instrument.find({});
  return NextResponse.json(instruments, { status: 200 });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const userRole = token?.role || 'guest';

  if (userRole !== 'admin' && userRole !== 'manager') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { name, description } = await req.json();
    const newInstrument = new Instrument({ name, description });
    await newInstrument.save();
    return NextResponse.json(newInstrument, { status: 201 });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  const userRole = token?.role || 'guest';
  if (userRole !== 'admin' && userRole !== 'manage') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const { id, name, description } = await req.json();
    const updatedInstrument = await Instrument.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedInstrument) {
      return NextResponse.json(
        { error: 'Instrument not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedInstrument, { status: 200 });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  const userRole = token?.role || 'guest';

  if (userRole !== 'admin' && userRole !== 'manager') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Instrument ID is required' },
      { status: 400 }
    );
  }

  try {
    await Instrument.findByIdAndDelete(id);
    return NextResponse.json(
      { message: 'Instrument deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting instrument:', error);
    return NextResponse.json(
      { error: 'Failed to delete instrument' },
      { status: 500 }
    );
  }
}
