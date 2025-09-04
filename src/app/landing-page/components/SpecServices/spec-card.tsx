import Link from "next/link";
import React from "react";

type SpecCardProps = {
  icon: string;
  title: string;
  introDescription: string;
  description: string;
  href: string;
};

export default function SpecCard({
  icon,
  title,
  introDescription,
  description,
  href
}: SpecCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md-gray-light p-4 w-3xs md:w-full h-70 sm:h-64 md:h-3xs lg:h-fit hover:scale-103 transition-transform duration-400 cursor-pointer">
      <Link href={href}>
        <div className="p-2 bg-blue w-10 h-10 rounded-lg text-white flex items-center justify-center">
          <img src={icon} alt={title} className="w-6 h-6" />
        </div>

        <div className="mt-4 space-y-1">
          <h1 className="text-lg lg:text-sm text-blue-dark font-semibold">
            {title}
          </h1>
          <p className="text-sm lg:text-xs text-gray-darkest">
            <span className="font-medium">{introDescription}</span>{" "}
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
