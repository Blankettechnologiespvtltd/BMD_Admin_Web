 
import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import api from "../../services/api";

export default function ServiceCatalog() {
  // --- States ---
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState("");
  
  // Advanced Filter state matching reference structure
  const [filters, setFilters] = useState({
    category: [],
  });

  // Form Fields State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("mens");
  const [basePrice, setBasePrice] = useState("");
  const [images, setImages] = useState([]);

  // Dynamic Section States
  const [serviceType, setServiceType] = useState("normal"); // 'normal' or 'designer'
  const [designerStitching, setDesignerStitching] = useState(false);
  const [designerPrice, setDesignerPrice] = useState("");

  // --- Fetch Stitching Types (Table Data) ---
  const fetchServices = async () => {
    try {
      setLoading(true);

      // Auth Token Validation
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found! Redirecting...");
        localStorage.clear();
        window.location.replace("/");
        return;
      }
      
      const response = await api.get("/catalog/services");
      console.log("Services API Response:", response.data);
      setServices(response.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.replace("/");
        return;
      }
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // --- Filter Handlers ---
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
      category: [],
    });
  };

  // --- Handle Multi-file Selection ---
  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  // --- Form Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("category_name", category);
    formData.append("base_price", basePrice);
    formData.append("service_type", serviceType);

    if (serviceType === "designer") {
      formData.append("designer_stitching", designerStitching);
      if (designerStitching) {
        formData.append("designer_price", designerPrice);
      }
    }

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await api.post("/catalog/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Service added successfully!");
      
      setShowForm(false);
      fetchServices();
      
      // Clear Inputs
      setTitle(""); setDescription(""); setBasePrice(""); setImages([]);
      setServiceType("normal"); setDesignerStitching(false); setDesignerPrice("");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Something went wrong!");
    }
  };

  // --- Search and Multi-checkbox Filtering ---
  const filteredServices = services.filter((item) => {
    const searchMatch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.category_name?.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      filters.category.length === 0 ||
      filters.category.includes(item.category_name?.toLowerCase());

    return searchMatch && categoryMatch;
  });

  return (
    <div className={`p-3 md:p-6 w-full min-h-screen bg-gray-100 transition-all duration-300 ${showForm ? "blur-none" : ""}`}>
      
      {/* --- HEADER BANNER CONTROL BLOCK --- */}
      <div className="bg-[#0A8C8C] text-white p-4 rounded-lg shadow-md mb-6 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left whitespace-nowrap">
          {showForm ? "Add New Service" : "Services Dashboard"}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full lg:w-auto">
          {!showForm && (
            <>
              {/* Search Box */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 rounded-full  outline-none text-gray-700 placeholder-gray-400 bg-white text-sm w-full sm:w-48 md:w-64  transition-all"
              />
              
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-2 bg-white text-gray-700 px-3 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-sm"
                >
                  <Filter size={16} />
                  <span className="font-medium">Filters</span>
                  {filters.category.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </button>
                
                {showFilter && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border p-4 z-50">
                    <div className="border-b pb-2 mb-2">
                      <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => setOpenFilter(openFilter === "category" ? "" : "category")}
                      >
                        <span className="text-black font-semibold text-sm">Category</span>
                        <span className="text-black text-xs">▼</span>
                      </div>
                      {openFilter === "category" &&
                        ["Mens", "Women", "Kids", "Custom"].map((item) => (
                          <label key={item} className="flex justify-between mt-2 cursor-pointer text-sm">
                            <span className="text-black">{item}</span>
                            <input
                              type="checkbox"
                              checked={filters.category.includes(item.toLowerCase())}
                              onChange={() => handleFilter("category", item.toLowerCase())}
                              className="accent-green-600"
                            />
                          </label>
                        ))}
                    </div>
                    
                    <button
                      onClick={resetFilters}
                      className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg text-sm"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Toggle Add / View List View Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm transition duration-300 hover:bg-gray-100 whitespace-nowrap"
          >
            {showForm ? "View List" : "+ Add"}
          </button>
        </div>
      </div>

      {/* --- A. VIEW SERVICES TABLE VIEW --- */}
      {!showForm && (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full">
            <table className="w-full table-fixed md:table-auto">
              <thead className="bg-[#0A8C8C] text-white">
                <tr className="text-center text-xs md:text-sm">
                  <th className="p-2 md:p-4 w-[12%] md:w-auto">S.NO</th>
                  <th className="p-2 md:p-4 text-left w-[40%] md:w-auto">SERVICE TITLE</th>
                  <th className="p-2 md:p-4 w-[18%] md:w-auto">CATEGORY</th>
                  <th className="p-2 md:p-4 w-[15%] md:w-auto">PRICE</th>
                  <th className="p-2 md:p-4 w-[15%] md:w-auto">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-[#0A8C8C] font-medium animate-pulse text-sm">
                      Loading Service Catalog...
                    </td>
                  </tr>
                ) : filteredServices.length > 0 ? (
                  filteredServices.map((item, index) => (
                    <tr key={item.service_id || index} className="border-b hover:bg-gray-50 text-center text-xs md:text-sm">
                      <td className="p-2 md:p-4 font-semibold text-slate-700">{index + 1}</td>
                      <td className="p-2 md:p-4 font-medium text-gray-900 text-left break-words whitespace-normal">
                        {item.name}
                      </td>
                      <td className="p-2 md:p-4 capitalize truncate">{item.category_name || "N/A"}</td>
                      <td className="p-2 md:p-4 font-semibold text-gray-800">₹{item.base_price}</td>
                      <td className="p-2 md:p-4">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-3">
                          <button className="text-[#0A8C8C] hover:text-[#087c7c] font-medium transition">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 font-medium transition">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500 font-medium text-sm">
                      No Services Found in Catalog
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- B. DYNAMIC ADD SERVICE FORM FLOW --- */}
      {showForm && (
        <div className="max-w-3xl bg-white p-4 md:p-8 rounded-xl shadow-md border border-gray-100 mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Add New Service Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Designer Lehenga Stitching"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#0A8C8C] focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write service details here..."
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#0A8C8C] focus:outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-[#0A8C8C] focus:outline-none text-sm"
                >
                  <option value="mens">Mens</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
                <input
                  type="number"
                  required
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#0A8C8C] focus:outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0A8C8C] hover:file:bg-indigo-100 cursor-pointer"
              />
              {images.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">{images.length} files selected</p>
              )}
            </div>

            {/* Service Type Selection Options */}
            <div className="border-t pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Service Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setServiceType("normal")}
                  className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                    serviceType === "normal"
                      ? "border-[#0A8C8C] bg-indigo-50/50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Normal</p>
                    <p className="text-xs text-gray-500">Standard stitching</p>
                  </div>
                  <input
                    type="radio"
                    name="serviceType"
                    checked={serviceType === "normal"}
                    onChange={() => setServiceType("normal")}
                    className="h-4 w-4 text-[#0A8C8C] focus:ring-[#0A8C8C]"
                  />
                </div>

                <div
                  onClick={() => setServiceType("designer")}
                  className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                    serviceType === "designer"
                      ? "border-[#0A8C8C] bg-indigo-50/50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Designer</p>
                    <p className="text-xs text-gray-500">Premium customization options</p>
                  </div>
                  <input
                    type="radio"
                    name="serviceType"
                    checked={serviceType === "designer"}
                    onChange={() => setServiceType("designer")}
                    className="h-4 w-4 text-[#0A8C8C] focus:ring-[#0A8C8C]"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Sliding Toggle Flow */}
            {serviceType === "designer" && (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl space-y-4 transition-all duration-300">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <label className="text-sm font-medium text-gray-800 block">Designer Stitching</label>
                    <span className="text-xs text-gray-500">Enable premium customization flow</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDesignerStitching(!designerStitching)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      designerStitching ? "bg-[#0A8C8C]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        designerStitching ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {designerStitching && (
                  <div className="transition-all duration-300">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designer Price (₹)</label>
                    <input
                      type="number"
                      required={designerStitching}
                      value={designerPrice}
                      onChange={(e) => setDesignerPrice(e.target.value)}
                      placeholder="Enter premium tier price"
                      className="w-full border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-[#0A8C8C] focus:outline-none text-sm"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full sm:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 px-5 rounded-lg font-medium text-sm text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#0A8C8C] hover:bg-[#087575] text-white py-2.5 px-5 rounded-lg font-medium shadow-sm text-sm text-center"
              >
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}