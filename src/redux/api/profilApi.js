// api/profileApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["profileApi"],
  endpoints: (builder) => ({
    // Step 1: Forgot Password (send email)
    forgotPassword: builder.mutation({
      query: (formData) => ({
        url: `forgot-password`,
        method: "POST",
        body: formData,
      }),
    }),

    // Step 2: Verify OTP
    verifyPassword: builder.mutation({
      query: (formData) => ({
        url: `verify-reset-otp`,
        method: "POST",
        body: formData,
      }),
    }),

    // Step 3: Reset Password
    resetPassword: builder.mutation({
      query: (formData) => ({
        url: `reset-password`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useVerifyPasswordMutation,
  useResetPasswordMutation,
} = profileApi;
