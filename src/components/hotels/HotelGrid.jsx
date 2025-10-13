import { Skeleton } from "@/components/ui/skeleton";
import { HotelCard } from "./HotelCard";

export const HotelGrid = ({ items, view }) => {
  if (view === "list") {
    return (
      <div className="space-y-3">
        {items.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} variant="list" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} variant="grid" />
      ))}
    </div>
  );
};

HotelGrid.Skeleton = ({ view }) => {
  if (view === "list") {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-4 rounded-lg border bg-card p-4">
            <Skeleton className="h-24 w-36" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card overflow-hidden">
          <Skeleton className="h-40 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};
