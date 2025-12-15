type SpecialistCardProps = {
  title: string;
  image: string;
  href?: string;
};

export function SpecialistCard({ title, image, href }: SpecialistCardProps) {
  return (
    <a href={href}>
      <div className="min-w-[200px] md:w-full lg:min-w-full h-full rounded-xl overflow-hidden bg-white shadow-sm pb-4 hover:cursor-pointer hover:trasform hover:scale-105 transition-transform">
        <img src={image} alt="" className="mb-3" />
        <div className="w-fit text-md text-left font-medium px-4">{title}</div>
      </div>
    </a>
  );
}
