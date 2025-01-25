import GameCategory from "@/components/game-category";
import CategorySlider from "@/components/sliders/category-slider";
import HeroSlider from "@/components/sliders/hero-slider";
import {
  getFeaturedGames,
  getConsoleCategories,
  getGamesByCategoryId,
} from "@/services/game-service";

export default async function Home() {
  const featuredGames = await getFeaturedGames();
  const allConsoleCategories = await getConsoleCategories();
  const playstation = await getGamesByCategoryId(6);

  return (
    <>
      <HeroSlider games={featuredGames} />
      <CategorySlider categories={allConsoleCategories} />
      {/* <GameCategory category={playstation} /> */}
    </>
  );
}
