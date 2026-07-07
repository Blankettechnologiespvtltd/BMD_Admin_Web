import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("access_token");

  return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;