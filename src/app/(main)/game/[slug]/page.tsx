import GameEmulator from "@/components/game-emulator";
import { getGameBySlug } from "@/services/game-service";
import { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ slug: string }>;
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  const title =
    `${game?.title} - Your Gateway to Classic Gaming` || "Your Gateway to Classic Gaming";
  const description =
    game?.description || "Discover your childhood memories with our nostalgic game platform.";
  return {
    title,
    description,
  };
}
export default async function GameSlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  return (
    <div className="space-y-4">
      <nav className="rounded-md w-full">
        <ol className="list-none flex gap-2">
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <span className="text-gray-500">/</span>
          </li>
          <li>
            <Link href={`/category/${game?.categories[0]?.slug}`}>
              {game?.categories[0]?.title.toLocaleLowerCase()}
            </Link>
          </li>
          <li>
            <span className="text-gray-500">/</span>
          </li>
          <li>
            <span className="text-gray-500">{game?.title.toLocaleLowerCase()}</span>
          </li>
        </ol>
      </nav>
      <GameEmulator
        iframeSrc={`/api/emulator?gameUrl=${game?.game_url}&core=${game?.categories[0]?.core}&backgroundImage=${game?.image}`}
      />
      {/* <DisqusComments
        url={`${process.env.WEBSITE_URL}/game/${game?.slug}`}
        identifier={game?.id as string | undefined}
        title={game?.title}
      /> */}
    </div>
  );
}
