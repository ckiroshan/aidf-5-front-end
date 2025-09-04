import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./lib/store.js";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";

import HomePage from "./pages/home.page.jsx";
import SignInPage from "./pages/sign-in.page.jsx";
import SignUpPage from "./pages/sign-up.page.jsx";
import NotFoundPage from "./pages/not-found.page.jsx";
import HotelsPage from "./pages/hotels.page.jsx";
import HotelDetailsPage from "./pages/hotel-details.page.jsx";
import RootLayout from "./layouts/root-layout.page.jsx";
import ProtectLayout from "./layouts/protect-layout.page.jsx";
import AdminProtectLayout from "./layouts/admin-protect-layout.page.jsx";
import CreateHotelPage from "./pages/create-hotel.page.jsx";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  throw new Error("Missing Clerk publishable key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route element={<ProtectLayout />}>
                <Route path="/hotels/:_id" element={<HotelDetailsPage />} />
                <Route element={<AdminProtectLayout />}>
                  <Route path="/admin/create-hotel" element={<CreateHotelPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
