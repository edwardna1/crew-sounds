import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
          <p className="text-stone-400 mt-5">
            This is an app to look at your Spotify compatibility with users, in
            real time.
          </p>
        </div>
        <div className="flex space-x-3">
          {/* <Link
            href="/protected"
            prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            Protected Page
          </Link> */}
          <button
            className="border-black bg-green-600 py-5 px-8 text-black font-semibold  hover:bg-green-400 flex h-10 w-full items-center justify-center rounded-md border"
          >
            <Link
              href="/protected"
              prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
            >
              Log in
            </Link>
          </button>
          {/* <p className="text-white space">·</p>
          <a
            href="https://github.com/steven-tey/nextjs-typescript-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 underline hover:text-stone-200 transition-all"
          >
            GitHub
          </a> */}
        </div>
      </div>
    </div>
  );
}
