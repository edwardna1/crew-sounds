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
    await spotifyApi.getMytopArtists().then((data: any) => {
      console.log("success");
      return data.body.items;
    });
  }
  return {};
}

type Artists = {
  short_term: object;
  medium_term: object;
  long_term: object;
};

export default async function Home() {
  const session = await getCurrentUser();
  const spotifyApi = useSpotify(session);
  let plays;
  let artists: Artists = {
    short_term: [],
    medium_term: [],
    long_term: []
  };
  if (spotifyApi.getAccessToken()) {
    plays = await spotifyApi.getMyTopArtists().then((data: any) => {
      console.log("success");
      return data.body.items;
    });
    const artistShort = await spotifyApi
      .getMyTopArtists({ time_range: "short_term" })
      .then((data: any) => {
        console.log("success");
        return data.body.items;
      });
    const artistMedium = await spotifyApi
      .getMyTopArtists({ time_range: "medium_term" })
      .then((data: any) => {
        console.log("success");
        return data.body.items;
      });
    const artistLong = await spotifyApi
      .getMyTopArtists({ time_range: "long_term" })
      .then((data: any) => {
        console.log("success");
        return data.body.items;
      });
    artists.short_term = artistShort;
    artists.medium_term = artistMedium;
    artists.long_term = artistLong;
  }

  // const Sidebars = await Sidebar();
  console.log("plays", artists);
  return (
    <div className="h-screen bg-black overflow-hidden">
      <main className="flex">
        {/* {Sidebars} */}
        <Sidebar playlists={plays} user={session?.user} />
        <Center session={session} artists={artists} />
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
