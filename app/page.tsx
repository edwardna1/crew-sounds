"use client";
import Image from "next/image";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";

export default function Home(props: any) {
  const { data: session, status } = useSession();
  console.log("session", session)
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col justify-center items-center mb-100">
        <Image
          width={150}
          height={150}
          src="/logo.png"
          alt="Platforms on Vercel"
          className="w-52 h-52"
        />
        <div className="text-center max-w-screen-sm mb-10">
          <h1 className="text-stone-200 font-bold text-2xl">Crew Sound</h1>
          <p className="text-stone-400 mt-5">Made by Edward Na.</p>
        </div>
      </div>
    </div>
  );
}
