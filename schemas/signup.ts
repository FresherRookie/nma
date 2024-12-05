import { z } from 'zod';
export const signUpSchema = z
  .object({
    name: z.string().min(3, 'Name must be atleast 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'password must be alteast 6 characters'),
    confirmPassword: z.string().min(6, 'password must be alteast 6 characters'),
    role: z.enum(['admin', 'manager', 'user']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
