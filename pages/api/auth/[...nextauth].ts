import { LOGIN_URL } from "@/lib/spotify";
import NextAuth, { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/github";
import { CallbacksOptions } from "next-auth/core/types";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "",
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET ?? "",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      // const { token, user, account, profile, isNewUser } = jwtParams;
      //initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
        };
      }
      return {};
    },
  },
});
