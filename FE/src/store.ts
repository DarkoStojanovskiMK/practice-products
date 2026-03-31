import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiRtk/apiSlice";
import authSlice from "./api/apiRtk/auth/authSlice";
import { profileApi } from "./api/apiRtk/profileApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, profileApi.middleware),
  devTools: true,
});
