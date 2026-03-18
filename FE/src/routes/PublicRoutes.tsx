import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/login/login";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {/* Catch-all while logged-out */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
