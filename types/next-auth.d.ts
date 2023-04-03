import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    error?: string | null;
    user: {
      /** The user's postal address. */
      accessToken?: string | null;
      refreshToken?: string | null;
      username?: string | null;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    name: string | null;
    email: string | null;
    picture: string | null;
    sub: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpires: number | null;
    iat: number | null;
    exp: number | null;
    jti: string | null;
    /** OpenID ID Token */
    // accessToken?: string | null;
    // refreshToken?: string | null;
  }
}
