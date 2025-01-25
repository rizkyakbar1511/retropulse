"use client";

import { loginAction } from "@/actions/auth/login";
import Alert from "@/components/Alert";
import GithubSignin from "@/components/github-signin";
import Spinner from "@/components/spinner";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <section className="flex items-center justify-center h-screen px-4">
      <video
        className="absolute w-full h-full object-cover"
        src="/login-bg-video.mp4"
        autoPlay
        loop
        muted
      />
      <div className="relative flex flex-col flex-1 max-w-lg px-4 py-7 mx-auto border rounded-lg shadow-xl gap-7 border-accent bg-main">
        <div className="absolute size-20 -top-12 sm:size-28 right-5 sm:-top-20">
          <Image
            src="/logo.png"
            alt="brand logo"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h1 className="text-3xl text-center font-display sm:text-4xl">
          <span className="text-[#FFBA08]">Retro</span>Pulse
        </h1>
        {state?.error && <Alert message={state?.error} />}
        <form className="space-y-7" action={formAction}>
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs lg:text-base">Email</label>
              <input
                className="p-2 bg-black border rounded-md border-accent"
                name="email"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs lg:text-base">Password</label>
              <input
                className="p-2 bg-black border rounded-md border-accent"
                name="password"
                type="password"
              />
            </div>
          </div>
          <p className="text-sm font-display">
            New player?{" "}
            <Link className="text-[#FFBA08]" href="/register">
              Create your profile
            </Link>
          </p>
          <button className="px-6 py-2 w-full text-sm uppercase border border-yellow-400 bg-accent-gradient rounded-md hover:opacity-80">
            {isPending ? <Spinner className="size-5 block mx-auto" /> : "Sign in"}
          </button>
        </form>
        <GithubSignin />
      </div>
    </section>
  );
}
