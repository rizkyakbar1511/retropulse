import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import GameForm from "@/components/admin/game-form";
import { getConsoleCategories } from "@/services/game-service";

export default async function AddNewGamePage() {
  const categories = await getConsoleCategories();
  return (
    <section className="container mx-auto p-4 pb-7 space-y-5">
      <Link className="flex items-center gap-1 w-max" href="/dashboard">
        <ChevronLeftIcon className="size-4" />
        Back
      </Link>
      <h1 className="font-display">Add New Game</h1>
      <GameForm categories={categories} />
    </section>
  );
}
