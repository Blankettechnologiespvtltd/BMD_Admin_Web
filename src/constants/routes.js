/**
 * ROUTE CONSTANTS
 * ─────────────────────────────────────────────────────────────────────────────
 * Central place for all route paths.
 * When a new module is added, just add its path here.
 * No need to touch routing logic elsewhere.
 *
 * Pattern: /admin/<module>
 */

const ROUTES = {
  LOGIN: "/login",
  ADMIN: "/admin",
  DASHBOARD: "/admin/dashboard",
  USERS: "/admin/users",
  USER_DETAIL: "/admin/users/:id",
  ORDERS: "/admin/orders",
  ORDER_DETAIL: "/admin/orders/:id",
  TAILORS: "/admin/tailors",
  CATEGORIES: "/admin/categories",
  SERVICES: "/admin/services",
  COUPONS: "/admin/coupons",
  SETTINGS: "/admin/settings",
};

export default ROUTES;
