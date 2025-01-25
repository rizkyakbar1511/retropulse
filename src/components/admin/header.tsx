import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";

export default function AdminHeader() {
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/login" });
  };
  return (
    <header className="container mx-auto px-4 flex h-14 items-center gap-4 justify-between">
      <Link className="flex items-center gap-2" href="/dashboard">
        <Image src="/logo.png" alt="brand logo" width={40} height={40} priority />
        <div>
          <h1 className="font-display text-2xl leading-5">
            <span className="text-[#FFBA08]">Retro</span>Pulse
          </h1>
          <p className="text-xs font-bold">Admin</p>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <Link className="flex items-center gap-1  " href="/">
          Go to main site
          <ArrowUpRightIcon className="size-4" />
        </Link>
        <form action={handleSignOut}>
          <button className="flex items-center gap-2 px-2 py-1  ">
            <ArrowRightStartOnRectangleIcon className="size-4" />
            Sign Out
          </button>
        </form>
      </div>
    </header>
  );
}
