import NextAuth from "next-auth";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { compare } from "bcrypt-ts";
import { signInSchema } from "@/lib/zod";
import { getUserByEmail } from "@/services/user-service";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import type { Adapter } from "@auth/core/adapters";

const adapter = PrismaAdapter(prisma) as Adapter;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, account }) {
      // console.log("🚀 ~ jwt ~ account:", account);
      // console.log("🚀 ~ jwt ~ user:", user);
      // console.log("🚀 ~ jwt ~ token:", token);

      // if (user) {
      //   // User is available during sign-in
      //   token.role = user.role;
      //   token.image = user.image;
      // }

      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      return token;
    },
    // session({ session, token }) {
    //   console.log("🚀 ~ session ~ token:", token);
    //   console.log("🚀 ~ session ~ session:", session);
    //   //NOTE: just use this if you want to update the session with jwt instead of databse strategy
    //   // session.user.role = token.role as string;
    //   // session.user.image = token.image as string;
    //   return session;
    // },
  },
  jwt: {
    encode: async (params) => {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) throw new Error("Failed to create session");

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);
        const user = await getUserByEmail(email);

        const isPasswordValid = await compare(password, user?.password ?? "");

        if (!isPasswordValid) throw new Error("Invalid password");

        return user;

        // return {
        //   id: user.id.toString(),
        //   name: user.name,
        //   email: user.email,
        //   role: user.role,
        //   image: user.image,
        // };
      },
    }),
    GitHub,
    Google,
  ],
});
