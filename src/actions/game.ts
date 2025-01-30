"use server";

import prisma from "@/lib/prisma";

export async function upsertGame(formData: FormData) {
  const gameId = formData.get("id") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const gameFile = formData.get("gameFile") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const status = formData.get("status") === "true";
  const featured = formData.get("featured") === "true";
  const categoryId = formData.get("categoryId") as string;

  try {
    const existingGame = await prisma.game.findUnique({
      where: {
        slug,
      },
    });

    if (!gameId && existingGame) throw new Error("Slug already exists, please type another one");

    const gameData = {
      title,
      slug,
      description,
      categories: {
        connect: {
          id: parseInt(categoryId, 10),
        },
      },
      published: status,
      featured,
      game_url: gameFile,
      image: thumbnail,
    };
    console.log("🚀 ~ upsertGame ~ gameData:", gameData);

    const gameDataUpdate = {
      title,
      slug,
      description,
      categories: {
        connect: {
          id: parseInt(categoryId, 10),
        },
      },
      published: status,
      featured,
      ...(gameFile ? { game_url: gameFile } : {}),
      ...(thumbnail ? { image: thumbnail } : {}),
    };
    console.log("🚀 ~ upsertGame ~ gameDataUpdate:", gameDataUpdate);

    if (!gameId) {
      await prisma.game.create({ data: gameData });
    } else {
      await prisma.game.update({
        data: gameDataUpdate,
        where: {
          id: parseInt(gameId, 10),
        },
      });
    }
  } catch (error) {
    console.log("🚀 ~ createGame ~ error:", error);
    throw error;
  }
}
