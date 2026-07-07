import React, { useState, useEffect } from "react";
import { Filter, ChevronDown, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; 
import BridgeFullDetails from "../Bridge/BridgeFullDetails";

const BridgeDetails = () => {
  const [showForm, setShowForm] = useState(false); 
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState("");
  const [bridges, setBridges] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const [filters, setFilters] = useState({
    status: [],
  });

  const navigate = useNavigate();

  const fetchBridges = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("No access token found! Redirecting...");
        localStorage.clear();
        window.location.replace("/");
        return;
      }

      const response = await api.get("/employee/orders");
      console.log("API Response:", response.data);
      const data = response.data.orders || [];
      setBridges(data);
    } catch (error) {
      console.error("Bridge fetch error:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.replace("/");
        return;
      }
      setBridges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBridges();
  }, []);

  // Reset page view back to page 1 whenever filters or search patterns change
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
      status: [],
    });
  };

  const filteredBridges = bridges.filter((bridge) => {
    const searchMatch =
      bridge.OrderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      bridge.address?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      bridge.ServiceTitle?.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      filters.status.length === 0 ||
      filters.status.includes(bridge.StatusLabel);

    return searchMatch && statusMatch;
  });

  // Pagination Chunk Calculations
  const totalPages = Math.ceil(filteredBridges.length / recordsPerPage) || 1;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredBridges.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <>
      <div
        className={`p-4 md:p-6 w-full min-h-screen bg-gray-50 flex flex-col transition-all duration-300 ${
          showForm ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Header Dashboard */}
        <div className="bg-[#0A8C8C] text-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">Bridge Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-4 py-2.5 rounded-xl border-none outline-none text-gray-700 placeholder-gray-400 bg-white text-sm "
            />
            
            {/* Filter Dropdown */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2.5 rounded-xl border border-transparent shadow-sm hover:bg-gray-100 transition-all text-sm font-medium"
              >
                <Filter size={16} className="text-gray-500" />
                <span className="font-medium">Filters</span>
                {filters.status.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                )}
              </button>
              
              {/* Filter Card Content */}
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
                        {["Pending", "Assigned", "Completed"].map((item) => (
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
                  
                  <button
                    onClick={resetFilters}
                    className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Add Bridge Button */}
            <button
              onClick={() => navigate("/addbridge")}
              className="w-full sm:w-auto bg-white  text-slate-900 px-5 py-2.5 rounded-xl font-semibold transition text-sm shadow-sm whitespace-nowrap"
            >
              + Add Bridge
            </button>
          </div>
        </div>

        {/* Responsive Table/Card Container Wrapper */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden">
          
          {/* DESKTOP VIEW: HTML Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold tracking-wider uppercase">
                  <th className="p-4 pl-6">BRIDGE ID</th>
                  <th className="p-4">CUSTOMER NAME</th>
                  <th className="p-4">ASSIGNED TAILOR</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right pr-6">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-[#0A8C8C] font-medium">
                      <span className="inline-block animate-pulse">Loading Bridge Records...</span>
                    </td>
                  </tr>
                ) : currentRecords.length > 0 ? (
                  currentRecords.map((bridge) => (
                    <tr key={bridge.OrderNumber} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 pl-6 font-semibold text-gray-800">{bridge.OrderNumber}</td>
                      <td className="p-4 font-medium text-gray-900">{bridge.address?.full_name || "—"}</td>
                      <td className="p-4">{bridge.ServiceTitle || "—"}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                          bridge.StatusLabel === 'Completed' ? 'bg-green-100 text-green-700' : 
                          bridge.StatusLabel === 'Assigned' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {bridge.StatusLabel || "Pending"}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <button
                          onClick={() => navigate("./bridgefulldetails")}
                          className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition shadow-sm"
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
                      No Customer Bridge Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW: Cards List */}
          <div className="block md:hidden divide-y divide-gray-100">
            {loading ? (
              <div className="text-center py-12 text-[#0A8C8C] font-medium animate-pulse">
                Loading Bridge Records...
              </div>
            ) : currentRecords.length > 0 ? (
              currentRecords.map((bridge) => (
                <div key={bridge.OrderNumber} className="p-5 hover:bg-gray-50/50 transition-all space-y-3.5 bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Bridge ID</span>
                      <span className="text-base font-bold text-gray-900">{bridge.OrderNumber}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                      bridge.StatusLabel === 'Completed' ? 'bg-green-100 text-green-700' : 
                      bridge.StatusLabel === 'Assigned' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {bridge.StatusLabel || "Pending"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm">
                    <div>
                      <span className="text-xs font-medium text-gray-400 block mb-0.5">Customer Name</span>
                      <span className="text-gray-800 font-medium">{bridge.address?.full_name || "—"}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-400 block mb-0.5">Assigned Tailor</span>
                      <span className="text-gray-700">{bridge.ServiceTitle || "—"}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigate("./bridgefulldetails")}
                      className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
                    >
                      <Eye size={16} />
                      View Full Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400 font-medium px-4">
                No Customer Bridge Records Found
              </div>
            )}
          </div>

          {/* PAGINATION PANEL FOOTER */}
          {filteredBridges.length > 0 && (
            <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between mt-auto">
              <div className="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-left">
                Showing <span className="font-semibold text-gray-800">{indexOfFirstRecord + 1}</span> to{" "}
                <span className="font-semibold text-gray-800">
                  {indexOfLastRecord > filteredBridges.length ? filteredBridges.length : indexOfLastRecord}
                </span>{" "}
                of <span className="font-semibold text-gray-800">{filteredBridges.length}</span> entries
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:hover:bg-white cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="text-xs sm:text-sm font-semibold text-gray-700 min-w-[70px] text-center">
                  Page {currentPage} / {totalPages}
                </div>
                
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:hover:bg-white cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default BridgeDetails;