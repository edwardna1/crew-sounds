import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import SignOut from "@/components/sign-out";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client"

export default async function Home() {
  // const CenterDiv = await Center();
  const user = await getCurrentUser();
  console.log("prisma", user);
  return (
    <div className="h-screen bg-black overflow-hidden">
      <main className="flex">
        <Sidebar user={user}/>
        <Center user={user}/>
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
