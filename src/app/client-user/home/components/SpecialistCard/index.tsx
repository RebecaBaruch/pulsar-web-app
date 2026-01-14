import React from 'react';
import Icon from '@/components/Icons';

type SpecialistCardProps = {
  title: string;
  icon?: string;
  image?: string;
  href?: string;
};

export function SpecialistCard({
  title,
  icon,
  image,
  href,
}: SpecialistCardProps) {
  return (
    <a href={href}>
      <div className="min-w-[100px] md:w-full lg:min-w-[full] h-full rounded-xl overflow-hidden bg-white shadow-sm pb-3 hover:cursor-pointer hover:underline hover:transform hover:scale-101 transition-transform flex flex-col items-center justify-start gap-3">
        {icon ? (
          <div className="w-full h-16 rounded-md bg-blue-light flex items-center justify-center text-blue-dark p-3">
            <Icon name={icon as any} className="w-8 h-8" />
          </div>
        ) : image ? (
          <img src={image} alt="" className="mb-3" />
        ) : null}

        <div className="w-fit text-xs text-center font-regular px-3">
          {title}
        </div>
      </div>
    </a>
  );
}
