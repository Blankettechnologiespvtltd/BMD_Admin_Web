/**
 * SIDEBAR COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Fully dynamic sidebar driven by SIDEBAR_ITEMS config.
 *
 * To add a new module to the sidebar:
 *   1. Add its route to src/constants/routes.js
 *   2. Add one entry to src/constants/sidebar.js
 *   → That's it. No code change here required.
 *
 * Features:
 *   - Active route highlighting via NavLink
 *   - Mobile: slides in as a drawer (controlled by isOpen prop)
 *   - Desktop: always visible
 *   - Logout button at the bottom
 *
 * Icons are mapped from string names in sidebar config.
 * This avoids importing every icon statically while keeping config clean.
 */

import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard, MdCategory, MdMiscellaneousServices,
} from "react-icons/md";
import {
  FaUsers, FaShoppingBag, FaCut, FaTag, FaCog, FaSignOutAlt,
} from "react-icons/fa";

import { SIDEBAR_ITEMS } from "../constants/sidebar";
import useAuthStore from "../features/auth/store/authStore";
import ROUTES from "../constants/routes";

// ── Icon registry (add new icons here as new modules are added) ───────────────
const ICON_MAP = {
  MdDashboard,
  MdCategory,
  MdMiscellaneousServices,
  FaUsers,
  FaShoppingBag,
  FaCut,
  FaTag,
  FaCog,
};

function NavItem({ item, onClick }) {
  const IconComponent = ICON_MAP[item.icon];

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? "bg-teal-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
        }`
      }
    >
      {IconComponent && <IconComponent size={18} />}
      <span>{item.label}</span>
      {item.badge && (
        <span className="ml-auto text-[10px] bg-orange-400 text-white px-1.5 py-0.5 rounded-full font-semibold">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-100">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow">
          <span className="text-white font-black text-lg">B</span>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm leading-tight">BookMyDarzi</p>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation items — purely data-driven from SIDEBAR_ITEMS */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} onClick={onClose} />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <FaSignOutAlt size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop: always visible ──────────────────────────────────────────── */}
      <div className="hidden md:flex flex-shrink-0">
        {sidebarContent}
      </div>

      {/* ── Mobile: overlay drawer ───────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          {/* Drawer */}
          <div className="relative flex-shrink-0">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
