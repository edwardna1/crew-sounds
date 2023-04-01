import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import SignOut from "@/components/sign-out";
import { getCurrentUser, useSpotify } from "@/lib/session";
import { User } from "@prisma/client";
// import useSpotify from "hooks/useSpotify";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { getPlaylistData, getTopTracks } from "util/spotifyUtil";

export default async function Home() {
  const session = await getCurrentUser();
const spotifyApi = useSpotify(session);
  const plays = await getPlaylistData()
  const tracks = await getTopTracks()
  // const Sidebars = await Sidebar();
  return (
    <div className="h-screen bg-black overflow-hidden">
      <main className="flex">
        {/* {Sidebars} */}
        <Sidebar playlists={plays} user={session?.user} />
        <Center session={session} tracks={tracks}/>
        {/* {CenterDiv} */}
      </main>

      {/* <div className="w-screen h-screen flex space-y-5 justify-center items-center"> */}
      {/* <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full max-w-screen-lg aspect-video"
        ></iframe> */}
      {/* <SignOut /> */}
      {/* </div> */}
    </div>
  );
}
