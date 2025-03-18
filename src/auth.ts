import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { ERROR_MESSAGES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
// import { signInSchema } from "@/lib/dtos";
// import { compare } from "bcryptjs";
// import { signInSchema } from "./lib/validation-schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },
     
      async authorize(credentials) {

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          });

        // const user = await findUserByEmail(credentials.email);
        if (!user) return null;
      
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }

      return token;
    },

    session: async ({ session, token }) => ({
      ...session,
      user: {
        id: token.sub,
        email: token.email,
      },
    }),
  },
});
