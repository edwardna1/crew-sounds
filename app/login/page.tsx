import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { type } from "os";
import { useEffect, useState } from "react";
import LoginButton from "@/components/loginButton";
import { LOGIN_URL } from "@/lib/spotify";

export default async function Login() {
  const providers = await getProviders();
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
          <h1 className="text-stone-200 font-bold text-2xl">Comicfy</h1>
          <p className="text-stone-400 mt-5">
            See your favourite artists in the form of a comic!
          </p>
        </div>
        <div className="flex space-x-3">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.id}>
                <LoginButton provider={provider} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// export default async function Login() {
//   const providers = await getProviders();

//   return (
//     <div className="flex flex-col bg-black justify-center items-center w-full min-h-screen">
//       <Image
//         src="https://links.papareact.com/9xl"
//         width={200}
//         height={200}
//         alt={"spotify image"}
//         className="w-52 mb-5"
//       />
//       {providers &&
//         Object.values(providers).map((provider) => (
//           <div key={provider.id}>
//             <LoginButton provider={provider} />
//           </div>
//         ))}
//       <h1 className="mt-5 text-white">This is my log in!!!</h1>
//     </div>
//   );
// }
