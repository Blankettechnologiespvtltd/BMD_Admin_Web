/**
 * SIDEBAR CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the ONLY place you touch to add a new sidebar item.
 * Each object describes one nav link.
 *
 * Fields:
 *   label  – the text shown in the sidebar
 *   path   – the URL this item links to (must match ROUTES)
 *   icon   – react-icons component name (used dynamically in the Sidebar component)
 *   badge  – optional badge text (e.g. "New", "Beta")
 */

import ROUTES from "./routes";

export const SIDEBAR_ITEMS = [
  { label: "Dashboard",   path: ROUTES.DASHBOARD,  icon: "MdDashboard"   },
  { label: "Users",       path: ROUTES.USERS,       icon: "FaUsers"       },
  { label: "Orders",      path: ROUTES.ORDERS,      icon: "FaShoppingBag" },
  { label: "Tailors",     path: ROUTES.TAILORS,     icon: "FaCut"         },
  { label: "Services",    path: ROUTES.SERVICES,    icon: "MdMiscellaneousServices" },
  { label: "Coupons",     path: ROUTES.COUPONS,     icon: "FaTag"         },
  { label: "Settings",    path: ROUTES.SETTINGS,    icon: "FaCog"         },
];
