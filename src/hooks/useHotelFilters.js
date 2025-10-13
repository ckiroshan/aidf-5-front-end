import { useSearchParams } from "react-router";

// Manage hotel filters with URL search parameters
export function useHotelFilters() {
  const [params, setParams] = useSearchParams(); // get/set URL search parameters

  // Filter State derived from URL
  const state = {
    locations: params.get("locations")?.split("|").filter(Boolean) ?? [],
    minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
    maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
    sortBy: params.get("sortBy") || "featured",
    page: Number(params.get("page") || 1),
    pageSize: Number(params.get("pageSize") || 12),
    view: params.get("view") === "list" ? "list" : "grid",
  };

  // Utility Functions ===>  
  // Sets parameters (With key=value)
  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value == null || value === "") next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.set("page", "1");
    setParams(next, { replace: true });
  };

  // Applies multiple parameter updates at once
  const applyUpdates = (updates) => {
    const next = new URLSearchParams(params);
    Object.entries(updates).forEach(([k, v]) => {
      if (v == null || (Array.isArray(v) && v.length === 0)) {
        next.delete(k);
      } else if (Array.isArray(v)) {
        next.set(k, v.join("|"));
      } else {
        next.set(k, String(v));
      }
    });
    next.set("page", "1");
    setParams(next, { replace: true });
  };

  // Clears all filter parameters
  const clearFilters = () => {
    setParams(new URLSearchParams({ sortBy: state.sortBy, view: state.view }), { replace: true });
  };

  return { state, setParam, applyUpdates, clearFilters };
}
