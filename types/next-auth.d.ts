import { DefaultSession, DefaultUser } from 'next-auth';

// Extend the User model
declare module 'next-auth' {
  interface User extends DefaultUser {
    role?: string;
  }

  interface Session {
    user?: {
      id: string;
      role?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: string;
  }
}
