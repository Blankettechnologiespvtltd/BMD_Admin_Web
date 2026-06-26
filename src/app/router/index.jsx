/**
 * APP ROUTER
 * ─────────────────────────────────────────────────────────────────────────────
 * Central routing configuration for the entire admin panel.
 *
 * HOW ROUTING WORKS:
 *   1. User visits a URL
 *   2. React Router matches it against these routes
 *   3. ProtectedRoute checks if user is logged in
 *   4. AdminLayout renders the persistent sidebar + header
 *   5. The matched page renders inside the <Outlet />
 *
 * HOW TO ADD A NEW MODULE:
 *   1. Add route path to src/constants/routes.js
 *   2. Add nav item to src/constants/sidebar.js
 *   3. Create the page component in features/<module>/pages/
 *   4. Add a <Route /> here (one line)
 *   → Done. No other files need changing.
 *
 * LAZY LOADING:
 *   All page components use React.lazy() for code splitting.
 *   This means each module's JS is only loaded when the user navigates to it.
 *   Smaller initial bundle → faster load time.
 */

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ROUTES from "../../constants/routes";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import useAuthStore from "../../features/auth/store/authStore";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../components/common/Loader";

// ── Lazy-loaded page components ───────────────────────────────────────────────
// Each is a separate JS chunk loaded on demand
const Login        = lazy(() => import("../../features/auth/components/Login"));
const DashboardPage = lazy(() => import("../../features/dashboard/pages/DashboardPage"));
const UsersPage    = lazy(() => import("../../features/users/pages/UsersPage"));
const OrdersPage   = lazy(() => import("../../features/orders/pages/OrdersPage"));
const TailorsPage  = lazy(() => import("../../features/tailors/pages/TailorsPage"));
const CategoriesPage = lazy(() => import("../../features/categories/pages/CategoriesPage"));
const ServicesPage = lazy(() => import("../../features/services/pages/ServicesPage"));
const CouponsPage  = lazy(() => import("../../features/coupons/pages/CouponsPage"));
const SettingsPage = lazy(() => import("../../features/settings/pages/SettingsPage"));

// ── Page loader wrapper ───────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader text="Loading…" />
    </div>
  );
}

export default function AppRouter() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public routes ──────────────────────────────────────────────────── */}
        <Route
          path={ROUTES.LOGIN}
          element={
            isAuthenticated
              ? <Navigate to={ROUTES.USERS} replace />
              : <Login />
          }
        />

        {/* ── Protected admin routes (all share AdminLayout) ──────────────── */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirect /admin → /admin/dashboard */}
          <Route index path={ROUTES.ADMIN} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

          <Route path={ROUTES.DASHBOARD}  element={<DashboardPage />} />
          <Route path={ROUTES.USERS}      element={<UsersPage />} />
          <Route path={ROUTES.ORDERS}     element={<OrdersPage />} />
          <Route path={ROUTES.TAILORS}    element={<TailorsPage />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.SERVICES}   element={<ServicesPage />} />
          <Route path={ROUTES.COUPONS}    element={<CouponsPage />} />
          <Route path={ROUTES.SETTINGS}   element={<SettingsPage />} />
        </Route>

        {/* ── Catch-all fallback ─────────────────────────────────────────────── */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? ROUTES.USERS : ROUTES.LOGIN} replace />
          }
        />
      </Routes>
    </Suspense>
  );
}
