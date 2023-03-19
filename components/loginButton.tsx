"use client";

import { signIn } from "next-auth/react";

export default function LoginButton(props: { provider: any }) {
  return (
      <div>
        <button
          className="bg-[#18D860] text-white p-5 rounded-full"
          onClick={() => signIn(props.provider.id, { callbackUrl: "/" })}
        >
          Login with {props.provider.name}
        </button>
      </div>
  );
}
