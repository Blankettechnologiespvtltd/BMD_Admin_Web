import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BridgeFullDetails from "./BridgeFullDetails"

const BridgeDetails = () => {
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

    const token = localStorage.getItem("access_token");

    console.log("TOKEN =", token);
    console.log("AUTH HEADER =", `Bearer ${token}`);
    

    if (!token) {
      console.error("No access token found!");
      return;
    }

    const response = await axios.get(
      "https://web-production-efff7.up.railway.app/api/v1/employee/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    console.log("API Response:", response.data);
    console.log(JSON.stringify(response.data, null, 2));

    const data = response.data.orders || [];
    setBridges(data);

  } catch (error) {
    console.error("Bridge fetch error:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Response:", error.response.data);
    }

    if (error.response?.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
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


  // const filteredBridges = bridges.filter((bridge) => {
  //   const searchMatch =
  //     bridge.bridge_id?.toLowerCase().includes(search.toLowerCase()) ||
  //     bridge.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
  //     bridge.tailor_name?.toLowerCase().includes(search.toLowerCase());

  //   const statusMatch =
  //     filters.status.length === 0 ||
  //     filters.status.includes(bridge.status);

  //   return searchMatch && statusMatch;
  // });
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
  return (
    <>
      <div
        className={`p-5 w-full min-h-screen bg-gray-100 transition-all duration-300 ${
          showForm ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Header  */}
        <div className="bg-[#0A8C8C] text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold"> Bridge Dashboard</h1>
          
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
                      ["Pending", "Assigned", "Completed"].map((item) => (
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
            onClick={() => navigate("/addbridge")}
            className="bg-white text-black px-5 py-2 rounded-lg font-semibold transition duration-300"
          >
            + Add 
          </button>
        </div>

        {/* Table Area  */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-[#0A8C8C] text-white">
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
      <td colSpan={5} className="text-center py-10 text-[#0A8C8C] font-medium animate-pulse">
        Loading Bridge Records...
      </td>
    </tr>
  ) : filteredBridges.length > 0 ? (
    filteredBridges.map((bridge) => (
      /* Changed key from bridge.bridge_id to bridge.OrderNumber */
      <tr key={bridge.OrderNumber} className="border-b hover:bg-gray-50 text-center">
        {/* Updated all cells to match your new API response schema */}
        <td className="p-4 font-semibold text-slate-700">{bridge.OrderNumber}</td>
        <td className="p-4">{bridge.address?.full_name || "-"}</td>
        <td className="p-4">{bridge.ServiceTitle || "-"}</td>
        <td className="p-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            bridge.StatusLabel === 'Completed' ? 'bg-green-100 text-green-700' : 
            bridge.StatusLabel === 'Assigned' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {bridge.StatusLabel || "Pending"}
          </span>
        </td>
        <td className="p-4">
          <button
            onClick={() => navigate("./bridgefulldetails")}
            className="bg-white  text-black px-4 py-2 rounded-lg text-sm font-medium"
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

export default BridgeDetails;