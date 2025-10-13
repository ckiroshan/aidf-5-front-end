import { useState, useEffect } from "react";
import { useGetLocationNamesQuery } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useHotelFilters } from "@/hooks/useHotelFilters";

export const FilterSidebar = () => {
  const { state, applyUpdates, clearFilters } = useHotelFilters();
  const { data: locationNames = [] } = useGetLocationNamesQuery();
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([state.minPrice ?? 0, state.maxPrice ?? 1000]);

  // Debounce price updates
  useEffect(() => {
    const t = setTimeout(() => {
      applyUpdates({ minPrice: price[0], maxPrice: price[1] });
    }, 250);
    return () => clearTimeout(t);
  }, [price]);

  const filteredLocations = locationNames.filter((n) => n.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    setPrice([state.minPrice ?? 0, state.maxPrice ?? 1000]);
  }, [state.minPrice, state.maxPrice]);

  return (
    <aside className="space-y-4">
      {/* Location filter */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="font-semibold mb-2">Locations</h3>
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search locations..." className="mb-3" />
        <div className="max-h-48 overflow-auto space-y-2">
          {filteredLocations.map((location) => {
            const selected = state.locations.includes(location);
            return (
              <button
                key={location}
                className={`w-full text-left text-sm px-2 py-1 rounded ${selected ? "bg-primary/10" : ""}`}
                onClick={() => {
                  const next = selected ? state.locations.filter((l) => l !== location) : [...state.locations, location];
                  applyUpdates({ locations: next });
                }}
              >
                {location}
              </button>
            );
          })}
        </div>

        {/* Selected location chips */}
        {!!state.locations.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {state.locations.map((location) => (
              <Badge
                key={location}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  applyUpdates({
                    locations: state.locations.filter((l) => l !== location),
                  });
                }}
              >
                {location} ✕
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Price filter */}
      <div className="rounded-lg border bg-card p-4">
        <h3 className="font-semibold mb-2">Price range</h3>
        <Slider value={price} onValueChange={(v) => setPrice([v[0], v[1]])} min={0} max={1000} step={10} className="mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${price[0]}</span>
          <span>${price[1]}</span>
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear filters
      </Button>
    </aside>
  );
};
