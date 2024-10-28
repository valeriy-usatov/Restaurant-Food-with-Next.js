import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from '@/utils/connect';

declare module "next-auth" {
  interface Session {
    user:User & {
      isAdmin: Boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy:"jwt"
  },
  providers: [GitHub, Google],
  callbacks:{
    async session({token, session}){
      if(token){
        session.user.isAdmin = token.isAdmin
      }
      return session
    },
    async jwt({token}){
      const userInDb = await prisma.user.findUnique({
        where:{
          email:token.email!
        }
      })

      token.isAdmin = userInDb?.isAdmin!;
      return token;
    }

  }
});


export const getAuthSession = () =>auth() /* получаем сесию на стороне сервера */