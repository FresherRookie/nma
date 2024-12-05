import { z } from 'zod';
export const newsSubmissionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  createdDate: z.date(),
  userId: z.string().min(1, 'Creator ID is required'),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Max image size is 5MB')
    .optional(),
  imgUrl: z.string().optional(),
});
export type TnewsSubmissionSchema = z.infer<typeof newsSubmissionSchema>;
