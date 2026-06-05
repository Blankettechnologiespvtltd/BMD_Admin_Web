import React from "react";
import { X, BarChart3, ChevronRight, Users, Truck, Scissors, ShoppingBag, CreditCard, BookOpen, Tag } from "lucide-react";

export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen, activeTab, setActiveTab, counts }) {
  const navItems = [
    { id: "dashboard", label: "Overview Admin", icon: BarChart3, category: "Main Controls" },
    { id: "customer", label: "Customers", icon: Users, category: "User Registry", count: counts.customers },
    { id: "helper", label: "Helpers (Bridge)", icon: Truck, category: "User Registry", count: counts.helpers },
    { id: "tailor", label: "Tailors / Vendors", icon: Scissors, category: "User Registry", count: counts.tailors },
    { id: "order", label: "Order Book", icon: ShoppingBag, category: "Core Operations", count: counts.orders, badgeColor: "bg-orange-600" },
    { id: "payment", label: "Payments", icon: CreditCard, category: "Core Operations" },
    { id: "catalog", label: "Style Catalog", icon: BookOpen, category: "Assets & Promotion" },
    { id: "reporting", label: "Reporting & BI", icon: BarChart3, category: "Assets & Promotion" },
    { id: "campaign", label: "Campaigns & Offers", icon: Tag, category: "Assets & Promotion" },
  ];

  const categories = ["Main Controls", "User Registry", "Core Operations", "Assets & Promotion"];

  return (
    <aside
      className={`bg-teal-900 text-slate-100 flex-shrink-0 w-64 md:block transition-all duration-300 z-30 absolute md:relative inset-y-0 left-0 transform md:transform-none ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } border-r border-teal-850 flex flex-col justify-between shadow-lg md:shadow-none`}
    >
      <div>
        <div className="p-4 bg-teal-950 flex items-center justify-between md:hidden border-b border-teal-850">
          <span className="font-extrabold text-orange-500">Navigation Menu</span>
          <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-orange-500">
            <X size={20} />
          </button>
        </div>

        <div className="px-3 py-4 space-y-6">
          {categories.map((cat) => (
            <div key={cat}>
              <span className="px-3 text-[10px] font-semibold text-teal-300 uppercase tracking-widest block mb-2">
                {cat}
              </span>
              <nav className="space-y-1">
                {navItems
                  .filter((item) => item.category === cat)
                  .map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          isActive
                            ? "bg-orange-500 text-teal-950 font-bold shadow-md transform translate-x-1"
                            : "hover:bg-teal-800 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon size={18} className={isActive ? "text-teal-950" : "text-orange-400"} />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined ? (
                          <span className={`${item.badgeColor || "bg-teal-800 text-teal-200"} text-xs px-2 py-0.5 rounded-full font-normal`}>
                            {item.count}
                          </span>
                        ) : (
                          <ChevronRight size={14} className={isActive ? "text-teal-950" : "text-teal-500"} />
                        )}
                      </button>
                    );
                  })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-teal-950/80 m-3 rounded-xl border border-teal-850 text-xs">
        <p className="font-semibold text-slate-200">BookMyDarzi Desk</p>
        <p className="text-slate-400 mt-1">Need help with custom fits, tailors or operations?</p>
        <a href="tel:+919876543210" className="inline-block mt-2 font-bold text-orange-400 hover:underline">
          Call Tech Support
        </a>
      </div>
    </aside>
  );
}