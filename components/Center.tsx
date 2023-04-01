"use client"
import React from "react";
import Image from "next/image";
import { unstable_getServerSession } from "next-auth";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/lib/session";

type centerProps = {
  session: any;
  tracks: any;
};
function Center({ session, tracks }: centerProps) {
  // const user = await getCurrentUser();
  // console.log("session home", user);
  const user = session.user
  console.log("tracks", tracks);
  return (
    <div className="flex-grow text-white">
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
          <h2>{user?.name ?? "testing"}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white padding-8`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  );
}

export default Center;
