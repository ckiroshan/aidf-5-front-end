import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (build) => ({
    // Get all hotels
    getAllHotels: build.query({
      query: () => 'hotels',
    }),
    // Add location
    addLocation: build.mutation({
      query: (location) => ({
        url: 'locations',
        method: 'POST',
        body: {
          name: location.name,
        },
      }),
    }),
    // Get all locations
    getAllLocations: build.query({
      query: () => 'locations',
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllHotelsQuery, useAddLocationMutation, useGetAllLocationsQuery } = api