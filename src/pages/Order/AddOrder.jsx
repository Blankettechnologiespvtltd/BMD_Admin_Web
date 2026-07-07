import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../services/api"; 
import { 
  MapPin, 
  Image as ImageIcon,
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  RotateCcw,
  ShoppingCart,
  FileText,
  Scissors,
  Layers
} from "lucide-react";

// ─── Constants & Validators ──────────────────────────────────────────────────

const API_ENDPOINT = "/orders";

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
  
  const navigate = useNavigate(); 
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

   
      await api.post(API_ENDPOINT, payload);

      setStatus("success");
      setMsg("Order created successfully!");

      setTimeout(() => {
        navigate("/dashboard"); 
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
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}