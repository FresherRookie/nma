import { z } from 'zod';
export const newsPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  createdDate: z.date(),
  userId: z.string().min(1, 'Creator ID is required'),
  image: z.any().optional(),
});

export type TNewsPostData = z.infer<typeof newsPostSchema>;
