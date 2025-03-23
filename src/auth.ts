import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Linkedin from "next-auth/providers/linkedin";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });
        if (!user) return null;

        // check if password match

        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Linkedin({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const { pathname } = nextUrl;
      const isLoggedIn = !!auth?.user;
      console.log({ isLoggedIn, auth, state: !auth });

      if (isLoggedIn && pathname.startsWith("/auth/login")) {
        return Response.redirect(new URL("/user", nextUrl));
      }

      return !!auth;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
});
