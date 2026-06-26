/**
 * GENERAL SETTINGS COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the General section of the Settings page.
 * Fields: Site Name, Company Name, Email, Phone, Timezone, Language.
 *
 * API connection point (when ready):
 *   GET  /api/v1/admin/settings  → loads initial values
 *   PUT  /api/v1/admin/settings/general → called on "Save Changes"
 *
 * Props (all from useSettings hook via SettingsPage):
 *   form          – current form state object
 *   errors        – field-level validation errors
 *   onChange      – unified change handler
 *   onSave        – submit handler
 *   saving        – boolean, disables save button while in-flight
 */

import FormInput from "../../../components/common/FormInput";
import SettingsCard from "./shared/SettingsCard";
import SaveButton from "./shared/SaveButton";
import { TIMEZONE_OPTIONS, LANGUAGE_OPTIONS } from "../constants/settings.constants";

export default function GeneralSettings({ form, errors, onChange, onSave, saving }) {
  return (
    <div className="space-y-6">
      {/* ── Site Information ──────────────────────────────────────────────── */}
      <SettingsCard
        title="Site Information"
        description="Basic information about your platform shown to users."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput
            label="Site Name"
            name="siteName"
            value={form.siteName}
            onChange={onChange}
            placeholder="BookMyDarzi"
            required
            error={errors.siteName}
          />
          <FormInput
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={onChange}
            placeholder="BookMyDarzi Pvt. Ltd."
            required
            error={errors.companyName}
          />
        </div>
      </SettingsCard>

      {/* ── Contact Details ───────────────────────────────────────────────── */}
      <SettingsCard
        title="Contact Details"
        description="Official contact information for your organisation."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput
            label="Support Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="admin@bookmydarzi.com"
            required
            error={errors.email}
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={onChange}
            placeholder="+91 98765 43210"
            error={errors.phone}
            hint="Optional. Include country code."
          />
        </div>
      </SettingsCard>

      {/* ── Localisation ──────────────────────────────────────────────────── */}
      <SettingsCard
        title="Localisation"
        description="Set the default timezone and language for the admin panel."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Timezone */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Timezone <span className="text-red-500">*</span>
            </label>
            <select
              name="timezone"
              value={form.timezone}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
            {errors.timezone && (
              <p className="mt-1 text-xs text-red-500">{errors.timezone}</p>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Language <span className="text-red-500">*</span>
            </label>
            <select
              name="language"
              value={form.language}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
            {errors.language && (
              <p className="mt-1 text-xs text-red-500">{errors.language}</p>
            )}
          </div>
        </div>
      </SettingsCard>

      {/* ── Save ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <SaveButton onClick={onSave} loading={saving} />
      </div>
    </div>
  );
}
