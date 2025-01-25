import { loginWithProviderAction } from "@/actions/auth/login";
import Image from "next/image";

export default function GithubSignin() {
  return (
    <form action={async () => await loginWithProviderAction("github")}>
      <button className="px-6 py-2 w-full text-sm uppercase border border-yellow-400 bg-accent-gradient rounded-md hover:opacity-80 flex items-center">
        <Image width={20} height={20} src="/icons/github.svg" alt="github logo" priority={true} />
        Sign In with github
      </button>
    </form>
  );
}
