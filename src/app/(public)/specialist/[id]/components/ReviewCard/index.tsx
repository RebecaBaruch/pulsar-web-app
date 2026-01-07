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
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">{review.userName}</h4>
            <div className="flex items-center gap-1 bg-blue-dark text-white px-2 py-1 rounded-full text-xs">
              <FontAwesomeIcon icon={faStar} className="text-yellow" />
              <span className="font-medium">{review.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-2">{review.date}</p>
          <p className="text-sm text-gray-700">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
