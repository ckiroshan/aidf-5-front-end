import { useGetHotelsBySearchQuery, useGetHotelsFilteredQuery } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { HotelCard } from "../hotels/HotelCard";
import { Button } from "../ui/button";
import { clearQuery } from "@/lib/features/searchSlice";
import { SearchX } from "lucide-react";

function HotelListings() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  // Queries
  const { data: searchResults, isLoading: isSearchLoading, isError: isSearchError, error: searchError } = useGetHotelsBySearchQuery(query, { skip: !query });

  const { data: allHotels, isLoading: isAllLoading, isError: isAllError, error: allError } = useGetHotelsFilteredQuery({ page: 1, pageSize: 12, sortBy: "featured" }, { skip: !!query });

  const hotels = query ? searchResults : allHotels?.items ?? [];
  const isLoading = query ? isSearchLoading : isAllLoading;
  const isError = query ? isSearchError : isAllError;
  const error = query ? searchError : allError;

  if (isLoading) {
    return (
      <section className="px-8 py-12">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-12 text-center">
        <p className="text-red-500 font-medium">Error loading data: {error?.message}</p>
      </section>
    );
  }

  return (
    <section className="px-8 py-12">
      {query && (
        <>
          <div className="flex flex-col  sm:items-center sm:justify-between mb-8 p-4 bg-muted/40 rounded-lg border">
            <div className="text-center">
              <h2 className="text-xl lg:text-2xl font-semibold">Showing results for</h2>
              <p className="text-base lg:text-lg my-2">"{query}"</p>
              <p className="text-primary font-semibold">
                ( {hotels?.length ?? 0} hotel{hotels?.length === 1 ? "" : "s"} found )
              </p>
            </div>
          </div>
            <Button variant="outline" onClick={() => dispatch(clearQuery())} className="my-3 sm:mt-0">
              Show All Hotels
            </Button>
        </>
      )}

      {hotels?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
          <p className="text-sm text-muted-foreground mb-6">Try adjusting your search or browse all available hotels.</p>
          <Button onClick={() => dispatch(clearQuery())}>Show All Hotels</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  );
}

export default HotelListings;
