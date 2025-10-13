import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, Eye } from "lucide-react";
import { useParams } from "react-router";
import { BookingDialog } from "./BookingDialog";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";

export const HotelTopSection = ({ hotel, isLoading }) => {
  const { _id } = useParams();
  const [isImageOpen, setIsImageOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="w-full h-[300px] md:h-[400px] rounded-lg" />
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Image */}
      <div className="relative w-full group">
        <img src={hotel.image} alt={hotel.name} className="w-full h-[280px] sm:h-[350px] md:h-[400px] object-cover rounded-lg shadow-md" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition">
          <Button variant="secondary" className="bg-white/80 hover:bg-white text-black" onClick={() => setIsImageOpen(true)}>
            <Eye className="h-4 w-4 mr-2" /> View
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col space-y-6">
        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold">{hotel.name}</h1>
            <Button variant="outline" size="icon">
              <Star className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <div className="flex flex-wrap items-center mt-2 text-sm sm:text-base">
            <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
            <span className="text-muted-foreground mr-3">{hotel.location}</span>
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-amber-300 text-amber-400" />
              <span className="font-semibold">{hotel?.rating ?? "No rating"}</span>
              <span className="text-muted-foreground">({hotel?.reviews.length || 0} reviews)</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-justify leading-relaxed">{hotel.description}</p>

        {/* Price + Book Now */}
        <div className="flex items-center justify-between lg:justify-start gap-4">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">${hotel.price}</p>
            <p className="text-md font-semibold">per night</p>
          </div>
          <BookingDialog hotelName={hotel.name} hotelId={hotel._id} />
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="sm:max-w-3xl lg:max-w-4xl p-0 border-none bg-transparent shadow-none">
          <img src={hotel.image} alt={hotel.name} className="w-full h-auto object-contain rounded-lg" />
        </DialogContent>
      </Dialog>
    </div>
  );
};
