import bcryptjs from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { authBasePath } from "@/config/base-path";
import { signInSchema } from "@/schema/zod";
import {
  DEMO_OFFLINE_USER_ID,
  ensureDemoUserInDb,
  isDemoCredentials
} from "@/utils/demo-user";
import { getUserFromDb } from "@/utils/user";
import prisma from "@/utils/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  basePath: authBasePath,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Account",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const { email, password } = await signInSchema.parseAsync({
            email: String(credentials.email).trim().toLowerCase(),
            password: credentials.password
          });

          let user = await getUserFromDb(email);

          if (!user && isDemoCredentials(email, password)) {
            user = await ensureDemoUserInDb();
          }

          if (!user?.password) {
            if (isDemoCredentials(email, password)) {
              return { id: DEMO_OFFLINE_USER_ID, email };
            }
            return null;
          }

          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            if (isDemoCredentials(email, password)) {
              const repaired = await ensureDemoUserInDb();
              return { id: repaired.id, email: repaired.email };
            }
            return null;
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }

          const email = String(credentials?.email ?? "")
            .trim()
            .toLowerCase();
          const password = String(credentials?.password ?? "");

          if (isDemoCredentials(email, password)) {
            return { id: DEMO_OFFLINE_USER_ID, email };
          }

          console.error("[auth] authorize error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = (token.email as string) ?? session.user.email;
      }
      return session;
    }
  }
});
