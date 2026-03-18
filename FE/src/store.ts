import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./api/apiRtk/apiSlice";
import authSlice from "./api/apiRtk/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
