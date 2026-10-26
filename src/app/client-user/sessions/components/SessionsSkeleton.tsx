import { clientStickyHeaderClass } from "@/components/ClientPage";
import { Skeleton } from "@/components/Skeleton";

export default function SessionsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className={clientStickyHeaderClass}>
        <Skeleton className="h-8 w-1/3 mb-2" />
        <div className="flex flex-row gap-4">
          <Skeleton className="h-10 w-40 rounded-full" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-md" />
      ))}
    </div>
  );
}
