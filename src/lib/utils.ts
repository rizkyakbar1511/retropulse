import {type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAdmin(role: string) {
  return /admin/i.test(role);
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  });

  return formatter.format(date);
}
