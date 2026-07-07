import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { 
  Hash, 
  User, 
  Mail,
  Eye,
  Trash2, 
  Phone, 
  MapPin, 
  Globe, 
  Landmark, 
  Image as ImageIcon,
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  UserPlus,
  X,
  CreditCard,
  FileText
} from "lucide-react";

// ─── Constants & Validators ──────────────────────────────────────────────────

const API_ENDPOINT = "/employee/orders";

const validators = {
  name: (v) => v.trim().length < 3 ? "Name must be at least 3 characters" : "",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
  mobile: (v) => /^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit mobile number",
  address: (v) => v.trim().length < 10 ? "Address must be at least 10 characters" : "",
  area: (v) => v.trim().length < 2 ? "Area/City is required" : "",
  bank_account: (v) => /^\d{9,18}$/.test(v) ? "" : "Enter a valid Bank Account number (9-18 digits)",
};

const INIT_FORM = {
  bridge_id: "", 
  name: "",
  email: "",
  mobile: "",
  address: "",
  area: "",
  bank_account: "",
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
  const isSuccess = showErrors && !error && value && value.trim() !== "";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
        {label} {name !== "bridge_id" && <span className="text-red-600 font-bold">*</span>}
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

// ─── Shared SectionHeader Component ───────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, subtitle, badge }) => (
  <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 border border-teal-100">
        <Icon size={20} className="text-teal-600" />
      </div>
      <div>
        <h3 className="font-bold text-gray-800 text-base leading-tight">{title}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
    {badge}
  </div>
);

// ─── Shared KycCard Component ─────────────────────────────────────────────────
const KycCard = ({ label, icon: Icon, docKey, file, onUpload, onView, onDelete }) => {
  const fileRef = useRef(null);
  
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 bg-gray-50 flex flex-col items-center justify-center text-center min-h-[140px] relative">
      {file ? (
        <div className="w-full flex flex-col items-center justify-between h-full gap-2">
          <Icon size={32} className="text-[#007A7A]" />
          <span className="text-xs font-semibold text-gray-700 truncate max-w-[180px]">
            {file.name || `${label} Uploaded`}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onView(docKey)}
              title="View"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-teal-200 text-emerald-600 hover:bg-emerald-50 transition-all"
            >
              <Eye size={13} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(docKey)}
              title="Delete"
              className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-red-200 text-red-500 hover:bg-red-50 transition-all"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileRef.current.click()} 
          className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-[#007A7A] transition-colors"
        >
          <Icon size={32} className="mb-1.5" />
          <span className="text-xs font-bold text-gray-700">{label}</span>
          <span className="text-[10px] text-gray-400 mt-0.5">Click to upload</span>
          <input 
            ref={fileRef}
            type="file" 
            accept=".jpg,.jpeg,.png,.pdf" 
            className="hidden" 
            onChange={(e) => e.target.files[0] && onUpload(docKey, e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
};

// ─── Main AddBridge Component ──────────────────────────────────────────────────
 function AddBridge() {
  const [form, setForm] = useState(INIT_FORM);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false); 
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");

  const [kyc, setKyc] = useState({ aadhar: null, pan_card: null, other: null });
  const [activePreview, setActivePreview] = useState(null);

  const fileInputRef = useRef(null);
  const kycCount = Object.values(kyc).filter(Boolean).length;

  useEffect(() => {
    const randomId = "BMD" + Math.floor(1000 + Math.random() * 900000);
    setForm(prev => ({ ...prev, bridge_id: randomId }));
  }, [status]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: validators[name]?.(value) || "" }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onUpload = (key, file) => setKyc((p) => ({ ...p, [key]: file }));
  const onDelete = (key) => setKyc((p) => ({ ...p, [key]: null }));
  
  const onView = (key) => {
    if (kyc[key]) {
      const fileURL = URL.createObjectURL(kyc[key]);
      setActivePreview({
        url: fileURL,
        name: kyc[key].name,
        type: kyc[key].type
      });
    }
  };

  const runFormValidation = () => {
    const localErrors = {};
    Object.keys(form).forEach((key) => {
      if (key !== "bridge_id") {
        const errorMsg = validators[key]?.(form[key]) || "";
        if (errorMsg) localErrors[key] = errorMsg;
      }
    });
    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true); 
    const isFormValid = runFormValidation();

    if (!isFormValid) return;
    if (!photo) {
      alert("Please upload a Profile Photo.");
      return;
    }
    if (kycCount < 2) {
      alert("Please upload at least 2 Documents.");
      return;
    }
    
    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("photo", photo);
      if (kyc.aadhar) formData.append("aadhar_doc", kyc.aadhar);
      if (kyc.pan_card) formData.append("pan_doc", kyc.pan_card);
      if (kyc.other) formData.append("other_doc", kyc.other);

     
      await api.post(API_ENDPOINT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("success");
      setMsg("Bridge registered successfully!");
      reset();
    } catch (err) {
      setStatus("error");
      setMsg(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm({ ...INIT_FORM, bridge_id: "BRG-" + Math.floor(100000 + Math.random() * 900000) });
    setErrors({});
    setShowErrors(false); 
    setKyc({ aadhar: null, pan_card: null, other: null });
    removePhoto();
    if (status !== "success") {
      setStatus(null);
      setMsg("");
    }
  };

  const handleClosePage = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.close();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 my-6 relative">
      
      <button
        type="button"
        onClick={handleClosePage}
        title="Close Portal"
        className="absolute -top-3.5 -right-3.5 w-8 h-8 bg-[#ff2e3d] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all transform hover:scale-115 active:scale-95 z-40 border border-white/20"
      >
        <X size={16} strokeWidth={3} />
      </button>

      <div className="bg-[#025e5e] px-8 py-6 text-white relative rounded-t-2xl">
        <h2 className="text-xl font-bold">Bridge Registration Portal</h2>
        <p className="text-teal-100 text-xs mt-1">Please enter verification details and complete profile setup</p>
      </div>

      <div className="overflow-y-auto max-h-[75vh] rounded-b-2xl">
        <div className="p-8 space-y-8">
          
          {status && (
            <div className={`rounded-xl px-4 py-3.5 text-sm font-semibold flex items-center gap-3 border-2
              ${status === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}
            >
              {status === "success" ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <XCircle size={18} className="text-red-500 shrink-0" />}
              <span className="flex-1">{msg}</span>
              <button type="button" onClick={() => setStatus(null)} className="text-gray-500 hover:text-gray-600">
                <X size={16} />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            
            {/* 1. Personal Information Section */}
            <div className="space-y-5">
              <SectionHeader icon={User} title="Personal Information" subtitle="Basic identity and contact details" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 h-full min-h-[180px]">
                  {photoPreview ? (
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#006B6B] shadow-md group">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute inset-0 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current.click()} 
                      className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-[#007A7A] transition-colors"
                    >
                      <ImageIcon size={36} className="mb-2" />
                      <span className="text-xs font-bold">Upload Photo</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG (Max 2MB)</span>
                    </div>
                  )}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoChange} 
                  />
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    icon={Hash}
                    name="bridge_id"
                    label="Bridge ID (Auto Generated)"
                    value={form.bridge_id}
                    disabled={true}
                    showErrors={showErrors}
                  />
                  <InputField
                    icon={User}
                    name="name"
                    label="Full Name"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={onChange}
                    error={errors.name}
                    showErrors={showErrors}
                  />
                  <InputField
                    icon={Mail}
                    name="email"
                    label="Email Address"
                    placeholder="name@example.com"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    error={errors.email}
                    showErrors={showErrors}
                  />
                  <InputField
                    icon={Phone}
                    name="mobile"
                    label="Mobile Number"
                    placeholder="10-digit number"
                    value={form.mobile}
                    onChange={onChange}
                    error={errors.mobile}
                    showErrors={showErrors}
                  />
                </div>
              </div>
            </div>

            {/* 2. Address & Location Section */}
            <div className="space-y-5">
              <SectionHeader icon={MapPin} title="Location Details" subtitle="Area and operational address information" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  icon={Globe}
                  name="area"
                  label="Area / Region"
                  placeholder="e.g. Sector 62, Noida"
                  value={form.area}
                  onChange={onChange}
                  error={errors.area}
                  showErrors={showErrors}
                />
                <InputField
                  icon={Landmark}
                  name="bank_account"
                  label="Bank Account Number"
                  placeholder="Enter bank account number"
                  value={form.bank_account}
                  onChange={onChange}
                  error={errors.bank_account}
                  showErrors={showErrors}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                  Complete Address <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <MapPin size={17} className={`absolute left-3.5 top-3.5 pointer-events-none ${showErrors && errors.address ? "text-red-600" : "text-gray-400"}`} />
                  <textarea
                    name="address"
                    rows={2}
                    value={form.address}
                    placeholder="Enter full address details"
                    onChange={onChange}
                    className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border-2 outline-none resize-none transition-all bg-gray-50 focus:bg-white
                      ${showErrors && errors.address ? "border-red-500 focus:border-red-600" : showErrors && form.address ? "border-[#006B6B] focus:border-[#007A7A]" : "border-gray-300 focus:border-[#007A7A]"}`}
                  />
                </div>
                {showErrors && errors.address && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} /> {errors.address}
                  </p>
                )}
              </div>
            </div>

            {/* 3. KYC Verification Section */}
            <div className="space-y-5">
              <SectionHeader
                icon={ShieldCheck}
                title="KYC Verification"
                subtitle="Enter document numbers and upload file copies"
                badge={
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 ${
                    kycCount === 3 ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-amber-50 text-amber-600 border-amber-200"
                  }`}>
                    {kycCount}/3 uploaded
                  </span>
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <KycCard label="Document 1" icon={CreditCard} docKey="aadhar" file={kyc.aadhar} onUpload={onUpload} onView={onView} onDelete={onDelete} />
                <KycCard label="Document 2" icon={FileText} docKey="pan_card" file={kyc.pan_card} onUpload={onUpload} onView={onView} onDelete={onDelete} />
                <KycCard label="Other Document" icon={FileText} docKey="other" file={kyc.other} onUpload={onUpload} onView={onView} onDelete={onDelete} />
              </div>

              <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-100 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-amber-500 shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  Accepted formats: JPG, PNG, PDF &nbsp;·&nbsp; Max 5 MB per file &nbsp;·&nbsp; All 3 documents recommended
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 hidden sm:block">
                Fields marked <span className="text-red-400 font-bold">*</span> are mandatory
              </p>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={reset}
                  disabled={loading}
                  className="flex-1 sm:flex-none h-11 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw size={15} /> Reset
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none h-11 px-8 bg-[#007A7A] hover:bg-[#006B6B] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all"
                >
                  <UserPlus size={16} />
                  {loading ? "Saving…" : "Submit"}
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* ─── Inner Document Preview Modal Overlay ─── */}
      {activePreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
            
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100 shrink-0">
                  <FileText size={18} className="text-teal-600" />
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-gray-800 text-sm truncate">{activePreview.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 uppercase">{activePreview.type.split('/')[1] || "Document"}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setActivePreview(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex items-center justify-center bg-gray-100/50 flex-1 min-h-[300px]">
              {activePreview.type.includes("pdf") ? (
                <iframe 
                  src={activePreview.url} 
                  title="Document Preview" 
                  className="w-full h-[50vh] rounded-xl border border-gray-200 bg-white"
                />
              ) : (
                <img 
                  src={activePreview.url} 
                  alt="Document Preview" 
                  className="max-w-full max-h-[50vh] object-contain rounded-xl shadow-md border border-gray-200 bg-white" 
                />
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
export default AddBridge