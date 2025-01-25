import { registerUser } from "@/actions/auth/register";
import Image from "next/image";
import Link from "next/link";

export default async function RegisterPage() {
  return (
    <section className="flex items-center justify-center h-screen px-4">
      <form
        className="relative flex flex-col flex-1 max-w-lg p-4 mx-auto border rounded-lg shadow-xl gap-7 border-accent"
        action={registerUser}
      >
        <div className="absolute size-20 -top-12 sm:size-28 right-5 sm:-top-20">
          <Image src="/logo.png" alt="brand logo" fill priority />
        </div>
        <h1 className="text-3xl text-center font-display sm:text-4xl">
          <span className="text-[#FFBA08]">Retro</span>Pulse
        </h1>
        <div className="space-y-6">
          <label className="flex flex-col gap-1">
            Name
            <input
              className="p-2 bg-black border rounded-md border-accent"
              name="name"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-1">
            Email
            <input
              className="p-2 bg-black border rounded-md border-accent"
              name="email"
              type="email"
            />
          </label>
          <label className="flex flex-col gap-1">
            Password
            <input
              className="p-2 bg-black border rounded-md border-accent"
              name="password"
              type="password"
            />
          </label>
        </div>
        <p className="text-sm font-display">
          Back for more nostalgia?{" "}
          <Link className="text-[#FFBA08]" href="/login">
            Sign in
          </Link>
        </p>
        <button className="px-6 py-3 text-sm uppercase border border-yellow-400 bg-accent-gradient rounded-xl hover:opacity-80">
          Sign Up
        </button>
      </form>
    </section>
  );
}
