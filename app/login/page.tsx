

import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { type } from "os";
import { useEffect, useState } from "react";
import LoginButton from "@/components/loginButton";
import { LOGIN_URL } from "@/lib/spotify";
export async function gett() {
  return {};
}

export default async function Login(props: { providers: ClientSafeProvider }) {
    const providers = await getProviders();

  return (
    <div className="flex flex-col bg-black justify-center items-center w-full min-h-screen">
      <Image
        src="https://links.papareact.com/9xl"
        width={200}
        height={200}
        alt={"spotify image"}
        className="w-52 mb-5"
      />
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.id}>
            <LoginButton provider={provider}/>
          </div>
        ))}
      <h1 className="mt-5 text-white">THis is my log in {LOGIN_URL}</h1>
    </div>
  );
}
