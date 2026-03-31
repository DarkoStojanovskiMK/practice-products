
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/login";
import Products from "../pages/products/products";
import Profile from "../pages/profile/Profile";
import PublicLayout from "./PublicLayout";
import PrivateLayout from "./PrivateLayout";



const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* PRIVATE */}
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;