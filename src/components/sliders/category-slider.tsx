"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { SWIPER_BREAKPOINTS, SWIPER_STYLES } from "@/constants/swiper";
import type { Category } from "@prisma/client";
import Image from "next/image";

export default function CategorySlider({ categories }: { categories: Category[] }) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-display">Categories</h2>
        <Link
          href="/category"
          className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-0.5"
        >
          View All <ChevronRightIcon className="size-4  text-accent" />
        </Link>
      </div>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={6}
        navigation
        scrollbar={{ draggable: true }}
        style={SWIPER_STYLES}
        breakpoints={SWIPER_BREAKPOINTS}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link prefetch={false} className="group/categories" href={`/category/${category.slug}`}>
              <div className="overflow-hidden rounded-lg border-accent-secondary border relative h-48 mb-2">
                <Image
                  className="object-cover transition-transform duration-300 group-hover/categories:scale-105"
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
            <h1>{category.title}</h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
