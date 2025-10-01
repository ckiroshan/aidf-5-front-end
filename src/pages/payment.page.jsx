import CheckoutForm from "@/components/hotel-details/CheckoutForm";
import { useSearchParams } from "react-router";
import { useGetBookingByIdQuery } from "@/lib/api";

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const { data: booking, isLoading: isBookingLoading } =
    useGetBookingByIdQuery(bookingId);

  if (isBookingLoading && !booking) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <span className="text-center">
        <h1 className="text-2xl lg:text-4xl font-bold">Confirm Your Booking</h1>
      </span>
      <div className="mt-4">
        <CheckoutForm bookingId={booking._id} />
      </div>
    </main>
  );
}

export default PaymentPage;


