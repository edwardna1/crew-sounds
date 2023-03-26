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

interface propsType {
  user: any;
}

function Sidebar(props: propsType) {
  // const spotifyApi = useSpotify();
  // const { data: session, status } = useSession();
  console.log("sesh", props);
  // const [playlists, setPlaylists] = useState<any[]>([]);
  // useEffect(() => {
  //   console.log("spotifyApi.getAccessToken()", spotifyApi.getAccessToken());
  //   if (spotifyApi.getAccessToken()) {
  //     spotifyApi.getUserPlaylists().then((data) => {
  //       setPlaylists(data.body.items);
  //     });
  //   }
  //   console.log("playlists", playlists);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [session, spotifyApi]);
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
        </div>
      </div>
    </>
  );
}

export default Sidebar;
