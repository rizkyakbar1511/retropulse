import { signIn } from "@/auth";
import Image from "next/image";

export default function GithubSignin() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button className="px-6 py-2 w-full text-sm uppercase bg-slate-700 rounded-md hover:opacity-80 flex items-center justify-center gap-2">
        <Image width={24} height={24} src="/icons/github.svg" alt="github logo" priority={true} />
        Sign In with github
      </button>
    </form>
  );
}
