import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import SignOut from "@/components/sign-out";
import { getCurrentUser, useSpotify } from "@/lib/session";
import { User } from "@prisma/client";
// import useSpotify from "hooks/useSpotify";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

async function getPlaylistData(spotifyApi: any) {
  if (spotifyApi.getAccessToken()) {
    console.log("im here");
    await spotifyApi.getUserPlaylists().then((data: any) => {
      console.log("success");
      return data.body.items;
    });
  }
  return {};
}

export default async function Home() {
  const session = await getCurrentUser();
  const spotifyApi = useSpotify(session);
  let plays = {};
  if (spotifyApi.getAccessToken()) {
    plays = await spotifyApi.getUserPlaylists().then((data: any) => {
      console.log("success");
      return data.body.items;
    });
  }
  // const Sidebars = await Sidebar();
  console.log("plays", plays);
  return (
    <div className="h-screen bg-black overflow-hidden">
      <main className="flex">
        {/* {Sidebars} */}
        <Sidebar playlists={plays} user={session?.user} />
        <Center session={session} />
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
