import { Game } from "@prisma/client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface GameListProps {
  games: Game[];
}

export default function AdminGameLists({ games }: GameListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-display">Game List</h1>
        <Link
          className="text-sm relative group/add rounded-md flex items-center gap-1"
          href="/dashboard/game/add"
        >
          <PlusIcon className="size-4" /> Add New
          <div className="absolute -bottom-1 left-0 transition-all scale-x-0 group-hover/add:scale-x-100 w-full h-px bg-slate-400" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {games.map((game) => (
          <Link
            className="flex items-center gap-4 bg-main hover:bg-slate-500 transition-colors p-4 rounded-lg"
            href={`/dashboard/game/${game.slug}`}
            key={game.id}
          >
            <Image
              className="size-24 rounded-md"
              src={game.image}
              alt={game.title}
              width={300}
              height={300}
              quality={50}
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl">{game.title}</h2>
              <p>{new Date(game.created_at).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
