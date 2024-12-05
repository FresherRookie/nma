import { NextResponse, NextRequest } from 'next/server';

import connectToDatabase from '@/lib/mongodb';
import ContactForm from '@/models/ContactFormSchema';

export async function POST(req: NextRequest) {
  // const body: unknown = await req.json();
  // console.log({ body });
  //const result = contactFormSchema.safeParse(body);

  //let zodErrors = {};

  //if (!result.success) {
  //// result.error.issues.forEach((issue) => {
  // zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
  // });
  // }

  await connectToDatabase('northmusicacademy');

  console.log('connected to DB');

  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    const contactMessage = new ContactForm({
      name,
      email,
      subject,
      message,
      createdat: new Date(),
    });
    await contactMessage.save();

    return NextResponse.json(
      { message: 'Your message have been received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving feedback:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
// const newContactMessage = new ContactForm(result);
// await newContactMessage.save();

//   return NextResponse.json(
//     Object.keys(zodErrors).length > 0
//       ? { errors: zodErrors }
//       : { success: true, message: 'Message successfully sent' }
//   );
