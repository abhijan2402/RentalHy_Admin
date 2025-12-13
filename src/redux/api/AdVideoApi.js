import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdVideoApi = createApi({
  reducerPath: "AdVideoApi",
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
  tagTypes: ["adVideo"],
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: () => "intro-video",
      providesTags: ["adVideo"],
    }),
    addVideo: builder.mutation({
      query: (formdata) => ({
        url: `intro-video`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["adVideo"],
    }),
  }),
});

export const { useGetVideoQuery, useAddVideoMutation } = AdVideoApi;
