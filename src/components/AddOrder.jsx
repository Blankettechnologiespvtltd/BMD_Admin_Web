

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { 
//   Hash, 
//   User, 
//   MapPin, 
//   Image as ImageIcon,
//   CheckCircle2, 
//   XCircle, 
//   AlertCircle,
//   RotateCcw,
//   ShoppingCart,
//   X,
//   FileText,
//   Scissors,
//   Layers,
//   Sparkles,
//   HelpCircle
// } from "lucide-react";

// // ─── Constants & Validators ──────────────────────────────────────────────────
// // Railway URL ko yahan define kiya hai aur niche backticks (``) ka use kiya hai
// // Add this near the top of your OrderDetails.jsx file
// const BASE_URL = "https://web-production-efff7.up.railway.app";
// const API_ENDPOINT = `${BASE_URL}/api/v1/orders`;

// const validators = {
//   address_id: (v) => !v ? "Please select or provide an address ID" : "",
//   service_id: (v) => !v ? "Please select or provide a service ID" : "",
//   cloth_details: (v) => v.trim().length < 3 ? "Cloth details are required (min 3 chars)" : "",
//   customization_notes: (v) => v.trim().length < 3 ? "Customization requirements are required" : "",
// };

// const INIT_FORM = {
//   address_id: "",
//   service_id: "",
//   cloth_details: "",
//   customization_notes: "",
//   description: "",
//   fabric_notes: "",
//   measurement_id: "",
//   measurement_option: "self", // default
//   payment_method: "online",   // default
//   urgency_level: "standard",  // default
// };

// // ─── Shared InputField Component ──────────────────────────────────────────────
// const InputField = ({
//   icon: Icon,
//   name,
//   label,
//   placeholder,
//   value,
//   type = "text",
//   onChange,
//   error,
//   showErrors, 
//   disabled = false,
// }) => {
//   const hasError = showErrors && !!error;
//   const isSuccess = showErrors && !error && value && String(value).trim() !== "";

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
//         {label} {name !== "description" && name !== "fabric_notes" && name !== "measurement_id" && <span className="text-red-600 font-bold">*</span>}
//       </label>
//       <div className="relative">
//         <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
//           ${hasError ? "text-red-600" : isSuccess ? "text-[#006B6B]" : "text-gray-400"}`}
//         >
//           <Icon size={17} />
//         </span>
//         <input
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//           autoComplete="off"
//           className={`w-full h-11 pl-11 pr-10 text-sm rounded-xl border-2 outline-none transition-all
//             placeholder:text-gray-400
//             ${disabled ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed" : "bg-gray-50 focus:bg-white"}
//             ${hasError ? "border-red-500 bg-red-50/20 focus:border-red-600" : isSuccess ? "border-[#006B6B] focus:border-[#007A7A]" : "border-gray-300 focus:border-[#006B6B]"}`}
//         />
//         <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//           {hasError && <XCircle size={16} className="text-red-600" />}
//           {isSuccess && <CheckCircle2 size={16} className="text-[#007A7A]" />}
//         </span>
//       </div>
//       {hasError && (
//         <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5 animate-fadeIn">
//           <AlertCircle size={12} className="shrink-0" /> {error}
//         </p>
//       )}
//     </div>
//   );
// };

// // ─── Shared SectionHeader Component ───────────────────────────────────────────
// const SectionHeader = ({ icon: Icon, title, subtitle, badge }) => (
//   <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
//     <div className="flex items-center gap-3">
//       <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 border border-teal-100">
//         <Icon size={20} className="text-teal-600" />
//       </div>
//       <div>
//         <h3 className="font-bold text-gray-800 text-base leading-tight">{title}</h3>
//         <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
//       </div>
//     </div>
//     {badge}
//   </div>
// );

// // ─── Main CreateOrder Component ────────────────────────────────────────────────
// export default function AddOrder() {
//   const [form, setForm] = useState(INIT_FORM);
//   const [errors, setErrors] = useState({});
//   const [showErrors, setShowErrors] = useState(false); 
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [msg, setMsg] = useState("");

//   const fileInputRef = useRef(null);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     const formattedValue = (name === "address_id" || name === "service_id" || name === "measurement_id") && value !== "" 
//       ? Number(value) || value 
//       : value;

//     setForm((p) => ({ ...p, [name]: formattedValue }));
//     setErrors((p) => ({ ...p, [name]: validators[name]?.(value) || "" }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setImages((prev) => [...prev, ...files]);
//       const newPreviews = files.map(file => URL.createObjectURL(file));
//       setImagePreviews((prev) => [...prev, ...newPreviews]);
//     }
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const runFormValidation = () => {
//     const localErrors = {};
//     Object.keys(validators).forEach((key) => {
//       const errorMsg = validators[key]?.(form[key]) || "";
//       if (errorMsg) localErrors[key] = errorMsg;
//     });
//     setErrors(localErrors);
//     return Object.keys(localErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowErrors(true); 
//     const isFormValid = runFormValidation();

//     if (!isFormValid) return;
    
//     setLoading(true);
//     setStatus(null);

//     try {
//       const payload = {};
      
//       Object.keys(form).forEach((key) => {
//         const value = form[key];
//         if (typeof value === "string" && value.trim() === "") return;
//         if (value === undefined || value === null) return;
//         payload[key] = value;
//       });

//       if (payload.measurement_id) {
//         payload.measurement_id = Number(payload.measurement_id);
//       }
      
//       payload.image_references = []; 

//       const res = await axios.post(API_ENDPOINT, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       setStatus("success");
//       setMsg(`Order created successfully! Code: ${res.data.OrderCode || "N/A"} - ${res.data.DisplayEta}`);
//       reset();
//     } catch (err) {
//       setStatus("error");
//       setMsg(err.response?.data?.detail?.[0]?.msg || "Failed to create order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reset = () => {
//     setForm(INIT_FORM);
//     setErrors({});
//     setShowErrors(false); 
//     setImages([]);
//     setImagePreviews([]);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-6 relative">
      
//       {/* Header Layout */}
//       <div className="bg-[#025e5e] px-8 py-6 text-white relative">
//         <h2 className="text-xl font-bold">Create Order </h2>
//         {/* <p className="text-teal-100 text-xs mt-1">Customer places an order with address, service, and requirement notes/images</p> */}
//       </div>

//       <div className="overflow-y-auto max-h-[75vh]">
//         <div className="p-8 space-y-8">
          
//           {status && (
//             <div className={`rounded-xl px-4 py-3.5 text-sm font-semibold flex items-center gap-3 border-2
//               ${status === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
//             >
//               {status === "success" ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <XCircle size={18} className="text-red-500 shrink-0" />}
//               <span className="flex-1">{msg}</span>
//               <button type="button" onClick={() => setStatus(null)} className="text-gray-500 hover:text-gray-600">
//                 <X size={16} />
//               </button>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
//             {/* 1. Core Order Information */}
//             <div className="space-y-5">
//               <SectionHeader icon={ShoppingCart} title="Order Details" subtitle="Link service, target IDs, and configurations" />
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
//                 {/* Images Upload Area Box */}
//                 {/* <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 h-full min-h-[180px]">
//                   {imagePreviews.length > 0 ? (
//                     <div className="grid grid-cols-2 gap-2 w-full max-h-[150px] overflow-y-auto p-1">
//                       {imagePreviews.map((preview, index) => (
//                         <div key={index} className="relative w-full h-16 rounded-lg overflow-hidden border border-[#006B6B] shadow-sm group">
//                           <img src={preview} alt="Preview" className="w-full h-full object-cover" />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute inset-0 bg-black/50 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-semibold"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div 
//                       onClick={() => fileInputRef.current.click()} 
//                       className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-[#007A7A] transition-colors"
//                     >
//                       <ImageIcon size={36} className="mb-2" />
//                       <span className="text-xs font-bold">Image References</span>
//                       <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG Reference Uploads</span>
//                     </div>
//                   )}
//                   <input 
//                     ref={fileInputRef}
//                     type="file" 
//                     multiple
//                     accept="image/*" 
//                     className="hidden" 
//                     onChange={handleImageChange} 
//                   />
//                 </div> */}

//                 <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <InputField
//                     icon={MapPin}
//                     name="address_id"
//                     type="number"
//                     label="Address ID"
//                     placeholder="e.g. 5"
//                     value={form.address_id}
//                     onChange={onChange}
//                     error={errors.address_id}
//                     showErrors={showErrors}
//                   />
//                   <InputField
//                     icon={Scissors}
//                     name="service_id"
//                     type="number"
//                     label="Service ID"
//                     placeholder="e.g. 101"
//                     value={form.service_id}
//                     onChange={onChange}
//                     error={errors.service_id}
//                     showErrors={showErrors}
//                   />
//                   {/* <InputField
//                     icon={Layers}
//                     name="measurement_id"
//                     type="number"
//                     label="Measurement ID (Optional)"
//                     placeholder="e.g. 12"
//                     value={form.measurement_id}
//                     onChange={onChange}
//                     showErrors={showErrors}
//                   /> */}
                  
//                   {/* Urgency Level Dropdown */}
//                   {/* <div className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold text-gray-600">Urgency Level *</label>
//                     <select
//                       name="urgency_level"
//                       value={form.urgency_level}
//                       onChange={onChange}
//                       className="w-full h-11 px-3 text-sm rounded-xl border-2 border-gray-300 bg-gray-50 outline-none focus:border-[#006B6B] focus:bg-white transition-all text-gray-700"
//                     >
//                       <option value="standard">Standard</option>
//                       <option value="express">Express</option>
//                     </select>
//                   </div> */}
//                 </div>

//               </div>
//             </div>

//             {/* 2. Fabric & Tailoring Notes */}
//             <div className="space-y-5">
//               <SectionHeader icon={Sparkles} title="Customization Specifications" subtitle="Fabric descriptors and tailoring details" />
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <InputField
//                   icon={FileText}
//                   name="cloth_details"
//                   label="Cloth Details"
//                   placeholder="e.g. Blue cotton cloth"
//                   value={form.cloth_details}
//                   onChange={onChange}
//                   error={errors.cloth_details}
//                   showErrors={showErrors}
//                 />
//                 <InputField
//                   icon={FileText}
//                   name="customization_notes"
//                   label="Customization Notes"
//                   placeholder="e.g. Chinese collar"
//                   value={form.customization_notes}
//                   onChange={onChange}
//                   error={errors.customization_notes}
//                   showErrors={showErrors}
//                 />
//               </div>

//               {/* Description Texarea */}
//               {/* <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-semibold text-gray-800">Stitching/Fit Description</label>
//                 <textarea
//                   name="description"
//                   rows={2}
//                   value={form.description}
//                   placeholder="e.g. Need slim fit stitching details..."
//                   onChange={onChange}
//                   className="w-full pl-4 pr-4 py-3 text-sm rounded-xl border-2 border-gray-300 outline-none resize-none transition-all bg-gray-50 focus:bg-white focus:border-[#006B6B]"
//                 />
//               </div> */}

//               {/* Fabric Notes Texarea */}
//               {/* <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-semibold text-gray-800">Fabric Notes</label>
//                 <textarea
//                   name="fabric_notes"
//                   rows={2}
//                   value={form.fabric_notes}
//                   placeholder="e.g. Pure Linen blend style specifications..."
//                   onChange={onChange}
//                   className="w-full pl-4 pr-4 py-3 text-sm rounded-xl border-2 border-gray-300 outline-none resize-none transition-all bg-gray-50 focus:bg-white focus:border-[#006B6B]"
//                 />
//               </div> */}
//             </div>

//             {/* Actions Footer */}
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
//               <p className="text-xs text-gray-400 hidden sm:block">
//                 Fields marked <span className="text-red-400 font-bold">*</span> are mandatory
//               </p>
//               <div className="flex gap-3 w-full sm:w-auto">
//                 <button
//                   type="button"
//                   onClick={reset}
//                   disabled={loading}
//                   className="flex-1 sm:flex-none h-11 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
//                 >
//                   <RotateCcw size={15} /> Reset
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 sm:flex-none h-11 px-8 bg-[#007A7A] hover:bg-[#006B6B] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all"
//                 >
//                   <ShoppingCart size={16} />
//                   {loading ? "Creating Order…" : "Create Order"}
//                 </button>
//               </div>
//             </div>

//           </form>
//         </div>
//       </div>

//     </div>
//   );
// }
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { 
//   Hash, 
//   User, 
//   MapPin, 
//   Image as ImageIcon,
//   CheckCircle2, 
//   XCircle, 
//   AlertCircle,
//   RotateCcw,
//   ShoppingCart,
//   X,
//   FileText,
//   Scissors,
//   Layers,
//   Sparkles,
//   Printer,
//   Eye,
//   Calendar,
//   CheckSquare
// } from "lucide-react";

// // ─── Constants & Validators ──────────────────────────────────────────────────
// const BASE_URL = "https://web-production-efff7.up.railway.app";
// const API_ENDPOINT = `${BASE_URL}/api/v1/orders`;

// const validators = {
//   address_id: (v) => !v ? "Please select or provide an address ID" : "",
//   service_id: (v) => !v ? "Please select or provide a service ID" : "",
//   cloth_details: (v) => !v || v.trim().length < 3 ? "Cloth details are required (min 3 chars)" : "",
//   customization_notes: (v) => !v || v.trim().length < 3 ? "Customization requirements are required" : "",
// };

// const INIT_FORM = {
//   address_id: "",
//   service_id: "",
//   cloth_details: "",
//   customization_notes: "",
//   description: "",
//   fabric_notes: "",
//   measurement_id: "",
//   measurement_option: "self", 
//   payment_method: "online",   
//   urgency_level: "standard",  
// };

// // ─── Shared InputField Component ──────────────────────────────────────────────
// const InputField = ({
//   icon: Icon,
//   name,
//   label,
//   placeholder,
//   value,
//   type = "text",
//   onChange,
//   error,
//   showErrors, 
//   disabled = false,
// }) => {
//   const hasError = showErrors && !!error;
//   const isSuccess = showErrors && !error && value && String(value).trim() !== "";

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
//         {label} {name !== "description" && name !== "fabric_notes" && name !== "measurement_id" && <span className="text-red-600 font-bold">*</span>}
//       </label>
//       <div className="relative">
//         <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
//           ${hasError ? "text-red-600" : isSuccess ? "text-[#006B6B]" : "text-gray-400"}`}
//         >
//           <Icon size={17} />
//         </span>
//         <input
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//           autoComplete="off"
//           className={`w-full h-11 pl-11 pr-10 text-sm rounded-xl border-2 outline-none transition-all
//             placeholder:text-gray-400
//             ${disabled ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed" : "bg-gray-50 focus:bg-white"}
//             ${hasError ? "border-red-500 bg-red-50/20 focus:border-red-600" : isSuccess ? "border-[#006B6B] focus:border-[#007A7A]" : "border-gray-300 focus:border-[#006B6B]"}`}
//         />
//         <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//           {hasError && <XCircle size={16} className="text-red-600" />}
//           {isSuccess && <CheckCircle2 size={16} className="text-[#007A7A]" />}
//         </span>
//       </div>
//       {hasError && (
//         <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5 animate-fadeIn">
//           <AlertCircle size={12} className="shrink-0" /> {error}
//         </p>
//       )}
//     </div>
//   );
// };

// // ─── Shared SectionHeader Component ───────────────────────────────────────────
// const SectionHeader = ({ icon: Icon, title, subtitle, badge }) => (
//   <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
//     <div className="flex items-center gap-3">
//       <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 border border-teal-100">
//         <Icon size={20} className="text-teal-600" />
//       </div>
//       <div>
//         <h3 className="font-bold text-gray-800 text-base leading-tight">{title}</h3>
//         <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
//       </div>
//     </div>
//     {badge}
//   </div>
// );

// // ─── Main CreateOrder Component ────────────────────────────────────────────────
// export default function AddOrder() {
//   const [form, setForm] = useState(INIT_FORM);
//   const [errors, setErrors] = useState({});
//   const [showErrors, setShowErrors] = useState(false); 
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [msg, setMsg] = useState("");
  
//   // Naye States: Api se response save karne ke liye aur card details create karne ke liye
//   const [orderSummary, setOrderSummary] = useState(null);

//   const fileInputRef = useRef(null);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     const formattedValue = (name === "address_id" || name === "service_id" || name === "measurement_id") && value !== "" 
//       ? Number(value) || value 
//       : value;

//     setForm((p) => ({ ...p, [name]: formattedValue }));
//     setErrors((p) => ({ ...p, [name]: validators[name]?.(value) || "" }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setImages((prev) => [...prev, ...files]);
//       const newPreviews = files.map(file => URL.createObjectURL(file));
//       setImagePreviews((prev) => [...prev, ...newPreviews]);
//     }
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const runFormValidation = () => {
//     const localErrors = {};
//     Object.keys(validators).forEach((key) => {
//       const errorMsg = validators[key]?.(form[key]) || "";
//       if (errorMsg) localErrors[key] = errorMsg;
//     });
//     setErrors(localErrors);
//     return Object.keys(localErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowErrors(true); 
//     const isFormValid = runFormValidation();

//     if (!isFormValid) return;
    
//     setLoading(true);
//     setStatus(null);
//     setOrderSummary(null);

//     try {
//       const payload = {};
      
//       Object.keys(form).forEach((key) => {
//         const value = form[key];
//         if (typeof value === "string" && value.trim() === "") return;
//         if (value === undefined || value === null) return;
//         payload[key] = value;
//       });

//       if (payload.measurement_id) {
//         payload.measurement_id = Number(payload.measurement_id);
//       }
//       if (payload.address_id) payload.address_id = Number(payload.address_id);
//       if (payload.service_id) payload.service_id = Number(payload.service_id);
      
//       // Khali array as per schema documentation requirement
//       payload.image_references = []; 

//       const res = await axios.post(API_ENDPOINT, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       setStatus("success");
//       setMsg("Order created successfully!");
      
//       // API se response aur client-side cloth details ko track karne ke liye set kar rahe hain
//       setOrderSummary({
//         orderCode: res.data.OrderCode || "N/A",
//         id: res.data.Id || "N/A",
//         clothDetails: form.cloth_details,
//         deliveryEta: res.data.DisplayEta || res.data.DeliveryLabel || "N/A",
//         statusLabel: res.data.StatusLabel || "Order Placed",
//         statusRaw: res.data.Status || "order_placed"
//       });

//       resetFormState();
//     } catch (err) {
//       setStatus("error");
//       setMsg(err.response?.data?.detail?.[0]?.msg || "Failed to create order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetFormState = () => {
//     setForm(INIT_FORM);
//     setErrors({});
//     setShowErrors(false); 
//     setImages([]);
//     setImagePreviews([]);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const fullReset = () => {
//     resetFormState();
//     setStatus(null);
//     setOrderSummary(null);
//     setMsg("");
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-6 relative">
      
//       {/* Header Layout */}
//       <div className="bg-[#025e5e] px-8 py-6 text-white relative flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-bold">Create Order </h2>
//           <p className="text-teal-100 text-xs mt-0.5">Place a new tailoring order into the system</p>
//         </div>
//         {orderSummary && (
//           <button 
//             onClick={fullReset} 
//             className="bg-teal-700/50 hover:bg-teal-700 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
//           >
//             <RotateCcw size={13} /> Create Another
//           </button>
//         )}
//       </div>

//       <div className="overflow-y-auto max-h-[75vh]">
//         <div className="p-8 space-y-6">
          
//           {status && (
//             <div className={`rounded-xl px-4 py-3.5 text-sm font-semibold flex items-center gap-3 border-2
//               ${status === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
//             >
//               {status === "success" ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <XCircle size={18} className="text-red-500 shrink-0" />}
//               <span className="flex-1">{msg}</span>
//               <button type="button" onClick={() => setStatus(null)} className="text-gray-500 hover:text-gray-600">
//                 <X size={16} />
//               </button>
//             </div>
//           )}

//           {/* ─── SUCCESS ORDER SUMMARY CARD DISPLAY ─── */}
//           {orderSummary && (
//             <div className="border-2 border-dashed border-teal-200 bg-teal-50/20 rounded-2xl p-6 space-y-5 animate-fadeIn">
//               <div className="flex items-center gap-2 text-[#006B6B] font-bold text-sm uppercase tracking-wider">
//                 <CheckSquare size={18} /> Generated Invoice / Order Summary
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
//                 {/* Order Code / ID Box */}
//                 <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
//                   <span className="text-xs text-gray-400 block font-medium">ORDER CODE / ID</span>
//                   <span className="text-sm font-bold text-gray-800 block mt-1 font-mono text-teal-700">
//                     {orderSummary.orderCode}
//                   </span>
//                   <span className="text-[11px] text-gray-400 block">System ID: #{orderSummary.id}</span>
//                 </div>

//                 {/* Cloth Details Box */}
//                 <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm md:col-span-1">
//                   <span className="text-xs text-gray-400 block font-medium">CLOTH DETAILS</span>
//                   <span className="text-sm font-semibold text-gray-700 block mt-1 truncate" title={orderSummary.clothDetails}>
//                     {orderSummary.clothDetails}
//                   </span>
//                 </div>

//                 {/* Delivery ETA Box */}
//                 <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
//                   <span className="text-xs text-gray-400 block font-medium">DELIVERY ETA</span>
//                   <span className="text-sm font-bold text-amber-600 flex items-center gap-1 mt-1">
//                     <Calendar size={14} /> {orderSummary.deliveryEta}
//                   </span>
//                 </div>

//                 {/* Status Box */}
//                 <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
//                   <span className="text-xs text-gray-400 block font-medium">STATUS</span>
//                   <span className="inline-flex mt-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
//                     {orderSummary.statusLabel}
//                   </span>
//                 </div>

//               </div>

//               {/* Card Actions Footer */}
//               <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
//                 <button 
//                   type="button" 
//                   onClick={() => alert(`Tracking Order: ${orderSummary.orderCode}`)}
//                   className="px-4 h-9 border border-gray-300 hover:border-[#006B6B] text-gray-600 hover:text-[#006B6B] bg-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
//                 >
//                   <Eye size={14} /> Track Order
//                 </button>
//                 <button 
//                   type="button" 
//                   onClick={() => alert('Printing Receipt...')}
//                   className="px-4 h-9 bg-[#007A7A] hover:bg-[#006B6B] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-teal-700/10 transition-all"
//                 >
//                   <Printer size={14} /> Print Receipt
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* ─── MAIN FORM LAYER ─── */}
//           <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
//             {/* 1. Core Order Information */}
//             <div className="space-y-5">
//               <SectionHeader icon={ShoppingCart} title="Order Details" subtitle="Link service, target IDs, and configurations" />
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
//                 {/* Images Upload Area Box */}
//                 <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 h-full min-h-[180px]">
//                   {imagePreviews.length > 0 ? (
//                     <div className="grid grid-cols-2 gap-2 w-full max-h-[150px] overflow-y-auto p-1">
//                       {imagePreviews.map((preview, index) => (
//                         <div key={index} className="relative w-full h-16 rounded-lg overflow-hidden border border-[#006B6B] shadow-sm group">
//                           <img src={preview} alt="Preview" className="w-full h-full object-cover" />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute inset-0 bg-black/50 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-semibold"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div 
//                       onClick={() => fileInputRef.current.click()} 
//                       className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-[#007A7A] transition-colors"
//                     >
//                       <ImageIcon size={36} className="mb-2" />
//                       <span className="text-xs font-bold">Image References</span>
//                       <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG Reference Uploads</span>
//                     </div>
//                   )}
//                   <input 
//                     ref={fileInputRef}
//                     type="file" 
//                     multiple
//                     accept="image/*" 
//                     className="hidden" 
//                     onChange={handleImageChange} 
//                   />
//                 </div>

//                 <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <InputField
//                     icon={MapPin}
//                     name="address_id"
//                     type="number"
//                     label="Address ID"
//                     placeholder="e.g. 5"
//                     value={form.address_id}
//                     onChange={onChange}
//                     error={errors.address_id}
//                     showErrors={showErrors}
//                   />
//                   <InputField
//                     icon={Scissors}
//                     name="service_id"
//                     type="number"
//                     label="Service ID"
//                     placeholder="e.g. 101"
//                     value={form.service_id}
//                     onChange={onChange}
//                     error={errors.service_id}
//                     showErrors={showErrors}
//                   />
//                   <InputField
//                     icon={Layers}
//                     name="measurement_id"
//                     type="number"
//                     label="Measurement ID (Optional)"
//                     placeholder="e.g. 12"
//                     value={form.measurement_id}
//                     onChange={onChange}
//                     showErrors={showErrors}
//                   />
                  
//                   {/* Urgency Level Dropdown */}
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold text-gray-600">Urgency Level *</label>
//                     <select
//                       name="urgency_level"
//                       value={form.urgency_level}
//                       onChange={onChange}
//                       className="w-full h-11 px-3 text-sm rounded-xl border-2 border-gray-300 bg-gray-50 outline-none focus:border-[#006B6B] focus:bg-white transition-all text-gray-700"
//                     >
//                       <option value="standard">Standard</option>
//                       <option value="express">Express</option>
//                     </select>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* 2. Fabric & Tailoring Notes */}
//             <div className="space-y-5">
//               <SectionHeader icon={Sparkles} title="Customization Specifications" subtitle="Fabric descriptors and tailoring details" />
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <InputField
//                   icon={FileText}
//                   name="cloth_details"
//                   label="Cloth Details"
//                   placeholder="e.g. Blue cotton cloth"
//                   value={form.cloth_details}
//                   onChange={onChange}
//                   error={errors.cloth_details}
//                   showErrors={showErrors}
//                 />
//                 <InputField
//                   icon={FileText}
//                   name="customization_notes"
//                   label="Customization Notes"
//                   placeholder="e.g. Chinese collar"
//                   value={form.customization_notes}
//                   onChange={onChange}
//                   error={errors.customization_notes}
//                   showErrors={showErrors}
//                 />
//               </div>

//               {/* Description Texarea */}
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-semibold text-gray-800">Stitching/Fit Description</label>
//                 <textarea
//                   name="description"
//                   rows={2}
//                   value={form.description}
//                   placeholder="e.g. Need slim fit stitching details..."
//                   onChange={onChange}
//                   className="w-full pl-4 pr-4 py-3 text-sm rounded-xl border-2 border-gray-300 outline-none resize-none transition-all bg-gray-50 focus:bg-white focus:border-[#006B6B]"
//                 />
//               </div>

//               {/* Fabric Notes Texarea */}
//               <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-semibold text-gray-800">Fabric Notes</label>
//                 <textarea
//                   name="fabric_notes"
//                   rows={2}
//                   value={form.fabric_notes}
//                   placeholder="e.g. Pure Linen blend style specifications..."
//                   onChange={onChange}
//                   className="w-full pl-4 pr-4 py-3 text-sm rounded-xl border-2 border-gray-300 outline-none resize-none transition-all bg-gray-50 focus:bg-white focus:border-[#006B6B]"
//                 />
//               </div>
//             </div>

//             {/* Actions Footer */}
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
//               <p className="text-xs text-gray-400 hidden sm:block">
//                 Fields marked <span className="text-red-400 font-bold">*</span> are mandatory
//               </p>
//               <div className="flex gap-3 w-full sm:w-auto">
//                 <button
//                   type="button"
//                   onClick={resetFormState}
//                   disabled={loading}
//                   className="flex-1 sm:flex-none h-11 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
//                 >
//                   <RotateCcw size={15} /> Reset Form
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 sm:flex-none h-11 px-8 bg-[#007A7A] hover:bg-[#006B6B] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all"
//                 >
//                   <ShoppingCart size={16} />
//                   {loading ? "Creating Order…" : "Create Order"}
//                 </button>
//               </div>
//             </div>

//           </form>
//         </div>
//       </div>

//     </div>
//   );
// }

// import { useState, useRef } from "react";
// import axios from "axios";
// import { 
//   MapPin, 
//   Image as ImageIcon,
//   CheckCircle2, 
//   XCircle, 
//   AlertCircle,
//   RotateCcw,
//   ShoppingCart,
//   X,
//   FileText,
//   Scissors,
//   Layers,
//   Sparkles,
//   Printer,
//   Eye,
//   Calendar,
//   Tag
// } from "lucide-react";

// // ─── Constants & Validators ──────────────────────────────────────────────────
// const BASE_URL = "https://web-production-efff7.up.railway.app";
// const API_ENDPOINT = `${BASE_URL}/api/v1/orders`;

// const validators = {
//   address_id: (v) => !v ? "Please select or provide an address ID" : "",
//   service_id: (v) => !v ? "Please select or provide a service ID" : "",
//   cloth_details: (v) => !v || v.trim().length < 3 ? "Cloth details are required (min 3 chars)" : "",
//   customization_notes: (v) => !v || v.trim().length < 3 ? "Customization requirements are required" : "",
// };

// const INIT_FORM = {
//   address_id: "",
//   service_id: "",
//   cloth_details: "",
//   customization_notes: "",
//   description: "",
//   fabric_notes: "",
//   measurement_id: "",
//   measurement_option: "self", 
//   payment_method: "online",   
//   urgency_level: "standard",  
// };

// // ─── Shared InputField Component ──────────────────────────────────────────────
// const InputField = ({
//   icon: Icon,
//   name,
//   label,
//   placeholder,
//   value,
//   type = "text",
//   onChange,
//   error,
//   showErrors, 
//   disabled = false,
// }) => {
//   const hasError = showErrors && !!error;
//   const isSuccess = showErrors && !error && value && String(value).trim() !== "";

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
//         {label} {name !== "description" && name !== "fabric_notes" && name !== "measurement_id" && <span className="text-red-600 font-bold">*</span>}
//       </label>
//       <div className="relative">
//         <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
//           ${hasError ? "text-red-600" : isSuccess ? "text-[#006B6B]" : "text-gray-400"}`}
//         >
//           <Icon size={17} />
//         </span>
//         <input
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//           autoComplete="off"
//           className={`w-full h-11 pl-11 pr-10 text-sm rounded-xl border-2 outline-none transition-all
//             placeholder:text-gray-400
//             ${disabled ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed" : "bg-gray-50 focus:bg-white"}
//             ${hasError ? "border-red-500 bg-red-50/20 focus:border-red-600" : isSuccess ? "border-[#006B6B] focus:border-[#007A7A]" : "border-gray-300 focus:border-[#006B6B]"}`}
//         />
//         <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//           {hasError && <XCircle size={16} className="text-red-600" />}
//           {isSuccess && <CheckCircle2 size={16} className="text-[#007A7A]" />}
//         </span>
//       </div>
//       {hasError && (
//         <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5 animate-fadeIn">
//           <AlertCircle size={12} className="shrink-0" /> {error}
//         </p>
//       )}
//     </div>
//   );
// };

// // ─── Shared SectionHeader Component ───────────────────────────────────────────
// const SectionHeader = ({ icon: Icon, title, subtitle }) => (
//   <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
//     <div className="flex items-center gap-3">
//       <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 border border-teal-100">
//         <Icon size={20} className="text-teal-600" />
//       </div>
//       <div>
//         <h3 className="font-bold text-gray-800 text-base leading-tight">{title}</h3>
//         <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
//       </div>
//     </div>
//   </div>
// );

// // ─── Main CreateOrder Component ────────────────────────────────────────────────
// export default function AddOrder() {
//   const [form, setForm] = useState(INIT_FORM);
//   const [errors, setErrors] = useState({});
//   const [showErrors, setShowErrors] = useState(false); 
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [msg, setMsg] = useState("");
  
//   // Dynamic Response States
//   const [apiResponse, setApiResponse] = useState({
//     orderCode: "—",
//     id: "—",
//     clothDetails: "—",
//     deliveryEta: "—",
//     statusLabel: "—"
//   });

//   const fileInputRef = useRef(null);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     const formattedValue = (name === "address_id" || name === "service_id" || name === "measurement_id") && value !== "" 
//       ? Number(value) || value 
//       : value;

//     setForm((p) => ({ ...p, [name]: formattedValue }));
//     setErrors((p) => ({ ...p, [name]: validators[name]?.(value) || "" }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setImages((prev) => [...prev, ...files]);
//       const newPreviews = files.map(file => URL.createObjectURL(file));
//       setImagePreviews((prev) => [...prev, ...newPreviews]);
//     }
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const runFormValidation = () => {
//     const localErrors = {};
//     Object.keys(validators).forEach((key) => {
//       const errorMsg = validators[key]?.(form[key]) || "";
//       if (errorMsg) localErrors[key] = errorMsg;
//     });
//     setErrors(localErrors);
//     return Object.keys(localErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowErrors(true); 
//     const isFormValid = runFormValidation();

//     if (!isFormValid) return;
    
//     setLoading(true);
//     setStatus(null);

//     try {
//       const payload = {};
      
//       Object.keys(form).forEach((key) => {
//         const value = form[key];
//         if (typeof value === "string" && value.trim() === "") return;
//         if (value === undefined || value === null) return;
//         payload[key] = value;
//       });

//       if (payload.measurement_id) payload.measurement_id = Number(payload.measurement_id);
//       if (payload.address_id) payload.address_id = Number(payload.address_id);
//       if (payload.service_id) payload.service_id = Number(payload.service_id);
      
//       payload.image_references = []; 

//       const res = await axios.post(API_ENDPOINT, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       setStatus("success");
//       setMsg("Order registration processed successfully!");
      
//       // Yahan Form ke andar live data update ho raha h
//       setApiResponse({
//         orderCode: res.data.OrderCode || "N/A",
//         id: res.data.Id || "N/A",
//         clothDetails: form.cloth_details || "N/A",
//         deliveryEta: res.data.DisplayEta || res.data.DeliveryLabel || "N/A",
//         statusLabel: res.data.StatusLabel || "Order Placed"
//       });

//       // Form clear but response values persist until manual reset
//       setForm(INIT_FORM);
//       setErrors({});
//       setShowErrors(false);
//       setImages([]);
//       setImagePreviews([]);
//     } catch (err) {
//       setStatus("error");
//       setMsg(err.response?.data?.detail?.[0]?.msg || "Failed to create order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetAll = () => {
//     setForm(INIT_FORM);
//     setErrors({});
//     setShowErrors(false); 
//     setImages([]);
//     setImagePreviews([]);
//     setStatus(null);
//     setMsg("");
//     setApiResponse({
//       orderCode: "—",
//       id: "—",
//       clothDetails: "—",
//       deliveryEta: "—",
//       statusLabel: "—"
//     });
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-6 relative">
      
//       {/* Header Layout */}
//       <div className="bg-[#025e5e] px-8 py-6 text-white">
//         <h2 className="text-xl font-bold">Create Order</h2>
//         <p className="text-teal-100 text-xs mt-0.5">Place a new tailoring requirement into the system pipeline</p>
//       </div>

//       <div className="overflow-y-auto max-h-[75vh]">
//         <div className="p-8 space-y-8">
          
//           {/* Status Message alert banner */}
//           {status && (
//             <div className={`rounded-xl px-4 py-3.5 text-sm font-semibold flex items-center gap-3 border-2
//               ${status === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
//             >
//               {status === "success" ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <XCircle size={18} className="text-red-500 shrink-0" />}
//               <span className="flex-1">{msg}</span>
//               <button type="button" onClick={() => setStatus(null)} className="text-gray-500 hover:text-gray-600">
//                 <X size={16} />
//               </button>
//             </div>
//           )}

//           {/* ─── LIVE DATA METRICS DISPLAY (FORM SUMMARY GRID) ─── */}
//           <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
//             <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
//               <Tag size={14} className="text-[#006B6B]" /> Live Pipeline Output Parameters
//             </h4>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//               {/* Order Code / ID */}
//               <div className="bg-white p-3.5 border border-gray-200 rounded-xl">
//                 <span className="text-[11px] text-gray-400 font-bold block">ORDER CODE / ID</span>
//                 <span className="text-sm font-mono font-bold text-gray-800 block mt-1 break-all">
//                   {apiResponse.orderCode}
//                 </span>
//                 {apiResponse.id !== "—" && <span className="text-[10px] text-gray-400 block mt-0.5">ID: #{apiResponse.id}</span>}
//               </div>

//               {/* Cloth Details */}
//               <div className="bg-white p-3.5 border border-gray-200 rounded-xl">
//                 <span className="text-[11px] text-gray-400 font-bold block">CLOTH DETAILS</span>
//                 <span className="text-sm font-semibold text-gray-700 block mt-1 truncate" title={apiResponse.clothDetails}>
//                   {apiResponse.clothDetails}
//                 </span>
//               </div>

//               {/* Delivery ETA */}
//               <div className="bg-white p-3.5 border border-gray-200 rounded-xl">
//                 <span className="text-[11px] text-gray-400 font-bold block">DELIVERY ETA</span>
//                 <span className="text-sm font-bold text-amber-600 flex items-center gap-1 mt-1">
//                   <Calendar size={13} /> {apiResponse.deliveryEta}
//                 </span>
//               </div>

//               {/* Status */}
//               <div className="bg-white p-3.5 border border-gray-200 rounded-xl">
//                 <span className="text-[11px] text-gray-400 font-bold block">STATUS</span>
//                 <div>
//                   {apiResponse.statusLabel === "—" ? (
//                     <span className="text-sm font-semibold text-gray-400 mt-1 block">—</span>
//                   ) : (
//                     <span className="inline-flex mt-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-teal-50 text-[#006B6B] border border-teal-200">
//                       {apiResponse.statusLabel}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Quick Live Actions (Visible only when API responses exist) */}
//             {apiResponse.orderCode !== "—" && (
//               <div className="flex justify-end gap-2 pt-2 border-t border-gray-200/60">
//                 <button 
//                   type="button" 
//                   onClick={() => alert(`Tracking workflow for ${apiResponse.orderCode}`)}
//                   className="px-3 h-8 text-xs font-bold text-gray-600 hover:text-[#006B6B] bg-white border border-gray-300 rounded-lg flex items-center gap-1 transition-all"
//                 >
//                   <Eye size={13} /> Track
//                 </button>
//                 <button 
//                   type="button" 
//                   onClick={() => alert('Printing Receipt Document...')}
//                   className="px-3 h-8 text-xs font-bold text-white bg-[#007A7A] hover:bg-[#006B6B] rounded-lg flex items-center gap-1 transition-all"
//                 >
//                   <Printer size={13} /> Print
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* ─── MAIN FORM FIELDS ─── */}
//           <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
//             {/* 1. Core Order Information */}
//             <div className="space-y-5">
//               <SectionHeader icon={ShoppingCart} title="Order Configuration" subtitle="Assign primary identifiers and target timelines" />
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                
//                 {/* Images Upload Area Box */}
//                 {/* <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 h-full min-h-[180px]">
//                   {imagePreviews.length > 0 ? (
//                     <div className="grid grid-cols-2 gap-2 w-full max-h-[150px] overflow-y-auto p-1">
//                       {imagePreviews.map((preview, index) => (
//                         <div key={index} className="relative w-full h-16 rounded-lg overflow-hidden border border-[#006B6B] shadow-sm group">
//                           <img src={preview} alt="Preview" className="w-full h-full object-cover" />
//                           <button
//                             type="button"
//                             onClick={() => removeImage(index)}
//                             className="absolute inset-0 bg-black/50 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-semibold"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div 
//                       onClick={() => fileInputRef.current.click()} 
//                       className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-[#007A7A] transition-colors"
//                     >
//                       <ImageIcon size={36} className="mb-2" />
//                       <span className="text-xs font-bold">Image References</span>
//                       <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG Reference Uploads</span>
//                     </div>
//                   )}
//                   <input 
//                     ref={fileInputRef}
//                     type="file" 
//                     multiple
//                     accept="image/*" 
//                     className="hidden" 
//                     onChange={handleImageChange} 
//                   />
//                 </div> */}

//                 <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <InputField
//                     icon={MapPin}
//                     name="address_id"
//                     type="number"
//                     label="Address ID"
//                     placeholder="e.g. 5"
//                     value={form.address_id}
//                     onChange={onChange}
//                     error={errors.address_id}
//                     showErrors={showErrors}
//                   />
//                   <InputField
//                     icon={Scissors}
//                     name="service_id"
//                     type="number"
//                     label="Service ID"
//                     placeholder="e.g. 101"
//                     value={form.service_id}
//                     onChange={onChange}
//                     error={errors.service_id}
//                     showErrors={showErrors}
//                   />
//                   <InputField
//                     icon={Layers}
//                     name="measurement_id"
//                     type="number"
//                     label="Measurement ID (Optional)"
//                     placeholder="e.g. 12"
//                     value={form.measurement_id}
//                     onChange={onChange}
//                     showErrors={showErrors}
//                   />
                  
//                   {/* Urgency Level Dropdown */}
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold text-gray-600">Urgency Level *</label>
//                     <select
//                       name="urgency_level"
//                       value={form.urgency_level}
//                       onChange={onChange}
//                       className="w-full h-11 px-3 text-sm rounded-xl border-2 border-gray-300 bg-gray-50 outline-none focus:border-[#006B6B] focus:bg-white transition-all text-gray-700"
//                     >
//                       <option value="standard">Standard</option>
//                       <option value="express">Express</option>
//                     </select>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* 2. Fabric & Tailoring Notes */}
//             <div className="space-y-5">
//               <SectionHeader icon={Sparkles} title="Customization Specifications" subtitle="Fabric descriptors and tailoring details" />
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <InputField
//                   icon={FileText}
//                   name="cloth_details"
//                   label="Cloth Details"
//                   placeholder="e.g. Blue cotton cloth"
//                   value={form.cloth_details}
//                   onChange={onChange}
//                   error={errors.cloth_details}
//                   showErrors={showErrors}
//                 />
//                 {/* <InputField
//                   icon={FileText}
//                   name="customization_notes"
//                   label="Customization Notes"
//                   placeholder="e.g. Chinese collar"
//                   value={form.customization_notes}
//                   onChange={onChange}
//                   error={errors.customization_notes}
//                   showErrors={showErrors}
//                 /> */}
//               </div>

//               {/* Description Texarea */}
//               {/* <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-semibold text-gray-800">Stitching/Fit Description</label>
//                 <textarea
//                   name="description"
//                   rows={2}
//                   value={form.description}
//                   placeholder="e.g. Need slim fit stitching details..."
//                   onChange={onChange}
//                   className="w-full pl-4 pr-4 py-3 text-sm rounded-xl border-2 border-gray-300 outline-none resize-none transition-all bg-gray-50 focus:bg-white focus:border-[#006B6B]"
//                 />
//               </div> */}

//               {/* Fabric Notes Texarea */}
//               {/* <div className="flex flex-col gap-1.5">
//                 <label className="text-xs font-semibold text-gray-800">Fabric Notes</label>
//                 <textarea
//                   name="fabric_notes"
//                   rows={2}
//                   value={form.fabric_notes}
//                   placeholder="e.g. Pure Linen blend style specifications..."
//                   onChange={onChange}
//                   className="w-full pl-4 pr-4 py-3 text-sm rounded-xl border-2 border-gray-300 outline-none resize-none transition-all bg-gray-50 focus:bg-white focus:border-[#006B6B]"
//                 />
//               </div> */}
//             </div>

//             {/* Actions Footer */}
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
//               <p className="text-xs text-gray-400 hidden sm:block">
//                 Fields marked <span className="text-red-400 font-bold">*</span> are mandatory
//               </p>
//               <div className="flex gap-3 w-full sm:w-auto">
//                 <button
//                   type="button"
//                   onClick={resetAll}
//                   disabled={loading}
//                   className="flex-1 sm:flex-none h-11 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
//                 >
//                   <RotateCcw size={15} /> Full Reset
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 sm:flex-none h-11 px-8 bg-[#007A7A] hover:bg-[#006B6B] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all"
//                 >
//                   <ShoppingCart size={16} />
//                   {loading ? "Creating Order…" : "Create Order"}
//                 </button>
//               </div>
//             </div>

//           </form>
//         </div>
//       </div>

//     </div>
//   );
// }


// import { useState, useRef } from "react";
// import axios from "axios";
// import { 
//   MapPin, 
//   Image as ImageIcon,
//   CheckCircle2, 
//   XCircle, 
//   AlertCircle,
//   RotateCcw,
//   ShoppingCart,
//   X,
//   FileText,
//   Scissors,
//   Layers,
//   Sparkles,
//   Printer,
//   Eye,
//   Calendar,
//   List,
//   ArrowRight
// } from "lucide-react";

// // ─── Constants & Validators ──────────────────────────────────────────────────
// const BASE_URL = "https://web-production-efff7.up.railway.app";
// const API_ENDPOINT = `${BASE_URL}/api/v1/orders`;

// const validators = {
//   address_id: (v) => !v ? "Address ID is required" : "",
//   service_id: (v) => !v ? "Service ID is required" : "",
//   cloth_details: (v) => !v || v.trim().length < 3 ? "Cloth details required (min 3 chars)" : "",
//   customization_notes: (v) => !v || v.trim().length < 3 ? "Customization requirements required" : "",
// };

// const INIT_FORM = {
//   address_id: "",
//   service_id: "",
//   cloth_details: "",
//   customization_notes: "",
//   description: "",
//   fabric_notes: "",
//   measurement_id: "",
//   measurement_option: "self", 
//   payment_method: "online",   
//   urgency_level: "standard",  
// };

// // ─── Shared InputField Component ──────────────────────────────────────────────
// const InputField = ({
//   icon: Icon,
//   name,
//   label,
//   placeholder,
//   value,
//   type = "text",
//   onChange,
//   error,
//   showErrors, 
//   disabled = false,
// }) => {
//   const hasError = showErrors && !!error;
//   const isSuccess = showErrors && !error && value && String(value).trim() !== "";

//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
//         {label} {name !== "description" && name !== "fabric_notes" && name !== "measurement_id" && <span className="text-red-600 font-bold">*</span>}
//       </label>
//       <div className="relative">
//         <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
//           ${hasError ? "text-red-600" : isSuccess ? "text-[#006B6B]" : "text-gray-400"}`}
//         >
//           <Icon size={17} />
//         </span>
//         <input
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//           autoComplete="off"
//           className={`w-full h-11 pl-11 pr-10 text-sm rounded-xl border-2 outline-none transition-all
//             placeholder:text-gray-400
//             ${disabled ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed" : "bg-gray-50 focus:bg-white"}
//             ${hasError ? "border-red-500 bg-red-50/20 focus:border-red-600" : isSuccess ? "border-[#006B6B] focus:border-[#007A7A]" : "border-gray-300 focus:border-[#006B6B]"}`}
//         />
//         <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//           {hasError && <XCircle size={16} className="text-red-600" />}
//           {isSuccess && <CheckCircle2 size={16} className="text-[#007A7A]" />}
//         </span>
//       </div>
//       {hasError && (
//         <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5 animate-fadeIn">
//           <AlertCircle size={12} className="shrink-0" /> {error}
//         </p>
//       )}
//     </div>
//   );
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function AddOrder() {
//   const [form, setForm] = useState(INIT_FORM);
//   const [errors, setErrors] = useState({});
//   const [showErrors, setShowErrors] = useState(false); 
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [msg, setMsg] = useState("");
  
//   // Table Data State (Isme form submit hone ke baad array save hoga)
//   const [ordersList, setOrdersList] = useState([
//     // Mock/Initial Data aapki table test karne ke liye (Aap ise delete bhi kar sakte hain)
//     {
//       id: 123,
//       orderCode: "ORD-2026-0014",
//       clothDetails: "Blue cotton cloth",
//       deliveryEta: "Delivery by 5 Jun",
//       statusLabel: "Order Placed"
//     }
//   ]);

//   const fileInputRef = useRef(null);

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     const formattedValue = (name === "address_id" || name === "service_id" || name === "measurement_id") && value !== "" 
//       ? Number(value) || value 
//       : value;

//     setForm((p) => ({ ...p, [name]: formattedValue }));
//     setErrors((p) => ({ ...p, [name]: validators[name]?.(value) || "" }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setImages((prev) => [...prev, ...files]);
//       const newPreviews = files.map(file => URL.createObjectURL(file));
//       setImagePreviews((prev) => [...prev, ...newPreviews]);
//     }
//   };

//   const removeImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const runFormValidation = () => {
//     const localErrors = {};
//     Object.keys(validators).forEach((key) => {
//       const errorMsg = validators[key]?.(form[key]) || "";
//       if (errorMsg) localErrors[key] = errorMsg;
//     });
//     setErrors(localErrors);
//     return Object.keys(localErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowErrors(true); 
//     const isFormValid = runFormValidation();

//     if (!isFormValid) return;
    
//     setLoading(true);
//     setStatus(null);

//     try {
//       const payload = {};
//       Object.keys(form).forEach((key) => {
//         const value = form[key];
//         if (typeof value === "string" && value.trim() === "") return;
//         if (value === undefined || value === null) return;
//         payload[key] = value;
//       });

//       if (payload.measurement_id) payload.measurement_id = Number(payload.measurement_id);
//       if (payload.address_id) payload.address_id = Number(payload.address_id);
//       if (payload.service_id) payload.service_id = Number(payload.service_id);
      
//       payload.image_references = []; 

//       const res = await axios.post(API_ENDPOINT, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       setStatus("success");
//       setMsg("Order created successfully and pushed to pipeline!");

//       // New row create karke list me prepend (sabse upar add) kar rahe hain
//       const newOrder = {
//         id: res.data.Id || Math.floor(Math.random() * 1000),
//         orderCode: res.data.OrderCode || "N/A",
//         clothDetails: form.cloth_details,
//         deliveryEta: res.data.DisplayEta || res.data.DeliveryLabel || "N/A",
//         statusLabel: res.data.StatusLabel || "Order Placed"
//       };

//       setOrdersList((prevList) => [newOrder, ...prevList]);

//       // Form resetting
//       setForm(INIT_FORM);
//       setErrors({});
//       setShowErrors(false);
//       setImages([]);
//       setImagePreviews([]);
//     } catch (err) {
//       setStatus("error");
//       setMsg(err.response?.data?.detail?.[0]?.msg || "Failed to create order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto space-y-8 my-6 px-4">
      
//       {/* ─── FORM SECTION ─── */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//         <div className="bg-[#025e5e] px-8 py-5 text-white">
//           <h2 className="text-lg font-bold flex items-center gap-2">
//             <ShoppingCart size={20} /> Create New Tailoring Order
//           </h2>
//           <p className="text-teal-100 text-xs mt-0.5">Fill details to auto-populate the real-time master table below</p>
//         </div>

//         <div className="p-8 space-y-6">
//           {status && (
//             <div className={`rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-3 border-2
//               ${status === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
//             >
//               {status === "success" ? <CheckCircle2 size={17} className="text-emerald-500 shrink-0" /> : <XCircle size={17} className="text-red-500 shrink-0" />}
//               <span className="flex-1">{msg}</span>
//               <button type="button" onClick={() => setStatus(null)} className="text-gray-500 hover:text-gray-600">
//                 <X size={16} />
//               </button>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} noValidate className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
//               {/* Image Upload Area */}
//               <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 h-full min-h-[170px]">
//                 {imagePreviews.length > 0 ? (
//                   <div className="grid grid-cols-2 gap-2 w-full max-h-[140px] overflow-y-auto p-1">
//                     {imagePreviews.map((preview, index) => (
//                       <div key={index} className="relative w-full h-14 rounded-lg overflow-hidden border border-[#006B6B] shadow-sm group">
//                         <img src={preview} alt="Preview" className="w-full h-full object-cover" />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute inset-0 bg-black/50 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div onClick={() => fileInputRef.current.click()} className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-[#007A7A]">
//                     <ImageIcon size={32} className="mb-1" />
//                     <span className="text-xs font-bold">Image References</span>
//                     <span className="text-[10px] text-gray-400">Upload References</span>
//                   </div>
//                 )}
//                 <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
//               </div>

//               {/* ID Configuration Grid */}
//               <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <InputField icon={MapPin} name="address_id" type="number" label="Address ID" placeholder="e.g. 5" value={form.address_id} onChange={onChange} error={errors.address_id} showErrors={showErrors} />
//                 <InputField icon={Scissors} name="service_id" type="number" label="Service ID" placeholder="e.g. 101" value={form.service_id} onChange={onChange} error={errors.service_id} showErrors={showErrors} />
//                 <InputField icon={Layers} name="measurement_id" type="number" label="Measurement ID (Optional)" placeholder="e.g. 12" value={form.measurement_id} onChange={onChange} showErrors={showErrors} />
                
//                 <div className="flex flex-col gap-1.5">
//                   <label className="text-xs font-semibold text-gray-600">Urgency Level *</label>
//                   <select name="urgency_level" value={form.urgency_level} onChange={onChange} className="w-full h-11 px-3 text-sm rounded-xl border-2 border-gray-300 bg-gray-50 outline-none focus:border-[#006B6B] text-gray-700">
//                     <option value="standard">Standard</option>
//                     <option value="express">Express</option>
//                   </select>
//                 </div>
//               </div>

//             </div>

//             {/* Customization Details Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <InputField icon={FileText} name="cloth_details" label="Cloth Details" placeholder="e.g. Blue cotton cloth" value={form.cloth_details} onChange={onChange} error={errors.cloth_details} showErrors={showErrors} />
//               <InputField icon={FileText} name="customization_notes" label="Customization Notes" placeholder="e.g. Chinese collar" value={form.customization_notes} onChange={onChange} error={errors.customization_notes} showErrors={showErrors} />
//             </div>

//             {/* Actions Button */}
//             <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
//               <button type="submit" disabled={loading} className="w-full sm:w-auto h-11 px-8 bg-[#007A7A] hover:bg-[#006B6B] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all">
//                 {loading ? "Processing..." : "Create & Deploy Order"} <ArrowRight size={16} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* ─── MASTER DATA TABLE VIEW ─── */}
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//         <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
//           <div>
//             <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
//               <List size={18} className="text-[#006B6B]" /> Tailoring Pipeline Master Table
//             </h3>
//             <p className="text-xs text-gray-400 mt-0.5">Live view tracking your submitted orders data fields</p>
//           </div>
//           <span className="text-xs font-bold px-2.5 py-1 bg-teal-50 text-[#006B6B] rounded-full border border-teal-200">
//             Total Orders: {ordersList.length}
//           </span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[800px] text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-100/70 text-gray-500 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200">
//                 <th className="py-4 px-6 font-mono text-[#006B6B]">Order Code / ID</th>
//                 <th className="py-4 px-6">Cloth Details</th>
//                 <th className="py-4 px-6">Delivery ETA</th>
//                 <th className="py-4 px-6">Status</th>
//                 <th className="py-4 px-6 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
//               {ordersList.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-10 text-gray-400 font-medium bg-gray-50/30">
//                     No active orders found in the pipeline. Submit the form above to add data.
//                   </td>
//                 </tr>
//               ) : (
//                 ordersList.map((order, idx) => (
//                   <tr key={idx} className="hover:bg-teal-50/10 transition-colors animate-fadeIn">
                    
//                     {/* Order Code / ID column */}
//                     <td className="py-4 px-6 font-medium">
//                       <span className="font-mono text-gray-900 font-bold block">{order.orderCode}</span>
//                       <span className="text-[11px] text-gray-400 block mt-0.5">System ID: #{order.id}</span>
//                     </td>

//                     {/* Cloth Details column */}
//                     <td className="py-4 px-6 font-semibold text-gray-600 max-w-[220px] truncate" title={order.clothDetails}>
//                       {order.clothDetails}
//                     </td>

//                     {/* Delivery ETA column */}
//                     <td className="py-4 px-6">
//                       <span className="text-amber-700 font-bold flex items-center gap-1">
//                         <Calendar size={14} className="shrink-0" /> {order.deliveryEta}
//                       </span>
//                     </td>

//                     {/* Status column */}
//                     <td className="py-4 px-6">
//                       <span className="inline-flex px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
//                         {order.statusLabel}
//                       </span>
//                     </td>

//                     {/* Actions column */}
//                     <td className="py-4 px-6">
//                       <div className="flex items-center justify-center gap-2">
//                         <button 
//                           type="button" 
//                           onClick={() => alert(`Tracking Workflow Code: ${order.orderCode}`)}
//                           className="h-8 w-8 rounded-lg border border-gray-200 hover:border-[#006B6B] bg-white flex items-center justify-center text-gray-500 hover:text-[#006B6B] transition-all"
//                           title="Track Order"
//                         >
//                           <Eye size={14} />
//                         </button>
//                         <button 
//                           type="button" 
//                           onClick={() => alert(`Printing Summary Invoice for ID: #${order.id}`)}
//                           className="h-8 w-8 rounded-lg bg-gray-50 hover:bg-[#007A7A] border border-gray-200 hover:border-[#007A7A] flex items-center justify-center text-gray-600 hover:text-white transition-all"
//                           title="Print Document"
//                         >
//                           <Printer size={14} />
//                         </button>
//                       </div>
//                     </td>

//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// }

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Navigation handle karne ke liye
import axios from "axios";
import { 
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
  ArrowRight
} from "lucide-react";

// ─── Constants & Validators ──────────────────────────────────────────────────
const BASE_URL = "https://web-production-efff7.up.railway.app";
const API_ENDPOINT = `${BASE_URL}/api/v1/orders`;

const validators = {
  address_id: (v) => !v ? "Address ID is required" : "",
  service_id: (v) => !v ? "Service ID is required" : "",
  cloth_details: (v) => !v || v.trim().length < 3 ? "Cloth details required (min 3 chars)" : "",
  customization_notes: (v) => !v || v.trim().length < 3 ? "Customization requirements required" : "",
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
};

// ─── Shared InputField Component ──────────────────────────────────────────────
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
        {label} {name !== "description" && name !== "fabric_notes" && name !== "measurement_id" && <span className="text-red-600 font-bold">*</span>}
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
        <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
          <AlertCircle size={12} className="shrink-0" /> {error}
        </p>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddOrder() {
  const [form, setForm] = useState(INIT_FORM);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false); 
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");
  
  const navigate = useNavigate(); // Router hook definition
  const fileInputRef = useRef(null);

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

    try {
      const payload = {};
      Object.keys(form).forEach((key) => {
        const value = form[key];
        if (typeof value === "string" && value.trim() === "") return;
        if (value === undefined || value === null) return;
        payload[key] = value;
      });

      if (payload.measurement_id) payload.measurement_id = Number(payload.measurement_id);
      if (payload.address_id) payload.address_id = Number(payload.address_id);
      if (payload.service_id) payload.service_id = Number(payload.service_id);
      
      payload.image_references = []; 

      await axios.post(API_ENDPOINT, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setStatus("success");
      setMsg("Order created successfully!");

      // ─── REDIRECTION TO DASHBOARD ───
      // 1.5 seconds ke delay ke bad automatic user aapke main dashboard path par redirect ho jayega
      setTimeout(() => {
        navigate("/dashboard"); // Yahan aap apna correct dashboard url path badal sakte hain (e.g. "/" ya "/orders")
      }, 1500);

    } catch (err) {
      setStatus("error");
      setMsg(err.response?.data?.detail?.[0]?.msg || "Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetFormState = () => {
    setForm(INIT_FORM);
    setErrors({});
    setShowErrors(false);
    setImages([]);
    setImagePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden my-6">
      
      {/* Header */}
      <div className="bg-[#025e5e] px-8 py-5 text-white">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <ShoppingCart size={20} /> Create New Tailoring Order
        </h2>
        <p className="text-teal-100 text-xs mt-0.5">Fill in the order requirements to deploy into the pipeline</p>
      </div>

      <div className="p-8 space-y-6">
        {status && (
          <div className={`rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-3 border-2
            ${status === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
          >
            {status === "success" ? <CheckCircle2 size={17} className="text-emerald-500 shrink-0" /> : <XCircle size={17} className="text-red-500 shrink-0" />}
            <span className="flex-1">{msg} {status === "success" && "Redirecting to Dashboard..."}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Image Upload Area */}
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 h-full min-h-[170px]">
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 w-full max-h-[140px] overflow-y-auto p-1">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-full h-14 rounded-lg overflow-hidden border border-[#006B6B] shadow-sm group">
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute inset-0 bg-black/50 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div onClick={() => fileInputRef.current.click()} className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-[#007A7A]">
                  <ImageIcon size={32} className="mb-1" />
                  <span className="text-xs font-bold">Image References</span>
                </div>
              )}
              <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>

            {/* ID Fields Configuration */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField icon={MapPin} name="address_id" type="number" label="Address ID" placeholder="e.g. 5" value={form.address_id} onChange={onChange} error={errors.address_id} showErrors={showErrors} />
              <InputField icon={Scissors} name="service_id" type="number" label="Service ID" placeholder="e.g. 101" value={form.service_id} onChange={onChange} error={errors.service_id} showErrors={showErrors} />
              <InputField icon={Layers} name="measurement_id" type="number" label="Measurement ID (Optional)" placeholder="e.g. 12" value={form.measurement_id} onChange={onChange} showErrors={showErrors} />
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Urgency Level *</label>
                <select name="urgency_level" value={form.urgency_level} onChange={onChange} className="w-full h-11 px-3 text-sm rounded-xl border-2 border-gray-300 bg-gray-50 outline-none focus:border-[#006B6B] text-gray-700">
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                </select>
              </div>
            </div>

          </div>

          {/* Customization Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField icon={FileText} name="cloth_details" label="Cloth Details" placeholder="e.g. Blue cotton cloth" value={form.cloth_details} onChange={onChange} error={errors.cloth_details} showErrors={showErrors} />
            <InputField icon={FileText} name="customization_notes" label="Customization Notes" placeholder="e.g. Chinese collar" value={form.customization_notes} onChange={onChange} error={errors.customization_notes} showErrors={showErrors} />
          </div>

          {/* Note Area Fields */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-800">Stitching/Fit Description</label>
            <textarea name="description" rows={2} value={form.description} placeholder="e.g. Need slim fit stitching details..." onChange={onChange} className="w-full pl-4 pr-4 py-3 text-sm rounded-xl border-2 border-gray-300 outline-none bg-gray-50 focus:bg-white focus:border-[#006B6B] resize-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-800">Fabric Notes</label>
            <textarea name="fabric_notes" rows={2} value={form.fabric_notes} placeholder="e.g. Pure Linen blend style specifications..." onChange={onChange} className="w-full pl-4 pr-4 py-3 text-sm rounded-xl border-2 border-gray-300 outline-none bg-gray-50 focus:bg-white focus:border-[#006B6B] resize-none" />
          </div>

          {/* Footer Control Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button type="button" onClick={resetFormState} disabled={loading} className="h-11 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
              <RotateCcw size={15} /> Reset
            </button>
            <button type="submit" disabled={loading} className="h-11 px-8 bg-[#007A7A] hover:bg-[#006B6B] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all">
              {loading ? "Processing..." : "Submit "}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}