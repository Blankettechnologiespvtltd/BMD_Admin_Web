import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
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

function Layout() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: "User Management", path: "/dashboard", icon: Users },
    { name: "Bridge", path: "/bridgedetail", icon: Grid },
    { name: "Tailors / Vendors", path: "/tailordetails", icon: Scissors },
    { name: "Order Management", path: "/ordersdetails", icon: ShoppingCart },
    { name: "Order Queue", path: "/orderqueue", icon: CreditCard },
    { name: "Payment", path: "/payments", icon: CreditCard },
    { name: "Catalog", path: "/catalog", icon: Grid },
    { name: "Reporting", path: "/reporting", icon: BarChart2 },
    { name: "Offers & Campaigns", path: "/offers", icon: Tag },
  ];

  // const SidebarContent = () => (
  //   <div className="flex flex-col h-full bg-teal-900 text-white select-none">
  //     {/* Logo Section */}
  //     <div className={`flex items-center h-16 px-5 border-b border-teal-800/50 ${isCollapsed ? "justify-center" : "justify-between"}`}>
  //       {!isCollapsed && (
  //         <div className="text-xl font-bold tracking-wide">
  //           BookMy<span className="text-orange-400">Darzi</span>
  //         </div>
  //       )}

  //       <button
  //         onClick={() => setIsMobileOpen(false)}
  //         className="md:hidden p-1 rounded-lg hover:bg-teal-800 text-teal-200"
  //       >
  //         <X size={22} />
  //       </button>
  //     </div>

  //     {/* Nav Items */}
  //     <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
  //       {navItems.map((item) => {
  //         const Icon = item.icon;
  //         const isActive = location.pathname === item.path;

  //         return (
  //           <Link
  //             key={item.name}
  //             to={item.path}
  //             onClick={() => setIsMobileOpen(false)}
  //             className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
  //               isActive
  //                 ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
  //                 : "text-teal-100 hover:bg-teal-800/60 hover:text-white"
  //             } ${isCollapsed ? "justify-center" : ""}`}
  //             title={isCollapsed ? item.name : ""}
  //           >
  //             <Icon size={20} className={`shrink-0 ${isActive ? "" : "text-teal-300 group-hover:text-white"}`} />
  //             {!isCollapsed && <span className="truncate">{item.name}</span>}

  //             {/* Tooltip on Hover when Collapsed */}
  //             {isCollapsed && (
  //               <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none shadow-lg">
  //                 {item.name}
  //               </div>
  //             )}
  //           </Link>
  //         );
  //       })}
  //     </nav>
  //   </div>
  // );
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-700 select-none border-r border-slate-100">
      {/* Logo Section */}
      <div
        className={`flex items-center h-20 px-6 ${isCollapsed ? "justify-center" : "justify-start gap-3"}`}
      >
        {/* Rounded Icon Container like Photo */}
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
        )}

        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden ml-auto p-1 rounded-lg hover:bg-slate-100 text-slate-500"
        >
          <X size={22} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group relative ${
                isActive
                  ? "bg-[#0A8C8C] text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0A8C8C]"
              } ${isCollapsed ? "justify-center" : ""}`}
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
      </nav>

      {/* Sign Out Button at the Bottom (As seen in photo) */}
      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden w-screen">
      {/* 1. DESKTOP SIDEBAR  */}
      <aside
        className={`hidden md:block shrink-0 bg-white sticky top-0 h-screen transition-all duration-300 ease-in-out border-r border-slate-200 z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />

        {/* Collapse Toggle Button (Slightly adjusted colors to match the white theme) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute bottom-6 -right-3 w-6 h-6 bg-[#0A8C8C] hover:bg-[#0A8C8C] text-white rounded-full flex items-center justify-center border-2 border-white shadow-md transition-transform active:scale-95"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* 2. MOBILE SIDEBAR DRAWER  */}
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
  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden w-screen">
      {/* 1. DESKTOP SIDEBAR  */}
      <aside
        className={`hidden md:block shrink-0 bg-teal-900 border-r border-teal-950 sticky top-0 h-screen transition-all duration-300 ease-in-out shadow-xl z-30 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute bottom-6 -right-3 w-6 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center border-2 border-slate-50 shadow-md transition-transform active:scale-95"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* 2. MOBILE SIDEBAR DRAWER  */}
      <>
        {/* Backdrop Background Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 w-64 bg-teal-900 z-50 md:hidden shadow-2xl transition-transform duration-300 ease-in-out transform ${
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
          <div className="ml-3 text-lg font-bold text-teal-800 tracking-wide">
            BookMy<span className="text-orange-500">Darzi</span>
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
