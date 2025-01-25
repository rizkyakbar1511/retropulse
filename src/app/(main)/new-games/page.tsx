import { getNewlyAddedGames } from "@/services/game-service";
import Image from "next/image";
import Link from "next/link";

export default async function NewGamesPage() {
  const newlyAddedGames = await getNewlyAddedGames();
  return (
    <>
      <h1 className="font-display text-3xl mb-4">New Games</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {newlyAddedGames.map((game) => (
          <Link
            prefetch={false}
            className="group/game-link"
            href={`/game/${game.slug}`}
            key={game.id}
          >
            <div className="overflow-hidden h-40 relative rounded-lg border border-accent-secondary mb-2">
              <Image
                className="object-cover transition-transform duration-300 group-hover/game-link:scale-105"
                src={game.image}
                alt={game.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {game.categories.map((category) => (
              <p key={category.id} className="text-slate-400 text-sm">
                {category.title}
              </p>
            ))}
            <h1 className="font-medium">{game.title}</h1>
          </Link>
        ))}
      </div>
    </>
  );
}
