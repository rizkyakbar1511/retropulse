"use client";

import { MAIN_MENU_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import type { Category, Game } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ImageWithFallback from "@/components/image-with-fallback";

type extendedCategory = Category & {
  games: Game[];
};

interface SidebarNavProps {
  categoryMenu: extendedCategory[];
}

export default function SidebarNav({ categoryMenu }: SidebarNavProps) {
  const activeSegment = usePathname();
  return (
    <>
      <h6 className="text-slate-500 text-xs mb-2">MENU</h6>
      <ul className="flex flex-col gap-2 mb-6">
        {MAIN_MENU_ITEMS.map((item) => (
          <li key={item.name}>
            <Link
              className={cn(
                "text-sm tracking-wide flex gap-2 items-center py-1 px-2 rounded-md hover:bg-primary",
                activeSegment === item.slug && "bg-primary"
              )}
              href={item.slug}
            >
              <item.icon className="size-6 text-slate-500" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <h6 className="text-xs mb-2 text-slate-500">CATEGORIES</h6>
      <ul className="flex gap-2 mb-6 flex-col">
        {categoryMenu.map((category) => (
          <li key={category.id}>
            <Link
              className={cn(
                "text-sm tracking-wide flex gap-2 items-center py-1 px-2 rounded-md hover:bg-primary",
                activeSegment === `/category/${category.slug}` && "bg-primary"
              )}
              href={`/category/${category.slug}`}
            >
              <ImageWithFallback
                className="size-auto"
                src={category.icon}
                fallback="/icons/default.svg"
                alt="Category Icon"
                width={24}
                height={24}
              />
              {category.title} <span>({category.games.length})</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
