import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
  tagTypes: ["dashboardApi"],
  endpoints: (builder) => ({
    // Get All dashboard
    getdashboard: builder.query({
      query: () => `dashboard/stats/admin`,
      providesTags: ["dashboardApi"],
    }),
  }),
});

export const { useGetdashboardQuery } = dashboardApi;
