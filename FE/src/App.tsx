import { BrowserRouter, Route, Routes } from "react-router-dom";
import { selectUserSession, setSession } from "./api/apiRtk/auth/authSlice";
import { useEffect } from "react";
import { supabase } from "./utils/supabase";
import { useDispatch, useSelector } from "react-redux";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const session = useSelector(selectUserSession);
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Fast initial session from storage
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    // 2. Subscribe to changes (login/logout/refresh/token expiry)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch(setSession(session));
      },
    );

    // Cleanup on unmount (rare, but good practice)
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {!session && <Route path="*" element={<PublicRoutes />} />}
        {!!session && <Route path="*" element={<PrivateRoutes />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
