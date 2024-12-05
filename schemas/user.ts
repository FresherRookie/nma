import { z } from 'zod';
export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),

  role: z.enum(['admin', 'manager', 'user']),
});

export type UserZod = z.infer<typeof userSchema>;
