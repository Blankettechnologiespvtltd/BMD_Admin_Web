import React from "react";
import { Menu, Scissors, Search, X, Bell, Settings, LogOut } from "lucide-react";

export default function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  searchQuery,
  setSearchQuery,
  notificationOpen,
  setNotificationOpen,
  profileOpen,
  setProfileOpen,
}) {
  return (
    <header className="bg-teal-950 text-white sticky top-0 z-40 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-teal-800 transition md:hidden focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <Menu size={24} className="text-orange-500" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 p-2 rounded-xl flex items-center justify-center shadow-md">
              <Scissors className="text-teal-950 transform -rotate-45" size={20} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white">
                BookMy<span className="text-orange-500">Darzi</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-teal-800 text-teal-300 rounded border border-teal-700">
                Admin
              </span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </span>
            <input
              type="text"
              className="w-full bg-teal-900/60 border border-teal-800 text-teal-100 placeholder-teal-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-teal-900 pl-10 pr-4 py-2 transition"
              placeholder="Search current table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-teal-300 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4 relative">
          <div className="relative">
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setProfileOpen(false);
              }}
              className="p-2 rounded-full text-slate-300 hover:text-orange-500 hover:bg-teal-900 transition focus:outline-none"
            >
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <Bell size={20} />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 z-50 overflow-hidden">
                <div className="px-4 py-3 bg-teal-950 text-white font-semibold text-sm flex justify-between items-center">
                  <span>Notifications</span>
                  <span className="text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  <div className="p-3 hover:bg-slate-50 transition text-xs">
                    <p className="font-bold text-slate-900">New Order Placed!</p>
                    <p className="text-slate-500 mt-0.5">Order #BMD-2026-9046 by Sneha Reddy</p>
                    <span className="text-[10px] text-teal-600 font-medium">2 mins ago</span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition text-xs">
                    <p className="font-bold text-slate-900">Helper Assigned</p>
                    <p className="text-slate-500 mt-0.5">Amit Gond checked in for order collection.</p>
                    <span className="text-[10px] text-teal-600 font-medium">1 hour ago</span>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition text-xs">
                    <p className="font-bold text-orange-600">Tailor Capacity Alert</p>
                    <p className="text-slate-500 mt-0.5">Master Gulam Nabi has reached 7 active orders.</p>
                    <span className="text-[10px] text-teal-600 font-medium">3 hours ago</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-slate-50 text-center border-t border-slate-100">
                  <button onClick={() => setNotificationOpen(false)} className="text-xs text-teal-700 font-bold hover:text-orange-600">
                    Dismiss All
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-teal-900 transition focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                AD
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-white">Aniket Sharma</p>
                <p className="text-[10px] text-orange-400 font-medium"> Admin</p>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 z-50 overflow-hidden">
                <div className="p-4 border-b border-slate-100 text-center bg-slate-50">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl mx-auto shadow-md mb-2">
                    AD
                  </div>
                  <p className="font-bold text-slate-800">Aniket Sharma</p>
                  <p className="text-xs text-slate-500">aniketsharma@bookmydarzi.com</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => { setProfileOpen(false); alert("Opening Profile Settings..."); }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition"
                  >
                    <Settings size={16} />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); alert("Logged out successfully!"); }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}