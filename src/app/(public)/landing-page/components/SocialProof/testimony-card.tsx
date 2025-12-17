import React from "react";

type TestimonyProps = {
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
}: TestimonyProps) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-lg p-5 h-[80%] ">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-md sm:text-base md:text-sm font-semibold text-blue-dark">{title}</h1>
        <blockquote className="text-md sm:text-base md:text-sm text-gray-darkest">{description}</blockquote>
      </div>
      <div className="flex items-start mt-2">
        <img src={profilePic} alt={author} className="w-7 h-7 md:w-10 md:h-10 rounded-full" />
        <div className="ml-4">
          <h2 className="text-sm sm:text-md md:text-sm lg:text-md font-semibold text-black">{author}</h2>
          <p className="text-sm sm:text-md md:text-sm lg:text-md text-gray-darkest">{authorBio}</p>
        </div>
      </div>
    </div>
  );
}
