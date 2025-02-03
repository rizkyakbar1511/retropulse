import Image from "next/image";
import Link from "next/link";
import Search from "@/components/search";
import Navbar from "./navbar";

export default async function Header() {
  return (
    <header className="px-4 flex h-14 items-center gap-4">
      <Link className="flex items-center gap-2 max-sm:flex-1" href="/">
        <Image src="/logo.png" alt="brand logo" width={40} height={40} priority />
        <h1 className="font-display text-2xl">
          <span className="text-[#FFBA08]">Retro</span>Pulse
        </h1>
      </Link>
      <Search />
      <Navbar />
    </header>
  );
}
