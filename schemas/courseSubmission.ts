import { z } from 'zod';

export const courseSubmissionSchema = z.object({
  name: z.string().min(1, 'Course name is required'),
  createdDate: z.date(),
  instrument: z.string().min(1, 'Instrument is required'),
  sessionsPerWeek: z.number().min(1, 'At least 1 session per week is required'),
  grade: z.string().min(1, 'Grade is required'),
  description: z.string().optional(),
  userId: z.string().min(1, 'Creator ID is required'),
  backgroundColor: z.string().optional(),
});

export type TCourseSubmissionSchema = z.infer<typeof courseSubmissionSchema>;
