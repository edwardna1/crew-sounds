"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import {
  HomeIcon,
  HeartIcon,
  RssIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import SignOut from "./sign-out";
// import { useEffect } from "react";
import useSpotify from "hooks/useSpotify";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";

interface propsType {
  user: any;
  playlists: any;
}

function Sidebar({ user, playlists }: propsType) {
  // console.log("props", playlists);
  // const { data: session, status } = useSession();
  console.log("spotifyApi", user);
  // async function getPlaylistData() {
  //   if (spotifyApi.getAccessToken()) {
  //     spotifyApi.getUserPlaylists().then((data) => {
  //       return data.body.items;
  //     });
  //   }
  //   return {};
  // }
  // const playlistData: any = await getPlaylistData();
  // console.log("playlists", playlistData);
  console.log("is this");
  return (
    <>
      <div className="text-gray-500 p-10 text-sm border-r border-gray-900 flex whitespace-nowrap overflow-hidden scrollbar-hide h-screen">
        <div className="space-y-6">
          <div className="flex items-center mt-20">
            <SignOut />
          </div>

          <button className="flex items-center space-x-2 hover:text-white">
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <MagnifyingGlassIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <BuildingLibraryIcon className="h-5 w-5" />
            <p>Your Library</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <PlusCircleIcon className="h-5 w-5" />
            <p>Add</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900" />
          {playlists && playlists.map((playlist: any) => {
            // console.log(playlist.images[0].url)
            // console.log("a", playlist.images["url"])
            return (
              <button
                key={playlist.id}
                className="flex items-center space-x-2 hover:text-white"
              >
                <Image
                 width={150}
                  height={150}
                  src={playlist?.images[0]?.url ?? ""}
                  alt="Playlist image"
                  className="w-5 h-5" />
                <p>{playlist.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
