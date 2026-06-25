import React from "react";
import {
  Users,
  Scissors,
  ShoppingCart,
  CreditCard,
  Search,
  User,
  Menu,
  Bell,
  ChevronDown,
} from "lucide-react";

function Dashboard() {

  const stats = [
    { title: "Active Customers", value: "1,482", icon: Users },
    { title: "Total Tailors", value: "145", icon: Scissors },
    { title: "Total Orders", value: "2,840", icon: ShoppingCart },
    { title: "Total Payments", value: "45,230", icon: CreditCard },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-slate-50 font-sans antialiased text-slate-600">
      
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b">
        <div className="flex items-center space-x-4">
       
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
              <User size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold">Admin User</p>
              
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
              className="pl-10 pr-4 py-1 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <button className="relative text-gray-500 hover:text-gray-700">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Overview</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                  </div>

                  <div className="p-2 bg-slate-50 text-teal-600 rounded-lg">
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-xl p-10 text-center border-2 border-dashed border-slate-200 text-slate-500 font-medium">
          Welcome to Admin Dashboard
        </div>
      </main>

    </div>
  );
}

export default Dashboard;