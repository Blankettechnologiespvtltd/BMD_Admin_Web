
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Hash,
  User,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  ShoppingCart,
  X,
  FileText,
  Scissors,
  Layers,
  Sparkles,
  Edit2,
  Trash2,
  Plus,
  Filter
} from "lucide-react";
 
// ─── Constants & Configuration ──────────────────────────────────────────────
 
// const API_ENDPOINT = "http://192.168.1.29:8000/api/v1/admin/orders";
const API_ENDPOINT = "https://web-production-efff7.up.railway.app/api/v1/admin/orders";

const api = axios.create();
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "tailor_assigned",
  "in_progress",
  "shipped",
  "delivered",
  "cancelled"
];
 
const validators = {
  address_id: (v) => (!v ? "Please select or provide an address ID" : ""),
  service_id: (v) => (!v ? "Please select or provide a service ID" : ""),
  cloth_details: (v) => (!v || v.trim().length < 3 ? "Cloth details are required (min 3 chars)" : ""),
  customization_notes: (v) => (!v || v.trim().length < 3 ? "Customization requirements are required" : ""),
};
 
const INIT_FORM = {
  address_id: "",
  service_id: "",
  cloth_details: "",
  customization_notes: "",
  description: "",
  fabric_notes: "",
  measurement_id: "",
  measurement_option: "self",
  payment_method: "online",
  urgency_level: "standard",
  status: "pending"
};
 
// ─── Shared InputField Component (Original) ──────────────────────────────────
 
const InputField = ({
  icon: Icon,
  name,
  label,
  placeholder,
  value,
  type = "text",
  onChange,
  error,
  showErrors,
  disabled = false,
}) => {
  const hasError = showErrors && !!error;
  const isSuccess = showErrors && !error && value && String(value).trim() !== "";
 
  return (
<div className="flex flex-col gap-1.5">
<label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
        {label} {name !== "description" && name !== "fabric_notes" && name !== "measurement_id" && name !== "status" && <span className="text-red-600 font-bold">*</span>}
</label>
<div className="relative">
<span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
          ${hasError ? "text-red-600" : isSuccess ? "text-[#006B6B]" : "text-gray-400"}`}
>
<Icon size={17} />
</span>
<input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete="off"
          className={`w-full h-11 pl-11 pr-10 text-sm rounded-xl border-2 outline-none transition-all
            placeholder:text-gray-400
            ${disabled ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed" : "bg-gray-50 focus:bg-white"}
            ${hasError ? "border-red-500 bg-red-50/20 focus:border-red-600" : isSuccess ? "border-[#006B6B] focus:border-[#007A7A]" : "border-gray-300 focus:border-[#006B6B]"}`}
        />
<span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {hasError && <XCircle size={16} className="text-red-600" />}
          {isSuccess && <CheckCircle2 size={16} className="text-[#007A7A]" />}
</span>
</div>
      {hasError && (
<p className="text-xs text-red-600 flex items-center gap-1 mt-0.5 animate-fadeIn">
<AlertCircle size={12} className="shrink-0" /> {error}
</p>
      )}
</div>
  );
};
 
// ─── Shared SectionHeader Component (Original) ────────────────────────────────
 
const SectionHeader = ({ icon: Icon, title, subtitle }) => (
<div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 border border-teal-100">
<Icon size={20} className="text-[#0A8C8C]" />
</div>
<div>
<h3 className="font-bold text-gray-800 text-base leading-tight">{title}</h3>
<p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
</div>
</div>
</div>
);
 
// ─── Field mapping helpers ───────────────────────────────────────────────────
// The backend list/detail responses use PascalCase keys (ClothDetails,
// CustomizationNotes, AddressId, ServiceId, MeasurementId, UrgencyLevel,
// Status, StatusLabel, PaymentStatusLabel, AmountDisplay...). The
// create/update payload this form sends is snake_case (address_id,
// service_id, cloth_details...). These two helpers keep that boundary
// explicit instead of guessing field names inline all over the component.
 
const mapApiOrderToFormFields = (order) => ({
  address_id: order.AddressId ?? "",
  service_id: order.ServiceId ?? "",
  cloth_details: order.ClothDetails || "",
  customization_notes: order.CustomizationNotes || "",
  description: order.Description || "",
  fabric_notes: order.FabricNotes || "",
  measurement_id: order.MeasurementId ?? "",

  measurement_option: "self",
  payment_method: "online",
  urgency_level: order.UrgencyLevel || "standard",
  status: order.Status || "pending",
});
 
const getStatusBadge = (statusStr) => {
  const s = String(statusStr || "").toLowerCase();
  if (s.includes("deliv")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s.includes("cancel")) return "bg-rose-50 text-rose-700 border-rose-200";
  if (s.includes("ship")) return "bg-blue-50 text-blue-700 border-blue-200";
  if (s.includes("tailor_assigned") || s.includes("assigned")) return "bg-indigo-50 text-indigo-700 border-indigo-200";
  if (s.includes("progress")) return "bg-blue-50 text-blue-700 border-blue-200";
  if (s.includes("confirm")) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
};
 
// ─── Main Integrated Component ──────────────────────────────────────────────
 
export default function OrderFullDetails() {

  const [orders, setOrders] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 50 });
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState(null);
 
  const [viewMode, setViewMode] = useState("list"); // "list" | "form"
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INIT_FORM);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
const navigate = useNavigate();
  const fileInputRef = useRef(null);
 

  const fetchOrders = async () => {
    setFetching(true);
    setFetchError(null);
    try {
      const res = await api.get(API_ENDPOINT);
      const data = res.data || {};
      const list = Array.isArray(data.orders) ? data.orders : [];
      setOrders(list);
      setMeta({ total: data.total ?? list.length, page: data.page ?? 1, limit: data.limit ?? 50 });
      localStorage.setItem("bridge_orders_cache", JSON.stringify({ orders: list, total: data.total, page: data.page, limit: data.limit }));
    } catch (err) {
      const cached = localStorage.getItem("bridge_orders_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        setOrders(parsed.orders || []);
        setMeta({ total: parsed.total ?? (parsed.orders || []).length, page: parsed.page ?? 1, limit: parsed.limit ?? 50 });
      }
      if (err.response?.status === 401 || err.response?.status === 403) {
        setFetchError("Session expired or unauthorized — please log in again.");
      } else {
        setFetchError("Could not reach the order service — showing last cached data.");
      }
    } finally {
      setFetching(false);
    }
  };
 
  useEffect(() => {
    fetchOrders();
  }, []);
 
  const onChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = (name === "address_id" || name === "service_id" || name === "measurement_id") && value !== ""
      ? Number(value) || value
      : value;
 
    setForm((p) => ({ ...p, [name]: formattedValue }));
    setErrors((p) => ({ ...p, [name]: validators[name]?.(value) || "" }));
  };
 
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };
 
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };
 
  const runFormValidation = () => {
    const localErrors = {};
    Object.keys(validators).forEach((key) => {
      const errorMsg = validators[key]?.(form[key]) || "";
      if (errorMsg) localErrors[key] = errorMsg;
    });
    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    const isFormValid = runFormValidation();
 
    if (!isFormValid) return;
    setLoading(true);
    setStatus(null);
 
   
    const payload = {};
    Object.keys(form).forEach((key) => {
      const value = form[key];
      if (typeof value === "string" && value.trim() === "") return;
      if (value === undefined || value === null) return;
      payload[key] = value;
    });
 
    if (payload.address_id) payload.address_id = Number(payload.address_id);
    if (payload.service_id) payload.service_id = Number(payload.service_id);
    if (payload.measurement_id) payload.measurement_id = Number(payload.measurement_id);
    else delete payload.measurement_id;
    payload.image_references = [];
 
    try {
      if (editingId) {
        await api.put(`${API_ENDPOINT}/${editingId}`, payload);
        setStatus("success");
        setMsg(`Order ID: ${editingId} updated successfully.`);
      } else {
        const res = await api.post(API_ENDPOINT, payload, {
          headers: { "Content-Type": "application/json" },
        });
        setStatus("success");
        setMsg(`Order created successfully! Code: ${res.data.OrderCode || res.data.OrderNumber || ""}`);
      }
    
      await fetchOrders();
      reset();
      setViewMode("list");
    } catch (err) {
      setStatus("error");
      setMsg(editingId ? "Could not update this order. Please try again." : "Could not create this order. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`${API_ENDPOINT}/${id}`);
      setStatus("success");
      setMsg("Order record removed from database registry.");
      await fetchOrders();
    } catch (err) {
      setStatus("error");
      setMsg("Could not delete this order. Please try again.");
    }
  };
 
  const triggerOpenEdit = (order) => {
    setForm(mapApiOrderToFormFields(order));
    setEditingId(order.Id);
    setImagePreviews([]);
    setImages([]);
    setViewMode("form");
  };
 
  const reset = () => {
    setForm(INIT_FORM);
    setErrors({});
    setShowErrors(false);
    setImages([]);
    setImagePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
 
  const filteredOrders = filterStatus === "all"
    ? orders
    : orders.filter(o => String(o.Status).toLowerCase() === filterStatus.toLowerCase());
 
  return (
<div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-6 relative p-2">
     
<div className="bg-[#0A8C8C] px-8 py-6 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h2 className="text-xl font-bold"> Order Details</h2>
<p className="text-teal-100 text-xs mt-1">Customer places an order with address, service, and requirement notes/images</p>

</div>

</div>
 
      {fetchError && (
<div className="rounded-xl px-4 py-3.5 mx-4 mt-4 text-xs font-semibold flex items-center gap-3 border-2 bg-amber-50 text-amber-800 border-amber-200">
<AlertCircle size={18} className="text-amber-500 shrink-0" />
<span className="flex-1">{fetchError}</span>
<button type="button" onClick={fetchOrders} className="underline font-bold">Retry</button>
</div>
      )}
 
      {status && (
<div className={`rounded-xl px-4 py-3.5 mx-4 mt-4 text-xs font-semibold flex items-center gap-3 border-2
          ${status === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
>
          {status === "success" ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <XCircle size={18} className="text-red-500 shrink-0" />}
<span className="flex-1">{msg}</span>
<button type="button" onClick={() => setStatus(null)} className="text-gray-500 hover:text-gray-600">
<X size={16} />
</button>
</div>
      )}
 
      {/* ─── MODE 1: ORDERS TABLE GRID VIEW ─── */}
      {viewMode === "list" && (
<div className="p-4">
<div className="p-4 bg-gray-50/50 border-b border-gray-100 rounded-xl flex flex-wrap items-center justify-between gap-3 mb-4">
<span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">Filter Workflow:</span>
<div className="flex flex-wrap gap-1.5">
<button onClick={() => setFilterStatus("all")} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${filterStatus === "all" ? "bg-[#007A7A] text-white" : "bg-white text-gray-600 border"}`}>All ({orders.length})</button>
              {STATUS_OPTIONS.map(st => {
                const count = orders.filter(o => String(o.Status).toLowerCase() === st.toLowerCase()).length;
                return (
<button key={st} onClick={() => setFilterStatus(st)} className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${filterStatus === st ? "bg-[#007A7A] text-white" : "bg-white text-gray-600 border"}`}>{st.replace("_", " ")} ({count})</button>
                );
              })}
</div>
</div>
 
          <div className="overflow-x-auto rounded-xl border border-gray-100">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
<th className="py-3 px-5">System Order Code</th>
<th className="py-3 px-5">Fabric & Style Specifications</th>
<th className="py-3 px-5">Service / Address</th>
<th className="py-3 px-5">Payment</th>
<th className="py-3 px-5">Active Status</th>
<th className="py-3 px-5 text-right">Actions Matrix</th>
</tr>
</thead>
<tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                {fetching ? (
<tr>
<td colSpan={6} className="p-8 text-center text-gray-400 font-medium">Loading orders…</td>
</tr>
                ) : filteredOrders.length === 0 ? (
<tr>
<td colSpan={6} className="p-8 text-center text-gray-400 font-medium">No order data rows matched this active filter parameter.</td>
</tr>
                ) : (
                  filteredOrders.map((order) => (
<tr key={order.Id} className="hover:bg-slate-50/50 transition-colors">
<td className="py-3 px-5 font-mono font-bold text-gray-900">{order.OrderCode || order.OrderNumber}</td>
<td className="py-3 px-5">
<div className="font-bold text-gray-800">{order.ClothDetails || "—"}</div>
<div className="text-gray-400 text-[11px] font-medium">{order.CustomizationNotes || "No customization notes"}</div>
</td>
<td className="py-3 px-5 font-semibold text-gray-500">
                        {order.ServiceTitle || order.ServiceName || "Service"}
<span className="block text-[10px] uppercase font-bold text-[#0A8C8C]">{order.UrgencyLevel}</span>
                        {order.address?.city && <span className="block text-[10px] text-gray-400 normal-case font-medium">{order.address.city}, {order.address.state}</span>}
</td>
<td className="py-3 px-5">
<div className="font-bold text-gray-800">{order.AmountDisplay}</div>
<div className="text-[10px] text-gray-400 font-medium">{order.PaymentStatusLabel}</div>
</td>
<td className="py-3 px-5">
<span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getStatusBadge(order.Status)}`}>
                          {order.StatusLabel || order.Status}
</span>
</td>
<td className="py-3 px-5 text-right">
<div className="flex items-center justify-end gap-1.5">
{/* <button onClick={() => triggerOpenEdit(order)} className="p-1.5 text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-all"><Edit2 size={12} /></button> */}
<button
  onClick={() =>
    navigate("/orderfulldetails", {
      state: { order },
    })
  }
  className="p-1.5 text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-all"
>
  <Edit2 size={12} />
</button>
<button onClick={() => handleDelete(order.Id)} className="p-1.5 text-rose-600 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 transition-all"><Trash2 size={12} /></button>
</div>
</td>
</tr>
                  ))
                )}
</tbody>
</table>
</div>
          {meta.total > 0 && (
<p className="text-[11px] text-gray-400 font-medium mt-3 px-1">Showing {filteredOrders.length} of {meta.total} total orders (page {meta.page})</p>
          )}
</div>
      )}
 
     
     
</div>
  );
}