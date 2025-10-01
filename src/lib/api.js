import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/`,
    prepareHeaders: async (headers) => {
      return new Promise((resolve) => {
        async function checkToken() {
          const clerk = window.Clerk;
          if (clerk) {
            const token = await clerk.session?.getToken();
            headers.set("Authorization", `Bearer ${token}`);
            resolve(headers);
          } else {
            setTimeout(checkToken, 500);
          }
        }
        checkToken();
      });
    },
  }),
  endpoints: (build) => ({
    // Get all hotels
    getAllHotels: build.query({
      query: () => "hotels",
      providesTags: (result, error, id) => [{ type: "Hotels", id: "LIST" }],
    }),
    // Get hotels by search
    getHotelsBySearch: build.query({
      query: (search) => `hotels/search?query=${search}`,
      providesTags: (result, error, search) => [{ type: "Hotels", id: search }],
    }),
    // Get Hotel by ID
    getHotelById: build.query({
      query: (id) => `hotels/${id}`,
      providesTags: (result, error, id) => [{ type: "Hotels", id }],
    }),
    // Add Hotel
    createHotel: build.mutation({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Hotels", id: "LIST" }],
    }),
    // Add Booking
    createBooking: build.mutation({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
    }),
    // Get Booking by ID
    getBookingById: build.query({
      query: (bookingId) => `bookings/${bookingId}`,
    }),
    // Add Checkout session
    createCheckoutSession: build.mutation({
      query: (payload) => ({
        url: `payments/create-checkout-session`,
        method: "POST",
        body: payload,
      }),
    }),
    // Get Checkout session status
    getCheckoutSessionStatus: build.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
    }),
    // Get all locations
    getAllLocations: build.query({
      query: () => "locations",
      providesTags: (result, error, id) => [{ type: "Locations", id: "LIST" }],
    }),
    // Add location
    addLocation: build.mutation({
      query: (location) => ({
        url: "locations",
        method: "POST",
        body: {
          name: location.name,
        },
      }),
      invalidatesTags: (result, error, id) => [{ type: "Locations", id: "LIST" }],
    }),
    // Get reviews by Hotel ID
    getReviewsByHotel: build.query({
      query: (hotelId) => `reviews/hotel/${hotelId}`,
      providesTags: (result, error, hotelId) => [{ type: "Hotels", id: hotelId }],
    }),
    // Add Review
    addReview: build.mutation({
      query: (review) => ({
        url: "reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, id) => [{ type: "Hotels", id: review.hotelId }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllHotelsQuery, useGetHotelByIdQuery, useGetHotelsBySearchQuery,useCreateHotelMutation, useCreateBookingMutation, useGetBookingByIdQuery, useCreateCheckoutSessionMutation, useGetCheckoutSessionStatusQuery, useAddLocationMutation, useGetAllLocationsQuery, useGetReviewsByHotelQuery, useAddReviewMutation } = api;
