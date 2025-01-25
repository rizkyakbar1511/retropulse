import GameForm from "@/components/admin/game-form";
import { getConsoleCategories, getGameBySlug } from "@/services/game-service";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function EditGamePage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, categories] = await Promise.all([(await params).slug, await getConsoleCategories()]);
  const game = await getGameBySlug(slug);

  return (
    <section className="container mx-auto p-4 pb-7 space-y-5">
      <Link className="flex items-center gap-1 w-max" href="/dashboard">
        <ChevronLeftIcon className="size-4" />
        Back
      </Link>
      <h1 className="font-display">Update Game</h1>
      <GameForm categories={categories} game={game} />
    </section>
  );
}
