import React, { useState } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Scissors,
  ShoppingCart,
  CreditCard,
  Grid,
  BarChart2,
  Tag,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LogoutPage from "../../pages/Logout/LogoutPage";

function Layout() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
const navigate = useNavigate();
  // Authentication Check
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/" replace />;
  } 

  const navItems = [
  
    { name: "Users", path: "/userdetails", icon: Users },
    { name: "Bridges", path: "/bridgedetail", icon: Grid },
    { name: "Tailors", path: "/tailordetails", icon: Scissors },
    { name: "Orders ", path: "/ordersdetails", icon: ShoppingCart },
    { name: "Orders Queue", path: "/orderqueue", icon: CreditCard },
    { name: "Payments", path: "/payments", icon: CreditCard },
    { name: "Category Catalog", path: "/categorycatalog", icon: Grid },
     { name: "Service Catalog", path: "/servicecatalog", icon: Grid },
    { name: "Reporting", path: "/reporting", icon: BarChart2 },
    { name: "Offers & Campaigns", path: "/offers", icon: Tag },
     { name: "Settings", path: "/setting", icon: Tag },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-700 select-none border-r border-slate-100 overflow-hidden">
      {/* Logo Section */}
      <div
        className={`flex items-center h-20 px-6 shrink-0 ${isCollapsed ? "justify-center" : "justify-start gap-3"}`}
      >
        {/* Rounded Icon Container */}
        <div className="w-10 h-10 rounded-xl bg-[#0A8C8C] flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-white font-extrabold text-xl">B</span>
        </div>

        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-800 leading-tight">
              BookMyDarzi
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Admin Panel
            </span>
          </div>
//           <div
//   className="flex flex-col cursor-pointer"
//   onClick={() => navigate("/dashboard")}
// >
//   <span className="text-base font-bold text-slate-800 leading-tight">
//     BookMyDarzi
//   </span>
//   <span className="text-xs text-slate-400 font-medium">
//     Admin Panel
//   </span>
// </div>
        )}

        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden ml-auto p-1 rounded-lg hover:bg-slate-100 text-slate-500"
        >
          <X size={22} />
        </button>
      </div>

      {/* Nav Items - Automatically distributes items to prevent scroll and maximize size */}
      <nav className="flex-1 px-4 py-1 overflow-hidden flex flex-col justify-between h-full">
        <div className="space-y-1 flex-1 flex flex-col justify-start">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl font-semibold text-[14px] transition-all duration-200 group relative ${
                  isActive
                    ? "bg-[#0A8C8C] text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#0A8C8C]"
                } ${
                  isCollapsed
                    ? "justify-center w-10 h-10 p-0 mx-auto"
                    : "px-4 py-2.5 w-full justify-start"
                }`}
                title={isCollapsed ? item.name : ""}
              >
                <Icon
                  size={20}
                  className={`shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-teal-600"}`}
                />
                {!isCollapsed && <span className="truncate">{item.name}</span>}

                {/* Tooltip on Hover when Collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-lg">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout Container */}
      <div className="p-4 border-t border-slate-50 shrink-0 mb-2">
        <LogoutPage isCollapsed={isCollapsed} />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden w-screen">
      {/* 1. DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:block shrink-0 bg-white sticky top-0 h-screen transition-all duration-300 ease-in-out border-r border-slate-200 z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute bottom-6 -right-3 w-6 h-6 bg-[#0A8C8C] hover:bg-[#0A8C8C] text-white rounded-full flex items-center justify-center border-2 border-white shadow-md transition-transform active:scale-95 z-40"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* 2. MOBILE SIDEBAR DRAWER */}
      <>
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-white z-50 md:hidden shadow-2xl transition-transform duration-300 ease-in-out transform ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent />
        </aside>
      </>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        {/* Global Floating Header for Mobile */}
        <header className="md:hidden flex items-center h-16 px-4 bg-white border-b border-slate-200 shrink-0 shadow-sm">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="ml-3 text-lg font-bold text-slate-800 tracking-wide">
            BookMy<span className="text-[#0A8C8C]">Darzi</span>
          </div>
        </header>

        {/* Dynamic Pages Render Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;