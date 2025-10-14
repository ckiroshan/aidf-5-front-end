import { useState } from "react";
import LocationTab from "./LocationTab";
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";
import { HotelCard } from "../hotels/HotelCard";
import { Map, MapPin } from "lucide-react";

function HotelListings() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const { data: hotels, isLoading: isHotelsLoading, isError: isHotelsError, error: hotelsError } = useGetAllHotelsQuery();

  const { data: locations, isLoading: isLocationsLoading, isError: isLocationsError, error: locationsError } = useGetAllLocationsQuery();

  const allLocations = locations ? [{ _id: 0, name: "All" }, ...locations] : [{ _id: 0, name: "All" }];

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation._id);
  };

  const selectedLocationName = allLocations.find((el) => selectedLocation === el._id).name;

  const filteredHotels =
    selectedLocation === 0
      ? hotels
      : hotels.filter((hotel) => {
          return hotel.location.includes(selectedLocationName);
        });

  const isLoading = isHotelsLoading || isLocationsLoading;
  const isError = isHotelsError || isLocationsError;
  const error = [hotelsError, locationsError];

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
          <p className="text-lg text-muted-foreground">Discover the most trending hotels worldwide for an unforgettable experience.</p>
        </div>
        <Skeleton className="h-6 flex items-center flex-wrap gap-x-4" />
        <Skeleton className="h-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
          <p className="text-lg text-muted-foreground">Discover the most trending hotels worldwide for an unforgettable experience.</p>
        </div>
        <p className="text-red-500">Error loading data </p>
      </section>
    );
  }

  return (
    <section className="px-8 py-8 lg:py-8">
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold mb-4">Top trending hotels worldwide</h2>
        <p className="text-base lg:text-lg text-center text-muted-foreground">Discover the most trending hotels worldwide for an unforgettable experience.</p>
      </div>

      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
        <span className="text-base text-muted-foreground flex items-center gap-1">
          <Map /> Countries:
        </span>
        <div className="flex items-center gap-2">
          {allLocations.map((location) => (
            <LocationTab key={location._id} onClick={handleLocationSelect} location={location} selectedLocation={selectedLocation} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {filteredHotels.map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        })}
      </div>
    </section>
  );
}

export default HotelListings;
