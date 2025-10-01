import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wifi, Building2, Tv, Coffee, Car, Droplet, Dumbbell, Heart } from "lucide-react";

export const HotelAmenities = ({ isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6 space-y-4">
          <Skeleton className="h-7 w-32 mx-auto" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="py-0">
        <h2 className="text-xl text-center font-semibold mb-6">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div className="flex md:justify-center">
            <Wifi className="h-6 w-6 mr-3 text-primary" />
            <span>Free Wi-Fi</span>
          </div>
          <div className="flex md:justify-center">
            <Building2 className="h-6 w-6 mr-3 text-primary" />
            <span>Restaurant</span>
          </div>
          <div className="flex md:justify-center">
            <Tv className="h-6 w-6 mr-3 text-primary" />
            <span>Flat-screen TV</span>
          </div>
          <div className="flex md:justify-center">
            <Coffee className="h-6 w-6 mr-3 text-primary" />
            <span>Coffee maker</span>
          </div>
          <div className="flex md:justify-center">
            <Car className="h-6 w-6 mr-3 text-primary" />
            <span>Parking</span>
          </div>
          <div className="flex md:justify-center">
            <Droplet className="h-6 w-6 mr-3 text-primary" />
            <span>Swimming Pool</span>
          </div>
          <div className="flex md:justify-center">
            <Dumbbell className="h-6 w-6 mr-3 text-primary" />
            <span>Fitness Center</span>
          </div>
          <div className="flex md:justify-center">
            <Heart className="h-6 w-6 mr-3 text-primary" />
            <span>Spa & Wellness</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
