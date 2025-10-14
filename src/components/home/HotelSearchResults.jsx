import { useGetHotelsBySearchQuery, useGetHotelsFilteredQuery } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { HotelCard } from "../hotels/HotelCard";
import { Button } from "../ui/button";
import { clearQuery } from "@/lib/features/searchSlice";

function HotelListings() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  // If query is set → search mode
  const { data: searchResults, isLoading: isSearchLoading, isError: isSearchError, error: searchError } = useGetHotelsBySearchQuery(query, { skip: !query });

  // If query is empty → browse mode
  const { data: allHotels, isLoading: isAllLoading, isError: isAllError, error: allError } = useGetHotelsFilteredQuery({ page: 1, pageSize: 12, sortBy: "featured" }, { skip: !!query });

  const hotels = query ? searchResults : allHotels?.items ?? [];
  const isLoading = query ? isSearchLoading : isAllLoading;
  const isError = query ? isSearchError : isAllError;
  const error = query ? searchError : allError;

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-8">
        <Skeleton className="h-6 flex items-center flex-wrap gap-x-4" />
        <Skeleton className="h-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-8">
        <p className="text-red-500">Error loading data: {error?.message}</p>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-8">
      {query && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Search Results for "{query}"</h2>
          <Button variant="outline" onClick={() => dispatch(clearQuery())}>
            Show All Hotels
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {hotels?.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}

export default HotelListings;
