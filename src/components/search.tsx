"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${searchTerm}`);
  };
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };
  return (
    <form className="relative flex-1 max-w-md mx-auto" onSubmit={handleSearch}>
      <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-white" />
      <input
        className="w-full rounded-lg bg-main border border-accent px-8 h-8  "
        type="search"
        value={searchTerm}
        onChange={handleChangeSearch}
        placeholder="Search for games... Ex. Robocop..."
      />
      {searchTerm && (
        <XMarkIcon
          className="size-4 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={handleClearSearch}
        />
      )}
    </form>
  );
}
