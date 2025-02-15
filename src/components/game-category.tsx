import type { Category, Game } from "@prisma/client";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

type extendedCategory = Pick<Category, "title" | "slug"> & { games: Game[] };

interface GameCategoryProps {
  category: extendedCategory | null;
}

export default function GameCategory({ category }: GameCategoryProps) {
  if (!category?.games.length) return null;
  return (
    <section className="[&:not(:last-child)]:mb-4">
      <div className="flex justify-between items-center gap-4">
        <h2 className="font-display mb-4">{category?.title}</h2>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-0.5"
          href={`/category/${category.slug}`}
        >
          View All <ChevronRightIcon className="size-4 text-accent" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category?.games.map((game) => (
          <Link
            prefetch={false}
            className="group/game-link"
            href={`/game/${game.slug}`}
            key={game.id}
          >
            <div className="overflow-hidden rounded-lg border border-accent-secondary mb-2 relative h-40">
              <Image
                className="object-cover transition-transform duration-300 group-hover/game-link:scale-105"
                src={game.image}
                alt={game.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <p className="text-sm text-accent">{category.title}</p>
            <h1 className="font-medium">{game.title}</h1>
          </Link>
        ))}
      </div>
    </section>
  );
}
