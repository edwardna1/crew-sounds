import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { getCurrentUser } from "@/lib/session";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "",
});

function useSpotify() {
  const { data: session, status } = useSession();
  console.log("use sess", session)
  useEffect(() => {
    console.log("Im here")
    if (session) {

      //if refresh access token attempt fails, direct user to login again
      if ((session.error = "refresh access token error")) {
        console.log("refresh access token error");
        signIn();
      }
      if (session.user.accessToken) {
        console.log("found token");
        spotifyApi.setAccessToken(session.user.accessToken);
      }
    }
  }, [session]);
  return spotifyApi;
}

export default useSpotify;
