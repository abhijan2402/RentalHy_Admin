import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdsApi = createApi({
  reducerPath: "AdsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["AdsApi"],
  endpoints: (builder) => ({
    // Get All Ads
    getAds: builder.query({
      query: (search = "") => `ads`,
      providesTags: ["AdsApi"],
    }),

    // Add (POST) Ads
    addAd: builder.mutation({
      query: (formData) => ({
        url: `ads`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AdsApi"],
    }),

    // Delete Ad
    deleteAd: builder.mutation({
      query: (id) => ({
        url: `ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdsApi"],
    }),
  }),
});

export const { useGetAdsQuery, useAddAdMutation, useDeleteAdMutation } = AdsApi;
