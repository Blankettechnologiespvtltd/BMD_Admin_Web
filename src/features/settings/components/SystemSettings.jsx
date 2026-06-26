/**
 * SYSTEM SETTINGS COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Maintenance mode toggle, log level, and cache clear action.
 *
 * API connection points (when ready):
 *   GET  /api/v1/admin/settings          → loads system section
 *   PUT  /api/v1/admin/settings/system   → called on "Save System Settings"
 *   POST /api/v1/admin/system/clear-cache → called on "Clear Cache"
 *
 * Props (from useSettings hook via SettingsPage):
 *   form           – systemForm state
 *   onChange       – handleSystemChange
 *   onSave         – handleSaveSystem
 *   onClearCache   – handleClearCache
 *   saving         – saving.system boolean
 *   clearingCache  – saving.clearCache boolean
 */

import { MdWarningAmber } from "react-icons/md";
import SettingsCard from "./shared/SettingsCard";
import ToggleSwitch from "./shared/ToggleSwitch";
import SaveButton from "./shared/SaveButton";
import { LOG_LEVEL_OPTIONS } from "../constants/settings.constants";

export default function SystemSettings({ form, onChange, onSave, onClearCache, saving, clearingCache }) {
  return (
    <div className="space-y-6">
      {/* ── Maintenance Mode ──────────────────────────────────────────────── */}
      <SettingsCard
        title="Maintenance Mode"
        description="When enabled, the platform shows a maintenance page to all end-users. The admin panel remains accessible."
      >
        {/* Warning banner shown when maintenance is ON */}
        {form.maintenanceMode && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
            <MdWarningAmber size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700 font-medium">
              Maintenance mode is currently <strong>ON</strong>. Your platform is unavailable to customers.
            </p>
          </div>
        )}
        <ToggleSwitch
          name="maintenanceMode"
          checked={form.maintenanceMode}
          onChange={onChange}
          label="Enable Maintenance Mode"
          description="Temporarily take the customer-facing app offline for updates or fixes."
        />
      </SettingsCard>

      {/* ── Logging ───────────────────────────────────────────────────────── */}
      <SettingsCard
        title="Logging"
        description="Control the verbosity of server-side logs. Debug mode may impact performance."
      >
        <div className="max-w-xs">
          <label className="block mb-1.5 text-sm font-medium text-gray-700">
            Log Level
          </label>
          <select
            name="logLevel"
            value={form.logLevel}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
          >
            {LOG_LEVEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-400">
            Changes take effect on next server restart.
          </p>
        </div>
      </SettingsCard>

      {/* ── Cache ─────────────────────────────────────────────────────────── */}
      <SettingsCard
        title="Cache Management"
        description="Clear the server-side cache if you experience stale data across the platform."
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium text-gray-800">Clear Application Cache</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Removes cached API responses and static assets. The next request will rebuild the cache.
            </p>
          </div>
          <button
            type="button"
            onClick={onClearCache}
            disabled={clearingCache}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition disabled:opacity-60"
          >
            {clearingCache ? (
              <>
                <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                Clearing…
              </>
            ) : (
              "Clear Cache"
            )}
          </button>
        </div>
      </SettingsCard>

      {/* ── Save ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <SaveButton onClick={onSave} loading={saving} />
      </div>
    </div>
  );
}
