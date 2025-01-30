import Image from "next/image";
import Link from "next/link";
import Search from "@/components/search";
import MobileNav from "@/components/mobile-nav";
import { ArrowRightEndOnRectangleIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import UserDropdown from "@/components/user-dropdown";
import { getSession } from "@/lib/getSession";

export default async function Header() {
  const session = await getSession();

  return (
    <header className="px-4 flex h-14 items-center gap-4">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/logo.png" alt="brand logo" width={40} height={40} priority />
        <h1 className="font-display text-2xl">
          <span className="text-[#FFBA08]">Retro</span>Pulse
        </h1>
      </Link>
      <Search />
      <nav className="flex gap-3">
        {!session?.user && (
          <Link title="Login" href="/login" prefetch={false}>
            <ArrowRightEndOnRectangleIcon className="size-6" />
          </Link>
        )}
        {session?.user && <UserDropdown user={session?.user} />}
        <Link title="settings" href="/settings">
          <Cog8ToothIcon className="size-6" />
        </Link>
        <MobileNav />
      </nav>
    </header>
  );
}
