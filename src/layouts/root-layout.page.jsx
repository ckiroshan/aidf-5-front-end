import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";


function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Toaster />
    </>
  );
}

export default RootLayout;
