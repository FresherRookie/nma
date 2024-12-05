import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getToken } from 'next-auth/jwt';
import connectToDatabase from '@/lib/mongodb';
import NewsPostForm from '@/models/NewsPost';

type TNewsPostDatabaseData = {
  title: string;
  content: string;
  createdDate: Date;
  userId: string;
  imgUrl: string;
};

async function checkRole(
  req: NextRequest,
  allowedRoles: string[]
): Promise<boolean> {
  const token = await getToken({ req });
  if (
    !token ||
    typeof token.role !== 'string' ||
    !allowedRoles.includes(token.role)
  ) {
    return false;
  }
  return true;
}

export const POST = async (req: NextRequest) => {
  const allowedRoles = ['admin', 'manage'];
  const roleValid = await checkRole(req, allowedRoles);
  if (!roleValid) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const uploadDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const formData = await req.formData();

  // Parse form fields
  const fields = Object.fromEntries(formData.entries());
  const { title, content, userId } = fields;

  // Parse the file
  const imageFile = formData.get('image') as File;
  if (!imageFile) {
    return NextResponse.json(
      { message: 'Image file is required' },
      { status: 400 }
    );
  }

  const newPath = path.join(uploadDir, `${Date.now()}_${imageFile.name}`);
  const buffer = Buffer.from(await imageFile.arrayBuffer());

  fs.writeFileSync(newPath, buffer);

  try {
    await connectToDatabase(process.env.DB_NAME as string);

    const newTitle = Array.isArray(title) ? title[0] : title;
    const newContent = Array.isArray(content) ? content[0] : content;
    const newUserId = Array.isArray(userId) ? userId[0] : userId;

    const newNewsPost: TNewsPostDatabaseData = {
      title: newTitle as string,
      content: newContent as string,
      imgUrl: `/${path.basename(newPath)}`,
      userId: newUserId as string,
      createdDate: new Date(),
    };

    const newsPost = new NewsPostForm(newNewsPost);
    await newsPost.save();

    return NextResponse.json(
      { message: 'News post created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving news post:', error);
    return NextResponse.json(
      { message: 'Failed to create news post', error },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  const allowedRoles = ['admin', 'manage'];
  const roleValid = await checkRole(req, allowedRoles);
  if (!roleValid) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  const uploadDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const formData = await req.formData();
  const fields = Object.fromEntries(formData.entries());
  const { title, content, userId, id } = fields;
  const createdDate = fields.createdDate as string;
  console.log(title, content, userId, id);

  const imageFile = formData.get('image') as File;
  let imgUrl = fields.imgUrl;
  if (imageFile) {
    const newPath = path.join(uploadDir, `${Date.now()}_${imageFile.name}`);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    fs.writeFileSync(newPath, buffer);
    imgUrl = `/${path.basename(newPath)}`;
  }

  try {
    await connectToDatabase(process.env.DB_NAME as string);
    const updatedPost = {
      title: Array.isArray(title) ? title[0] : title,
      content: Array.isArray(content) ? content[0] : content,
      userId: Array.isArray(userId) ? userId[0] : userId,
      imgUrl,
      createdDate: new Date(createdDate), // Keep the original creation date if necessary
    };
    await NewsPostForm.findByIdAndUpdate(id, updatedPost);
    return NextResponse.json(
      { message: 'News post updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating news post:', error);
    return NextResponse.json(
      { message: 'Failed to update news post', error },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const allowedRoles = ['admin', 'manage'];
  const roleValid = await checkRole(req, allowedRoles);
  if (!roleValid) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { message: 'Post ID is required' },
      { status: 400 }
    );
  }
  try {
    await connectToDatabase(process.env.DB_NAME as string);
    await NewsPostForm.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error', error);
    return NextResponse.json(
      { message: 'Failed to delete post' },
      { status: 500 }
    );
  }
};
