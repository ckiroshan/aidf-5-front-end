import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";
import { useState } from "react";

export function BookingDialog({ hotelName, hotelId, onSubmit, isLoading }) {
  const [open, setOpen] = useState(false);

  const handleBookingSubmit = async (bookingData) => {
    await onSubmit(bookingData);
    if (!isLoading) {
      setTimeout(() => setOpen(false), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-5 text-lg">Book Now</Button>
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
