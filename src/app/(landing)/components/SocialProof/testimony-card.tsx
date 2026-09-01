import React from "react";
import Image from "next/image";

type TestimonyCardProps = {
  title: string;
  description: string;
  profilePic: string;
  author: string;
  authorBio: string;
};

export default function TestimonyCard({
  title,
  description,
  profilePic,
  author,
  authorBio,
}: TestimonyCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between w-full h-full shadow-sm hover:shadow-md transition-shadow border border-white/10 text-left">
      <div>
        {/* Título do Depoimento */}
        <h3 className="text-base sm:text-lg font-semibold text-blue leading-snug">
          “{title}”
        </h3>

        {/* Depoimento */}
        <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed break-words">
          “{description}”
        </p>
      </div>

      {/* Autor */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={profilePic}
            alt={author}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs sm:text-sm font-bold text-gray-900 truncate">
            {author}
          </span>
          <span className="text-xs text-gray-500 truncate">
            {authorBio}
          </span>
        </div>
      </div>
    </div>
  );
}