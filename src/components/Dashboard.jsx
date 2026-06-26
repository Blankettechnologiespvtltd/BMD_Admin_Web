import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  ShoppingCart,
  CreditCard,
  Search,
  User,
  Bell,
  ChevronDown,
  DollarSign,
  Loader2,
  AlertCircle
} from "lucide-react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const controller = new AbortController();

    const fetchDashboardMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);

       
        const baseURL =
  import.meta.env.VITE_API_URL ||
  "http://192.168.1.29:8000/api/v1";
        
        const response = await axios.get(`${baseURL}/admin/dashboard`, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
           
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        if (response.data) {
          setDashboardData(response.data);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Dashboard Fetch Error:", err);
          setError(err.response?.data?.message || "Server issue.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardMetrics();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, []);

  
  const statsConfig = [
    {
      title: "Active Customers",
      value: dashboardData?.users?.active ?? 0,
      subtext: `Total: ${dashboardData?.users?.total ?? 0}`,
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Revenue",
      value: dashboardData?.revenue?.total ? `₹${dashboardData.revenue.total.toLocaleString()}` : "₹0",
      subtext: `This Month: ₹${dashboardData?.revenue?.this_month ?? 0}`,
      icon: DollarSign,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Total Orders",
      value: dashboardData?.orders?.total ?? 0,
      subtext: `Pending: ${dashboardData?.orders?.pending ?? 0}`,
      icon: ShoppingCart,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      title: "Successful Payments",
      value: dashboardData?.payments?.successful ?? 0,
      subtext: "Real-time Gateway Sync",
      icon: CreditCard,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50"
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-slate-50 font-sans antialiased text-slate-600">
      
      {/* Header section remains intact */}
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
              <User size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Admin User</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search metrics..."
              className="pl-10 pr-4 py-1.5 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-60 transition-all"
            />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-slate-50 rounded-full transition">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Overview Dashboard</h1>
          {isLoading && (
            <div className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
              <Loader2 size={16} className="animate-spin text-teal-500" />
              <span>Syncing live data...</span>
            </div>
          )}
        </div>

        {/* Error State Handler */}
        {error && (
          <div className="flex items-center space-x-3 bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl mb-6 shadow-sm">
            <AlertCircle size={20} className="shrink-0" />
            <div className="text-sm font-medium">{error}</div>
          </div>
        )}

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statsConfig.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      {stat.title}
                    </p>
                    {isLoading ? (
                      <div className="h-8 w-24 bg-slate-100 animate-pulse rounded mt-1" />
                    ) : (
                      <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                        {stat.value}
                      </h3>
                    )}
                  </div>
                  <div className={`p-2.5 ${stat.bgColor} ${stat.iconColor} rounded-xl`}>
                    <Icon size={22} />
                  </div>
                </div>
                {isLoading ? (
                  <div className="h-4 w-32 bg-slate-50 animate-pulse rounded" />
                ) : (
                  <div className="text-xs font-medium text-slate-400 border-t border-slate-50 pt-3">
                    {stat.subtext}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Order Operational Status Breakdown */}
        {!isLoading && dashboardData && (
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              Order Dispatch & Workflow Status
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                <span className="block text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Pending</span>
                <span className="text-xl font-bold text-slate-800">{dashboardData.orders.pending}</span>
              </div>
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100/50">
                <span className="block text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">Unassigned</span>
                <span className="text-xl font-bold text-slate-800">{dashboardData.orders.pending_assignment}</span>
              </div>
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                <span className="block text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Delivered</span>
                <span className="text-xl font-bold text-slate-800">{dashboardData.orders.delivered}</span>
              </div>
              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100/50">
                <span className="block text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">Cancelled</span>
                <span className="text-xl font-bold text-slate-800">{dashboardData.orders.cancelled}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;