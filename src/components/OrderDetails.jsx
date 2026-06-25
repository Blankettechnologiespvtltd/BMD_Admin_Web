// import React, { useState, useEffect } from "react";
// import { Filter } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const OrderDetails = () => {
//   const [showForm, setShowForm] = useState(false); 
//   const [showFilter, setShowFilter] = useState(false);
//   const [search, setSearch] = useState("");
//   const [openFilter, setOpenFilter] = useState("");
//   const [bridges, setBridges] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     status: [],
//   });

//   const navigate = useNavigate();

  
//   const fetchBridges = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
      
     
//       const response = await axios.get(
//         "http://192.168.1.29:8000/api/v1/order", 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = response.data?.data || response.data?.bridges || response.data || [];
//       setBridges(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Order fetch error:", error);

//       if (error.response?.status === 401) {
//         alert("Session expired. Please login again.");
//         localStorage.removeItem("token");
//       }
//       setBridges([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBridges();
//   }, []);

//   const handleFilter = (type, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [type]: prev[type].includes(value)
//         ? prev[type].filter((item) => item !== value)
//         : [...prev[type], value],
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       status: [],
//     });
//   };


//   const filteredBridges = bridges.filter((bridge) => {
//     const searchMatch =
//       bridge.bridge_id?.toLowerCase().includes(search.toLowerCase()) ||
//       bridge.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
//       bridge.tailor_name?.toLowerCase().includes(search.toLowerCase());

//     const statusMatch =
//       filters.status.length === 0 ||
//       filters.status.includes(bridge.status);

//     return searchMatch && statusMatch;
//   });

//   return (
//     <>
//       <div
//         className={`p-5 w-full min-h-screen bg-gray-100 transition-all duration-300 ${
//           showForm ? "blur-sm pointer-events-none" : ""
//         }`}
//       >
//         {/* Header  */}
//         <div className="bg-teal-700 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Customer Bridge</h1>
          
//           <div className="flex items-center gap-4">
//             {/* Search */}
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-4 py-2 rounded-full border-2 outline-none text-gray-100 placeholder-gray-100"
//             />
            
//             {/* Filter Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowFilter(!showFilter)}
//                 className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
//               >
//                 <Filter size={18} />
//                 <span className="font-medium">Filters</span>
//                 {filters.status.length > 0 && (
//                   <span className="w-2 h-2 rounded-full bg-orange-500"></span>
//                 )}
//               </button>
              
//               {showFilter && (
//                 <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border p-4 z-50">
//                   <div className="border-b pb-2 mb-2">
//                     <div
//                       className="flex justify-between cursor-pointer"
//                       onClick={() =>
//                         setOpenFilter(openFilter === "status" ? "" : "status")
//                       }
//                     >
//                       <span className="text-black font-semibold">Status</span>
//                       <span className="text-black">▼</span>
//                     </div>
//                     {openFilter === "status" &&
//                       ["Shipped", "Confirmed" ,"Pending", "Delivered", "Cancelled",].map((item) => (
//                         <label key={item} className="flex justify-between mt-2">
//                           <span className="text-black">{item}</span>
//                           <input
//                             type="checkbox"
//                             checked={filters.status.includes(item)}
//                             onChange={() => handleFilter("status", item)}
//                             className="accent-green-600"
//                           />
//                         </label>
//                       ))}
//                   </div>
                  
//                   <button
//                     onClick={resetFilters}
//                     className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
//                   >
//                     Reset
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           {/* Add Bridge Button */}
//           <button
//             onClick={() => navigate("")}
//             className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition duration-300"
//           >
//             + Add Bridge
//           </button>
//         </div>

//         {/* Table Area  */}
//         <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
//           <table className="w-full">
//             <thead className="bg-teal-700 text-white">
//               <tr>
//                 <th className="p-4">BRIDGE ID</th>
//                 <th className="p-4">CUSTOMER NAME</th>
//                 <th className="p-4">ASSIGNED TAILOR</th>
//                 <th className="p-4">STATUS</th>
//                 <th className="p-4">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-10 text-teal-700 font-medium animate-pulse">
//                     Loading Order Records...
//                   </td>
//                 </tr>
//               ) : filteredBridges.length > 0 ? (
//                 filteredBridges.map((bridge) => (
//                   <tr key={bridge.bridge_id} className="border-b hover:bg-gray-50 text-center">
//                     <td className="p-4 font-semibold text-slate-700">{bridge.bridge_id}</td>
//                     <td className="p-4">{bridge.customer_name || "-"}</td>
//                     <td className="p-4">{bridge.tailor_name || "-"}</td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         bridge.status === 'Completed' ? 'bg-green-100 text-green-700' : 
//                         bridge.status === 'Assigned' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
//                       }`}>
//                         {bridge.status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <button
//                         onClick={() => navigate(`/bridge-details/${bridge.bridge_id}`, { state: { bridge } })}
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center py-10 text-gray-500 font-medium">
//                     No Customer Bridge Records Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderDetails;
//  import React, { useState, useEffect } from "react";
// import { Filter, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL, API_ENDPOINT } from "./config"; // path sahi check kar lena apne folder ke hisab se

// const OrderDetails = () => {
//   const [showForm, setShowForm] = useState(false); 
//   const [showFilter, setShowFilter] = useState(false);
//   const [search, setSearch] = useState("");
//   const [openFilter, setOpenFilter] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     status: [],
//   });

//   // --- Form State according to your API Schema ---
//   const [formData, setFormData] = useState({
//     address_id: "",
//     service_id: "",
//     cloth_details: "",
//     customization_notes: "",
//     description: "",
//     fabric_notes: "",
//     measurement_option: "self", // default value
//     payment_method: "online",   // default value
//     urgency_level: "standard",   // default value
//     image_references: []
//   });

//   const navigate = useNavigate();
 
  

//   // 1. GET: Fetch Orders List
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${BASE_URL}/api/v1/admin/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = response.data?.data || response.data?.orders || response.data || [];
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Order fetch error:", error);
//       if (error.response?.status === 401) {
//         alert("Session expired. Please login again.");
//         localStorage.removeItem("token");
//       }
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // 2. POST: Create Order Handler
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // API ke requirements ke mutabik IDs ko integer mein convert karna zaroori hai
//       const payload = {
//         ...formData,
//         address_id: parseInt(formData.address_id) || 0,
//         service_id: parseInt(formData.service_id) || 0,
//       };

//       const response = await axios.post(`${BASE_URL}/api/v1/orders`, payload, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });

//       if (response.status === 200) {
//         alert(`Order Created Successfully! Code: ${response.data.OrderCode}`);
//         setShowForm(false);
//         // Form reset karein
//         setFormData({
//           address_id: "",
//           service_id: "",
//           cloth_details: "",
//           customization_notes: "",
//           description: "",
//           fabric_notes: "",
//           measurement_option: "self",
//           payment_method: "online",
//           urgency_level: "standard",
//           image_references: []
//         });
//         fetchOrders(); // List ko refresh karein
//       }
//     } catch (error) {
//       console.error("Create Order Error:", error);
//       if (error.response?.status === 422) {
//         alert("Validation Error! Please check your input fields.");
//       } else {
//         alert("Failed to create order. Please try again.");
//       }
//     }
//   };

//   // --- Filtering & Searching Logic ---
//   const handleFilter = (type, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [type]: prev[type].includes(value)
//         ? prev[type].filter((item) => item !== value)
//         : [...prev[type], value],
//     }));
//   };

//   const resetFilters = () => setFilters({ status: [] });

//   const filteredOrders = orders.filter((order) => {
//     const searchMatch =
//       order.OrderCode?.toLowerCase().includes(search.toLowerCase()) ||
//       order.order_id?.toString().includes(search) ||
//       order.customer_name?.toLowerCase().includes(search.toLowerCase());

//     const statusMatch =
//       filters.status.length === 0 ||
//       filters.status.includes(order.Status || order.status);

//     return searchMatch && statusMatch;
//   });

//   return (
//     <>
//       {/* Main Container */}
//       <div className={`p-5 w-full min-h-screen bg-gray-100 transition-all duration-300 ${showForm ? "blur-sm pointer-events-none select-none" : ""}`}>
        
//         {/* Header */}
//         <div className="bg-teal-700 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold"> Orders Dashboard</h1>
          
//           <div className="flex items-center gap-4">
//             {/* Search */}
//             <input
//               type="text"
//               placeholder="Search Order Code..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-4 py-2 rounded-full border border-teal-600 bg-teal-800 text-white placeholder-teal-200 outline-none focus:ring-2 focus:ring-orange-400"
//             />
            
//             {/* Filter Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowFilter(!showFilter)}
//                 className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
//               >
//                 <Filter size={18} />
//                 <span className="font-medium">Filters</span>
//                 {filters.status.length > 0 && (
//                   <span className="w-2 h-2 rounded-full bg-orange-500"></span>
//                 )}
//               </button>
              
//               {showFilter && (
//                 <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border p-4 z-50">
//                   <div className="border-b pb-2 mb-2">
//                     <div
//                       className="flex justify-between cursor-pointer"
//                       onClick={() => setOpenFilter(openFilter === "status" ? "" : "status")}
//                     >
//                       <span className="text-black font-semibold">Status</span>
//                       <span className="text-black">{openFilter === "status" ? "▲" : "▼"}</span>
//                     </div>
//                     {openFilter === "status" &&
//                       ["order_placed", "pending_payment", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((item) => (
//                         <label key={item} className="flex justify-between mt-2 cursor-pointer">
//                           <span className="text-gray-700 capitalize">{item.replace('_', ' ')}</span>
//                           <input
//                             type="checkbox"
//                             checked={filters.status.includes(item)}
//                             onChange={() => handleFilter("status", item)}
//                             className="accent-teal-600"
//                           />
//                         </label>
//                       ))}
//                   </div>
//                   <button
//                     onClick={resetFilters}
//                     className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition"
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           {/* Create Order Button */}
//           {/* <button
//             onClick={() => setShowForm(true)}
//             className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
//           >
//             + Create
           
//           </button> */}
//              <button
//             onClick={() => navigate("/addorder")}
//               className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
//           >
//             + Create
//           </button>
          
//         </div>

//         {/* Table Area */}
//         <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
//           <table className="w-full">
//             <thead className="bg-teal-700 text-white">
//               <tr>
//                 <th className="p-4">ORDER CODE / ID</th>
//                 <th className="p-4">CLOTH DETAILS</th>
//                 <th className="p-4">DELIVERY ETA</th>
//                 <th className="p-4">STATUS</th>
//                 <th className="p-4">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-10 text-teal-700 font-medium animate-pulse">
//                     Loading Order Records...
//                   </td>
//                 </tr>
//               ) : filteredOrders.length > 0 ? (
//                 filteredOrders.map((order) => (
//                   <tr key={order.Id || order.order_id} className="border-b hover:bg-gray-50 text-center">
//                     <td className="p-4 font-semibold text-slate-700">{order.OrderCode || order.order_id}</td>
//                     <td className="p-4 text-gray-600">{order.cloth_details || "-"}</td>
//                     <td className="p-4 text-sm font-medium text-slate-600">{order.DisplayEta || order.delivery_label || "-"}</td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
//                         (order.Status || order.status) === 'order_placed' ? 'bg-green-100 text-green-700' : 
//                         (order.Status || order.status) === 'pending_payment' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
//                       }`}>
//                         {order.StatusLabel || order.Status || order.status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <button
//                         onClick={() => navigate(`/order-details/${order.Id || order.order_id}`, { state: { order } })}
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center py-10 text-gray-500 font-medium">
//                     No  Order Records Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- ADD ORDER POPUP FORM MODAL --- */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
//             <button 
//               onClick={() => setShowForm(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//             >
//               <X size={24} />
//             </button>

//             <h2 className="text-xl font-bold text-teal-800 border-b pb-3 mb-4">Create New Order</h2>
            
//             <form onSubmit={handleFormSubmit} className="space-y-4 text-gray-700">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Address ID *</label>
//                   <input type="number" name="address_id" value={formData.address_id} onChange={handleInputChange} required className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="e.g. 5" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Service ID *</label>
//                   <input type="number" name="service_id" value={formData.service_id} onChange={handleInputChange} required className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="e.g. 101" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">Cloth Details</label>
//                 <input type="text" name="cloth_details" value={formData.cloth_details} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Blue cotton cloth" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Measurement Option</label>
//                   <select name="measurement_option" value={formData.measurement_option} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600">
//                     <option value="self">Self (Khud Se)</option>
//                     <option value="pickup">Pickup Sample</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Urgency Level</label>
//                   <select name="urgency_level" value={formData.urgency_level} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600">
//                     <option value="standard">Standard</option>
//                     <option value="express">Express</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">Customization Notes</label>
//                 <textarea name="customization_notes" value={formData.customization_notes} onChange={handleInputChange} rows="2" className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Chinese collar, Full sleeves..."></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">Description / Stitching Instructions</label>
//                 <textarea name="description" value={formData.description} onChange={handleInputChange} rows="2" className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Need slim fit stitching..."></textarea>
//               </div>

//               <div className="flex gap-4 pt-4 border-t">
//                 <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
//                 <button type="submit" className="flex-1 bg-teal-700 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-800 transition">Submit Order</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrderDetails;
// import React, { useState, useEffect } from "react";
// import { Filter, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // import { BASE_URL, API_ENDPOINT } from "../config"; // Aapka central config import

// const OrderDetails = () => {
//   const [showForm, setShowForm] = useState(false); 
//   const [showFilter, setShowFilter] = useState(false);
//   const [search, setSearch] = useState("");
//   const [openFilter, setOpenFilter] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     status: [],
//   });
//  const BASE_URL = "https://web-production-efff7.up.railway.app";
//  const API_ENDPOINT = `${BASE_URL}/api/v1/orders`;
//   // --- Safe Token Retrieval ---
//   // const token = localStorage.getItem("token") || "";
// // Line ko badal kar aisa kar dein taaki dono keys check ho sakein:
// const token = localStorage.getItem("access_token") || localStorage.getItem("token") || "";
//   // --- Form State according to your API Schema ---
//   const [formData, setFormData] = useState({
//     address_id: "",
//     service_id: "",
//     cloth_details: "",
//     customization_notes: "",
//     description: "",
//     fabric_notes: "",
//     measurement_option: "self", // default value
//     payment_method: "online",   // default value
//     urgency_level: "standard",   // default value
//     image_references: []
//   });

//   const navigate = useNavigate();

//   // 1. GET: Fetch Orders List
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${BASE_URL}/api/v1/admin/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = response.data?.data || response.data?.orders || response.data || [];
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Order fetch error:", error);
//       if (error.response?.status === 401) {
//         alert("Session expired. Please login again.");
//         localStorage.removeItem("token");
//       }
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // 2. POST: Create Order Handler
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // API ke requirements ke mutabik IDs ko integer mein convert karna zaroori hai
//       const payload = {
//         ...formData,
//         address_id: parseInt(formData.address_id) || 0,
//         service_id: parseInt(formData.service_id) || 0,
//       };

//       // const response = await axios.post(`${BASE_URL}/api/v1/orders`, payload, {
//       //   headers: { 
//       //     Authorization: `Bearer ${token}`,
//       //     "Content-Type": "application/json"
//       //   },
//       // });
//       // OrderDetails.jsx ke fetchOrders function ke andar is line ko change karein:
// const response = await axios.get(`${BASE_URL}/api/v1/orders`, { // '/admin/orders' ko '/orders' kiya
//   headers: { Authorization: `Bearer ${token}` },
// });

//       if (response.status === 200 || response.status === 201) {
//         alert(`Order Created Successfully! Code: ${response.data.OrderCode || "N/A"}`);
//         setShowForm(false);
//         // Form reset karein
//         setFormData({
//           address_id: "",
//           service_id: "",
//           cloth_details: "",
//           customization_notes: "",
//           description: "",
//           fabric_notes: "",
//           measurement_option: "self",
//           payment_method: "online",
//           urgency_level: "standard",
//           image_references: []
//         });
//         fetchOrders(); // List ko refresh karein
//       }
//     } catch (error) {
//       console.error("Create Order Error:", error);
//       if (error.response?.status === 422) {
//         alert("Validation Error! Please check your input fields.");
//       } else {
//         alert("Failed to create order. Please try again.");
//       }
//     }
//   };

//   // --- Filtering & Searching Logic ---
//   const handleFilter = (type, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [type]: prev[type].includes(value)
//         ? prev[type].filter((item) => item !== value)
//         : [...prev[type], value],
//     }));
//   };

//   const resetFilters = () => setFilters({ status: [] });

//   const filteredOrders = orders.filter((order) => {
//     const searchMatch =
//       order.OrderCode?.toLowerCase().includes(search.toLowerCase()) ||
//       order.order_id?.toString().includes(search) ||
//       order.customer_name?.toLowerCase().includes(search.toLowerCase());

//     const statusMatch =
//       filters.status.length === 0 ||
//       filters.status.includes(order.Status || order.status);

//     return searchMatch && statusMatch;
//   });

//   return (
//     <>
//       {/* Main Container */}
//       <div className={`p-5 w-full min-h-screen bg-gray-100 transition-all duration-300 ${showForm ? "blur-sm pointer-events-none select-none" : ""}`}>
        
//         {/* Header */}
//         <div className="bg-teal-700 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold"> Orders Dashboard</h1>
          
//           <div className="flex items-center gap-4">
//             {/* Search */}
//             <input
//               type="text"
//               placeholder="Search Order Code..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-4 py-2 rounded-full border border-teal-600 bg-teal-800 text-white placeholder-teal-200 outline-none focus:ring-2 focus:ring-orange-400"
//             />
            
//             {/* Filter Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowFilter(!showFilter)}
//                 className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
//               >
//                 <Filter size={18} />
//                 <span className="font-medium">Filters</span>
//                 {filters.status.length > 0 && (
//                   <span className="w-2 h-2 rounded-full bg-orange-500"></span>
//                 )}
//               </button>
              
//               {showFilter && (
//                 <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border p-4 z-50">
//                   <div className="border-b pb-2 mb-2">
//                     <div
//                       className="flex justify-between cursor-pointer"
//                       onClick={() => setOpenFilter(openFilter === "status" ? "" : "status")}
//                     >
//                       <span className="text-black font-semibold">Status</span>
//                       <span className="text-black">{openFilter === "status" ? "▲" : "▼"}</span>
//                     </div>
//                     {openFilter === "status" &&
//                       ["order_placed", "pending_payment", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((item) => (
//                         <label key={item} className="flex justify-between mt-2 cursor-pointer">
//                           <span className="text-gray-700 capitalize">{item.replace('_', ' ')}</span>
//                           <input
//                             type="checkbox"
//                             checked={filters.status.includes(item)}
//                             onChange={() => handleFilter("status", item)}
//                             className="accent-teal-600"
//                           />
//                         </label>
//                       ))}
//                   </div>
//                   <button
//                     onClick={resetFilters}
//                     className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition"
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <button
//             onClick={() => navigate("/addorder")}
//             className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
//           >
//             + Create
//           </button>
          
//         </div>

//         {/* Table Area */}
//         <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
//           <table className="w-full">
//             <thead className="bg-teal-700 text-white">
//               <tr>
//                 <th className="p-4">ORDER CODE / ID</th>
//                 <th className="p-4">CLOTH DETAILS</th>
//                 <th className="p-4">DELIVERY ETA</th>
//                 <th className="p-4">STATUS</th>
//                 <th className="p-4">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-10 text-teal-700 font-medium animate-pulse">
//                     Loading Order Records...
//                   </td>
//                 </tr>
//               ) : filteredOrders.length > 0 ? (
//                 filteredOrders.map((order) => (
//                   <tr key={order.Id || order.order_id} className="border-b hover:bg-gray-50 text-center">
//                     <td className="p-4 font-semibold text-slate-700">{order.OrderCode || order.order_id}</td>
//                     <td className="p-4 text-gray-600">{order.cloth_details || "-"}</td>
//                     <td className="p-4 text-sm font-medium text-slate-600">{order.DisplayEta || order.delivery_label || "-"}</td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
//                         (order.Status || order.status) === 'order_placed' ? 'bg-green-100 text-green-700' : 
//                         (order.Status || order.status) === 'pending_payment' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
//                       }`}>
//                         {order.StatusLabel || order.Status || order.status || "Pending"}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <button
//                         onClick={() => navigate(`/order-details/${order.Id || order.order_id}`, { state: { order } })}
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center py-10 text-gray-500 font-medium">
//                     No Order Records Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- ADD ORDER POPUP FORM MODAL --- */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
//             <button 
//               onClick={() => setShowForm(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
//             >
//               <X size={24} />
//             </button>

//             <h2 className="text-xl font-bold text-teal-800 border-b pb-3 mb-4">Create New Order</h2>
            
//             <form onSubmit={handleFormSubmit} className="space-y-4 text-gray-700">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Address ID *</label>
//                   <input type="number" name="address_id" value={formData.address_id} onChange={handleInputChange} required className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="e.g. 5" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Service ID *</label>
//                   <input type="number" name="service_id" value={formData.service_id} onChange={handleInputChange} required className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="e.g. 101" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">Cloth Details</label>
//                 <input type="text" name="cloth_details" value={formData.cloth_details} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Blue cotton cloth" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Measurement Option</label>
//                   <select name="measurement_option" value={formData.measurement_option} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600">
//                     <option value="self">Self (Khud Se)</option>
//                     <option value="pickup">Pickup Sample</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">Urgency Level</label>
//                   <select name="urgency_level" value={formData.urgency_level} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600">
//                     <option value="standard">Standard</option>
//                     <option value="express">Express</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">Customization Notes</label>
//                 <textarea name="customization_notes" value={formData.customization_notes} onChange={handleInputChange} rows="2" className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Chinese collar, Full sleeves..."></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-1">Description / Stitching Instructions</label>
//                 <textarea name="description" value={formData.description} onChange={handleInputChange} rows="2" className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Need slim fit stitching..."></textarea>
//               </div>

//               <div className="flex gap-4 pt-4 border-t">
//                 <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
//                 <button type="submit" className="flex-1 bg-teal-700 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-800 transition">Submit Order</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default OrderDetails;

import React, { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const [showForm, setShowForm] = useState(false); 
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: [],
  });

  const BASE_URL = "https://web-production-efff7.up.railway.app";
  const API_ENDPOINT = `${BASE_URL}/api/v1/orders`;

  // --- Safe Token Retrieval ---
  const token = localStorage.getItem("access_token") || localStorage.getItem("token") || "";

  // --- Form State according to your API Schema ---
  const [formData, setFormData] = useState({
    address_id: "",
    service_id: "",
    cloth_details: "",
    customization_notes: "",
    description: "",
    fabric_notes: "",
    measurement_option: "self", // default value
    payment_method: "online",   // default value
    urgency_level: "standard",   // default value
    image_references: []
  });

  const navigate = useNavigate();

  // 1. GET: Fetch Orders List (FIXED: Removed /admin to prevent 403 Forbidden)
  // const fetchOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`${BASE_URL}/api/v1/orders`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = response.data?.data || response.data?.orders || response.data || [];
  //     setOrders(Array.isArray(data) ? data : []);
  //   } catch (error) {
  // 1. GET: Fetch Orders List
  const fetchOrders = async () => {
    try {
      setLoading(true);
      // URL mein waapas /admin/orders kar diya kyunki wahi sahi endpoint hai
      const response = await axios.get(`${BASE_URL}/api/v1/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data?.data || response.data?.orders || response.data || [];
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      // ... baki catch block same rahega
      console.error("Order fetch error:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. POST: Create Order Handler (FIXED: Reverted back to correct axios.post syntax)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // API ke requirements ke mutabik IDs ko integer mein convert karna zaroori hai
      const payload = {
        ...formData,
        address_id: parseInt(formData.address_id) || 0,
        service_id: parseInt(formData.service_id) || 0,
      };

      const response = await axios.post(`${BASE_URL}/api/v1/orders`, payload, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(`Order Created Successfully! Code: ${response.data.OrderCode || "N/A"}`);
        setShowForm(false);
        // Form reset karein
        setFormData({
          address_id: "",
          service_id: "",
          cloth_details: "",
          customization_notes: "",
          description: "",
          fabric_notes: "",
          measurement_option: "self",
          payment_method: "online",
          urgency_level: "standard",
          image_references: []
        });
        fetchOrders(); // List ko refresh karein
      }
    } catch (error) {
      console.error("Create Order Error:", error);
      if (error.response?.status === 422) {
        alert("Validation Error! Please check your input fields.");
      } else {
        alert("Failed to create order. Please try again.");
      }
    }
  };

  // --- Filtering & Searching Logic ---
  const handleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const resetFilters = () => setFilters({ status: [] });

  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.OrderCode?.toLowerCase().includes(search.toLowerCase()) ||
      order.order_id?.toString().includes(search) ||
      order.customer_name?.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      filters.status.length === 0 ||
      filters.status.includes(order.Status || order.status);

    return searchMatch && statusMatch;
  });

  return (
    <>
      {/* Main Container */}
      <div className={`p-5 w-full min-h-screen bg-gray-100 transition-all duration-300 ${showForm ? "blur-sm pointer-events-none select-none" : ""}`}>
        
        {/* Header */}
        <div className="bg-teal-700 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold"> Orders Dashboard</h1>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search Order Code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-full border border-teal-600 bg-teal-800 text-white placeholder-teal-200 outline-none focus:ring-2 focus:ring-orange-400"
            />
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
              >
                <Filter size={18} />
                <span className="font-medium">Filters</span>
                {filters.status.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                )}
              </button>
              
              {showFilter && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border p-4 z-50">
                  <div className="border-b pb-2 mb-2">
                    <div
                      className="flex justify-between cursor-pointer"
                      onClick={() => setOpenFilter(openFilter === "status" ? "" : "status")}
                    >
                      <span className="text-black font-semibold">Status</span>
                      <span className="text-black">{openFilter === "status" ? "▲" : "▼"}</span>
                    </div>
                    {openFilter === "status" &&
                      ["order_placed", "pending_payment", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((item) => (
                        <label key={item} className="flex justify-between mt-2 cursor-pointer">
                          <span className="text-gray-700 capitalize">{item.replace('_', ' ')}</span>
                          <input
                            type="checkbox"
                            checked={filters.status.includes(item)}
                            onChange={() => handleFilter("status", item)}
                            className="accent-teal-600"
                          />
                        </label>
                      ))}
                  </div>
                  <button
                    onClick={resetFilters}
                    className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => navigate("/addorder")}
            className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
          >
            + Create
          </button>
          
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-4">ORDER CODE / ID</th>
                <th className="p-4">CLOTH DETAILS</th>
                <th className="p-4">DELIVERY ETA</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-teal-700 font-medium animate-pulse">
                    Loading Order Records...
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.Id || order.order_id} className="border-b hover:bg-gray-50 text-center">
                    <td className="p-4 font-semibold text-slate-700">{order.OrderCode || order.order_id}</td>
                    <td className="p-4 text-gray-600">{order.cloth_details || "-"}</td>
                    <td className="p-4 text-sm font-medium text-slate-600">{order.DisplayEta || order.delivery_label || "-"}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        (order.Status || order.status) === 'order_placed' ? 'bg-green-100 text-green-700' : 
                        (order.Status || order.status) === 'pending_payment' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {order.StatusLabel || order.Status || order.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/order-details/${order.Id || order.order_id}`, { state: { order } })}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500 font-medium">
                    No Order Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD ORDER POPUP FORM MODAL --- */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold text-teal-800 border-b pb-3 mb-4">Create New Order</h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-4 text-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Address ID *</label>
                  <input type="number" name="address_id" value={formData.address_id} onChange={handleInputChange} required className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="e.g. 5" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Service ID *</label>
                  <input type="number" name="service_id" value={formData.service_id} onChange={handleInputChange} required className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="e.g. 101" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Cloth Details</label>
                <input type="text" name="cloth_details" value={formData.cloth_details} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Blue cotton cloth" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Measurement Option</label>
                  <select name="measurement_option" value={formData.measurement_option} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600">
                    <option value="self">Self (Khud Se)</option>
                    <option value="pickup">Pickup Sample</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Urgency Level</label>
                  <select name="urgency_level" value={formData.urgency_level} onChange={handleInputChange} className="w-full p-2 border rounded-lg outline-none focus:border-teal-600">
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Customization Notes</label>
                <textarea name="customization_notes" value={formData.customization_notes} onChange={handleInputChange} rows="2" className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Chinese collar, Full sleeves..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Description / Stitching Instructions</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="2" className="w-full p-2 border rounded-lg outline-none focus:border-teal-600" placeholder="Need slim fit stitching..."></textarea>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-teal-700 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-800 transition">Submit Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;