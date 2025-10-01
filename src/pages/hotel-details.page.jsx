import { useParams } from "react-router";
import { useGetHotelByIdQuery } from "@/lib/api.js";
import { HotelReviews } from "@/components/hotel-details/HotelReviews";
import { HotelAmenities } from "@/components/hotel-details/HotelAmenities";
import { HotelTopSection } from "@/components/hotel-details/HotelTopSection";

const HotelDetailsPage = () => {
  const { _id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(_id);

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Hotel Details</h2>
        <p className="text-muted-foreground text-center">{error?.data?.message || "Something went wrong. Please try again later."}</p>
      </div>
    );
  }

  return (
    <main className="px-4 py-8 lg:px-12 max-w-7xl mx-auto space-y-10">
      {/* Top Section: Image + Info */}
      <HotelTopSection hotel={hotel} isLoading={isLoading} />

      {/* Amenities */}
      <HotelAmenities isLoading={isLoading} />

      {/* Reviews Section */}
      <HotelReviews hotelId={_id} />
    </main>
  );
};

export default HotelDetailsPage;
