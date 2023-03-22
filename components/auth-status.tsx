import { unstable_getServerSession } from "next-auth/next";
import Image from "next/image";
export default async function AuthStatus() {
  const session = await unstable_getServerSession();
  return (
    <div className="absolute top-10 w-full flex flex-row justify-center items-center padding-y-5 bg-black">
      {session && (
        <>
          <div className="text-stone-200 text-sm">
            Signed in as {session.user?.name}
          </div>
        </>
      )}
    </div>
  );
}
