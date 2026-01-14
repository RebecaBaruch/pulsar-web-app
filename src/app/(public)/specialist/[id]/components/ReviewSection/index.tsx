"use client";

import React from "react";
import ReviewCard from "../ReviewCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Review } from "../../types";

interface ReviewSectionProps {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  const prevRef = React.useRef<HTMLButtonElement | null>(null);
  const nextRef = React.useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(
    null
  );

  React.useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation
    ) {
      // @ts-expect-error Swiper typing
      swiperInstance.params.navigation.prevEl = prevRef.current;
      // @ts-expect-error Swiper typing
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Avaliações ({reviews.length})</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        loop
        watchOverflow
        navigation
        onSwiper={setSwiperInstance}
        slidesPerView={1}
        breakpoints={{
          
          768: {
            slidesPerView: "auto",
          },
        }}
        className="w-full"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="w-full md:!w-auto">
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="w-full flex justify-end gap-2 mt-4">
        <button
          ref={prevRef}
          className="flex justify-center items-center w-4 h-4 p-3 border-1 border-blue rounded-full text-blue cursor-pointer text-xs"
          aria-label="Scroll reviews left"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          ref={nextRef}
          className="flex justify-center items-center w-4 h-4 p-3 border-1 border-blue rounded-full text-blue cursor-pointer text-xs"
          aria-label="Scroll reviews right"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </>
  );
}
