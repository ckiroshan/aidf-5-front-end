import { AppPagination } from "@/components/AppPagination";
import { FilterSidebar } from "@/components/hotels/FilterSidebar";
import { HotelGrid } from "@/components/hotels/HotelGrid";
import { SortDropdown } from "@/components/hotels/SortDropdown";
import { useGetHotelsFilteredQuery } from "@/lib/api";
import { useHotelFilters } from "@/hooks/useHotelFilters";
import { useMemo } from "react";

const HotelsPage = () => {
  const { state, setParam } = useHotelFilters();
  const memoizedState = useMemo(() => state, [state]);
  const { data, isLoading, isError } = useGetHotelsFilteredQuery(memoizedState);

  const toggleView = () => setParam("view", memoizedState.view === "grid" ? "list" : "grid");

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-0 py-8 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
      <FilterSidebar />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <SortDropdown value={memoizedState.sortBy} onChange={(v) => setParam("sortBy", v)} onToggleView={toggleView} view={memoizedState.view} />
        </div>

        {isLoading ? (
          <HotelGrid.Skeleton view={memoizedState.view} />
        ) : isError ? (
          <p className="text-destructive">Failed to load hotels.</p>
        ) : data?.items?.length ? (
          <>
            <HotelGrid items={data.items} view={memoizedState.view} />
            <AppPagination page={memoizedState.page} totalPages={data.totalPages} onPageChange={(p) => setParam("page", String(p))} />
          </>
        ) : (
          <div className="rounded-lg border bg-card p-10 text-center">
            <h3 className="text-lg font-semibold mb-2">No hotels match your filters</h3>
            <p className="text-muted-foreground">Try adjusting your locations, price range, or sort options.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HotelsPage;