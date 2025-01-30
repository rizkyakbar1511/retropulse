"use client";

import { useEffect, useRef, useState } from "react";
import { type DefaultSession } from "next-auth";
import ImageWithFallback from "./image-with-fallback";
import { cn, isAdmin } from "@/lib/utils";
import Link from "next/link";
import { ArrowRightStartOnRectangleIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Spinner from "@/components/spinner";
import { signOut } from "next-auth/react";

interface UserDropdownProps {
  user: DefaultSession["user"];
}

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const onLoadComplete = () => setIsLoadingAvatar(false);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.addEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={handleToggleMenu}
        className="rounded-full relative block size-6 overflow-hidden"
      >
        {isLoadingAvatar && <Spinner className="size-6" />}
        <ImageWithFallback
          className={cn("opacity-100", isLoadingAvatar && "opacity-0")}
          src={user?.image ?? `https://avatar.iran.liara.run/username?username=${user?.name}`}
          fallback="/default-avatar.png"
          alt="user avatar"
          onLoad={onLoadComplete}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </button>
      <ul
        className={cn(
          "absolute translate-y-4 py-2 opacity-0 transition-all pointer-events-none min-w-36 mt-3 z-20 right-0 rounded-md overflow-hidden bg-accent",
          isMenuOpen && "opacity-100 pointer-events-auto translate-y-0"
        )}
      >
        <li className="flex items-center gap-2 p-4">
          <div className="relative size-8 shrink-0">
            <ImageWithFallback
              src={user?.image ?? `https://avatar.iran.liara.run/username?username=${user?.name}`}
              fallback={`https://avatar.iran.liara.run/username?username=${user?.name}`}
              alt="user avatar"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div>
            <h6 className="font-display text-xs">{user?.name}</h6>
            <p className="text-xs">{user?.email}</p>
          </div>
        </li>
        {user?.role && isAdmin(user.role) && (
          <li className="hover:bg-main py-2 px-4 text-sm">
            <Link href="/dashboard" className="flex items-center gap-1">
              <Squares2X2Icon className="size-5" /> Dashboard
            </Link>
          </li>
        )}
        <li className="hover:bg-main py-2 px-4 text-sm">
          <button onClick={() => signOut({ redirectTo: "/" })} className="flex items-center gap-1">
            <ArrowRightStartOnRectangleIcon className="size-5" /> Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
