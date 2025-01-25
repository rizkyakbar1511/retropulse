import { getAllGames } from "@/services/game-service";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const games = await getAllGames();
  const items = games.map((game) => ({
    url: `${process.env.WEBSITE_URL}/game/${game.slug}`,
    lastModified: game.created_at,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [
    {
      url: process.env.WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...items,
  ];
}
