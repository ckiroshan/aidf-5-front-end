import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateBookingMutation } from "@/lib/api";

export function BookingDialog({ hotelName, hotelId }) {
  const [open, setOpen] = useState(false);
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const navigate = useNavigate();

  const handleBookingSubmit = async (bookingData) => {
    try {
      const result = await createBooking({
        hotelId,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
      }).unwrap();
      navigate(`/booking/payment?bookingId=${result._id}`);
      setOpen(false);
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-5">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-3 border-primary">
        <DialogHeader>
          <DialogTitle className="text-center">Book Your Stay</DialogTitle>
          <DialogDescription className="text-center">Complete the form below to book your stay at {hotelName}.</DialogDescription>
        </DialogHeader>
        <BookingForm onSubmit={handleBookingSubmit} isLoading={isLoading} hotelId={hotelId} />
      </DialogContent>
    </Dialog>
  );
}
