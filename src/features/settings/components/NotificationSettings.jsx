/**
 * NOTIFICATION SETTINGS COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Toggle switches for: email, push, SMS notifications and weekly reports.
 *
 * API connection point (when ready):
 *   GET  /api/v1/admin/settings               → loads notifications section
 *   PUT  /api/v1/admin/settings/notifications → called on "Save Notifications"
 *
 * Props (from useSettings hook via SettingsPage):
 *   form     – notifForm state
 *   onChange – handleNotifChange
 *   onSave   – handleSaveNotifications
 *   saving   – saving.notifications boolean
 */

import SettingsCard from "./shared/SettingsCard";
import ToggleSwitch from "./shared/ToggleSwitch";
import SaveButton from "./shared/SaveButton";

export default function NotificationSettings({ form, onChange, onSave, saving }) {
  return (
    <div className="space-y-6">
      {/* ── Alert Channels ────────────────────────────────────────────────── */}
      <SettingsCard
        title="Alert Channels"
        description="Choose how you receive notifications from the admin panel."
      >
        <div className="divide-y divide-gray-50">
          <ToggleSwitch
            name="emailNotifications"
            checked={form.emailNotifications}
            onChange={onChange}
            label="Email Notifications"
            description="Receive alerts and system events via email."
          />
          <ToggleSwitch
            name="pushNotifications"
            checked={form.pushNotifications}
            onChange={onChange}
            label="Push Notifications"
            description="Browser push notifications for real-time alerts. Requires browser permission."
          />
          <ToggleSwitch
            name="smsNotifications"
            checked={form.smsNotifications}
            onChange={onChange}
            label="SMS Notifications"
            description="Receive critical alerts via text message on your registered mobile number."
          />
        </div>
      </SettingsCard>

      {/* ── Reports ───────────────────────────────────────────────────────── */}
      <SettingsCard
        title="Scheduled Reports"
        description="Automated reports delivered to your inbox."
      >
        <div className="divide-y divide-gray-50">
          <ToggleSwitch
            name="weeklyReports"
            checked={form.weeklyReports}
            onChange={onChange}
            label="Weekly Summary Report"
            description="Receive a weekly digest of orders, revenue, and platform activity every Monday."
          />
        </div>
      </SettingsCard>

      {/* ── Save ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <SaveButton onClick={onSave} loading={saving} />
      </div>
    </div>
  );
}
