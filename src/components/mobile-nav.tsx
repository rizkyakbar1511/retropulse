"use client";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MOBILE_NAV_ITEMS } from "@/constants/navigation";
import Link from "next/link";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {!isOpen ? (
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(true)}
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <Bars3Icon className="size-6" aria-label="Open Menu" />
        </button>
      ) : (
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-expanded="true"
          aria-controls="mobile-menu"
        >
          <XMarkIcon className="size-6" aria-label="Close Menu" />
        </button>
      )}

      {isOpen && (
        <div className="fixed top-[57px] h-dvh left-0 right-0 z-50 bg-main p-4" id="mobile-menu">
          <ul className="flex flex-col mb-6">
            {MOBILE_NAV_ITEMS.map((item) => (
              <li className="border-accent" key={item.name} role="none">
                <Link
                  className="text-lg font-medium hover:bg-accent rounded-md flex gap-4 items-center border-b border-accent py-4 px-6"
                  href={item.path}
                  role="menuitem"
                >
                  <item.icon className="size-6" aria-hidden="true" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
