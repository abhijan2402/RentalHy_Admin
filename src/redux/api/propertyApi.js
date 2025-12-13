import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Property"],
  endpoints: (builder) => ({
    getProperties: builder.query({
      // Get Property
      query: (body) => ({
        url: "properties",
        method: "POST",
        body: body,
      }),
      providesTags: ["Property"],
    }),

    // Get Hostels
    getHostels: builder.query({
      query: (body) => ({
        url: "hostels/list",
        method: "POST",
        body, // if you want to send search criteria in body
      }),
      providesTags: ["Property"],
    }),

    // Get Farm
    getFarm: builder.query({
      query: (body) => ({
        url: "farm_listing",
        method: "POST",
        body,
      }),
      providesTags: ["Property"],
    }),

    // Get Convention
    getConvention: builder.query({
      query: (body) => ({
        url: "hall_listing",
        method: "POST",
        body: body,
      }),
      providesTags: ["Property"],
    }),
    // property-update/2'
  
  }),
});

export const {
  useGetPropertiesQuery,
  useGetHostelsQuery,
  useGetFarmQuery,
  useGetConventionQuery,
  
} = propertyApi;
