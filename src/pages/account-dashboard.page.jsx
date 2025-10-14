import { BookingHistory } from "@/components/my-account/BookingHistory";
import { UserProfile, useUser } from "@clerk/clerk-react";

export const AccountDashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8 mb-20">
      {/* Booking History */}
      <h2 className="text-xl lg:text-2xl font-bold mb-3">My Booking History</h2>
      <BookingHistory userId={user.id} />
      {/* User Profile */}
      <h2 className="text-xl lg:text-2xl font-bold mb-3">Profile Management</h2>
      <div className="flex flex-col items-center">
        <UserProfile
          appearance={{
            variables: { colorPrimary: "#4382e8", colorBackground: "#bdbdb", colorText: "#C3C3C", borderRadius: "0.5rem", fontSize: "15px", colorBorder: "#4382e8" },
            elements: { rootBox: "pb-5", headerTitle: "text-primary", navbar: "bg-white" },
          }}
        />
      </div>
    </main>
  );
};
