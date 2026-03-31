import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserSession } from "../api/apiRtk/auth/authSlice";

const PublicLayout = () => {
  const session = useSelector(selectUserSession);

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;