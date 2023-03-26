import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import NextAuth, { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import { CallbacksOptions, NextAuthOptions } from "next-auth/core/types";

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
export const authOptions: NextAuthOptions = {
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
    async jwt({ token, account, user }): Promise<JWT> {
      const newToken: JWT = token;
      // console.log("user", user);
      // console.log("account", account);
      // console.log("Starting up JWT", newToken);
      //initial sign in

      if (account && user) {
        if (account.access_token && account.refresh_token) {
          newToken.accessToken = account.access_token;
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
      if (newToken && newToken.accessTokenExpires) {
        if (Date.now() < newToken?.accessTokenExpires) {
          // //return previous token
          console.log("EXISTING TOKEN VALID");
          return token;
        }
      } else if (account) {
        //Acess token expired
        return await refreshAccessToken(token, account);
      }
      return token
    },

    async session({ session, token }) {
      if (token.accessToken && session.user) {
        // console.log("Access token setting");
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.name;
      }

      return session;
    },
  },
};
