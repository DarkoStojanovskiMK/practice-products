import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, Session } from "@supabase/supabase-js";

const initialState: {
  supabaseUser: User | null;
  isAuthenticated: boolean;
  session: Session | null;
  isLoading: boolean;
} = {
  supabaseUser: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
      state.supabaseUser = action.payload?.user ?? null;
      state.isAuthenticated = !!action.payload?.user;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearAuth: (state) => {
      state.supabaseUser = null;
      state.session = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setSession, setLoading, clearAuth } = authSlice.actions;

export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectUserSession = (state: any) => state.auth.session;

export default authSlice.reducer;
