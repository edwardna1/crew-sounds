"use client";

import { signIn } from "next-auth/react";

export default function LoginButton(props: { provider: any }) {
  return (
    <div>
      <button
        className="border-black bg-green-600 py-5 px-8 text-black font-semibold  hover:bg-green-400 flex h-10 w-full items-center justify-center rounded-md border"
        onClick={async () =>
          await signIn(props.provider.id, { callbackUrl: "/" })
        }
      >
        Login with {props.provider.name}
      </button>
    </div>
  );
}
