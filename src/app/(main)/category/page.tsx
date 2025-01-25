import { getConsoleCategories } from "@/services/game-service";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage() {
  const categories = await getConsoleCategories();
  return (
    <>
      <h1 className="font-display text-3xl mb-4">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-6 ">
        {categories.map((category) => (
          <Link
            className="group/category flex items-center flex-col"
            href={`/category/${category.slug}`}
            key={category.id}
          >
            <div className="overflow-hidden rounded-lg border-accent-secondary border mb-2 h-40 relative w-full">
              <Image
                className="object-cover transition-transform duration-300 group-hover/category:scale-105"
                src={`/category/${category.image}`}
                alt={category.title}
                fill
              />
            </div>
            <h1>{category.title}</h1>
          </Link>
        ))}
      </div>
    </>
  );
}
