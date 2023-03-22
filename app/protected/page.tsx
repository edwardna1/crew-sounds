import Center from "@/components/Center";
import Sidebar from "@/components/Sidebar";
import SignOut from "@/components/sign-out";

export default async function Home() {
  const CenterDiv = await Center();
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar />
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        {CenterDiv}
        {/* <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full max-w-screen-lg aspect-video"
        ></iframe> */}
        <SignOut />
      </div>
    </div>
  );
}
