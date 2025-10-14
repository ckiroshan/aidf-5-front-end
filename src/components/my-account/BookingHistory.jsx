import { useGetBookingsForUserQuery } from "@/lib/api";
import { BookingCard } from "./BookingCard";
import { useState } from "react";
import { AppPagination } from "../AppPagination";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { CalendarSearch } from "lucide-react";

export const BookingHistory = ({ userId }) => {
  const { data: bookings = [], isLoading, isError } = useGetBookingsForUserQuery(userId);
  const [page, setPage] = useState(1);
  const pageSize = 3; // show 3 cards per page

  if (isLoading) {
    return (
      <section>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border bg-card shadow-sm">
              {/* Image placeholder */}
              <Skeleton className="h-40 w-full" />

              {/* Content */}
              <div className="p-5 space-y-3">
                <Skeleton className="h-6 w-3/4" /> {/* Hotel name */}
                <Skeleton className="h-4 w-1/2" /> {/* Location */}
                <Skeleton className="h-4 w-2/3" /> {/* Dates */}
                <Skeleton className="h-4 w-1/3" /> {/* Room */}
                <Skeleton className="h-4 w-1/2" /> {/* Booked on */}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t px-5 py-3">
                <Skeleton className="h-5 w-16" /> {/* Status */}
                <Skeleton className="h-6 w-12" /> {/* Price */}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) return <p className="text-destructive">Failed to load bookings.</p>;

  const totalPages = Math.ceil(bookings.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const currentBookings = bookings.slice(startIndex, startIndex + pageSize);

  return (
    <section>
      {bookings.length === 0 && (
        <section className="flex flex-col items-center justify-center py-6 text-center border-2 rounded-2xl mb-5">
          <div className="rounded-full bg-muted p-4 mb-6 border-2">
            <CalendarSearch className="text-primary" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold mb-2">No bookings yet</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 w-100 md:max-w-md">Looks like you haven’t booked your stay yet. Start exploring our hotels and plan your next getaway today.</p>
          <Button asChild>
            <a href="/hotels">Browse Hotels</a>
          </Button>
        </section>
      )}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {currentBookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
      <AppPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </section>
  );
};
