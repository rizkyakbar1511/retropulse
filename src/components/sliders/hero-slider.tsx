"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { SWIPER_STYLES } from "@/constants/swiper";
import { Game } from "@prisma/client";

interface HeroSliderProps {
  games: Game[];
}

export default function HeroSlider({ games }: HeroSliderProps) {
  return (
    <div className="mb-6 space-y-4">
      <h1 className="font-display text-xl">Featured Games</h1>
      <Swiper
        className="h-[340px] md:h-[480px] w-full rounded-lg border border-accent-secondary bg-main"
        effect="fade"
        modules={[EffectFade, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={SWIPER_STYLES}
        autoplay
      >
        {games.map((game) => (
          <SwiperSlide
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.5), rgb(5, 112, 247, 0.3)), url(${game.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            key={game.id}
            className={`r p-20 items-center !flex`}
          >
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl lg:text-6xl mb-4">{game.title}</h1>
              <p className="mb-6 max-w-[418px] line-clamp-3">{game.description}</p>
              <Link
                className="text-sm bg-accent-gradient py-3 px-6 rounded-xl border uppercase border-yellow-400"
                href={`/game/${game.slug}`}
              >
                Play Now
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
