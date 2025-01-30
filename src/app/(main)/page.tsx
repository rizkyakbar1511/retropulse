// import GameCategory from "@/components/game-category";
import CategorySlider from "@/components/sliders/category-slider";
import HeroSlider from "@/components/sliders/hero-slider";
import {
  getFeaturedGames,
  getConsoleCategories,
  // getGamesByCategoryId,
} from "@/services/game-service";

export default async function Home() {
  const [featuredGames, allConsoleCategories] = await Promise.all([
    await getFeaturedGames(),
    await getConsoleCategories(),
  ]);
  // const playstation = await getGamesByCategoryId(6);

  return (
    <>
      {featuredGames.length > 0 && <HeroSlider games={featuredGames} />}
      {allConsoleCategories.length > 0 && <CategorySlider categories={allConsoleCategories} />}
      {/* <GameCategory category={playstation} /> */}
    </>
  );
}
