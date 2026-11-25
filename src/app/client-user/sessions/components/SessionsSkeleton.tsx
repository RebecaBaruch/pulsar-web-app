import { Skeleton } from "@/components/Skeleton";

export default function SessionsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-md md:h-16" />
      ))}
    </div>
  );
}