/**
 * BACKUP SETTINGS COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Manual backup trigger, auto-backup toggle, and backup frequency.
 *
 * API connection points (when ready):
 *   GET  /api/v1/admin/settings          → loads backup.autoBackup, backup.backupFrequency, backup.lastBackupAt
 *   POST /api/v1/admin/backup/now        → called on "Backup Now"
 *   PUT  /api/v1/admin/settings/backup   → called on "Save Backup Settings"
 *
 * Props (from useSettings hook via SettingsPage):
 *   form           – backupForm state
 *   onChange       – handleBackupChange
 *   onSave         – handleSaveBackup
 *   onBackupNow    – handleBackupNow
 *   saving         – saving.backup boolean
 *   backingUpNow   – saving.backupNow boolean
 */

import { MdBackup, MdAccessTime } from "react-icons/md";
import SettingsCard from "./shared/SettingsCard";
import ToggleSwitch from "./shared/ToggleSwitch";
import SaveButton from "./shared/SaveButton";
import { BACKUP_FREQUENCY_OPTIONS } from "../constants/settings.constants";
import { formatDate } from "../../../utils/formatters";

export default function BackupSettings({ form, onChange, onSave, onBackupNow, saving, backingUpNow }) {
  return (
    <div className="space-y-6">
      {/* ── Manual Backup ─────────────────────────────────────────────────── */}
      <SettingsCard
        title="Manual Backup"
        description="Create an immediate snapshot of all platform data."
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium text-gray-800">Backup Now</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Immediately create a full database and file backup.
            </p>
            {/* Last backup timestamp */}
            {form.lastBackupAt && (
              <p className="text-xs text-teal-600 mt-1 flex items-center gap-1">
                <MdAccessTime size={13} />
                Last backup: {formatDate(form.lastBackupAt)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onBackupNow}
            disabled={backingUpNow}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition shadow-sm disabled:opacity-60"
          >
            {backingUpNow ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Starting…
              </>
            ) : (
              <>
                <MdBackup size={16} />
                Backup Now
              </>
            )}
          </button>
        </div>
      </SettingsCard>

      {/* ── Automated Backup ──────────────────────────────────────────────── */}
      <SettingsCard
        title="Automated Backup"
        description="Schedule recurring backups so your data is always protected."
      >
        <div className="divide-y divide-gray-50 mb-5">
          <ToggleSwitch
            name="autoBackup"
            checked={form.autoBackup}
            onChange={onChange}
            label="Enable Auto Backup"
            description="Automatically back up platform data on a recurring schedule."
          />
        </div>

        {/* Backup Frequency — only shown when auto backup is ON */}
        {form.autoBackup && (
          <div className="max-w-xs mt-2">
            <label className="block mb-1.5 text-sm font-medium text-gray-700">
              Backup Frequency
            </label>
            <select
              name="backupFrequency"
              value={form.backupFrequency}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              {BACKUP_FREQUENCY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-400">
              Backups run at midnight server time.
            </p>
          </div>
        )}
      </SettingsCard>

      {/* ── Save ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <SaveButton onClick={onSave} loading={saving} label="Save Backup Settings" />
      </div>
    </div>
  );
}
