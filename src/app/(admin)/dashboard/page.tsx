import AdminGameLists from "@/components/admin/game-lists";
import Statistics from "@/components/admin/statistics";
import { getAllGames, getConsoleCategories } from "@/services/game-service";

export default async function AdminDashboardPage() {
  const [games, categories] = await Promise.all([getAllGames(), getConsoleCategories()]);
  return (
    <section className="container mx-auto p-4 space-y-5">
      <Statistics gamesCount={games.length} categoriesCount={categories.length} />
      <AdminGameLists games={games} />
    </section>
  );
}
