import { Navigate, Route, Routes } from "react-router-dom";

import Products from "../pages/products/products";
import Profile from "../pages/profile/Profile";

export default function PrivateRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
