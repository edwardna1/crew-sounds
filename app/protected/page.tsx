import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import SignOut from "@/components/sign-out";
import { getCurrentUser, useSpotify } from "@/lib/session";
import { User } from "@prisma/client";
// import useSpotify from "hooks/useSpotify";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { getAverageColor } from "fast-average-color-node";
import {
  getPlaylistData,
  getTopTracks,
  printAverageColor,
  SpotifyService,
  wordMap,
} from "util/spotifyUtil";

type Artists = {
  short_term: SpotifyApi.UsersTopArtistsResponse[];
  medium_term: SpotifyApi.UsersTopArtistsResponse[];
  long_term: SpotifyApi.UsersTopArtistsResponse[];
};

export default async function Home() {
  const spotifyService = new SpotifyService();
  const session = await getCurrentUser();
  const spotifyApi = useSpotify(session);
  // const plays = await getPlaylistData()
  // const tracks = await getTopTracks()
  // const Sidebars = await Sidebar();
  let plays;
  let artists: Artists = {
    short_term: [],
    medium_term: [],
    long_term: [],
  };
  artists.short_term = await spotifyService.getTopArtists("short_term");
  artists.medium_term = await spotifyService.getTopArtists("medium_term");
  artists.long_term = await spotifyService.getTopArtists("long_term");
  const color = await printAverageColor(session?.user.image);
  // const CenterDiv = await Center()
  const artistsmap = await wordMap(artists.short_term);
  return (
    <div className="h-screen bg-black overflow-hidden">
      <main className="flex">
        {/* {Sidebars} */}
        {/* <Sidebar playlists={plays} user={session?.user} /> */}
        <Center
          color={color}
          session={session}
          artists={artists}
          artistsMap={artistsmap}
        />
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
