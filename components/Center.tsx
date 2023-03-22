import React from "react";
import Image from "next/image";
import { unstable_getServerSession } from "next-auth";
async function Center() {
  const session = await unstable_getServerSession();
  return (
    <div className="flex-col items-center justify-center">
      <Image
        width={150}
        height={150}
        src={session?.user?.image ?? "/logo.png"}
        // src="/logo.png"
        alt="Spotify profile image"
        className="w-150 h-150 rounded-full items-center"
      />
      {/* <div className="text-stone-400 hover:text-stone-200 transition-all">
        Center
      </div> */}
    </div>
  );
}

export default Center;
