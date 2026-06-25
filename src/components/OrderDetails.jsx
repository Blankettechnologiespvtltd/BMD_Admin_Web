import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const [showForm, setShowForm] = useState(false); 
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState("");
  const [bridges, setBridges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: [],
  });

  const navigate = useNavigate();

  
  const fetchBridges = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
     
      const response = await axios.get(
        "http://192.168.1.29:8000/api/v1/order", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data?.data || response.data?.bridges || response.data || [];
      setBridges(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Order fetch error:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
      }
      setBridges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBridges();
  }, []);

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
      bridge.bridge_id?.toLowerCase().includes(search.toLowerCase()) ||
      bridge.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      bridge.tailor_name?.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      filters.status.length === 0 ||
      filters.status.includes(bridge.status);

    return searchMatch && statusMatch;
  });

  return (
    <>
      <div
        className={`p-5 w-full min-h-screen bg-gray-100 transition-all duration-300 ${
          showForm ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Header  */}
        <div className="bg-teal-700 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customer Bridge</h1>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-full border-2 outline-none text-gray-100 placeholder-gray-100"
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
                      onClick={() =>
                        setOpenFilter(openFilter === "status" ? "" : "status")
                      }
                    >
                      <span className="text-black font-semibold">Status</span>
                      <span className="text-black">▼</span>
                    </div>
                    {openFilter === "status" &&
                      ["Shipped", "Confirmed" ,"Pending", "Delivered", "Cancelled",].map((item) => (
                        <label key={item} className="flex justify-between mt-2">
                          <span className="text-black">{item}</span>
                          <input
                            type="checkbox"
                            checked={filters.status.includes(item)}
                            onChange={() => handleFilter("status", item)}
                            className="accent-green-600"
                          />
                        </label>
                      ))}
                  </div>
                  
                  <button
                    onClick={resetFilters}
                    className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Add Bridge Button */}
          <button
            onClick={() => navigate("")}
            className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition duration-300"
          >
            + Add Bridge
          </button>
        </div>

        {/* Table Area  */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-4">BRIDGE ID</th>
                <th className="p-4">CUSTOMER NAME</th>
                <th className="p-4">ASSIGNED TAILOR</th>
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
              ) : filteredBridges.length > 0 ? (
                filteredBridges.map((bridge) => (
                  <tr key={bridge.bridge_id} className="border-b hover:bg-gray-50 text-center">
                    <td className="p-4 font-semibold text-slate-700">{bridge.bridge_id}</td>
                    <td className="p-4">{bridge.customer_name || "-"}</td>
                    <td className="p-4">{bridge.tailor_name || "-"}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        bridge.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        bridge.status === 'Assigned' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {bridge.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/bridge-details/${bridge.bridge_id}`, { state: { bridge } })}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500 font-medium">
                    No Customer Bridge Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
 