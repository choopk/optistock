import { User as PrismaUser } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User
    extends Omit<PrismaUser, "password" | "name" | "email" | "image"> {
    name: string | null;
    email: string | null;
    image: string | null;
  }

  interface Session {
    user?: User;
    expires: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** add user object to jwt */
    user?: Omit<PrismaUser, "password">;
  }
}
