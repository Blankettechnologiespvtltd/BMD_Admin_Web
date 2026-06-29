
import React, { useState, useEffect } from "react";
import { Filter, Eye, ShieldAlert, CheckCircle, Clock, Loader2 } from "lucide-react";

export default function OrderQueue() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState("");
  const [filters, setFilters] = useState({ status: [] });
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ====== DYNAMIC API INTEGRATION WITH AUTH AUTHENTICATION ======
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        
        const access_token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

       
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
      
            ...(access_token ? { "Authorization": `Bearer ${access_token}` } : {})
          }
        };

        // const response = await fetch("http://192.168.1.29:8000/api/v1/employee/orders", requestOptions);
            const response = await fetch("https://web-production-efff7.up.railway.app/api/v1/employee/orders", requestOptions);
        
    
        if (response.status === 401) {
          throw new Error("401 ");
        }

        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result && result.orders) {
          setOrders(result.orders);
        } else if (Array.isArray(result)) {
          setOrders(result);
        } else {
          setOrders([]);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); 
  // ==============================================================

  const handleFilter = (type, item) => {
    const isChecked = filters.status.includes(item);
    setFilters({
      ...filters,
      status: isChecked
        ? filters.status.filter((i) => i !== item)
        : [...filters.status, item],
    });
  };

  const resetFilters = () => setFilters({ status: [] });

  const filteredOrders = orders.filter((order) => {
    const orderNo = order.OrderNumber || "";
    const serviceName = order.ServiceName || "";
    const customerName = order.address?.full_name || "";

    const matchesSearch =
      orderNo.toLowerCase().includes(search.toLowerCase()) ||
      serviceName.toLowerCase().includes(search.toLowerCase()) ||
      customerName.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(order.StatusLabel);

    return matchesSearch && matchesStatus;
  });

  const getPaymentBadge = (status) => {
    if (status === "advance_paid") {
      return (
        <span className="flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-[#0A8C8C] border border-green-200">
          <CheckCircle size={12} /> Advance Paid
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
        <Clock size={12} /> Payment Pending
      </span>
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="p-6 w-full transition-all duration-300">
        
        {/* Header */}
        <div className="bg-[#0A8C8C] text-white p-5 rounded-xl shadow-lg mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-wide">Order Queue</h1>
          
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto justify-end">
            <input
              type="text"
              placeholder="Search by Order No, Client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-64 text-sm rounded-full border-0 bg-teal-800/50 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
            
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-all text-sm font-medium"
              >
                <Filter size={16} />
                <span>Filters</span>
                {filters.status.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                )}
              </button>
              
              {showFilter && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                  <div className="border-b pb-2 mb-2">
                    <div
                      className="flex justify-between cursor-pointer items-center text-gray-800 hover:text-black"
                      onClick={() => setOpenFilter(openFilter === "status" ? "" : "status")}
                    >
                      <span className="font-semibold text-sm">Order Status</span>
                      <span className="text-xs">▼</span>
                    </div>
                    {openFilter === "status" &&
                      ["Pending", "Delivered", "Completed", "Assigned"].map((item) => (
                        <label key={item} className="flex justify-between items-center mt-2 cursor-pointer p-1 rounded hover:bg-gray-50">
                          <span className="text-sm text-gray-700">{item}</span>
                          <input
                            type="checkbox"
                            checked={filters.status.includes(item)}
                            onChange={() => handleFilter("status", item)}
                            className="accent-teal-600 rounded"
                          />
                        </label>
                      ))}
                  </div>
                  
                  <button
                    onClick={resetFilters}
                    className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg text-xs font-medium transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic States Layout */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-teal-600" size={32} />
            <p className="text-gray-500 text-sm font-medium">Fetching real-time order logs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-6 rounded-xl border border-red-200 shadow-sm flex items-center gap-3">
            <ShieldAlert size={24} className="shrink-0" />
            <div>
              <p className="font-semibold">Authentication / Server Issue</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        ) : (
          /* Table Layout */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6 text-center w-16">S.No</th>
                    <th className="py-4 px-6">Order No</th>
                    <th className="py-4 px-6">Address</th>
                    <th className="py-4 px-6">Payment Status</th>
                    <th className="py-4 px-6">Service Name</th>
                    <th className="py-4 px-6 text-center w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <tr key={order.Id || index} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-4 px-6 text-center font-medium text-gray-400">{index + 1}</td>
                        <td className="py-4 px-6 font-semibold text-teal-700">{order.OrderNumber || "N/A"}</td>
                        <td className="py-4 px-6 max-w-xs">
                          {order.address ? (
                            <div className="leading-tight">
                              <p className="font-semibold text-gray-900">{order.address.full_name}</p>
                              <p className="text-xs text-gray-500 mt-0.5 truncate">
                                {order.address.address_line_1}{order.address.city && `, ${order.address.city}`}
                              </p>
                              <p className="text-xs font-mono text-gray-400 mt-0.5">{order.address.mobile}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs italic">No address linked</span>
                          )}
                        </td>
                        <td className="py-4 px-6">{getPaymentBadge(order.PaymentStatus)}</td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-800">{order.ServiceName || "General Service"}</div>
                          {order.AmountDisplay && (
                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded mt-1 inline-block">
                              Total: {order.AmountDisplay}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-teal-200 shadow-sm"
                          >
                            <Eye size={14} /> Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-gray-400 font-medium">No orders in queue.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-gray-100">
            <div className="flex justify-between items-start border-b pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
                <p className="text-xs text-teal-600 font-mono font-semibold">{selectedOrder.OrderNumber}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold bg-gray-100 px-2.5 py-1 rounded-lg">×</button>
            </div>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border">
                <div>
                  <span className="text-xs text-gray-400 block uppercase font-bold">Service</span>
                  <span className="font-semibold text-gray-800">{selectedOrder.ServiceName}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block uppercase font-bold">Total Price</span>
                  <span className="font-bold text-gray-900">{selectedOrder.AmountDisplay || "—"}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t flex justify-end">
              <button onClick={() => setSelectedOrder(null)} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}