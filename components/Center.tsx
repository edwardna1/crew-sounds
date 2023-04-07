"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import WordCloudWidget from "./WordCloudWidget";
import { printAverageColor } from "util/spotifyUtil";
import { color } from "d3";
import { WordMap } from "../types/index";

type centerProps = {
  session: any;
  artists: any;
  color: string;
  artistsMap: WordMap[];
};
function Center(props: centerProps) {
  const [color, setColor] = useState("from-[#ffffff]");
  // const user = await getCurrentUser();
  // console.log("session home", user);
  const user = props.session.user;
  const artists = props.artists;
  useEffect(() => {
    setColor(`from-[${props.color}]`);
  }, [props.color]);
  console.log("sss", color);
  return (
    <div className="flex-grow text-white scrollbar overflow-auto">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer p-1 pl-2 pr-2 rounded-full">
          <Image
            width={10000}
            height={10000}
            src={user?.image ?? "/logo.png"}
            // src="/logo.png"
            alt="Spotify profile image"
            className="w-10 h-10 rounded-full"
          />
          {/* <h2 className="font-link">{user?.name ?? "testing"}</h2> */}
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      {color && (
        <section
          className={`flex items-end space-x-7 bg-gradient-to-b to-black h-1/6 text-white padding-8 ${color}`}
        ></section>
      )}
      <section>
        {/* <WordCloud wordList={artists.short_term.length ?? []} /> */}
        {artists.short_term.length > 0 && (
          <div className="bg-inherit">
            <WordCloudWidget artists={props.artistsMap} name={user.name} />
          </div>
        )}
        <div className="flex flex-col space-y-7 py-2">
          {artists.short_term.length < 0 &&
            artists.short_term.map((shortArtist: any, index: number) => {
              const mediumArtist = artists.medium_term[index];
              const longArtist = artists.long_term[index];
              return (
                <div
                  key={shortArtist.id}
                  className="flex flex-row space-x-7 items-center content-evenly justify-around"
                >
                  <div>{shortArtist.name}</div>
                  <Image
                    src={shortArtist?.images[0].url}
                    alt={""}
                    height={52}
                    width={52}
                    className="rounded-md h-10 w-10"
                  />
                  <div className="static left-300">{mediumArtist.name}</div>
                  <Image
                    src={mediumArtist?.images[0].url}
                    alt={""}
                    height={52}
                    width={52}
                    className="rounded-md h-10 w-10"
                  />
                  <div className="ml-5">{longArtist.name}</div>
                  <Image
                    src={longArtist?.images[0].url}
                    alt={""}
                    height={52}
                    width={52}
                    className="rounded-md h-10 w-10"
                  />
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}

export default Center;
