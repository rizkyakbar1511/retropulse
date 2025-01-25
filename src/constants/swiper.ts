import { SwiperOptions } from "swiper/types";

export const SWIPER_STYLES = {
  "--swiper-pagination-color": "#FFBA08",
  "--swiper-pagination-bullet-inactive-color": "#999999",
  "--swiper-pagination-bullet-size": "0.6em",
  "--swiper-pagination-bullet-horizontal-gap": "6px",
  "--swiper-theme-color": "#FFF",
  "--swiper-navigation-size": "24px",
  "--swiper-navigation-sides-offset": "30px",
} as React.CSSProperties;

export const SWIPER_BREAKPOINTS: SwiperOptions["breakpoints"] = {
  320: {
    slidesPerView: 3,
  },
  640: {
    slidesPerView: 4,
  },
  768: {
    slidesPerView: 6,
  },
};
