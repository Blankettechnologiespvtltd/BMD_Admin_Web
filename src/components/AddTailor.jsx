import { useState, useRef } from "react";
import axios from "axios";
import {
  User, Mail, Phone, MapPin, CreditCard, FileText,
  Scissors, ShieldCheck, RotateCcw, UserPlus,
  FileUp, Eye, Trash2, CheckCircle2, XCircle,
  AlertCircle, X, CloudUpload,
} from "lucide-react";

// ─── Validators ────────────────────────────────────────────────────────────────
const validators = {
  full_name:      (v) => v.trim().length < 3 ? "Name must be at least 3 characters" : "",
  email:          (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
  mobile:         (v) => /^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit mobile number",
  specialization: (v) => v.trim().length < 2 ? "Specialization is required" : "",
  address:        (v) => v.trim().length < 10 ? "Address must be at least 10 characters" : "",

};

const INIT_FORM = {
  full_name: "", email: "", mobile: "", address: "",
  specialization: "", aadhar: "", pan: "", other: "",
};
const INIT_KYC = { aadhar: null, pan: null, other: null };

// ─── InputField ────────────────────────────────────────────────────────────────
const InputField = ({
  icon: Icon, name, label, placeholder, value,
  type = "text", onChange, onBlur, error, touched,
}) => {
  const ok  = touched && !error && value.trim() !== "";
  const err = touched && !!error;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
        {label}
        <span className="text-red-600 font-bold">*</span>
      </label>
      <div className="relative">
        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
          ${err ? "text-red-600" : ok ? "text-[#006B6B]" : "text-gray-400"}`}>
          <Icon size={17} />
        </span>
        <input
          type={type} name={name} placeholder={placeholder} value={value}
          onChange={onChange} onBlur={onBlur} autoComplete="off"
          className={`w-full h-11 pl-11 pr-10 text-sm rounded-xl border-2 outline-none transition-all
            bg-gray-50 focus:bg-white placeholder:text-gray-400
            ${err ? "border-red-500 bg-red-50/20 focus:border-red-600"
                  : ok  ? "border-[#006B6B] focus:border-[#007A7A]"
                        : "border-gray-300 focus:border-[#006B6B]"}`}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {err && <XCircle size={16} className="text-red-600" />}
          {ok  && <CheckCircle2 size={16} className="text-[#007A7A]" />}
        </span>
      </div>
      {err && (
        <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
          <AlertCircle size={12} className="shrink-0" /> {error}
        </p>
      )}
    </div>
  );
};

// ─── KYC Card ──────────────────────────────────────────────────────────────────
const KycCard = ({ label, icon: DocIcon, docKey, file, onUpload, onView, onDelete }) => {
  const ref = useRef(null);
  const has = !!file;
  return (
    <div className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden
      ${has
        ? "border-[#006B6B] shadow-lg shadow-teal-100/60"
        : "border-dashed border-gray-200 hover:border-[#006B6B] hover:shadow-md"}`}>

      {/* ── Top strip ── */}
      <div className={`px-4 py-3.5 flex items-center justify-between
        ${has ? "bg-[#007A7A]" : "bg-linear-to-r from-gray-50 to-gray-100 border-b border-gray-100"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
            ${has ? "bg-white/20" : "bg-white border-2 border-gray-200 shadow-sm"}`}>
            <DocIcon size={18} className={has ? "text-white" : "text-gray-400"} />
          </div>
          <div>
            <p className={`text-sm font-bold leading-tight ${has ? "text-white" : "text-gray-700"}`}>
              {label}
            </p>
            <p className={`text-xs mt-0.5 ${has ? "text-teal-100" : "text-gray-400"}`}>
              {has ? "File attached" : "Not uploaded yet"}
            </p>
          </div>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border
          ${has
            ? "bg-white/20 text-white border-white/30"
            : "bg-white text-gray-400 border-gray-200"}`}>
          {has ? "✓ Done" : "Pending"}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="p-4 bg-white space-y-3">

        {/* File preview or drop zone */}
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
            onClick={() => ref.current.click()}
            className="flex flex-col items-center justify-center gap-2 py-6 rounded-xl
              bg-gray-50 border-2 border-dashed border-gray-200 cursor-pointer
              hover:bg-teal-50/40 hover:border-[#007A7A] transition-all group">
            <CloudUpload size={28} className="text-gray-300 group-hover:text-[#007A7A] transition-colors" />
            <p className="text-xs font-semibold text-gray-400 group-hover:text-[#007A7A] transition-colors">
              Click to upload
            </p>
            <p className="text-[11px] text-gray-300">JPG · PNG · PDF · max 5 MB</p>
          </div>
        )}

        {/* Action row */}
        <div className="flex items-center gap-2">
          <input
            ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden"
            onChange={(e) => { if (e.target.files[0]) onUpload(docKey, e.target.files[0]); e.target.value = ""; }} />

          <button
            type="button" onClick={() => ref.current.click()}
            className="flex-1 h-9 flex items-center justify-center gap-2 rounded-xl text-xs font-bold
              bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200
              hover:border-blue-300 transition-all">
            <FileUp size={14} />
            {has ? "Replace" : "Upload File"}
          </button>

          <button
            type="button" onClick={() => onView(docKey)} disabled={!has} title="View Document"
            className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 transition-all
              ${has
                ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200 hover:border-emerald-300"
                : "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"}`}>
            <Eye size={15} />
          </button>

          <button
            type="button" onClick={() => onDelete(docKey)} disabled={!has} title="Delete Document"
            className={`w-9 h-9 flex items-center justify-center rounded-xl border-2 transition-all
              ${has
                ? "bg-red-50 hover:bg-red-100 text-red-600 border-red-200 hover:border-red-300"
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
  const url  = URL.createObjectURL(file);
  const isPdf = file.type === "application/pdf";
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-h-[92vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 truncate max-w-xs">{file.name}</p>
              <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB &nbsp;·&nbsp; {file.type}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100
              hover:bg-red-100 hover:text-red-600 text-gray-500 transition-all">
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

// ─── Main Component ────────────────────────────────────────────────────────────
const AddTailor = () => {
  const [form, setForm]     = useState(INIT_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [kyc, setKyc]       = useState(INIT_KYC);
  const [viewing, setViewing] = useState(null);
  const [status, setStatus] = useState(null);
  const [msg, setMsg]       = useState("");
  const [loading, setLoading] = useState(false);

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
    Object.keys(form).forEach(k => { t[k] = true; e[k] = validators[k]?.(form[k]) || ""; });
    setTouched(t); setErrors(e);
    return Object.values(e).every(v => v === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setLoading(true); setStatus(null);
    try {
      await axios.post(" ", form, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus("success"); setMsg("Tailor registered successfully!");
      reset();
    } catch (err) {
      setStatus("error");
      setMsg(err.response?.data?.message || "Failed to register. Please try again.");
    } finally { setLoading(false); }
  };

  const reset = () => {
    setForm(INIT_FORM); setErrors({}); setTouched({}); setKyc(INIT_KYC);
    if (status !== "success") { setStatus(null); setMsg(""); }
  };

  const kycCount = Object.values(kyc).filter(Boolean).length;
  const filled   = Object.values(form).filter(v => v.trim() !== "").length;
  const total    = Object.keys(form).length;

  return (
    <>
      {viewing && <DocModal file={viewing} onClose={() => setViewing(null)} />}

      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* ── Header ── */}
        <div className="relative bg-[#025e5e] px-8 py-6 overflow-hidden">
          <Scissors size={140} className="absolute -right-8 -top-8 text-white opacity-[0.06] rotate-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
                <UserPlus size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">Register New Tailor</h2>
                <p className="text-gray-200 text-sm mt-0.5">Fill all details and upload KYC documents</p>
              </div>
            </div>
          
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto max-h-[72vh]">
          <div className="px-8 py-7 space-y-8">

            {/* Status alert */}
            {status && (
              <div className={`rounded-xl px-4 py-3.5 text-sm font-semibold flex items-center gap-3 border-2
                ${status === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-red-50 text-red-800 border-red-200"}`}>
                {status === "success"
                  ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  : <XCircle size={18} className="text-red-500 shrink-0" />}
                <span className="flex-1">{msg}</span>
                <button onClick={() => setStatus(null)} className="text-gray-500 hover:text-gray-600 transition-colors">
                  <X size={16} />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-8">

              {/* ── Personal Info ── */}
              <div className="space-y-5">
                <SectionHeader
                  icon={User}
                  title="Personal Information"
                  subtitle="Basic identity and contact details" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    icon={User} name="full_name" label="Full Name"
                    placeholder="Enter full name"
                    value={form.full_name} onChange={onChange} onBlur={onBlur}
                    error={errors.full_name} touched={touched.full_name} />
                  <InputField
                    icon={Mail} name="email" label="Email Address"
                    placeholder="example@email.com" type="email"
                    value={form.email} onChange={onChange} onBlur={onBlur}
                    error={errors.email} touched={touched.email} />
                  <InputField
                    icon={Phone} name="mobile" label="Mobile Number"
                    placeholder="10-digit mobile number"
                    value={form.mobile} onChange={onChange} onBlur={onBlur}
                    error={errors.mobile} touched={touched.mobile} />
                  <InputField
                    icon={Scissors} name="specialization" label="Specialization"
                    placeholder="e.g. Bridal wear, Suits"
                    value={form.specialization} onChange={onChange} onBlur={onBlur}
                    error={errors.specialization} touched={touched.specialization} />
                </div>

                {/* Address textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                    Complete Address <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={17} className={`absolute left-3.5 top-3.5 pointer-events-none transition-colors
                      ${touched.address && errors.address ? "text-red-500"
                        : touched.address && !errors.address && form.address ? "text-[#007A7A]"
                        : "text-gray-400"}`} />
                    <textarea
                      name="address" rows={3} value={form.address}
                      placeholder="Enter full shop or home address"
                      onChange={onChange} onBlur={onBlur}
                      className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border-2 outline-none resize-none transition-all
                        bg-gray-50 focus:bg-white placeholder:text-gray-400
                        ${touched.address && errors.address
                          ? "border-red-500 bg-red-50/20 focus:border-red-600"
                          : touched.address && !errors.address && form.address
                          ? "border-[#007A7A] focus:border-[#007A7A]"
                          : "border-gray-300 focus:border-[#007A7A]"}`} />
                  </div>
                  {touched.address && errors.address && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} /> {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* ── KYC Section ── */}
              <div className="space-y-5">
                <SectionHeader
                  icon={ShieldCheck}
                  title="KYC Verification"
                  subtitle="Enter document numbers and upload file copies"
                  badge={
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border-2
                      ${kycCount === 3
                        ? "bg-teal-50 text-teal-700 border-teal-200"
                        : "bg-amber-50 text-amber-600 border-amber-200"}`}>
                      {kycCount}/3 uploaded
                    </span>
                  } />

                

                {/* KYC upload cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <KycCard label="Aadhar Card"    icon={CreditCard} docKey="aadhar" file={kyc.aadhar}
                    onUpload={(k, f) => setKyc(p => ({ ...p, [k]: f }))}
                    onView={(k) => kyc[k] && setViewing(kyc[k])}
                    onDelete={(k) => setKyc(p => ({ ...p, [k]: null }))} />
                  <KycCard label="PAN Card"       icon={FileText}   docKey="pan"    file={kyc.pan}
                    onUpload={(k, f) => setKyc(p => ({ ...p, [k]: f }))}
                    onView={(k) => kyc[k] && setViewing(kyc[k])}
                    onDelete={(k) => setKyc(p => ({ ...p, [k]: null }))} />
                  <KycCard label="Other Document" icon={FileText}   docKey="other"  file={kyc.other}
                    onUpload={(k, f) => setKyc(p => ({ ...p, [k]: f }))}
                    onView={(k) => kyc[k] && setViewing(kyc[k])}
                    onDelete={(k) => setKyc(p => ({ ...p, [k]: null }))} />
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
                    type="button" onClick={reset} disabled={loading}
                    className="flex-1 sm:flex-none h-11 px-6 bg-gray-100 hover:bg-gray-200 active:bg-gray-300
                      disabled:opacity-50 text-gray-700 rounded-xl text-sm font-bold
                      flex items-center justify-center gap-2 transition-all">
                    <RotateCcw size={15} /> Reset
                  </button>
                  <button
                    type="submit" disabled={loading}
                    className="flex-1 sm:flex-none h-11 px-8 bg-[#007A7A] hover:bg-[#006B6B] active:bg-[#006B6B]
                      disabled:opacity-60 text-white rounded-xl text-sm font-bold
                      flex items-center justify-center gap-2
                      shadow-lg shadow-teal-500/25 hover:shadow-teal-500/35 transition-all">
                    <UserPlus size={16} />
                    {loading ? "Saving…" : "Register Tailor"}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTailor;
