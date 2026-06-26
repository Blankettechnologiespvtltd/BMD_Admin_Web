/**
 * ADMIN LAYOUT
 * ─────────────────────────────────────────────────────────────────────────────
 * The persistent shell around all admin pages.
 * Renders the Sidebar on the left and page content on the right.
 *
 * Structure:
 *   <AdminLayout>
 *     ┌──────────────────────────────────────┐
 *     │  Sidebar  │  Header + Page Content   │
 *     └──────────────────────────────────────┘
 *
 * The <Outlet /> is where React Router renders the active page.
 * So adding a new page to the router automatically places it here.
 */

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  // Mobile sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Main Area ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {/* Outlet renders the matched child route's page component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
