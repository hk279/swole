import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
};

// Use it in server contexts
// export function auth(
//   ...args:
//     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   return getServerSession(...args, config);
// }
