import Navigation from "../Navigation";
import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";

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
