import { Building2, Car, Coffee, MapPin, Star, Tv, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { BookingDialog } from "../hotel-details/BookingDialog";

export const HotelCard = ({ hotel, variant = "grid" }) => {
  const images = Array.isArray(hotel.image) ? hotel.image : [hotel.image];

  const Content = (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">{hotel.rating ?? "—"}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground flex items-center gap-1">
        <MapPin className="h-4 w-4" /> {hotel.location}
      </p>

      <div className="flex items-center justify-between mt-2">
        <h3 className="text-sm text-muted-foreground">Amenities</h3>
        <span className="flex items-center justify-between ml-3">
          <div className="flex items-center text-primary">
            <span title="Free Wi-Fi" className="p-1 rounded-md hover:outline-2 hover:outline-primary"><Wifi className="h-5 w-5" /></span>
            <span title="City View" className="p-1 rounded-md hover:outline-2 hover:outline-primary"><Building2 className="h-5 w-5" /></span>
            <span title="Television" className="p-1 rounded-md hover:outline-2 hover:outline-primary"><Tv className="h-5 w-5" /></span>
            <span title="Coffee Maker" className="p-1 rounded-md hover:outline-2 hover:outline-primary"><Coffee className="h-5 w-5" /></span>
            <span title="Parking Available" className="p-1 rounded-md hover:outline-2 hover:outline-primary"><Car className="h-5 w-5" /></span>
          </div>
        </span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-base text-primary font-semibold">
          ${hotel.price} <span className="text-foreground">/ per night</span>
        </span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/hotels/${hotel._id}`}>View Details</Link>
        </Button>
        <BookingDialog hotelName={hotel.name} hotelId={hotel._id} />
      </div>
    </div>
  );

  if (variant === "list") {
    return (
      <div className="flex gap-4 rounded-lg border bg-card overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg">
        <Carousel images={images} className="w-65 h-50" />
        <div className="flex-1">{Content}</div>
      </div>
    );
  }

  // default: grid
  return (
    <div className="rounded-lg border bg-card overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg cursor-pointer">
      <Carousel images={images} className="w-full h-40" />
      {Content}
    </div>
  );
};

const Carousel = ({ images, className }) => {
  return (
    <div className={`relative ${className}`}>
      <img src={images[0]} alt="hotel-image" className="w-full h-full object-cover" />
    </div>
  );
};
