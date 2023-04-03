import { unstable_getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { authOptions } from "@/lib/auth";
import spotifyApi from "./spotify";
export async function getSession() {
  return await unstable_getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  return session;
}

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
//   clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "",
// });

export function useSpotify(session: any) {
  if (session) {
    //if refresh access token attempt fails, direct user to login again
    if (session.error == "refresh access token error") {
      console.log("refresh access token error");
      signIn();
    }
    if (session.user.accessToken) {
      console.log("found token");
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }
  return spotifyApi;
}
