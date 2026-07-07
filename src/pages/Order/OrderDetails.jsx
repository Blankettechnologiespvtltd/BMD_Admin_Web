// import { useState, useEffect } from "react";
// import api from "../../services/api"; 
// import { useNavigate } from "react-router-dom";
// import {
//   AlertCircle,
//   Edit2,
//   Trash2,
//   SlidersHorizontal,
//   Plus
// } from "lucide-react";

// // ─── Constants & Configuration ──────────────────────────────────────────────
// const API_ENDPOINT = "/admin/orders";

// const STATUS_OPTIONS = [
//   "pending",
//   "confirmed",
//   "tailor_assigned",
//   "in_progress",
//   "shipped",
//   "delivered",
//   "cancelled"
// ];

// const getStatusBadge = (statusStr) => {
//   const s = String(statusStr || "").toLowerCase();
//   if (s.includes("deliv")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
//   if (s.includes("cancel")) return "bg-rose-50 text-rose-700 border-rose-200";
//   if (s.includes("ship")) return "bg-blue-50 text-blue-700 border-blue-200";
//   if (s.includes("tailor_assigned") || s.includes("assigned")) return "bg-indigo-50 text-indigo-700 border-indigo-200";
//   if (s.includes("progress")) return "bg-blue-50 text-blue-700 border-blue-200";
//   if (s.includes("confirm")) return "bg-amber-50 text-amber-700 border-amber-200";
//   return "bg-gray-50 text-gray-700 border-gray-200";
// };

// export default function OrderDetails() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("access_token");

//   // Immediate Safety Check
//   useEffect(() => {
//     if (!token) {
//       navigate("/", { replace: true });
//     }
//   }, [token, navigate]);

//   const [orders, setOrders] = useState([]);
//   const [fetching, setFetching] = useState(true);
//   const [fetchError, setFetchError] = useState(null);

//   // Search, Filter, and Pagination States
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Requirement: Paginate after 6 items

//   const fetchOrders = async () => {
//     if (!localStorage.getItem("access_token")) {
//       setOrders([]);
//       return;
//     }

//     setFetching(true);
//     setFetchError(null);
//     try {
//       const res = await api.get(API_ENDPOINT);
//       const data = res.data || {};
//       const list = Array.isArray(data.orders) ? data.orders : [];
//       setOrders(list);
//       localStorage.setItem("bridge_orders_cache", JSON.stringify({ orders: list }));
//     } catch (err) {
//       const isAuthError = err.response?.status === 401 || err.response?.status === 403;

//       if (isAuthError) {
//         setOrders([]);
//         localStorage.removeItem("bridge_orders_cache");
//         setFetchError("Session expired or unauthorized — please log in again.");
//         return; 
//       }

//       const cached = localStorage.getItem("bridge_orders_cache");
//       if (cached && localStorage.getItem("access_token")) {
//         const parsed = JSON.parse(cached);
//         setOrders(parsed.orders || []);
//       }
//       setFetchError("Could not reach the order service — showing last cached data.");
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchOrders();
//     } else {
//       setOrders([]);
//     }
//   }, [token]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       try {
//         await api.delete(`${API_ENDPOINT}/${id}`);
//         setOrders(orders.filter(o => o.Id !== id));
//       } catch (err) {
//         alert("Failed to delete order");
//       }
//     }
//   };

//   if (!token) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <p className="text-sm font-semibold text-gray-500 animate-pulse">Redirecting to login...</p>
//         </div>
//       </div>
//     );
//   }

//   // 1. Search and Status Filtering Logic
//   const filteredOrders = orders.filter(order => {
//     const matchesStatus = filterStatus === "all" || String(order.Status).toLowerCase() === filterStatus.toLowerCase();
    
//     const code = String(order.OrderCode || order.OrderNumber || "").toLowerCase();
//     const customer = String(order.ClothDetails || "").toLowerCase();
//     const service = String(order.ServiceTitle || order.ServiceName || "").toLowerCase();
//     const matchesSearch = code.includes(searchQuery.toLowerCase()) || 
//                           customer.includes(searchQuery.toLowerCase()) || 
//                           service.includes(searchQuery.toLowerCase());

//     return matchesStatus && matchesSearch;
//   });

//   // 2. Pagination Logic (6 items per page)
//   const totalItems = filteredOrders.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

//   // Reset to page 1 if filters change
//   const handleFilterChange = (status) => {
//     setFilterStatus(status);
//     setCurrentPage(1);
//     setShowFilterDropdown(false);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto my-6 px-4">
      
//       {/* ─── HEADER CONTAINER (Image UI Matched) ────────────────────────────── */}
//       <div className="bg-[#148A8A] rounded-[20px] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
//         <h2 className="text-white text-xl font-semibold tracking-wide shrink-0">
//           Order Dashboard
//         </h2>
        
//         {/* Controls: Search, Filter, Add New Button */}
//         <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
//           {/* Search Bar */}
//           <div className="relative w-full sm:w-64">
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="w-full bg-white text-gray-700 placeholder-gray-400 text-sm px-4 py-2 rounded-xl focus:outline-none border border-transparent shadow-sm"
//             />
//           </div>

//           {/* Filter Dropdown Button */}
//           <div className="relative w-full sm:w-auto">
//             {/* <button 
//               onClick={() => setShowFilterDropdown(!showFilterDropdown)}
//               className="flex items-center justify-center gap-2 bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-xl border border-transparent shadow-sm hover:bg-gray-50 w-full sm:w-auto transition-colors"
//             >
//               <SlidersHorizontal size={15} className="text-gray-500" />
//               <span>Filters</span>
//             </button> */}

//             {/* Dropdown Menu */}
//             {showFilterDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1 text-xs">
//                 <button 
//                   onClick={() => handleFilterChange("all")}
//                   className={`w-full text-left px-4 py-2 hover:bg-gray-50 font-medium ${filterStatus === "all" ? "text-[#148A8A] bg-teal-50/50" : "text-gray-600"}`}
//                 >
//                   All Orders ({orders.length})
//                 </button>
//                 {STATUS_OPTIONS.map(st => {
//                   const count = orders.filter(o => String(o.Status).toLowerCase() === st.toLowerCase()).length;
//                   return (
//                     <button 
//                       key={st}
//                       onClick={() => handleFilterChange(st)}
//                       className={`w-full text-left px-4 py-2 hover:bg-gray-50 capitalize font-medium ${filterStatus === st ? "text-[#148A8A] bg-teal-50/50" : "text-gray-600"}`}
//                     >
//                       {st.replace("_", " ")} ({count})
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Add Order Button */}
//           {/* <button 
//             onClick={() => navigate("/add-order")} 
//             className="flex items-center justify-center gap-1.5 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 w-full sm:w-auto transition-colors shrink-0"
//           >
//             <Plus size={16} className="text-gray-700 stroke-[3]" />
//             <span>Add Order</span>
//           </button> */}
//         </div>
//       </div>

//       {/* Error Notice */}
//       {fetchError && (
//         <div className="rounded-xl px-4 py-3.5 mt-4 text-xs font-semibold flex items-center gap-3 border-2 bg-amber-50 text-amber-800 border-amber-200">
//           <AlertCircle size={18} className="text-amber-500 shrink-0" />
//           <span className="flex-1">{fetchError}</span>
//           <button type="button" onClick={fetchOrders} className="underline font-bold">Retry</button>
//         </div>
//       )}

//       {/* ─── DATA TABLE / GRID (Fully Responsive) ────────────────────────── */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-5 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[800px]">
//             <thead>
//               <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-[11px] font-bold uppercase tracking-wider">
//                 <th className="py-3.5 px-6">System Order Code</th>
//                 <th className="py-3.5 px-6">Fabric & Style Specifications</th>
//                 <th className="py-3.5 px-6">Service / Address</th>
//                 <th className="py-3.5 px-6">Payment</th>
//                 <th className="py-3.5 px-6">Active Status</th>
//                 <th className="py-3.5 px-6 text-right">Actions Matrix</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
//               {fetching ? (
//                 <tr>
//                   <td colSpan={6} className="p-8 text-center text-gray-400 font-medium">Loading orders…</td>
//                 </tr>
//               ) : currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="p-8 text-center text-gray-400 font-medium">No order data rows matched the parameters.</td>
//                 </tr>
//               ) : (
//                 currentItems.map((order) => (
//                   <tr key={order.Id} className="hover:bg-slate-50/40 transition-colors">
//                     <td className="py-4 px-6 font-mono font-bold text-gray-900">{order.OrderCode || order.OrderNumber}</td>
//                     <td className="py-4 px-6">
//                       <div className="font-bold text-gray-800">{order.ClothDetails || "—"}</div>
//                       <div className="text-gray-400 text-[11px] font-medium mt-0.5">{order.CustomizationNotes || "No customization notes"}</div>
//                     </td>
//                     <td className="py-4 px-6 font-semibold text-gray-500">
//                       {order.ServiceTitle || order.ServiceName || "Service"}
//                       <span className="block text-[10px] uppercase font-bold text-[#148A8A] mt-0.5">{order.UrgencyLevel}</span>
//                       {order.address?.city && <span className="block text-[10px] text-gray-400 normal-case font-medium">{order.address.city}, {order.address.state}</span>}
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="font-bold text-gray-800">{order.AmountDisplay}</div>
//                       <div className="text-[10px] text-gray-400 font-medium mt-0.5">{order.PaymentStatusLabel}</div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getStatusBadge(order.Status)}`}>
//                         {order.StatusLabel || order.Status}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6 text-right">
//                       <div className="flex items-center justify-end gap-2">
//                         <button
//                           onClick={() => navigate("/orderfulldetails", { state: { order } })}
//                           className="p-1.5 text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-all"
//                         >
//                           <Edit2 size={13} />
//                         </button>
//                         <button 
//                           onClick={() => handleDelete(order.Id)} 
//                           className="p-1.5 text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-all"
//                         >
//                           <Trash2 size={13} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ─── PAGINATION FOOTER (Triggered after 6 items) ────────────────── */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-gray-500">
//             <div>
//               Showing <span className="font-bold text-gray-700">{indexOfFirstItem + 1}</span> to{" "}
//               <span className="font-bold text-gray-700">{Math.min(indexOfLastItem, totalItems)}</span> of{" "}
//               <span className="font-bold text-gray-700">{totalItems}</span> orders
//             </div>
            
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1.5 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
//               >
//                 Previous
//               </button>
              
//               {[...Array(totalPages)].map((_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => setCurrentPage(index + 1)}
//                   className={`w-8 h-8 rounded-lg border font-bold transition-colors ${
//                     currentPage === index + 1
//                       ? "bg-[#148A8A] text-white border-[#148A8A]"
//                       : "bg-white text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}

//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1.5 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import api from "../../services/api"; 
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Edit2,
  Trash2,
  Filter, // Matched with image
  Plus,
  ChevronDown
} from "lucide-react";

// ─── Constants & Configuration ──────────────────────────────────────────────
const API_ENDPOINT = "/admin/orders";

const STATUS_OPTIONS = [
 "Pending",
  "Confirmed",
  "Processing",
  "Delivered",
 
  "Cancelled"
];

const getStatusBadge = (statusStr) => {
  const s = String(statusStr || "").toLowerCase();
  if (s.includes("deliv") || s.includes("complet")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s.includes("cancel")) return "bg-rose-50 text-rose-700 border-rose-200";
  if (s.includes("ship") || s.includes("progress")) return "bg-blue-50 text-blue-700 border-blue-200";
  if (s.includes("assigned") || s.includes("tailor")) return "bg-indigo-50 text-indigo-700 border-indigo-200";
  if (s.includes("confirm") || s.includes("pend")) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
};

export default function OrderDetails() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  // Immediate Safety Check
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Search, Filter, and Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState("status"); // Default open like accordion
  
  // Multi-select Checkbox State
  const [filters, setFilters] = useState({
    status: []
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Requirement: 5 items limit

  const fetchOrders = async () => {
    if (!localStorage.getItem("access_token")) {
      setOrders([]);
      return;
    }

    setFetching(true);
    setFetchError(null);
    try {
      const res = await api.get(API_ENDPOINT);
      const data = res.data || {};
      const list = Array.isArray(data.orders) ? data.orders : [];
      setOrders(list);
      localStorage.setItem("bridge_orders_cache", JSON.stringify({ orders: list }));
    } catch (err) {
      const isAuthError = err.response?.status === 401 || err.response?.status === 403;

      if (isAuthError) {
        setOrders([]);
        localStorage.removeItem("bridge_orders_cache");
        setFetchError("Session expired or unauthorized — please log in again.");
        return; 
      }

      const cached = localStorage.getItem("bridge_orders_cache");
      if (cached && localStorage.getItem("access_token")) {
        const parsed = JSON.parse(cached);
        setOrders(parsed.orders || []);
      }
      setFetchError("Could not reach the order service — showing last cached data.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await api.delete(`${API_ENDPOINT}/${id}`);
        setOrders(orders.filter(o => o.Id !== id));
      } catch (err) {
        alert("Failed to delete order");
      }
    }
  };

  // Checkbox Handler Logic
  const handleFilter = (type, item) => {
    setCurrentPage(1);
    setFilters(prev => {
      const activeFilters = prev[type].includes(item)
        ? prev[type].filter(i => i !== item)
        : [...prev[type], item];
      return { ...prev, [type]: activeFilters };
    });
  };

  const resetFilters = () => {
    setFilters({ status: [] });
    setCurrentPage(1);
    setShowFilter(false);
  };

  if (!token) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-500 animate-pulse">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Advanced Filtering Logic (Matches Checkboxes)
  const filteredOrders = orders.filter(order => {
    // Check if order matches any checked status (or if none are checked, show all)
    const orderStatus = String(order.Status || "").toLowerCase();
    
    const matchesStatus = filters.status.length === 0 || filters.status.some(selectedStatus => {
      const sel = selectedStatus.toLowerCase();
      if (sel === "pending") return orderStatus.includes("pend") || orderStatus.includes("confirm");
      if (sel === "assigned") return orderStatus.includes("assign") || orderStatus.includes("tailor");
      if (sel === "completed") return orderStatus.includes("deliv") || orderStatus.includes("complete") || orderStatus.includes("ship");
      return orderStatus === sel;
    });
    
    const code = String(order.OrderCode || order.OrderNumber || "").toLowerCase();
    const customer = String(order.ClothDetails || "").toLowerCase();
    const service = String(order.ServiceTitle || order.ServiceName || "").toLowerCase();
    
    const matchesSearch = code.includes(searchQuery.toLowerCase()) || 
                          customer.includes(searchQuery.toLowerCase()) || 
                          service.includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Pagination Logic
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6 px-4">
      
      {/* ─── HEADER CONTAINER (Image UI Perfectly Matched) ────────────────── */}
      <div className="bg-[#148A8A] rounded-[20px] px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <h2 className="text-white text-xl font-semibold tracking-wide shrink-0">
          Order Dashboard
        </h2>
        
        {/* Controls: Search, Filter Button, Add Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-white text-gray-700 placeholder-gray-400 text-sm px-4 py-2 rounded-xl focus:outline-none border border-transparent shadow-sm"
            />
          </div>

          {/* Filter Dropdown Trigger Button (Matched With Your Image) */}
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-center gap-2 bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-xl border border-transparent shadow-sm hover:bg-gray-50 w-full sm:w-auto transition-colors"
            >
              <Filter size={15} className="text-gray-500" />
              <span>Filters</span>
            </button>

            {/* Filter Card Content Dropdown */}
            {showFilter && (
              <div className="absolute right-0 mt-2 w-full sm:w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                <div className="border-b border-gray-100 pb-2 mb-2">
                  <div
                    className="flex justify-between items-center cursor-pointer py-1"
                    onClick={() => setOpenFilter(openFilter === "status" ? "" : "status")}
                  >
                    <span className="text-gray-800 font-semibold text-sm">Status</span>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform ${openFilter === "status" ? "rotate-180" : ""}`} />
                  </div>
                  
                  {openFilter === "status" && (
                    <div className="mt-1 space-y-1">
                      {STATUS_OPTIONS.map((item) => (
                        <label key={item} className="flex justify-between items-center py-1.5 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
                          <span className="text-gray-600 text-sm">{item}</span>
                          <input
                            type="checkbox"
                            checked={filters.status.includes(item)}
                            onChange={() => handleFilter("status", item)}
                            className="accent-[#148A8A] h-4 w-4 rounded" // Themed color
                          />
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={resetFilters}
                  className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Add Order Button */}
          {/* <button 
            onClick={() => navigate("/add-order")} 
            className="flex items-center justify-center gap-1.5 bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 w-full sm:w-auto transition-colors shrink-0"
          >
            <Plus size={16} className="text-gray-700 stroke-[3]" />
            <span>Add Order</span>
          </button> */}
        </div>
      </div>

      {/* Error Notice */}
      {fetchError && (
        <div className="rounded-xl px-4 py-3.5 mt-4 text-xs font-semibold flex items-center gap-3 border-2 bg-amber-50 text-amber-800 border-amber-200">
          <AlertCircle size={18} className="text-amber-500 shrink-0" />
          <span className="flex-1">{fetchError}</span>
          <button type="button" onClick={fetchOrders} className="underline font-bold">Retry</button>
        </div>
      )}

      {/* ─── DATA TABLE / GRID ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">System Order Code</th>
                <th className="py-3.5 px-6">Fabric & Style Specifications</th>
                <th className="py-3.5 px-6">Service / Address</th>
                <th className="py-3.5 px-6">Payment</th>
                <th className="py-3.5 px-6">Active Status</th>
                <th className="py-3.5 px-6 text-right">Actions Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {fetching ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400 font-medium">Loading orders…</td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400 font-medium">No order data rows matched the parameters.</td>
                </tr>
              ) : (
                currentItems.map((order) => (
                  <tr key={order.Id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-gray-900">{order.OrderCode || order.OrderNumber}</td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-800">{order.ClothDetails || "—"}</div>
                      <div className="text-gray-400 text-[11px] font-medium mt-0.5">{order.CustomizationNotes || "No customization notes"}</div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-500">
                      {order.ServiceTitle || order.ServiceName || "Service"}
                      <span className="block text-[10px] uppercase font-bold text-[#148A8A] mt-0.5">{order.UrgencyLevel}</span>
                      {order.address?.city && <span className="block text-[10px] text-gray-400 normal-case font-medium">{order.address.city}, {order.address.state}</span>}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-800">{order.AmountDisplay}</div>
                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">{order.PaymentStatusLabel}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getStatusBadge(order.Status)}`}>
                        {order.StatusLabel || order.Status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate("/orderfulldetails", { state: { order } })}
                          className="p-1.5 text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-all"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button 
                          onClick={() => handleDelete(order.Id)} 
                          className="p-1.5 text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ─── PAGINATION FOOTER (5 Items Fixed) ─────────────────────────── */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-gray-500">
            <div>
              Showing <span className="font-bold text-gray-700">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-bold text-gray-700">{Math.min(indexOfLastItem, totalItems)}</span> of{" "}
              <span className="font-bold text-gray-700">{totalItems}</span> orders
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 rounded-lg border font-bold transition-colors ${
                    currentPage === index + 1
                      ? "bg-[#148A8A] text-white border-[#148A8A]"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}