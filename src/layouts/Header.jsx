/**
 * ADMIN HEADER
 * ─────────────────────────────────────────────────────────────────────────────
 * Top navigation bar inside the admin panel.
 *
 * Shows:
 *   - Hamburger menu (mobile only)
 *   - Current page title (derived from URL using sidebar config)
 *   - User avatar / admin indicator
 *
 * Props:
 *   onMenuClick – opens the mobile sidebar drawer
 */

import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { SIDEBAR_ITEMS } from "../constants/sidebar";

function usePageTitle() {
  const location = useLocation();
  const match = SIDEBAR_ITEMS.find(
    (item) => location.pathname === item.path || location.pathname.startsWith(item.path + "/")
  );
  return match?.label || "Admin Panel";
}

export default function Header({ onMenuClick }) {
  const pageTitle = usePageTitle();

  return (
    <header className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
      {/* Left: mobile menu + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition"
          aria-label="Open menu"
        >
          <FaBars size={18} />
        </button>
       
      </div>

      {/* Right: admin indicator */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 hidden sm:block">Admin</span>
        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}
