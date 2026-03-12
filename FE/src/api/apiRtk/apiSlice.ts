import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_NODE_URL } from "../base_url";
// import { API_TAGS } from './apiTags';

// import { supabase } from '@/lib/supabaseClient';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_NODE_URL,
  //   credentials: 'include',
  //   prepareHeaders: async (headers) => {
  //     const {
  //       data: { session }
  //     } = await supabase.auth.getSession();
  //     const accessToken = session?.access_token;
  //     const user_id = sessionStorage.getItem('activeAccountId');
  //     const language_id = sessionStorage.getItem('languageId');

  //     headers.set('X-Platform-Domain', getPlatformFromUrl());
  //     if (user_id) {
  //       headers.set('X-User-Id', user_id);
  //     }

  //     if (language_id) {
  //       headers.set('X-Language-Id', language_id);
  //     }

  //     if (accessToken) {
  //       headers.set('Authorization', `Bearer ${accessToken}`);
  //     } else {
  //       headers.delete('Authorization');
  //     }
  //     return headers;
  //   }
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["Products"],
  endpoints: () => ({}),
});
