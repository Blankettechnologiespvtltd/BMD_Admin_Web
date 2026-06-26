
import React, { useState, useEffect } from "react";
import AddTailor from "./AddTailor";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TailorDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState("");
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    verify: [],
    status: [],
    role: [],
  });

  const navigate = useNavigate();

  const fetchTailors = async () => {
    try {
      setLoading(true);
      // const token = localStorage.getItem("token");
      const token = localStorage.getItem("access_token");
      console.log("Current Admin Token:", token);

      if (!token) {
        console.error("Authorization Token missing from localStorage!");
      }

      const response = await axios.get(
        "http://192.168.1.29:8000/api/v1/admin/tailors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response received:", response.data);

      // Your Swagger documentation shows the response is a direct array: [ { tailor_id: ... }, ... ]
      const data = response.data;
      setTailors(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Tailor fetch error details:", error.response || error);

      if (error.response?.status === 401) {
        alert("Session unauthorized or expired. Please login again as Admin.");
        localStorage.removeItem("token");
        // navigate("/login"); // Uncomment this if you have a login route setup
      }

      setTailors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTailors();
    const refresh = () => fetchTailors();
    window.addEventListener("tailor-added", refresh);
    return () => {
      window.removeEventListener("tailor-added", refresh);
    };
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

  return (
    <>
      <div
        className={`p-5 w-full min-h-screen bg-gray-100 transition-all duration-300 ${
          showForm ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Header  */}
        <div className="bg-teal-700 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tailor Dashboard</h1>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-full border border-teal-600 outline-none text-gray-800 placeholder-gray-400 bg-white"
            />
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
              >
                <Filter size={18} />
                <span className="font-medium">Filters</span>
                {(filters.verify.length ||
                  filters.status.length ||
                  filters.role.length) && (
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                )}
              </button>
              
              {showFilter && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border p-4 z-50">
                  <div className="border-b pb-2 mb-2">
                    <div
                      className="flex justify-between cursor-pointer"
                      onClick={() =>
                        setOpenFilter(openFilter === "verify" ? "" : "verify")
                      }
                    >
                      <span className="text-black font-semibold">Verify</span>
                      <span className="text-black">▼</span>
                    </div>
                    {openFilter === "verify" &&
                      ["Verified", "Pending"].map((item) => (
                        <label key={item} className="flex justify-between mt-2">
                          <span className="text-black">{item}</span>
                          <input
                            type="checkbox"
                            checked={filters.verify.includes(item)}
                            onChange={() => handleFilter("verify", item)}
                            className="accent-green-600"
                          />
                        </label>
                      ))}
                  </div>

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
                      ["Active", "Inactive"].map((item) => (
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

                  <div>
                    <div
                      className="flex justify-between cursor-pointer"
                      onClick={() =>
                        setOpenFilter(openFilter === "role" ? "" : "role")
                      }
                    >
                      <span className="text-black font-semibold">Role</span>
                      <span className="text-black">▼</span>
                    </div>
                    {openFilter === "role" &&
                      ["Tailor", "Vender"].map((item) => (
                        <label key={item} className="flex justify-between mt-2">
                          <span className="text-black">{item}</span>
                          <input
                            type="checkbox"
                            checked={filters.role.includes(item)}
                            onChange={() => handleFilter("role", item)}
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
          
          {/* Add Tailor Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition duration-300"
          >
            + Add
          </button>
        </div>

        {/* Table Area  */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="p-4">Tailor ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-teal-700 font-medium animate-pulse">
                    Loading Tailors...
                  </td>
                </tr>
              ) : filteredTailors.length > 0 ? (
                filteredTailors.map((tailor) => (
                  <tr key={tailor.tailor_id} className="border-b hover:bg-gray-50 text-center text-gray-800">
                    <td className="p-4 font-semibold">{tailor.tailor_id}</td>
                    <td className="p-4">{tailor.full_name || "-"}</td>
                    <td className="p-4">{tailor.email || "-"}</td>
                    <td className="p-4">{tailor.mobile || "-"}</td>
                    <td className="p-4">
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
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No Tailors Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Block */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4 py-8">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="relative z-50 w-full max-w-4xl max-h-[90vh] flex flex-col">
            <button
              onClick={() => setShowForm(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white text-lg font-bold shadow-lg z-50 flex items-center justify-center"
            >
              ×
            </button>
            <div className="rounded-2xl overflow-hidden">
              <AddTailor />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TailorDetails;