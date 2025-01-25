import { cn } from "@/lib/utils";
import { getGameByCategoryName } from "@/services/game-service";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default async function CategorySlugPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const pageParams = page ? parseInt(page) : 1;
  const { games, totalPages, currentPage } = await getGameByCategoryName(slug, pageParams);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl mb-4 capitalize">{slug}</h1>
      <nav className="rounded-md w-full">
        <ol className="list-none flex gap-2">
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <span className="text-gray-500">/</span>
          </li>
          <li>
            <span className="text-gray-500">{slug}</span>
          </li>
        </ol>
      </nav>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {games.length === 0 ? (
          <div className="col-span-full space-y-8 py-10 max-w-4xl mx-auto">
            <h1 className="font-display text-3xl">🎮 Oops, no games found!</h1>
            <p>
              It seems this category is feeling a bit lonely right now. Don’t worry—try exploring
              other categories or use the search bar to find your next gaming adventure!
            </p>
          </div>
        ) : (
          games.map((game) => (
            <Link className="group/game-link" href={`/game/${game.slug}`} key={game.id}>
              <div className="overflow-hidden h-40 relative rounded-lg border border-accent-secondary mb-2">
                <Image
                  className="object-cover transition-transform duration-300 group-hover/game-link:scale-105"
                  src={game.image}
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h1 className="font-medium">{game.title}</h1>
            </Link>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <Link
              className={cn(
                "px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                currentPage === 1 && "pointer-events-none opacity-50"
              )}
              href={{
                pathname: `/category/${slug}`,
                query: { page: currentPage - 1 },
              }}
            >
              Previous
            </Link>
            {[...Array(totalPages).keys()].map((pageNum) => (
              <Link
                className={cn(
                  "px-3 py-2 border border-gray-300 bg-white text-sm font-medium",
                  currentPage === pageNum + 1
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-500 hover:bg-gray-50"
                )}
                href={{
                  pathname: `/category/${slug}`,
                  query: { page: pageNum + 1 },
                }}
                key={pageNum + 1}
              >
                {pageNum + 1}
              </Link>
            ))}
            <Link
              className={cn(
                "px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                currentPage === totalPages && "pointer-events-none opacity-50"
              )}
              href={{
                pathname: `/category/${slug}`,
                query: { page: currentPage + 1 },
              }}
            >
              Next
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
