import { Badge } from "@/components/ui/badge";
import { format, isValid, parseISO } from "date-fns";
import { MapPin } from "lucide-react";

const safeFormat = (dateString, fmt) => {
  if (!dateString) return "—";
  const d = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
  return isValid(d) ? format(d, fmt) : "—";
};

export const BookingCard = ({ booking }) => {
  const { hotelId: hotel } = booking;

  return (
    <div className="overflow-hidden rounded-xl border bg-gradient-to-br from-card to-muted shadow-md hover:shadow-lg transition mb-3">
      {/* Image */}
      <div className="relative group">
        <img src={hotel.image} alt={hotel.name} className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-3 right-3">
          <Badge variant={booking.paymentStatus === "PAID" ? "default" : "destructive"} className="px-3 py-1 text-xs font-semibold shadow-sm">
            {booking.paymentStatus}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{hotel.name}</h3>
        <div className="flex flex-wrap items-center">
          <MapPin className="h-5 w-5 text-amber-500 mr-1" />
            <span className="text-sm text-muted-foreground mr-3">{hotel.location}</span>
        </div>

        <div className="text space-y-1">
          <p>
            <span className="text-sm font-semibold">Check-in → </span>
             {safeFormat(booking.checkIn, "MMM d, yyyy")}
          </p>
          <p>
            <span className="text-sm font-semibold">Check-out → </span>
             {safeFormat(booking.checkOut, "MMM d, yyyy")}
          </p>
          <p>
            <span className="text-sm font-semibold">Room No : </span>
             {booking.roomNumber}
          </p>
          <p> 
            <span className="text-sm font-semibold">Booked on : </span>
            {safeFormat(booking.createdAt, "MMM d, yyyy h:mm a")}
            </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-5 py-3 bg-muted/40">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-lg font-semibold text-primary">${hotel.price}</span>
      </div>
    </div>
  );
};
