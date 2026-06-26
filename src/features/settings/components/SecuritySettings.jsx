/**
 * SECURITY SETTINGS COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Toggles and selects for: 2FA, login alerts, session timeout, password policy.
 *
 * API connection point (when ready):
 *   GET  /api/v1/admin/settings          → loads security section
 *   PUT  /api/v1/admin/settings/security → called on "Save Security Settings"
 *
 * Props (from useSettings hook via SettingsPage):
 *   form     – securityForm state
 *   onChange – handleSecurityChange
 *   onSave   – handleSaveSecurity
 *   saving   – saving.security boolean
 */

import SettingsCard from "./shared/SettingsCard";
import ToggleSwitch from "./shared/ToggleSwitch";
import SaveButton from "./shared/SaveButton";
import { SESSION_TIMEOUT_OPTIONS, PASSWORD_POLICY_OPTIONS } from "../constants/settings.constants";

export default function SecuritySettings({ form, onChange, onSave, saving }) {
  return (
    <div className="space-y-6">
      {/* ── Authentication ────────────────────────────────────────────────── */}
      <SettingsCard
        title="Authentication"
        description="Control how logins and sessions are secured."
      >
        <div className="divide-y divide-gray-50">
          <ToggleSwitch
            name="twoFactorEnabled"
            checked={form.twoFactorEnabled}
            onChange={onChange}
            label="Two-Factor Authentication (2FA)"
            description="Require a verification code on every login. Recommended for all admin accounts."
          />
          <ToggleSwitch
            name="loginAlerts"
            checked={form.loginAlerts}
            onChange={onChange}
            label="Login Alerts"
            description="Send an email notification whenever a new login is detected on your account."
          />
        </div>
      </SettingsCard>

      {/* ── Session & Password Policy ────────────────────────────────────── */}
      <SettingsCard
        title="Session & Password Policy"
        description="Set how long sessions stay active and enforce password strength."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Session Timeout */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Session Timeout
            </label>
            <select
              name="sessionTimeout"
              value={form.sessionTimeout}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              {SESSION_TIMEOUT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-400">
              Auto-log out after this period of inactivity.
            </p>
          </div>

          {/* Password Policy */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Password Policy
            </label>
            <select
              name="passwordPolicy"
              value={form.passwordPolicy}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              {PASSWORD_POLICY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-400">
              Applied when new passwords are set.
            </p>
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
