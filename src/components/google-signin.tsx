import { signIn } from "@/auth";
import Image from "next/image";

export default function GoogleSignin() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="px-6 py-2 w-full text-sm uppercase bg-slate-200 text-main rounded-md hover:opacity-80 flex items-center justify-center gap-2"
      >
        <Image width={20} height={20} src="/icons/google.svg" alt="github logo" priority={true} />
        Sign In with Google
      </button>
    </form>
  );
}
