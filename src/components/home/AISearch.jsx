import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearQuery, setQuery } from "@/lib/features/searchSlice";

export default function AISearch() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const [value, setValue] = useState(query);

  // Keep local input state in sync with Redux query
  useEffect(() => {
    setValue(query);
  }, [query]);

  function handleSearch() {
    dispatch(setQuery(value));
  }

  function handleClear() {
    dispatch(clearQuery());
    setValue(""); // reset input field
  }

  // Escape key clears search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(clearQuery());
        setValue("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <div className="z-10 w-full max-w-lg">
      <div className="relative flex items-center">
        <div className="relative flex-grow">
          <Input placeholder="Search for the experience you want" name="query" value={value} className="bg-[#1a1a1a] text-sm sm:text-base text-white placeholder:text-white/70 border-0 rounded-full py-6 lg:py-7 pl-4 pr-12 sm:pr-32 w-full transition-all" onChange={(e) => setValue(e.target.value)} />
        </div>

        {query ? (
          <Button type="button" className="absolute right-2 h-[80%] my-auto bg-primary text-white rounded-full px-2 sm:px-4 flex items-center gap-x-2 border-gray-600 border-2 hover:bg-blue-400 transition-colors" onClick={handleClear}>
            ✕ <span>Clear</span>
          </Button>
        ) : (
          <Button type="button" className="absolute right-2 h-[80%] my-auto bg-black/10 text-white rounded-full px-2 sm:px-4 flex items-center gap-x-2 border-primary border-3 hover:bg-black transition-colors" onClick={handleSearch}>
            <Sparkles className="w-4 h-4 fill-blue-700 text-primary" />
            <span className="text-sm">AI Search</span>
          </Button>
        )}
      </div>
    </div>
  );
}
