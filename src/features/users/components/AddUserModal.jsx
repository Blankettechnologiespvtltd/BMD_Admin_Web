/**
 * ADD USER MODAL
 * ─────────────────────────────────────────────────────────────────────────────
 * Form to create a new admin/staff user.
 *
 * Fields sent to backend:
 *   first_name, last_name, email, mobile, role, is_active
 *
 * REMOVED per spec:
 *   - password  (intentionally excluded)
 *   - photo     (intentionally excluded)
 *
 * Validation:
 *   - All fields required (HTML5 + JS check)
 *   - Mobile: digits only, 7–15 chars
 *   - Email: browser-native type="email" validation
 *
 * Props:
 *   onClose() – close the modal
 *   onAdd(formData) – submit handler from useUsers hook
 *   loading   – disables submit while API call is in-flight
 */

import { useState, useCallback } from "react";
import FormInput from "../../../components/common/FormInput";

const INITIAL_FORM = {
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
  role: "employee",
  is_active: true,
};

export default function AddUserModal({ onClose, onAdd, loading }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // ── Input change handler ──────────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }, [errors]);

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{7,15}$/.test(formData.mobile.trim()))
      newErrors.mobile = "Enter a valid mobile number (7–15 digits)";
    if (!formData.role) newErrors.role = "Role is required";
    return newErrors;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Only send the fields the backend expects
    const { first_name, last_name, email, mobile, role, is_active } = formData;
    onAdd({ first_name, last_name, email, mobile, role, is_active });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 my-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Add New User</h2>
            <p className="text-sm text-gray-400 mt-0.5">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="John"
              required
              error={errors.first_name}
            />
            <FormInput
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Doe"
              required
              error={errors.last_name}
            />
          </div>

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            error={errors.email}
          />

          <FormInput
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="9876543210"
            required
            error={errors.mobile}
            hint="Digits only, 7–15 characters"
          />

          {/* Role select */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="employee">Employee</option>
              <option value="tailor">Tailor</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
            {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
          </div>

          {/* Active toggle */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 accent-teal-600 cursor-pointer"
            />
            <span className="text-sm text-gray-700">Mark as active user</span>
          </label>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating…" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
