import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeft, Edit2, Save, KeyRound, Trash2,
  User, Mail, Phone, MapPin, Scissors, ShieldCheck,
  CreditCard, FileText, Camera, CloudUpload,
  FileUp, Eye, CheckCircle2, XCircle, AlertCircle,
  X, UserCircle2, RotateCcw, UserPlus
} from "lucide-react";

// --- Layout Placeholder Component ---

const Layout = () => <div className="hidden">Layout Placeholder</div>;

// ─── Validators ────────────────────────────────────────────────────────────────
const validators = {
  full_name:     (v) => v.trim().length < 3  ? "Name must be at least 3 characters"    : "",
  email:        (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email",
  mobile:       (v) => /^[6-9]\d{9}$/.test(v) ? "" : "Enter valid 10-digit mobile",
  address:      (v) => v.trim().length < 5  ? "Address is too short"                  : "",
  aadhar:       (v) => /^\d{12}$/.test(v.replace(/\s/g, "")) ? "" : "Aadhar must be 12 digits",
  pan:          (v) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v.toUpperCase()) ? "" : "Valid PAN e.g. ABCDE1234F",
  other:        (v) => v.trim().length < 3  ? "Document ID required"                  : "",
};

// ─── InputField ────────────────────────────────────────────────────────────────
const InputField = ({ icon: Icon, name, label, placeholder, value, type = "text",
  onChange, onBlur, error, touched, disabled = false }) => {
  const ok  = touched && !error && value?.trim() !== "";
  const err = touched && !!error;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
        {label}
        {!disabled && <span className="text-red-400 font-bold">*</span>}
      </label>
      <div className="relative">
        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
          ${disabled ? "text-gray-300" : err ? "text-red-400" : ok ? "text-teal-500" : "text-gray-400"}`}>
          <Icon size={17} />
        </span>
        <input
          type={type} name={name} placeholder={placeholder} value={value ?? ""}
          onChange={onChange} onBlur={onBlur} disabled={disabled} autoComplete="off"
          className={`w-full h-11 pl-11 pr-10 text-sm rounded-xl border-2 outline-none transition-all
            placeholder:text-gray-300
            ${disabled
              ? "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
              : err
              ? "bg-red-50/20 border-red-300 focus:border-red-400"
              : ok
              ? "bg-white border-teal-400 focus:border-teal-500"
              : "bg-gray-50 border-gray-200 focus:bg-white focus:border-teal-400"}`}
        />
        {!disabled && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {err && <XCircle size={16} className="text-red-400" />}
            {ok  && <CheckCircle2 size={16} className="text-teal-500" />}
          </span>
        )}
      </div>
      {err && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} className="shrink-0" /> {error}
        </p>
      )}
    </div>
  );
};

// ─── SelectField ───────────────────────────────────────────────────────────────
const SelectField = ({ icon: Icon, name, label, value, onChange, options, disabled = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-600">{label}</label>
    <div className="relative">
      <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none
        ${disabled ? "text-gray-300" : "text-gray-400"}`}>
        <Icon size={17} />
      </span>
      <select
        name={name} value={value} onChange={onChange} disabled={disabled}
        className={`w-full h-11 pl-11 pr-4 text-sm rounded-xl border-2 outline-none transition-all appearance-none
          ${disabled
            ? "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-50 border-gray-200 focus:bg-white focus:border-teal-400"}`}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  </div>
);

// ─── KYC Card ──────────────────────────────────────────────────────────────────
const KycCard = ({ label, icon: DocIcon, docKey, file, onUpload, onView, onDelete, editMode }) => {
  const ref = useRef(null);
  const has = !!file;
  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-200
      ${has ? "border-teal-400 shadow-md shadow-teal-100/60" : "border-dashed border-gray-200 hover:border-teal-300"}`}>

      {/* Top strip */}
      <div className={`px-4 py-3.5 flex items-center justify-between
        ${has ? "bg-teal-600" : "bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
            ${has ? "bg-white/20" : "bg-white border-2 border-gray-200"}`}>
            <DocIcon size={18} className={has ? "text-white" : "text-gray-400"} />
          </div>
          <div>
            <p className={`text-sm font-bold ${has ? "text-white" : "text-gray-700"}`}>{label}</p>
            <p className={`text-xs mt-0.5 ${has ? "text-teal-100" : "text-gray-400"}`}>
              {has ? "File attached" : "Not uploaded"}
            </p>
          </div>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border
          ${has ? "bg-white/20 text-white border-white/30" : "bg-white text-gray-400 border-gray-200"}`}>
          {has ? "✓ Done" : "Pending"}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 bg-white space-y-3">
        {has ? (
          <div className="flex items-center gap-3 bg-teal-50 border-2 border-teal-200 rounded-xl px-4 py-3">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
              <FileText size={16} className="text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-teal-800 font-semibold truncate">{file.name}</p>
              <p className="text-[11px] text-teal-500 mt-0.5">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <CheckCircle2 size={18} className="text-teal-500 shrink-0" />
          </div>
        ) : (
          <div
            onClick={() => editMode && ref.current.click()}
            className={`flex flex-col items-center justify-center gap-2 py-6 rounded-xl
              bg-gray-50 border-2 border-dashed border-gray-200 transition-all group
              ${editMode ? "cursor-pointer hover:bg-teal-50/40 hover:border-teal-300" : "cursor-default"}`}>
            <CloudUpload size={28} className={`text-gray-300 ${editMode ? "group-hover:text-teal-400 transition-colors" : ""}`} />
            <p className={`text-xs font-semibold ${editMode ? "text-gray-400 group-hover:text-teal-600 transition-colors" : "text-gray-300"}`}>
              {editMode ? "Click to upload" : "No file uploaded"}
            </p>
            <p className="text-[11px] text-gray-300">JPG · PNG · PDF · max 5 MB</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden"
            onChange={(e) => { if (e.target.files[0]) onUpload(docKey, e.target.files[0]); e.target.value = ""; }} />

          <button type="button" onClick={() => ref.current.click()} disabled={!editMode}
            className={`flex-1 h-9 flex items-center justify-center gap-2 rounded-xl text-xs font-bold
              border-2 transition-all
              ${editMode
                ? "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300"
                : "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"}`}>
            <FileUp size={14} /> {has ? "Replace" : "Upload"}
          </button>

          <button type="button" onClick={() => onView(docKey)} disabled={!has} title="View"
            className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 transition-all
              ${has
                ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200"
                : "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"}`}>
            <Eye size={15} />
          </button>

          <button type="button" onClick={() => onDelete(docKey)} disabled={!has || !editMode} title="Delete"
            className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 transition-all
              ${has && editMode
                ? "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                : "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"}`}>
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Doc Viewer Modal ──────────────────────────────────────────────────────────
const DocModal = ({ file, onClose }) => {
  if (!file) return null;
  const url   = URL.createObjectURL(file);
  const isPdf = file.type === "application/pdf";
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-h-[92vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 truncate max-w-xs">{file.name}</p>
              <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB · {file.type}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-500 transition-all">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          {isPdf
            ? <iframe src={url} title="Preview" className="w-full h-[68vh] rounded-xl border" />
            : <img src={url} alt="Preview" className="max-w-full max-h-[68vh] mx-auto rounded-xl shadow object-contain" />}
        </div>
      </div>
    </div>
  );
};

// ─── Section Header ────────────────────────────────────────────────────────────
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

// ─── Main FullDetails Component ───────────────────────────────────────────────
const FullDetails = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const raw = location.state || {};
  
  // Extract data from state payload safely
  const tailorData = raw.tailor || {};

  // ── Form state (controlled) ─────────────────────────────────────────────────
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    mobile: "",
    address: "",
    specialization: "",
    role: "",
    status: "",
    verify: "",
    aadhar: "",
    pan: "",
    other: "",
  });

  // ── Sync incoming data on state changes ─────────────────────────────────────
  useEffect(() => {
    if (tailorData && Object.keys(tailorData).length > 0) {
      setForm({
        full_name: tailorData.full_name || "",
        email: tailorData.email || "",
        mobile: tailorData.mobile || "",
        address: tailorData.address || "",
        specialization: tailorData.specialization || "",
        role: tailorData.role || "",
        status: tailorData.is_active || tailorData.active ? "Active" : "Inactive",
        verify: tailorData.verify ? "Verified" : "Pending",
        aadhar: tailorData.aadhar || "",
        pan: tailorData.pan || "",
        other: tailorData.other || "",
      });
    }
  }, [location.state]);

  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [photo,   setPhoto]   = useState(null);
  const [kyc,     setKyc]     = useState({ aadhar: null, pan_card: null, other: null });
  const [viewing, setViewing] = useState(null);
  const [saveMsg, setSaveMsg] = useState(null); 
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const kycCount = Object.values(kyc).filter(Boolean).length;
  const tailorId = tailorData.tailor_id || raw.tailorId || "T-0001";
  const loading = false; 

  // ── Handlers ────────────────────────────────────────────────────────────────
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (touched[name]) setErrors(p => ({ ...p, [name]: validators[name]?.(value) || "" }));
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    setErrors(p => ({ ...p, [name]: validators[name]?.(value) || "" }));
  };

  const validateAll = () => {
    const e = {}, t = {};
    ["full_name", "email", "mobile"].forEach(k => {
      t[k] = true; e[k] = validators[k]?.(form[k]) || "";
    });
    setTouched(p => ({ ...p, ...t }));
    setErrors(p => ({ ...p, ...e }));
    return Object.values(e).every(v => v === "");
  };

  const handleSave = () => {
    if (!validateAll()) return;
    setSaveMsg("success");
    setEditMode(false);
    setTimeout(() => setSaveMsg(null), 3000);
  };

  const handleEdit = () => {
    setEditMode(true);
    setSaveMsg(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setErrors({});
    setTouched({});
    setSaveMsg(null);
    reset();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    navigate(-1);
  };

  const handleResetPassword = () => {
    alert("Password reset link sent successfully.");
  };

  const onUpload = (key, file) => setKyc(p => ({ ...p, [key]: file }));
  const onView = (key) => setViewing(kyc[key]);
  const onDelete = (key) => setKyc(p => ({ ...p, [key]: null }));

  const reset = () => {
    setForm({
      full_name: tailorData.full_name || "",
      email: tailorData.email || "",
      mobile: tailorData.mobile || "",
      address: tailorData.address || "",
      specialization: tailorData.specialization || "",
      role: tailorData.role || "",
      status: tailorData.is_active || tailorData.active ? "Active" : "Inactive",
      verify: tailorData.verify ? "Verified" : "Pending",
      aadhar: tailorData.aadhar || "",
      pan: tailorData.pan || "",
      other: tailorData.other || "",
    });
    setErrors({});
    setTouched({});
  };

  return (
    <>
      {viewing && <DocModal file={viewing} onClose={() => setViewing(null)} />}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={28} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center">Delete Tailor?</h3>
            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              This action cannot be undone. All data for <span className="font-semibold text-gray-700">{form.full_name || "this tailor"}</span> will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 h-11 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen bg-slate-100 overflow-hidden">
        <Layout />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page Header */}
          <div className="bg-teal-700 px-4 md:px-8 lg:px-20 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all">
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-white text-xl font-bold leading-tight">Tailor Profile</h1>
                <p className="text-teal-200 text-xs mt-0.5">ID: {tailorId} &nbsp;·&nbsp; View &amp; manage tailor details</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!editMode ? (
                <button onClick={handleEdit}
                  className="flex items-center gap-2 h-10 px-5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-sm font-bold border-2 border-white/20 transition-all">
                  <Edit2 size={16} /> Edit Profile
                </button>
              ) : (
                <>
                  <button onClick={handleCancel}
                    className="flex items-center gap-2 h-10 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold border-2 border-white/20 transition-all">
                    <X size={15} /> Cancel
                  </button>
                  <button onClick={handleSave}
                    className="flex items-center gap-2 h-10 px-5 bg-white text-teal-700 rounded-xl text-sm font-bold hover:bg-teal-50 transition-all shadow-lg">
                    <Save size={16} /> Save Changes
                  </button>
                </>
              )}
              <button onClick={handleResetPassword}
                className="flex items-center gap-2 h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all">
                <KeyRound size={15} /> Reset Password
              </button>
              <button onClick={() => setShowDeleteConfirm(true)}
                className="w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all">
                <Trash2 size={17} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

              {saveMsg && (
                <div className={`rounded-xl px-4 py-3.5 flex items-center gap-3 border-2 text-sm font-semibold
                  ${saveMsg === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                  {saveMsg === "success" ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> : <XCircle size={18} className="text-red-500 shrink-0" />}
                  <span className="flex-1">
                    {saveMsg === "success" ? "Profile updated successfully!" : "Failed to save. Please try again."}
                  </span>
                  <button onClick={() => setSaveMsg(null)} className="text-gray-400 hover:text-gray-600">
                    <X size={15} />
                  </button>
                </div>
              )}

              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-50 to-slate-50 px-6 py-5 border-b border-gray-100">
                  <div className="flex items-center gap-5">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-teal-100">
                        {photo ? (
                          <img src={URL.createObjectURL(photo)} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UserCircle2 size={48} className="text-teal-400" />
                          </div>
                        )}
                      </div>
                      {editMode && (
                        <label className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-teal-600 hover:bg-teal-700 rounded-xl flex items-center justify-center cursor-pointer shadow-lg transition-all">
                          <Camera size={15} className="text-white" />
                          <input type="file" accept=".jpg,.jpeg,.png" className="hidden"
                            onChange={(e) => e.target.files[0] && setPhoto(e.target.files[0])} />
                        </label>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-xl font-bold text-gray-800 truncate">{form.full_name || "—"}</h2>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                          ${form.status === "Active" ? "bg-teal-100 text-teal-700" : "bg-orange-100 text-orange-600"}`}>
                          {form.status || "—"}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                          ${form.verify === "Verified" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-600"}`}>
                          {form.verify || "—"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{form.email || "—"}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>📞 {form.mobile || "—"}</span>
                        <span>🏷️ {form.role || "—"}</span>
                        <span className="font-mono text-teal-600 font-semibold">#{tailorId}</span>
                      </div>
                    </div>

                    {editMode && (
                      <span className="text-xs font-bold px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full border-2 border-amber-200 shrink-0">
                        ✏️ Editing
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
                <SectionHeader
                  icon={User}
                  title="Personal Information"
                  subtitle="Basic profile and contact details" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField icon={User} name="full_name" label="Full Name" placeholder="Enter full name" value={form.full_name} onChange={onChange} onBlur={onBlur} error={errors.full_name} touched={touched.full_name} disabled={!editMode} />
                  <InputField icon={Mail} name="email" label="Email Address" placeholder="example@email.com" value={form.email} onChange={onChange} onBlur={onBlur} error={errors.email} touched={touched.email} disabled={!editMode} type="email" />
                  <InputField icon={Phone} name="mobile" label="Phone Number" placeholder="10-digit number" value={form.mobile} onChange={onChange} onBlur={onBlur} error={errors.mobile} touched={touched.mobile} disabled={!editMode} />
                  <InputField icon={Scissors} name="specialization" label="Specialization" placeholder="e.g. Bridal, Suits" value={form.specialization ?? ""} onChange={onChange} onBlur={onBlur} disabled={!editMode} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <SelectField icon={User} name="role" label="Role" value={form.role} onChange={onChange} disabled={!editMode}
                    options={[
                      { value: "", label: "Select Role" },
                      { value: "Tailor", label: "Tailor" },
                      { value: "Vendor", label: "Vendor" },
                    ]} />
                  <SelectField icon={CheckCircle2} name="status" label="Account Status" value={form.status} onChange={onChange} disabled={!editMode}
                    options={[
                      { value: "", label: "Select Status" },
                      { value: "Active", label: "Active" },
                      { value: "Inactive", label: "Inactive" },
                    ]} />
                  <SelectField icon={ShieldCheck} name="verify" label="Verification" value={form.verify} onChange={onChange} disabled={!editMode}
                    options={[
                      { value: "", label: "Select Verification" },
                      { value: "Verified", label: "Verified" },
                      { value: "Pending", label: "Pending" },
                    ]} />
                </div>
              </div>

              {/* KYC Verification Cards Area */}
              <div className="space-y-5">
                <SectionHeader
                  icon={ShieldCheck}
                  title="KYC Verification"
                  subtitle="Enter document numbers and upload file copies"
                  badge={
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border-2
                      ${kycCount === 3 ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-amber-50 text-amber-600 border-amber-200"}`}>
                      {kycCount}/3 uploaded
                    </span>
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <KycCard
                    label="Aadhar Card"
                    icon={CreditCard}
                    docKey="aadhar"
                    file={kyc.aadhar}
                    editMode={editMode}
                    onUpload={onUpload}
                    onView={onView}
                    onDelete={onDelete}
                  />
                  <KycCard
                    label="PAN Card"
                    icon={FileText}
                    docKey="pan_card"
                    file={kyc.pan_card}
                    editMode={editMode}
                    onUpload={onUpload}
                    onView={onView}
                    onDelete={onDelete}
                  />
                  <KycCard
                    label="Other Document"
                    icon={FileText}
                    docKey="other"
                    file={kyc.other}
                    editMode={editMode}
                    onUpload={onUpload}
                    onView={onView}
                    onDelete={onDelete}
                  />
                </div>

                {/* Info note */}
                <div className="flex items-center gap-3 bg-amber-50 border-2 border-amber-100 rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-700 font-medium">
                    Accepted formats: JPG, PNG, PDF &nbsp;·&nbsp; Max 5 MB per file &nbsp;·&nbsp; All 3 documents recommended
                  </p>
                </div>
              </div>

              {/* ── Footer ── */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t-2 border-gray-100">
                <p className="text-xs text-gray-400 hidden sm:block">
                  Fields marked <span className="text-red-400 font-bold">*</span> are required
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={reset}
                    disabled={loading}
                    className="flex-1 sm:flex-none h-11 px-6 bg-gray-100 hover:bg-gray-200 active:bg-gray-300
                      disabled:opacity-50 text-gray-700 rounded-xl text-sm font-bold
                      flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={15} /> Reset
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-none h-11 px-8 bg-[#007A7A] hover:bg-[#006B6B] active:bg-[#006B6B]
                      disabled:opacity-60 text-white rounded-xl text-sm font-bold
                      flex items-center justify-center gap-2
                      shadow-lg shadow-teal-500/25 hover:shadow-teal-500/35 transition-all"
                  >
                    <UserPlus size={16} />
                    {loading ? "Saving…" : "Register Tailor"}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FullDetails;