
import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import api from '../../services/api'; 

export default function CategoryCatalog() {
  // --- STATES ---
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState("");

  // Advanced Filter state matching reference structure
  const [filters, setFilters] = useState({
    status: [], // e.g., 'active', 'inactive'
  });

  // Form Fields State
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(true);

  // --- FETCH OPERATIONS ---
  const fetchCategoriesTree = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("No access token found! Redirecting...");
        localStorage.clear();
        window.location.replace("/");
        return;
      }

      const response = await api.get('/catalog/categories/tree');
      
      const parsedCategories = (response.data.categories || response.data || []).map(cat => ({
        ...cat,
        status: cat.status !== undefined ? cat.status : true
      }));
      
      setCategories(parsedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.replace("/");
        return;
      }
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesTree();
  }, []);

  // --- FILTER HANDLERS ---
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

  // --- HANDLE FILE CHANGE ---
  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // --- FORM SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Category Title required!");

    const formData = new FormData();
    formData.append('name', title);
    formData.append('status', status);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await api.post('/catalog/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Category added successfully!");
      
      setShowForm(false);
      fetchCategoriesTree();
      
      setTitle("");
      setImageFile(null);
      setStatus(true);
    } catch (error) {
      console.error("Error adding category, falling back to local simulation:", error);
      
      const mockNewCategory = {
        id: Date.now(),
        name: title,
        image_url: imageFile ? URL.createObjectURL(imageFile) : "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=80",
        service_lines: [],
        status: status
      };

      setCategories([...categories, mockNewCategory]);
      setShowForm(false);
      setTitle("");
      setImageFile(null);
      setStatus(true);
    }
  };

  // --- DELETE OPERATION ---
  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        setCategories(categories.filter(cat => cat.id !== id));
      } catch (err) {
        alert("Failed to delete category.");
      }
    }
  };

  // --- SEARCH AND FILTER LOGIC ---
  const filteredCategories = categories.filter((item) => {
    const searchMatch = item.name?.toLowerCase().includes(search.toLowerCase());
    const itemStatusString = item.status ? "active" : "inactive";
    const statusMatch = filters.status.length === 0 || filters.status.includes(itemStatusString);
    return searchMatch && statusMatch;
  });

  return (
    <div className="p-3 sm:p-5 w-full min-h-screen bg-gray-100 transition-all duration-300">
      
      {/* --- HEADER BANNER CONTROL BLOCK --- */}
      <div className="bg-[#0A8C8C] text-white p-4 rounded-lg shadow-md mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold w-full lg:w-auto text-left">
          {showForm ? "Add New Category" : "Category Dashboard"}
        </h1>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {!showForm && (
            <>
              {/* Responsive Search Box */}
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 rounded-full  text-gray-700 placeholder-gray-400 bg-white text-sm w-full sm:w-48 md:w-64 focus:border-teal-300 transition-all"
              />
              
              {/* Responsive Filter Dropdown */}
              <div className="relative w-full sm:w-auto">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all w-full sm:w-auto text-sm font-medium"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                  {filters.status.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </button>
                
                {showFilter && (
                  <div className="absolute right-0 left-0 sm:left-auto mt-2 w-full sm:w-72 bg-white rounded-xl shadow-xl border p-4 z-50">
                    <div className="border-b pb-2 mb-2">
                      <div
                        className="flex justify-between cursor-pointer items-center"
                        onClick={() => setOpenFilter(openFilter === "status" ? "" : "status")}
                      >
                        <span className="text-black font-semibold text-sm">Status</span>
                        <span className="text-black text-xs">▼</span>
                      </div>
                      {openFilter === "status" &&
                        ["Active", "Inactive"].map((item) => (
                          <label key={item} className="flex justify-between items-center mt-2 cursor-pointer">
                            <span className="text-black text-sm">{item}</span>
                            <input
                              type="checkbox"
                              checked={filters.status.includes(item.toLowerCase())}
                              onChange={() => handleFilter("status", item.toLowerCase())}
                              className="accent-green-600 w-4 h-4"
                            />
                          </label>
                        ))}
                    </div>
                    
                    <button
                      onClick={resetFilters}
                      className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Add / View Switcher Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-black px-5 py-2 rounded-lg font-semibold text-sm transition duration-300 hover:bg-gray-100 shadow-sm text-center w-full sm:w-auto whitespace-nowrap"
          >
            {showForm ? "View List" : "+ Add Category"}
          </button>
        </div>
      </div>

      {/* --- A. VIEW CATEGORIES VIEW --- */}
      {!showForm && (
        <div>
          {/* 1. MOBILE/TABLET CARD VIEW (Visible only on screens below 'md') */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {loading ? (
              <div className="col-span-full text-center py-12 text-[#0A8C8C] font-medium animate-pulse">
                Loading Category Catalog...
              </div>
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((cat, index) => (
                <div key={cat.id || index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-col justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={cat.image_url || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=80"} 
                      alt={cat.name} 
                      className="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm bg-gray-50 shrink-0"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=80"; }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-400">#{index + 1}</p>
                      <h3 className="font-semibold text-gray-900 truncate">{cat.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{cat.service_lines?.length || 0} Service Lines</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold self-start ${
                      cat.status ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {cat.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-2 border-t border-gray-100 text-sm font-medium">
                    <button 
                      onClick={() => alert("Please Login")} 
                      className="text-[#0A8C8C] hover:text-[#087c7c]"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteCategory(cat.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-lg border text-gray-500 font-medium">
                No Categories Found in Catalog
              </div>
            )}
          </div>

          {/* 2. DESKTOP TABLE VIEW (Visible only from 'md' screens and up) */}
          <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <table className="w-full border-collapse">
              <thead className="bg-[#0A8C8C] text-white">
                <tr className="text-center text-sm tracking-wider">
                  <th className="p-4 w-16">S.NO</th>
                  <th className="p-4 text-left pl-6">CATEGORY TITLE</th>
                  <th className="p-4">IMAGE THUMBNAIL</th>
                  <th className="p-4">SUB-SERVICES COUNT</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-[#0A8C8C] font-medium animate-pulse">
                      Loading Category Catalog...
                    </td>
                  </tr>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, index) => (
                    <tr key={cat.id || index} className="border-b last:border-b-0 hover:bg-gray-50 text-center transition-colors">
                      <td className="p-4 font-semibold text-slate-500">{index + 1}</td>
                      <td className="p-4 font-medium text-gray-900 text-left pl-6">{cat.name}</td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <img 
                            src={cat.image_url || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=80"} 
                            alt={cat.name} 
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm bg-gray-100"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=80"; }}
                          />
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {cat.service_lines?.length || 0} Service Lines
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          cat.status ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {cat.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-3 font-medium">
                          <button 
                            onClick={() => alert("Please Login")} 
                            className="text-[#0A8C8C] hover:text-[#087c7c] transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteCategory(cat.id)} 
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500 font-medium">
                      No Categories Found in Catalog
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- B. DYNAMIC ADD CATEGORY FORM FLOW --- */}
      {showForm && (
        <div className="w-full max-w-2xl bg-white p-4 sm:p-8 rounded-xl shadow-md border border-gray-100 mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 border-b pb-3">Add New Category Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Men's Wear, Bridal"
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-2.5 text-sm focus:ring-2 focus:ring-[#0A8C8C] focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload Category Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-xs sm:text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 sm:file:py-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0A8C8C] hover:file:bg-indigo-100 cursor-pointer"
              />
              {imageFile && (
                <p className="text-xs text-green-600 font-medium mt-1">✓ Ready: {imageFile.name}</p>
              )}
            </div>

            <div className="border-t pt-4 flex items-center justify-between">
              <div className="pr-2">
                <p className="text-sm font-semibold text-gray-800">Status</p>
                <p className="text-xs text-gray-500">Enable or disable category visibility</p>
              </div>
              <input 
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="w-5 h-5 accent-[#0A8C8C] cursor-pointer shrink-0"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-[#0A8C8C] text white font-semibold rounded-lg text-xs sm:text-sm hover:bg-[#087c7c] transition-colors shadow-sm"
              >
                Save Category
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

