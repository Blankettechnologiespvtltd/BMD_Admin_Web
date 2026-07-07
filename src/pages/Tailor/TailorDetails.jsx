
// import React, { useState, useEffect } from "react";
// import AddTailor from "../Tailor/AddTailor"
// import { Filter } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api"; 

// const TailorDetails = () => {
//   const navigate = useNavigate();

//   const token = localStorage.getItem("access_token");

//   // 1. AUTHENTICATION GUARD: 
//   useEffect(() => {
//     if (!token) {
//       navigate("/", { replace: true });
//     }
//   }, [token, navigate]);

//   const [showForm, setShowForm] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const [search, setSearch] = useState("");
//   const [openFilter, setOpenFilter] = useState("");
//   const [tailors, setTailors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     verify: [],
//     status: [],
//     role: [],
//   });

//   const fetchTailors = async () => {
   
//     if (!token) return;

//     try {
//       setLoading(true);
//       const response = await api.get("/admin/tailors");

//       console.log("API Response received:", response.data);

//       const data = response.data;
//       setTailors(Array.isArray(data) ? data : []);

//     } catch (error) {
//       console.error("Tailor fetch error details:", error.response || error);
//       setTailors([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
  
//     if (token) {
//       fetchTailors();
//       const refresh = () => fetchTailors();
//       window.addEventListener("tailor-added", refresh);
//       return () => {
//         window.removeEventListener("tailor-added", refresh);
//       };
//     }
  
//   }, [token]);

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
//       verify: [],
//       status: [],
//       role: [],
//     });
//   };

//   const filteredTailors = tailors.filter((tailor) => {
//     const searchMatch =
//       tailor.full_name?.toLowerCase().includes(search.toLowerCase()) ||
//       tailor.email?.toLowerCase().includes(search.toLowerCase()) ||
//       tailor.mobile?.includes(search);

//     const statusMatch =
//       filters.status.length === 0 ||
//       filters.status.includes(tailor.is_active ? "Active" : "Inactive");

//     return searchMatch && statusMatch;
//   });

//   // 2. SAFETY RENDER: 
//   if (!token) {
//     return null;
//   }

//   return (
//     <>
//       <div
//         className={`p-5 w-full min-h-screen bg-gray-100 transition-all duration-300 ${
//           showForm ? "blur-sm pointer-events-none" : ""
//         }`}
//       >
//         {/* Header  */}
//         <div className="bg-[#0A8C8C] text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Tailor Dashboard</h1>
          
//           <div className="flex items-center gap-4">
//             {/* Search */}
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-4 py-2 rounded-full border border-[#0A8C8C] outline-none text-gray-800 placeholder-gray-400 bg-white"
//             />
            
//             {/* Filter Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowFilter(!showFilter)}
//                 className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
//               >
//                 <Filter size={18} />
//                 <span className="font-medium">Filters</span>
//                 {Boolean(filters.verify.length || filters.status.length || filters.role.length) && (
//                   <span className="w-2 h-2 rounded-full bg-orange-500"></span>
//                 )}
//               </button>
              
//               {showFilter && (
//                 <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border p-4 z-50">
//                   <div className="border-b pb-2 mb-2">
//                     <div
//                       className="flex justify-between cursor-pointer"
//                       onClick={() =>
//                         setOpenFilter(openFilter === "verify" ? "" : "verify")
//                       }
//                     >
//                       <span className="text-black font-semibold">Verify</span>
//                       <span className="text-black">▼</span>
//                     </div>
//                     {openFilter === "verify" &&
//                       ["Verified", "Pending"].map((item) => (
//                         <label key={item} className="flex justify-between mt-2">
//                           <span className="text-black">{item}</span>
//                           <input
//                             type="checkbox"
//                             checked={filters.verify.includes(item)}
//                             onChange={() => handleFilter("verify", item)}
//                             className="accent-green-600"
//                           />
//                         </label>
//                       ))}
//                   </div>

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
//                       ["Active", "Inactive"].map((item) => (
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

//                   <div>
//                     <div
//                       className="flex justify-between cursor-pointer"
//                       onClick={() =>
//                         setOpenFilter(openFilter === "role" ? "" : "role")
//                       }
//                     >
//                       <span className="text-black font-semibold">Role</span>
//                       <span className="text-black">▼</span>
//                     </div>
//                     {openFilter === "role" &&
//                       ["Tailor", "Vender"].map((item) => (
//                         <label key={item} className="flex justify-between mt-2">
//                           <span className="text-black">{item}</span>
//                           <input
//                             type="checkbox"
//                             checked={filters.role.includes(item)}
//                             onChange={() => handleFilter("role", item)}
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
          
//           {/* Add Tailor Button */}
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-white hover:bg-gray-100 text-black px-5 py-2 rounded-lg font-semibold transition duration-300"
//           >
//             + Add
//           </button>
//         </div>

//         {/* Table Area  */}
//         <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
//           <table className="w-full">
//             <thead className="bg-[#0A8C8C] text-white">
//               <tr>
//                 <th className="p-4">Tailor ID</th>
//                 <th className="p-4">Name</th>
//                 <th className="p-4">Email Address</th>
//                 <th className="p-4">Phone Number</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-10 text-[#0A8C8C] font-medium animate-pulse">
//                     Loading Tailors...
//                   </td>
//                 </tr>
//               ) : filteredTailors.length > 0 ? (
//                 filteredTailors.map((tailor) => (
//                   <tr key={tailor.tailor_id} className="border-b hover:bg-gray-50 text-center text-gray-800">
//                     <td className="p-4 font-semibold">{tailor.tailor_id}</td>
//                     <td className="p-4">{tailor.full_name || "-"}</td>
//                     <td className="p-4">{tailor.email || "-"}</td>
//                     <td className="p-4">{tailor.mobile || "-"}</td>
//                     <td className="p-4">
//                       <button
//                         onClick={() =>
//                           navigate("/fulldetails", {
//                             state: {
//                               tailorId: tailor.tailor_id,
//                               userId: tailor.user_id,
//                               tailor,
//                             },
//                           })
//                         }
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center py-6 text-gray-500">
//                     No Tailors Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal Block */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 flex justify-center items-center px-4 py-8">
//           <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={() => setShowForm(false)}
//           ></div>
//           <div className="relative z-50 w-full max-w-4xl max-h-[90vh] flex flex-col">
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white text-lg font-bold shadow-lg z-50 flex items-center justify-center"
//             >
//               ×
//             </button>
//             <div className="rounded-2xl overflow-hidden">
//               <AddTailor />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TailorDetails;

import React, { useState, useEffect } from "react";
import AddTailor from "../Tailor/AddTailor";
import { Filter, ChevronDown, Plus, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; 

const TailorDetails = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  // 1. AUTHENTICATION GUARD: 
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState("");
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const [filters, setFilters] = useState({
    verify: [],
    status: [],
    role: [],
  });

  const fetchTailors = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await api.get("/admin/tailors");
      console.log("API Response received:", response.data);
      const data = response.data;
      setTailors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Tailor fetch error details:", error.response || error);
      setTailors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTailors();
      const refresh = () => fetchTailors();
      window.addEventListener("tailor-added", refresh);
      return () => {
        window.removeEventListener("tailor-added", refresh);
      };
    }
  }, [token]);

  // Reset page position to page 1 whenever search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  const handleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const resetFilters = () => {
    setFilters({
      verify: [],
      status: [],
      role: [],
    });
  };

  const filteredTailors = tailors.filter((tailor) => {
    const searchMatch =
      tailor.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      tailor.email?.toLowerCase().includes(search.toLowerCase()) ||
      tailor.mobile?.includes(search);

    const statusMatch =
      filters.status.length === 0 ||
      filters.status.includes(tailor.is_active ? "Active" : "Inactive");

    return searchMatch && statusMatch;
  });

  // Pagination Logic Calculations
  const totalPages = Math.ceil(filteredTailors.length / recordsPerPage) || 1;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredTailors.slice(indexOfFirstRecord, indexOfLastRecord);

  if (!token) {
    return null;
  }

  return (
    <>
      <div
        className={`p-4 sm:p-6 w-full min-h-screen bg-gray-50 flex flex-col transition-all duration-300 ${
          showForm ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Header Section */}
        <div className="bg-[#0A8C8C] text-white p-4 sm:p-6 rounded-2xl shadow-sm mb-6 flex flex-col lg:flex-row gap-4 lg:justify-between lg:items-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-center lg:text-left">
            Tailor Dashboard
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search tailors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-4 py-2.5 rounded-xl border-none outline-none text-gray-700 placeholder-gray-400 bg-white text-sm shadow-sm"
            />
            
            {/* Filter Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2.5 rounded-xl border border-transparent shadow-sm hover:bg-gray-100 transition-all text-sm font-medium"
              >
                <Filter size={16} className="text-gray-500" />
                <span>Filters</span>
                {Boolean(filters.verify.length || filters.status.length || filters.role.length) && (
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                )}
              </button>
              
              {showFilter && (
                <div className="absolute right-0 mt-2 w-full sm:w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                  {/* Verify Sub-Filter */}
                  <div className="border-b border-gray-100 pb-2 mb-2">
                    <div
                      className="flex justify-between items-center cursor-pointer py-1"
                      onClick={() => setOpenFilter(openFilter === "verify" ? "" : "verify")}
                    >
                      <span className="text-gray-800 font-semibold text-sm">Verify</span>
                      <ChevronDown size={16} className={`text-gray-500 transition-transform ${openFilter === "verify" ? "rotate-180" : ""}`} />
                    </div>
                    {openFilter === "verify" && (
                      <div className="mt-1 space-y-1">
                        {["Verified", "Pending"].map((item) => (
                          <label key={item} className="flex justify-between items-center py-1.5 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <span className="text-gray-600 text-sm">{item}</span>
                            <input
                              type="checkbox"
                              checked={filters.verify.includes(item)}
                              onChange={() => handleFilter("verify", item)}
                              className="accent-[#0A8C8C] h-4 w-4 rounded"
                            />
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status Sub-Filter */}
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
                        {["Active", "Inactive"].map((item) => (
                          <label key={item} className="flex justify-between items-center py-1.5 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <span className="text-gray-600 text-sm">{item}</span>
                            <input
                              type="checkbox"
                              checked={filters.status.includes(item)}
                              onChange={() => handleFilter("status", item)}
                              className="accent-[#0A8C8C] h-4 w-4 rounded"
                            />
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Role Sub-Filter */}
                  <div className="pb-2 mb-2">
                    <div
                      className="flex justify-between items-center cursor-pointer py-1"
                      onClick={() => setOpenFilter(openFilter === "role" ? "" : "role")}
                    >
                      <span className="text-gray-800 font-semibold text-sm">Role</span>
                      <ChevronDown size={16} className={`text-gray-500 transition-transform ${openFilter === "role" ? "rotate-180" : ""}`} />
                    </div>
                    {openFilter === "role" && (
                      <div className="mt-1 space-y-1">
                        {["Tailor", "Vender"].map((item) => (
                          <label key={item} className="flex justify-between items-center py-1.5 px-1 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <span className="text-gray-600 text-sm">{item}</span>
                            <input
                              type="checkbox"
                              checked={filters.role.includes(item)}
                              onChange={() => handleFilter("role", item)}
                              className="accent-[#0A8C8C] h-4 w-4 rounded"
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

            {/* Add Tailor Button */}
            <button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-white text-slate-900 px-5 py-2.5 rounded-xl font-semibold transition text-sm shadow-sm"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add Tailor</span>
            </button>
          </div>
        </div>

        {/* Dynamic List / Grid Wrapper Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden">
          
          {/* DESKTOP VIEW: Data Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold tracking-wider uppercase">
                  <th className="p-4 pl-6">Tailor ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Phone Number</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-[#0A8C8C] font-medium">
                      <span className="inline-block animate-pulse">Loading Tailors...</span>
                    </td>
                  </tr>
                ) : currentRecords.length > 0 ? (
                  currentRecords.map((tailor) => (
                    <tr key={tailor.tailor_id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-gray-800">{tailor.tailor_id}</td>
                      <td className="p-4 font-medium text-gray-900">{tailor.full_name || "—"}</td>
                      <td className="p-4">{tailor.email || "—"}</td>
                      <td className="p-4">{tailor.mobile || "—"}</td>
                      <td className="p-4 text-right pr-6">
                        <button
                          onClick={() =>
                            navigate("/fulldetails", {
                              state: {
                                tailorId: tailor.tailor_id,
                                userId: tailor.user_id,
                                tailor,
                              },
                            })
                          }
                          className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition"
                        >
                          <Eye size={14} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400 font-medium">
                      No Tailors Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE & TABLET VIEW: Grid Cards */}
          <div className="block md:hidden divide-y divide-gray-100">
            {loading ? (
              <div className="text-center py-12 text-[#0A8C8C] font-medium animate-pulse">
                Loading Tailors...
              </div>
            ) : currentRecords.length > 0 ? (
              currentRecords.map((tailor) => (
                <div key={tailor.tailor_id} className="p-5 hover:bg-gray-50/50 transition-all space-y-3.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Tailor ID</span>
                      <span className="text-base font-bold text-gray-900">{tailor.tailor_id}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-medium text-gray-400 block">Name</span>
                    <span className="text-gray-800 font-semibold block text-base">{tailor.full_name || "—"}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm">
                    <div>
                      <span className="text-xs font-medium text-gray-400 block mb-0.5">Email Address</span>
                      <span className="text-gray-700 break-all">{tailor.email || "—"}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-400 block mb-0.5">Phone Number</span>
                      <span className="text-gray-700">{tailor.mobile || "—"}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() =>
                        navigate("/fulldetails", {
                          state: {
                            tailorId: tailor.tailor_id,
                            userId: tailor.user_id,
                            tailor,
                          },
                        })
                      }
                      className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
                    >
                      <Eye size={16} />
                      View Full Profile
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400 font-medium px-4">
                No Tailors Found
              </div>
            )}
          </div>

          {/* PAGINATION PANEL FOOTER */}
          {filteredTailors.length > 0 && (
            <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-left">
                Showing <span className="font-semibold text-gray-800">{indexOfFirstRecord + 1}</span> to{" "}
                <span className="font-semibold text-gray-800">
                  {indexOfLastRecord > filteredTailors.length ? filteredTailors.length : indexOfLastRecord}
                </span>{" "}
                of <span className="font-semibold text-gray-800">{filteredTailors.length}</span> records
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="text-xs sm:text-sm font-semibold text-gray-700 min-w-[70px] text-center">
                  Page {currentPage} / {totalPages}
                </div>
                
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Modal Container Block */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="relative z-50 w-full max-w-4xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition z-50 flex items-center justify-center text-sm"
            >
              ✕
            </button>
            <div className="overflow-y-auto p-1">
              <AddTailor />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TailorDetails;