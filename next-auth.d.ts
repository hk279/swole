// Expanding the next-auth session type with the id-field.
// TODO: All prisma queries can now be changed to use user ID instead of email

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
