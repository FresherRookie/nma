import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { userSchema } from '@/schemas/user';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          await connectToDatabase(process.env.DB_NAME as string);
          console.log(credentials?.password);
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error('Invalid email');
          }
          const plainTextPassword = credentials?.password ?? '';

          const isValid = await bcrypt.compare(
            plainTextPassword,
            user.password
          );
          console.log('Comparison result:', isValid);
          if (!isValid) {
            throw new Error('Incorrect password');
          }
          const parsedUser = userSchema.parse({
            name: user.name,
            email: user.email,
            role: user.role,
          });
          return {
            id: user._id.toString(),
            name: parsedUser.name,
            email: parsedUser.email,
            role: parsedUser.role,
          };
        } catch (error) {
          console.log('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-email', // (used for check email message)
    newUser: undefined, // If set, new users will be directed here on first sign in (leave null to disable)
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
