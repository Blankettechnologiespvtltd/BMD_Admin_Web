/**
 * PROTECTED ROUTE
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps routes that require authentication.
 * If the user is not logged in → redirects to /login.
 * If the user is logged in → renders children (or <Outlet /> for nested routes).
 *
 * Usage in router:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/admin/users" element={<Users />} />
 *   </Route>
 */

import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../features/auth/store/authStore";
import ROUTES from "../../constants/routes";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Support both wrapper (<ProtectedRoute><Page /></ProtectedRoute>)
  // and layout route (<Route element={<ProtectedRoute />}><Route ... /></Route>)
  return children ?? <Outlet />;
}
