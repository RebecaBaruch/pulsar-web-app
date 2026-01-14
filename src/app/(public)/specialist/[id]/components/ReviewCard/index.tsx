"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Review } from "../../types";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="w-full h-35 md:w-[350px] md:h-32 bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10">
          <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        </div>
        
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">{review.userName}</h4>
              <div className="flex items-center gap-1 bg-blue text-xs text-white px-2 py-1 rounded-full text-xs">
                <FontAwesomeIcon icon={faStar} size="xs" />
                <span className="font-medium">{review.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>

          <p className="text-xs text-gray-700">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
