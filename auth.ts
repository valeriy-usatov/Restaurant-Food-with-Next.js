// import NextAuth from 'next-auth';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/utils/connect';
import { User } from '@/types/types';

type JWT = {
  isAdmin: boolean;
  email?: string;
  name?: string;
};

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

declare module 'next-auth' {
  interface JWT {
    isAdmin: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: process.env.NODE_ENV !== 'production', // Разрешить localhost только в режиме разработки
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [GitHub, Google],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = (token as JWT).isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      token.isAdmin = userInDb?.isAdmin ?? false; // устанавливаем значение по умолчанию
      return token;
    },
  },
});

export const getAuthSession = () => auth(); /* получаем сесию на стороне сервера */
