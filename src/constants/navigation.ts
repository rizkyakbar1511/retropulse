import { HomeIcon, CubeIcon } from "@heroicons/react/24/outline";

export const MOBILE_NAV_ITEMS = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
    slug: null,
  },
  {
    name: "New",
    path: "/new-games",
    icon: CubeIcon,
    slug: "new-games",
  },
  {
    name: "Categories",
    path: "/categories",
    icon: CubeIcon,
    slug: "categories",
  },
  {
    name: "About",
    path: "/about",
    icon: CubeIcon,
    slug: "about",
  },
  {
    name: "Contact",
    path: "/contact",
    icon: CubeIcon,
    slug: null,
  },
];

export const MAIN_MENU_ITEMS = [
  {
    name: "Home",
    icon: HomeIcon,
    slug: "/",
  },
  {
    name: "New Games",
    icon: CubeIcon,
    slug: "/new-games",
  },
];
