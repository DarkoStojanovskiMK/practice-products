import { Navigate, Route, Routes } from "react-router-dom";

import Products from "../pages/products/products";

export default function PrivateRoutes() {
  console.log("here");
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
