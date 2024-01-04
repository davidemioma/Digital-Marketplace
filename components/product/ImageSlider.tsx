"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type SwiperType from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronRight, ChevronLeft } from "lucide-react";

type Props = {
  urls: string[];
};

const ImageSlider = ({ urls }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [swiper, setSwiper] = useState<null | SwiperType>(null);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);

      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition">
        <button
          className={cn(
            "activeStyles right-3 transition",
            slideConfig.isEnd
              ? "inactiveStyles"
              : "hover:bg-primary-300 text-primary-800 opacity-100"
          )}
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />
        </button>

        <button
          className={cn(
            "activeStyles left-3 transition",
            slideConfig.isBeginning
              ? "inactiveStyles"
              : "hover:bg-primary-300 text-primary-800 opacity-100"
          )}
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          aria-label="previous image"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />
        </button>
      </div>

      <Swiper
        className="h-full w-full"
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              className="-z-10 h-full w-full object-cover object-center"
              fill
              src={url}
              alt="Product image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
