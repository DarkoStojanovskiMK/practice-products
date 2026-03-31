
import {  setSession } from "./api/apiRtk/auth/authSlice";
import { useEffect } from "react";
import { supabase } from "./utils/supabase";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Fast initial session from storage
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    // 2. Subscribe to changes (login/logout/refresh/token expiry)
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      dispatch(setSession(session));
    });

    // Cleanup on unmount (rare, but good practice)
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <AppRoutes/>
  );
}

export default App;
