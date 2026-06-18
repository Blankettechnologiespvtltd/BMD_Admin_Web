import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Scissors,
  ShoppingCart,
  CreditCard,
  BookOpen,
  BarChart3,
  Tag,
  Search,
  User,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");

  // const navItems = [
  //   { name: "User Management", icon: Users },
  //   { name: "Customer Bridge", icon: Users },
  //   { name: "Tailors / Vendors", icon: Scissors  ,Link:"/tailorDetails"},
  //   { name: "Order Management", icon: ShoppingCart },
  //   { name: "Payment", icon: CreditCard },
  //   { name: "Catalog", icon: BookOpen },
  //   { name: "Reporting", icon: BarChart3 },
  //   { name: "Offers & Campaigns", icon: Tag },
  // ];
  const navItems = [
  { name: "User Management", icon: Users },
  { name: "Customer Bridge", icon: Users },
  {
    name: "Tailors / Vendors",
    icon: Scissors,
    link: "/tailorDetails",
  },
  { name: "Order Management", icon: ShoppingCart },
  { name: "Payment", icon: CreditCard },
  { name: "Catalog", icon: BookOpen },
  { name: "Reporting", icon: BarChart3 },
  { name: "Offers & Campaigns", icon: Tag },
];

  const stats = [
    { title: "Active Customers", value: "1,482", icon: Users },
    { title: "Total Tailors", value: "145", icon: Scissors },
    { title: "Total Orders", value: "2,840", icon: ShoppingCart },
    { title: "Total Payments", value: "45,230", icon: CreditCard },
  ];

  // const handleMenuClick = (itemName) => {
  //   setActiveTab(itemName);

  //   if (itemName === "Tailors / Vendors") {
  //     navigate("/tailordetails");

  //   }
  // };
  const handleMenuClick = (item) => {
  setActiveTab(item.name);

  if (item.link) {
    navigate(item.link);
  }
};

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-600">
      <aside
        className={`fixed inset-y-0 left-0 z-20 flex flex-col w-64 bg-teal-800 text-white ${
          sidebarOpen ? "translate-x-0" : "-translate-x-0"
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-teal-900">
          <span className="text-xl font-bold tracking-wider text-orange-400">
            BookMy<span className="text-white">Darzi</span>
          </span>

          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              // <button
              //   key={item.name}
              //   onClick={() => handleMenuClick(item.name)}
              //   className={`flex items-center w-full px-4 py-3 rounded-lg ${
              //     isActive
              //       ? "bg-orange-500 text-white"
              //       : "text-teal-100 hover:bg-teal-700"
              //   }`}
              // >
              //   <Icon className="mr-3 h-5 w-5" />
              //   {item.name}
              // </button>
              <button
  key={item.name}
  onClick={() => handleMenuClick(item)}
  className={`flex items-center w-full px-4 py-3 rounded-lg ${
    activeTab === item.name
      ? "bg-orange-500 text-white"
      : "text-teal-100 hover:bg-teal-700"
  }`}
>
  <Icon className="mr-3 h-5 w-5" />
  {item.name}
</button>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                <User size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>

              <ChevronDown size={14} />
            </div>
          </div>


          <div className="flex items-center space-x-5">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-1 border rounded-full"
              />
            </div>

            <button className="relative">
              <Bell size={20} />
            </button>


































            
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">
            {activeTab}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-400">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold">
                        {stat.value}
                      </h3>
                    </div>

                    <Icon size={24} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl p-10 text-center border-2 border-dashed">
            Welcome to Admin Dashboard
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;