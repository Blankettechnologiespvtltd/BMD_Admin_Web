
import { useState, useRef } from "react";
import axios from "axios";
import TailorDetails from "./TailorDetails";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  Scissors,
  ShieldCheck,
  RotateCcw,
  UserPlus,
  FileUp,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  CloudUpload,
} from "lucide-react";

// ─── Validators ────────────────────────────────────────────────────────────────
const validators = {
  full_name: (v) =>
    v.trim().length < 3 ? "Name must be at least 3 characters" : "",
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
  phone: (v) =>
    /^[6-9]\d{9}$/.test(v) ? "" : "Enter a valid 10-digit phone number",
  specialization: (v) =>
    v.trim().length < 2 ? "Specialization is required" : "",
  address: (v) =>
    v.trim().length < 10 ? "Address must be at least 10 characters" : "",
  aadhar_no: (v) =>
    /^\d{12}$/.test(v) ? "" : "Enter a valid 12-digit Aadhar number",
  pan_no: (v) =>
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v.toUpperCase()) ? "Enter a valid PAN number" : "",
};

const INIT_FORM = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
  specialization: "",
  aadhar_no: "",
  pan_no: "",
  other_no: "",
};
const INIT_KYC = { aadhar: null, pan_card: null, other: null };

// ─── InputField ────────────────────────────────────────────────────────────────
const InputField = ({
  icon: Icon,
  name,
  label,
  placeholder,
  value,
  type = "text",
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const ok = touched && !error && value.trim() !== "";
  const err = touched && !!error;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-600 flex items-center gap-1">
        {label}
        <span className="text-red-600 font-bold">*</span>
      </label>
      <div className="relative">
        <span
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors
          ${err ? "text-red-600" : ok ? "text-[#006B6B]" : "text-gray-400"}`}
        >
          <Icon size={17} />
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          className={`w-full h-11 pl-11 pr-10 text-sm rounded-xl border-2 outline-none transition-all
            bg-gray-50 focus:bg-white placeholder:text-gray-400
            ${
              err
                ? "border-red-500 bg-red-50/20 focus:border-red-600"
                : ok
                  ? "border-[#006B6B] focus:border-[#007A7A]"
                  : "border-gray-300 focus:border-[#006B6B]"
            }`}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {err && <XCircle size={16} className="text-red-600" />}
          {ok && <CheckCircle2 size={16} className="text-[#007A7A]" />}
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

// ─── Revised KYC Card ──────────────────────────────────────────────────────────
const KycCard = ({
  label,
  icon: DocIcon,
  docKey,
  numberName,
  numberValue,
  numberPlaceholder,
  onNumberChange,
  onNumberBlur,
  error,
  touched,
  file,
  onUpload,
  onView,
  onDelete,
}) => {
  const ref = useRef(null);
  const has = !!file;
  const isErr = touched && !!error;

  return (
    <div className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-200/80 shadow-sm bg-white">
      {/* Document Number Input Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-700">
          {label}
          {numberName !== "other_no" && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        
        {isErr && (
          <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
            <AlertCircle size={11} /> {error}
          </p>
        )}
      </div>

      {/* Upload/Preview Zone */}
      <div className="relative">
        <input
          ref={ref}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files[0]) onUpload(docKey, e.target.files[0]);
            e.target.value = "";
          }}
        />

        {has ? (
          <div className="flex items-center gap-2 bg-teal-50/60 border border-teal-200 rounded-xl px-3 py-2.5">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
              <FileText size={15} className="text-teal-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-teal-900 font-semibold truncate">
                {file.name}
              </p>
              <p className="text-[10px] text-teal-600">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
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
            onClick={() => ref.current.click()}
            className="flex flex-col items-center justify-center gap-1.5 py-7 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 cursor-pointer hover:bg-[#007A7A]/5 hover:border-[#007A7A] transition-all group"
          >
            <DocIcon
              size={22}
              className="text-gray-400 group-hover:text-[#007A7A] transition-colors"
            />
            <p className="text-xs font-semibold text-gray-700 group-hover:text-[#007A7A]">
              {label}
            </p>
            <p className="text-[11px] text-gray-400">Click to upload</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Doc Viewer Modal ──────────────────────────────────────────────────────────
const DocModal = ({ file, onClose }) => {
  if (!file) return null;
  const url = URL.createObjectURL(file);
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
              <p className="text-sm font-bold text-gray-800 truncate max-w-xs">
                {file.name}
              </p>
              <p className="text-xs text-gray-400">
                {(file.size / 1024).toFixed(1)} KB &nbsp;·&nbsp; {file.type}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100
              hover:bg-red-100 hover:text-red-600 text-gray-500 transition-all"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          {isPdf ? (
            <iframe
              src={url}
              title="Preview"
              className="w-full h-[68vh] rounded-xl border"
            />
          ) : (
            <img
              src={url}
              alt="Preview"
              className="max-w-full max-h-[68vh] mx-auto rounded-xl shadow object-contain"
            />
          )}
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
        <h3 className="font-bold text-gray-800 text-base leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
    {badge}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const AddTailor = () => {
  const [form, setForm] = useState(INIT_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [kyc, setKyc] = useState(INIT_KYC);
  const [viewing, setViewing] = useState(null);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name])
      setErrors((p) => ({ ...p, [name]: validators[name]?.(value) || "" }));
  };
  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validators[name]?.(value) || "" }));
  };

  const validateAll = () => {
    const e = {},
      t = {};
    Object.keys(form).forEach((k) => {
      t[k] = true;
      e[k] = validators[k]?.(form[k]) || "";
    });
    setTouched(t);
    setErrors(e);
    return Object.values(e).every((v) => v === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (kyc.aadhar) formData.append("aadhar", kyc.aadhar);
      if (kyc.pan_card) formData.append("pan_card", kyc.pan_card);
      if (kyc.other) formData.append("other", kyc.other);

      await axios.post(
        "http://192.168.1.29:8000/api/v1/tailor/apply",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setStatus("success");
      setMsg("Tailor registered successfully!");
      reset();
    } catch (err) {
      setStatus("error");
      setMsg(
        err.response?.data?.message || "Failed to register. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(INIT_FORM);
    setErrors({});
    setTouched({});
    setKyc(INIT_KYC);
    if (status !== "success") {
      setStatus(null);
      setMsg("");
    }
  };

  const kycCount = Object.values(kyc).filter(Boolean).length;

  return (
    <>
      {viewing && <DocModal file={viewing} onClose={() => setViewing(null)} />}

      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* ── Header ── */}
        <div className="relative bg-[#025e5e] px-8 py-6 overflow-hidden">
          <Scissors
            size={140}
            className="absolute -right-8 -top-8 text-white opacity-[0.06] rotate-12"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
                <UserPlus size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">
                  Register New Tailor
                </h2>
                <p className="text-gray-200 text-sm mt-0.5">
                  Fill all details and upload KYC documents
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto max-h-[72vh]">
          <div className="px-8 py-7 space-y-8">
            {/* Status alert */}
            {status && (
              <div
                className={`rounded-xl px-4 py-3.5 text-sm font-semibold flex items-center gap-3 border-2
                ${
                  status === "success"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 shrink-0"
                  />
                ) : (
                  <XCircle size={18} className="text-red-500 shrink-0" />
                )}
                <span className="flex-1">{msg}</span>
                <button
                  onClick={() => setStatus(null)}
                  className="text-gray-500 hover:text-gray-600 transition-colors"
                >
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
                  subtitle="Basic identity and contact details"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    icon={User}
                    name="full_name"
                    label="Full Name"
                    placeholder="Enter full name"
                    value={form.full_name}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.full_name}
                    touched={touched.full_name}
                  />
                  <InputField
                    icon={Mail}
                    name="email"
                    label="Email Address"
                    placeholder="example@email.com"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <InputField
                    icon={Phone}
                    name="phone"
                    label="phone Number"
                    placeholder="10-digit phone number"
                    value={form.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.phone}
                    touched={touched.phone}
                  />
                  <InputField
                    icon={Scissors}
                    name="specialization"
                    label="Specialization"
                    placeholder="e.g. Bridal wear, Suits"
                    value={form.specialization}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={errors.specialization}
                    touched={touched.specialization}
                  />
                </div>

                {/* Address textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                    Complete Address{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={17}
                      className={`absolute left-3.5 top-3.5 pointer-events-none transition-colors
                      ${
                        touched.address && errors.address
                          ? "text-red-500"
                          : touched.address && !errors.address && form.address
                            ? "text-[#007A7A]"
                            : "text-gray-400"
                      }`}
                    />
                    <textarea
                      name="address"
                      rows={3}
                      value={form.address}
                      placeholder="Enter full shop or home address"
                      onChange={onChange}
                      onBlur={onBlur}
                      className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border-2 outline-none resize-none transition-all
                        bg-gray-50 focus:bg-white placeholder:text-gray-400
                        ${
                          touched.address && errors.address
                            ? "border-red-500 bg-red-50/20 focus:border-red-600"
                            : touched.address && !errors.address && form.address
                              ? "border-[#007A7A] focus:border-[#007A7A]"
                              : "border-gray-300 focus:border-[#007A7A]"
                        }`}
                    />
                  </div>
                  {touched.address && errors.address && (
                    <p className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} /> {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* ── KYC Section (UI Changed Here) ── */}
              <div className="space-y-5">
                <SectionHeader
                  icon={ShieldCheck}
                  title="KYC Verification"
                  subtitle="Enter document numbers and upload file copies"
                  badge={
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border border-amber-200 text-amber-600 bg-amber-50`}
                    >
                      {kycCount}/3 uploaded
                    </span>
                  }
                />

                {/* Grid Container for Updated UI layout */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <KycCard
                    label="Aadhar Card"
                    icon={CreditCard}
                    docKey="aadhar"
                    numberName="aadhar_no"
                    numberValue={form.aadhar_no}
                    // numberPlaceholder="Enter Aadhar Number"
                    onNumberChange={onChange}
                    onNumberBlur={onBlur}
                    error={errors.aadhar_no}
                    touched={touched.aadhar_no}
                    file={kyc.aadhar}
                    onUpload={(k, f) => setKyc((p) => ({ ...p, [k]: f }))}
                    onView={(k) => kyc[k] && setViewing(kyc[k])}
                    onDelete={(k) => setKyc((p) => ({ ...p, [k]: null }))}
                  />

                  <KycCard
                    label="PAN Card"
                    icon={FileText}
                    docKey="pan_card"
                    numberName="pan_no"
                    numberValue={form.pan_no}
                    numberPlaceholder="Enter PAN Card Number"
                    onNumberChange={onChange}
                    onNumberBlur={onBlur}
                    error={errors.pan_no}
                    touched={touched.pan_no}
                    file={kyc.pan_card}
                    onUpload={(k, f) => setKyc((p) => ({ ...p, [k]: f }))}
                    onView={(k) => kyc[k] && setViewing(kyc[k])}
                    onDelete={(k) => setKyc((p) => ({ ...p, [k]: null }))}
                  />

                  <KycCard
                    label="Other Document"
                    icon={FileText}
                    docKey="other"
                    numberName="other_no"
                    numberValue={form.other_no}
                    numberPlaceholder="Enter Document Number"
                    onNumberChange={onChange}
                    onNumberBlur={onBlur}
                    error={errors.other_no}
                    touched={touched.other_no}
                    file={kyc.other}
                    onUpload={(k, f) => setKyc((p) => ({ ...p, [k]: f }))}
                    onView={(k) => kyc[k] && setViewing(kyc[k])}
                    onDelete={(k) => setKyc((p) => ({ ...p, [k]: null }))}
                  />
                </div>

                {/* Yellow info tag */}
                <div className="flex items-center gap-2 bg-[#FFF9E6] border border-[#FFEBA6] rounded-xl px-4 py-2.5">
                  <AlertCircle size={15} className="text-[#D99B00] shrink-0" />
                  <p className="text-xs text-[#805B00] font-medium">
                    Accepted formats: JPG, PNG, PDF &nbsp;·&nbsp; Max 5 MB per file &nbsp;·&nbsp; All 3 documents recommended
                  </p>
                </div>
              </div>

              {/* ── Footer / Submit Row ── */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 hidden sm:block">
                  Fields marked <span className="text-red-400 font-bold">*</span> are mandatory
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={reset}
                    disabled={loading}
                    className="flex-1 sm:flex-none h-10 px-5 bg-gray-100 hover:bg-gray-200 active:bg-gray-300
                      disabled:opacity-50 text-gray-700 rounded-xl text-xs font-bold
                      flex items-center justify-center gap-1.5 transition-all"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-none h-10 px-6 bg-[#006B6B] hover:bg-[#005757] active:bg-[#004D4D]
                      disabled:opacity-60 text-white rounded-xl text-xs font-bold
                      flex items-center justify-center gap-1.5 transition-all shadow-md shadow-teal-700/10"
                  >
                    <UserPlus size={15} />
                    {loading ? "Submitting…" : "Submit"}
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
