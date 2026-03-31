import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/header/header";
import { selectUserSession } from "../api/apiRtk/auth/authSlice";
import { useGetUserProfileQuery } from "../api/apiRtk/profileApi";


const PrivateLayout = () => {
  const session = useSelector(selectUserSession);



const { data: profile } = useGetUserProfileQuery(session?.user?.id, {
  skip: !session?.user?.id,
});

 if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet context={{ profile }}/>
    </>
  );
};

export default PrivateLayout;