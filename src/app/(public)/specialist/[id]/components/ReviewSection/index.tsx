"use client";

import React from "react";
import ReviewCard from "../ReviewCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Review } from "../../types";

import "swiper/css";

interface ReviewSectionProps {
  reviews: Review[];
}

const arrowButtonClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-blue text-xs text-blue transition-opacity disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40";

/** Tolerância em px — isBeginning/isEnd falham com slidesPerView: "auto". */
const SCROLL_EPSILON = 4;

function syncArrowState(
  swiper: SwiperType,
  setCanGoPrev: (value: boolean) => void,
  setCanGoNext: (value: boolean) => void,
) {
  swiper.update();

  const min = swiper.minTranslate();
  const max = swiper.maxTranslate();
  const current = swiper.translate;

  if (Math.abs(max - min) < SCROLL_EPSILON) {
    setCanGoPrev(false);
    setCanGoNext(false);
    return;
  }

  setCanGoPrev(Math.abs(current - min) > SCROLL_EPSILON);
  setCanGoNext(Math.abs(current - max) > SCROLL_EPSILON);
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  const swiperRef = React.useRef<SwiperType | null>(null);
  const [canGoPrev, setCanGoPrev] = React.useState(false);
  const [canGoNext, setCanGoNext] = React.useState(false);

  const showArrows = reviews.length >= 3;

  const refreshArrows = React.useCallback(
    (swiper: SwiperType) => {
      if (!showArrows) return;
      syncArrowState(swiper, setCanGoPrev, setCanGoNext);
    },
    [showArrows],
  );

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    refreshArrows(swiper);
    requestAnimationFrame(() => refreshArrows(swiper));
  };

  const handleSwiperUpdate = (swiper: SwiperType) => {
    refreshArrows(swiper);
  };

  if (reviews.length === 0) {
    return (
      <>
        <h2 className="mb-4 text-lg font-bold">Avaliações</h2>
        <p className="text-sm text-gray-500">
          Este especialista ainda não possui avaliações publicadas.
        </p>
      </>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <h2 className="mb-4 text-lg font-bold">Avaliações ({reviews.length})</h2>

      <Swiper
        spaceBetween={16}
        watchOverflow
        grabCursor={showArrows}
        observer
        observeParents
        onSwiper={handleSwiper}
        onAfterInit={handleSwiperUpdate}
        onSlideChange={handleSwiperUpdate}
        onTransitionEnd={handleSwiperUpdate}
        onTouchEnd={handleSwiperUpdate}
        onResize={handleSwiperUpdate}
        onBreakpoint={handleSwiperUpdate}
        slidesPerView={1.1}
        breakpoints={{
          640: {
            slidesPerView: 1.25,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: "auto",
            spaceBetween: 16,
          },
        }}
        className="reviews-swiper !overflow-visible md:!overflow-hidden"
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            className="!w-[min(100%,320px)] sm:!w-[min(100%,360px)] md:!w-[350px]"
          >
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      {showArrows && (
        <div className="mt-4 flex w-full justify-end gap-2">
          <button
            type="button"
            className={arrowButtonClass}
            aria-label="Avaliação anterior"
            disabled={!canGoPrev}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            type="button"
            className={arrowButtonClass}
            aria-label="Próxima avaliação"
            disabled={!canGoNext}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
}