/**
 * PROFILE SETTINGS COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Admin profile management: name, email, role display, avatar upload, password change.
 *
 * API connection points (when ready):
 *   GET  /api/v1/admin/settings     → loads profile.name, profile.email, profile.role, profile.avatarUrl
 *   PUT  /api/v1/admin/profile      → called on "Save Profile"
 *   POST /api/v1/admin/profile/avatar       → called on avatar file select
 *   POST /api/v1/admin/profile/change-password → called on "Change Password"
 *
 * Props (all from useSettings hook via SettingsPage):
 *   profileForm     – profile form state
 *   profileErrors   – field-level errors
 *   onProfileChange – change handler
 *   onSaveProfile   – submit handler
 *   savingProfile   – boolean
 *   passwordForm    – password form state
 *   passwordErrors  – field-level errors
 *   onPasswordChange– change handler
 *   onChangePassword– submit handler
 *   savingPassword  – boolean
 *   onAvatarChange  – file upload handler
 *   savingAvatar    – boolean
 */

import { useRef } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import FormInput from "../../../components/common/FormInput";
import StatusBadge from "../../../components/common/StatusBadge";
import SettingsCard from "./shared/SettingsCard";
import SaveButton from "./shared/SaveButton";

export default function ProfileSettings({
  profileForm,
  profileErrors,
  onProfileChange,
  onSaveProfile,
  savingProfile,
  passwordForm,
  passwordErrors,
  onPasswordChange,
  onChangePassword,
  savingPassword,
  onAvatarChange,
  savingAvatar,
}) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) onAvatarChange(file);
  };

  return (
    <div className="space-y-6">
      {/* ── Avatar & Identity ─────────────────────────────────────────────── */}
      <SettingsCard
        title="Admin Identity"
        description="Your profile information and role within the system."
      >
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar upload area */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div className="relative">
              {profileForm.avatarUrl ? (
                <img
                  src={profileForm.avatarUrl}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-teal-100 shadow"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-teal-50 border-4 border-teal-100 flex items-center justify-center shadow">
                  <FaUserCircle size={48} className="text-teal-300" />
                </div>
              )}
              {/* Camera overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={savingAvatar}
                className="absolute bottom-0 right-0 w-7 h-7 bg-teal-600 hover:bg-teal-700 text-white rounded-full flex items-center justify-center shadow transition disabled:opacity-60"
                title="Change avatar"
              >
                {savingAvatar
                  ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <FaCamera size={12} />
                }
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center">JPG or PNG, max 2MB</p>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* Name, Email, Role */}
          <div className="flex-1 min-w-0 space-y-4">
            <FormInput
              label="Full Name"
              name="name"
              value={profileForm.name}
              onChange={onProfileChange}
              placeholder="Admin Name"
              required
              error={profileErrors.name}
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={profileForm.email}
              onChange={onProfileChange}
              placeholder="admin@bookmydarzi.com"
              required
              error={profileErrors.email}
            />
            {/* Role is read-only — set by system */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                <StatusBadge status={profileForm.role} />
                <span className="text-xs text-gray-400">Role is assigned by system</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5 pt-5 border-t border-gray-100">
          <SaveButton onClick={onSaveProfile} loading={savingProfile} label="Save Profile" />
        </div>
      </SettingsCard>

      {/* ── Change Password ───────────────────────────────────────────────── */}
      <SettingsCard
        title="Change Password"
        description="Use a strong password with at least 8 characters."
      >
        <div className="space-y-4 max-w-md">
          <FormInput
            label="Current Password"
            name="currentPassword"
            type="password"
            value={passwordForm.currentPassword}
            onChange={onPasswordChange}
            placeholder="Enter current password"
            required
            error={passwordErrors.currentPassword}
          />
          <FormInput
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            onChange={onPasswordChange}
            placeholder="Min. 8 characters"
            required
            error={passwordErrors.newPassword}
          />
          <FormInput
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={onPasswordChange}
            placeholder="Repeat new password"
            required
            error={passwordErrors.confirmPassword}
          />
        </div>

        <div className="flex justify-end mt-5 pt-5 border-t border-gray-100">
          <SaveButton onClick={onChangePassword} loading={savingPassword} label="Change Password" />
        </div>
      </SettingsCard>
    </div>
  );
}
