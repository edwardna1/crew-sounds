import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import NextAuth, { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { CallbacksOptions } from "next-auth/core/types";
import { useSession } from "next-auth/react";
import { Session } from "inspector";

const refreshAccessToken = async (token: JWT, account: Account) => {
  if (!token || !account || !account.access_token || !account.refresh_token) {
    console.log("undefined token");
    return {
      ...token,
      error: "refresh access token error",
    };
  }
  try {
    spotifyApi.setAccessToken(account.access_token);
    spotifyApi.setRefreshToken(account.refresh_token);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("Refresh toke nis", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? account.refresh_token,
      //replace new refresh token if it came back other wise use old one
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "refresh access token error",
    };
  }
};
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
    async jwt({ token, user, account, profile }): Promise<JWT> {
      // const { token, user, account, profile, isNewUser } = jwtParams;
      //initial sign in

      if (account && user) {
        if (account.access_token && account.refresh_token) {
          token.accessToken = account.access_token;
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: account?.expires_at
              ? account?.expires_at * 1000
              : 0,
          };
        }
      }
      if (!account?.expires_at) {
        return {};
      }

      //return previous token
      if (Date.now() < account.expires_at) {
        console.log("EXISTING TOKEN VALID");
        return token;
      }

      //Acess token expired
      return await refreshAccessToken(token, account);
    },

    async session({ session, token }) {
      if (token.accessToken && session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.name
      }

      return session;
    },
  },
});
