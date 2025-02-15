"use server";

import prisma from "@/lib/prisma";
import { deleteS3File } from "@/lib/s3";
import { redirect } from "next/navigation";

export async function deleteGameBySlug(slug: string) {
  try {
    const res = await prisma.game.delete({
      where: {
        slug,
      },
    });

    const gameUrlCID = res.game_url.split("/").at(-1) as string;
    const thumbnailCID = res.image.split("/").at(-1) as string;

    await deleteS3File(gameUrlCID);
    await deleteS3File(thumbnailCID);
  } catch (error) {
    console.log("🚀 ~ deleteGame ~ error:", error);
  }
  redirect("/dashboard");
}

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
          id: Number.parseInt(categoryId, 10),
        },
      },
      published: status,
      featured,
      game_url: gameFile,
      image: thumbnail,
    };

    const gameDataUpdate = {
      title,
      slug,
      description,
      categories: {
        connect: {
          id: Number.parseInt(categoryId, 10),
        },
      },
      published: status,
      featured,
      ...(gameFile ? { game_url: gameFile } : {}),
      ...(thumbnail ? { image: thumbnail } : {}),
    };

    if (!gameId) {
      await prisma.game.create({ data: gameData });
    } else {
      await prisma.game.update({
        data: gameDataUpdate,
        where: {
          id: Number.parseInt(gameId, 10),
        },
      });
    }
  } catch (error) {
    console.log("🚀 ~ createGame ~ error:", error);
    throw error;
  }
}
