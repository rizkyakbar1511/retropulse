import { searchGames } from "@/services/game-service";
import Image from "next/image";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { q: query } = await searchParams;
  const games = await searchGames(query);
  return (
    <div>
      <h1 className="font-display text-3xl mb-4 md:text-2xl">
        {query ? `Search results for "${query}"` : "No search query provided"}
      </h1>
      <p className="text-slate-400 mb-4">{games.length} results</p>
      <ul className="space-y-2">
        {games.map((game) => (
          <li key={game.id}>
            <Link
              prefetch={false}
              className="grid grid-cols-5 gap-4 bg-main hover:bg-accent-secondary p-4 rounded-lg"
              href={`/game/${game.slug}`}
            >
              <div className="relative h-40 col-span-1">
                <Image className="rounded-md object-cover" src={game.image} alt={game.title} fill />
              </div>
              <div className="space-y-4 col-span-4">
                <h2 className="text-xl">{game.title}</h2>
                <p>{game.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
