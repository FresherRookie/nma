import NextAuth, { DefaultSession } from 'next-auth';
import { User } from '../schemas/user';

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }
  interface UserAuth {
    id: string;
    email: string;
    role: 'admin' | 'manager' | 'user';
  }
}
