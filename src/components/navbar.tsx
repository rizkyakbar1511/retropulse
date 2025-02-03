import Link from "next/link";
import MobileNav from "@/components/mobile-nav";
import UserDropdown from "@/components/user-dropdown";
import { getSession } from "@/lib/getSession";
import {
  ArrowRightEndOnRectangleIcon,
  Cog8ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default async function Navbar() {
  const session = await getSession();
  return (
    <nav className="flex gap-3">
      <button className="sm:hidden">
        <MagnifyingGlassIcon className="size-5 text-white" />
      </button>
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
  );
}
