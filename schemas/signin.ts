import { z } from 'zod';
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'password must be alteast 6 characters'),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
