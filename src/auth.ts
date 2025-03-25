import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Linkedin from "next-auth/providers/linkedin";
import { prisma } from "./lib/prisma";
import { loginSchema } from "./types/form-schema";
import { TAuthUser } from "./types/common";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validation = loginSchema.safeParse(credentials);
        if (!validation.success) {
          console.log({ error: validation.error });
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
          include: {
            role: true,
          },
        });
        if (!user) return null;

        // // check if password match
        // const isValidPassword = await authService.verifyPasswordMatch(
        //   user.password,
        //   credentials.password as string
        // );

        // if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role?.name || "user",
        };
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

      if (isLoggedIn && pathname.startsWith("/login")) {
        return Response.redirect(new URL("/user", nextUrl));
      }

      return !!auth;
    },
    jwt({ token, user }) {
      if (user) {
        const typedUser = user as TAuthUser;

        token.id = typedUser.id;
        token.firstName = typedUser.firstName;
        token.lastName = typedUser.lastName;
        token.role = typedUser.role;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.user = {
        id: token.id,
        firstName: token.firstName,
        lastName: token.lastName,
        role: token.role,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
});
