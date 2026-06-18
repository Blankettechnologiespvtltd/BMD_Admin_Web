import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Users,
  Scissors,
  ShoppingCart,
  CreditCard,
  BookOpen,
  BarChart3,
  Tag,
} from "lucide-react";

function Layout() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");

  const navItems = [
    { name: "User Management", icon: Users },
    { name: "Customer Bridge", icon: Users },
    {
      name: "Tailors / Vendors",
      icon: Scissors,
      path: "/tailorDetails",
    },
    { name: "Order Management", icon: ShoppingCart },
    { name: "Payment", icon: CreditCard },
    { name: "Catalog", icon: BookOpen }, 

    
    { name: "Reporting", icon: BarChart3 },
    { name: "Offers & Campaigns", icon: Tag },
  ];
 
  return (
    <div className="flex h-screen z-0 ">
      <aside className="w-64 bg-teal-800 text-white fixed h-screen p-2  text-center">
         <span className="text-xl font-bold  text-orange-400  ">
            BookMy<span className="text-white ">Darzi</span>
          </span>

        <nav className="p-3"> 
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  if (item.path) navigate(item.path);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
                  activeTab === item.name
                    ? "bg-orange-500"
                    : "hover:bg-teal-700"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;