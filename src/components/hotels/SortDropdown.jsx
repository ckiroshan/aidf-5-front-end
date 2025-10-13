import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

export const SortDropdown = ({ value, onChange, view, onToggleView }) => {
  return (
    <div className="flex items-center gap-3">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price_asc">Price: Low to High</SelectItem>
          <SelectItem value="price_desc">Price: High to Low</SelectItem>
          <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
          <SelectItem value="alpha_asc">Alphabetical: A–Z</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="icon" onClick={onToggleView} title="Toggle view">
        {view === "grid" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
      </Button>
    </div>
  );
};
