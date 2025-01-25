import prisma from "@/lib/prisma";

export async function searchGames(q: string) {
  if (!q) return [];
  const games = await prisma.game.findMany({ where: { title: { contains: q } }, take: 100 });
  return games;
}

export async function getCategoryMenu() {
  return await prisma.category.findMany({
    include: {
      games: true,
    },
  });
}

export async function getConsoleCategories() {
  return await prisma.category.findMany();
}

export async function getGamesByCategoryId(categoryId: number) {
  return await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      title: true,
      slug: true,
      games: {
        where: {
          published: true,
        },
        take: 8,
      },
    },
  });
}

export async function getGameBySlug(slug: string) {
  return await prisma.game.findUnique({
    where: {
      slug,
    },
    include: {
      categories: true,
    },
  });
}

export async function getGameByCategoryName(category: string, page: number = 1) {
  const ITEMS_PER_PAGE = 20;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [games, totalCount] = await Promise.all([
    prisma.game.findMany({
      where: {
        categories: {
          some: {
            slug: category,
          },
        },
        published: true,
      },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.game.count({
      where: {
        categories: {
          some: {
            slug: category,
          },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return {
    games,
    totalPages,
    currentPage: page,
  };
}

export async function getAllGames() {
  return await prisma.game.findMany();
}

export async function getFeaturedGames() {
  return await prisma.game.findMany({
    where: { featured: true, published: true },
  });
}

export async function getNewlyAddedGames() {
  return await prisma.game.findMany({
    orderBy: { created_at: "desc" },
    take: 8,
    include: { categories: true },
    where: {
      published: true,
    },
  });
}
