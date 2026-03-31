import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../../utils/supabase";



export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fakeBaseQuery(), // important
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      async queryFn(userId) {
        const { data, error } = await supabase
          .from("userProfiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) return { error };
        return { data };
      },
    }),
  }),
});

export const { useGetUserProfileQuery } = profileApi;