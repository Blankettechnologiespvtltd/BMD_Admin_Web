/**
 * SETTINGS PAGE
 * ─────────────────────────────────────────────────────────────────────────────
 * Main Admin Settings page. Purely declarative — all logic lives in useSettings().
 *
 * Structure:
 *   Left column  – vertical tab navigation (SETTINGS_TABS config-driven)
 *   Right column – active section component
 *
 * This component is responsible ONLY for:
 *   1. Rendering the page shell (header, tab sidebar, content area)
 *   2. Resolving which section component to render for the active tab
 *   3. Passing the right props from useSettings() to each component
 *
 * To add a new settings section:
 *   1. Add tab entry to settings.constants.js SETTINGS_TABS
 *   2. Create the component in ../components/
 *   3. Add it to TAB_COMPONENTS map below
 *   → Nothing else needs changing.
 *
 * API connection summary:
 *   Loaded on mount  : GET  /api/v1/admin/settings
 *   General          : PUT  /api/v1/admin/settings/general
 *   Profile          : PUT  /api/v1/admin/profile
 *   Change Password  : POST /api/v1/admin/profile/change-password
 *   Avatar           : POST /api/v1/admin/profile/avatar
 *   Security         : PUT  /api/v1/admin/settings/security
 *   Notifications    : PUT  /api/v1/admin/settings/notifications
 *   Appearance       : PUT  /api/v1/admin/settings/appearance
 *   System           : PUT  /api/v1/admin/settings/system
 *   Clear Cache      : POST /api/v1/admin/system/clear-cache
 *   Backup Now       : POST /api/v1/admin/backup/now
 *   Backup Settings  : PUT  /api/v1/admin/settings/backup
 *   Logout All       : POST /api/v1/admin/auth/logout-all
 *   Delete Account   : DELETE /api/v1/admin/account
 */

import {
  MdSettings, MdSecurity, MdNotifications, MdPalette,
  MdDns, MdBackup, MdWarning,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import { useSettings } from "../hooks/useSettings";
import { SETTINGS_TABS } from "../constants/settings.constants";

import Loader from "../../../components/common/Loader";
import ToastContainer from "../../../components/common/ToastContainer";

import GeneralSettings      from "../components/GeneralSettings";
import ProfileSettings      from "../components/ProfileSettings";
import SecuritySettings     from "../components/SecuritySettings";
import NotificationSettings from "../components/NotificationSettings";
import AppearanceSettings   from "../components/AppearanceSettings";
import SystemSettings       from "../components/SystemSettings";
import BackupSettings       from "../components/BackupSettings";
import DangerZone           from "../components/DangerZone";

// ── Icon registry ──────────────────────────────────────────────────────────────
const ICON_MAP = {
  MdSettings, MdSecurity, MdNotifications, MdPalette,
  MdDns, MdBackup, MdWarning, FaUserCircle,
};

export default function SettingsPage() {
  const {
    activeTab, setActiveTab,
    loading, saving,

    generalForm, generalErrors, handleGeneralChange, handleSaveGeneral,
    profileForm, profileErrors, handleProfileChange, handleSaveProfile,
    passwordForm, passwordErrors, handlePasswordChange, handleChangePassword,
    handleAvatarChange,
    securityForm, handleSecurityChange, handleSaveSecurity,
    notifForm, handleNotifChange, handleSaveNotifications,
    appearForm, handleAppearChange, handleSaveAppearance,
    systemForm, handleSystemChange, handleSaveSystem, handleClearCache,
    backupForm, handleBackupChange, handleSaveBackup, handleBackupNow,

    showLogoutAllModal, setShowLogoutAllModal, handleLogoutAllConfirm,
    showDeleteModal, setShowDeleteModal,
    deleteConfirmText, setDeleteConfirmText,
    handleDeleteAccountConfirm,

    toasts, removeToast,
  } = useSettings();

  // ── Section component registry ─────────────────────────────────────────────
  // Each key matches a SETTINGS_TABS id.
  const TAB_COMPONENTS = {
    general: (
      <GeneralSettings
        form={generalForm}
        errors={generalErrors}
        onChange={handleGeneralChange}
        onSave={handleSaveGeneral}
        saving={!!saving.general}
      />
    ),
    profile: (
      <ProfileSettings
        profileForm={profileForm}
        profileErrors={profileErrors}
        onProfileChange={handleProfileChange}
        onSaveProfile={handleSaveProfile}
        savingProfile={!!saving.profile}
        passwordForm={passwordForm}
        passwordErrors={passwordErrors}
        onPasswordChange={handlePasswordChange}
        onChangePassword={handleChangePassword}
        savingPassword={!!saving.password}
        onAvatarChange={handleAvatarChange}
        savingAvatar={!!saving.avatar}
      />
    ),
    security: (
      <SecuritySettings
        form={securityForm}
        onChange={handleSecurityChange}
        onSave={handleSaveSecurity}
        saving={!!saving.security}
      />
    ),
    notifications: (
      <NotificationSettings
        form={notifForm}
        onChange={handleNotifChange}
        onSave={handleSaveNotifications}
        saving={!!saving.notifications}
      />
    ),
    appearance: (
      <AppearanceSettings
        form={appearForm}
        onChange={handleAppearChange}
        onSave={handleSaveAppearance}
        saving={!!saving.appearance}
      />
    ),
    system: (
      <SystemSettings
        form={systemForm}
        onChange={handleSystemChange}
        onSave={handleSaveSystem}
        onClearCache={handleClearCache}
        saving={!!saving.system}
        clearingCache={!!saving.clearCache}
      />
    ),
    backup: (
      <BackupSettings
        form={backupForm}
        onChange={handleBackupChange}
        onSave={handleSaveBackup}
        onBackupNow={handleBackupNow}
        saving={!!saving.backup}
        backingUpNow={!!saving.backupNow}
      />
    ),
    danger: (
      <DangerZone
        showLogoutAllModal={showLogoutAllModal}
        setShowLogoutAllModal={setShowLogoutAllModal}
        onLogoutAllConfirm={handleLogoutAllConfirm}
        savingLogoutAll={!!saving.logoutAll}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteConfirmText={deleteConfirmText}
        setDeleteConfirmText={setDeleteConfirmText}
        onDeleteAccountConfirm={handleDeleteAccountConfirm}
        savingDeleteAccount={!!saving.deleteAccount}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="p-6 max-w-7xl mx-auto">
        {/* ── Page Header ───────────────────────────────────────────────────── */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage your platform configuration, security, and preferences
          </p>
        </div>

        {/* ── Settings Layout: Tab Sidebar + Content ─────────────────────────── */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Loader text="Loading settings…" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ── Tab Navigation (left column on desktop, top row on mobile) ── */}
            <nav className="w-full lg:w-56 flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
              {SETTINGS_TABS.map((tab) => {
                const IconComponent = ICON_MAP[tab.icon];
                const isActive = activeTab === tab.id;
                const isDanger = tab.id === "danger";

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left mb-0.5 last:mb-0
                      ${isActive
                        ? isDanger
                          ? "bg-red-50 text-red-600"
                          : "bg-teal-600 text-white shadow-sm"
                        : isDanger
                          ? "text-red-400 hover:bg-red-50 hover:text-red-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                      }
                    `}
                  >
                    {IconComponent && <IconComponent size={17} className="flex-shrink-0" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* ── Active Section Content (right column) ─────────────────────── */}
            <div className="flex-1 min-w-0">
              {TAB_COMPONENTS[activeTab] ?? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <p className="text-gray-400 text-sm">Section not found.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
