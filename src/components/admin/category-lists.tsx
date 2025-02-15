import type { Category } from "@prisma/client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface CategoryListsProps {
  categories: Category[];
}

export default function AdminCategoryLists({ categories }: CategoryListsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-display">Category List</h1>
        <Link
          className="text-sm relative group/add rounded-md flex items-center gap-1"
          href="/dashboard/category/add"
        >
          <PlusIcon className="size-4" /> Add New
          <div className="absolute -bottom-1 left-0 transition-all scale-x-0 group-hover/add:scale-x-100 w-full h-px bg-slate-400" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            className="flex items-center gap-4 bg-main hover:bg-slate-500 transition-colors p-4 rounded-lg"
            href={`/dashboard/category/${category.slug}`}
            key={category.slug}
          >
            <Image
              className="size-24 rounded-md"
              src={category.image}
              alt={category.title}
              width={300}
              height={300}
              quality={50}
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl">{category.title}</h2>
              {/* <p>{new Date(category.created_at).toLocaleDateString()}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
