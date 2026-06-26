/**
 * useSettings HOOK
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom hook that connects the Settings page to the settings store.
 * Mirrors the exact same pattern as useUsers.js.
 *
 * Responsibilities:
 *   - Load all settings on mount
 *   - Manage local form state for each section (independent of each other)
 *   - Run validation before calling the store
 *   - Show toast notifications on save success / failure
 *   - Manage modal open/close state (confirmation dialogs)
 *
 * The SettingsPage and each section component stay purely declarative.
 * All logic is tested and changed in this single file.
 */

import { useEffect, useState, useCallback } from "react";
import useSettingsStore from "../store/settingsStore";
import { useToast } from "../../../hooks/useToast";
import {
  validateGeneral,
  validateProfile,
  validateChangePassword,
  isValid,
} from "../utils/settings.validation";
import { DEFAULT_SETTINGS } from "../constants/settings.constants";

export const useSettings = () => {
  const {
    settings,
    loading,
    saving,
    loadSettings,
    saveGeneral,
    saveProfile,
    changePassword,
    uploadAvatar,
    saveSecurity,
    saveNotifications,
    saveAppearance,
    saveSystem,
    clearCache,
    backupNow,
    saveBackup,
    logoutAllDevices,
    deleteAccount,
  } = useSettingsStore();

  const { toasts, showToast, removeToast } = useToast();

  // ── Active tab ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("general");

  // ── Confirmation modals ────────────────────────────────────────────────────
  const [showLogoutAllModal, setShowLogoutAllModal]   = useState(false);
  const [showDeleteModal,    setShowDeleteModal]       = useState(false);
  const [deleteConfirmText,  setDeleteConfirmText]     = useState("");

  // ── Section-level form errors ──────────────────────────────────────────────
  const [generalErrors,  setGeneralErrors]  = useState({});
  const [profileErrors,  setProfileErrors]  = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  // ── Local form state — each section is independent ─────────────────────────
  // Initialised from store (which starts with DEFAULT_SETTINGS and merges API data)
  const [generalForm,  setGeneralForm]  = useState(settings.general);
  const [profileForm,  setProfileForm]  = useState(settings.profile);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [securityForm, setSecurityForm] = useState(settings.security);
  const [notifForm,    setNotifForm]    = useState(settings.notifications);
  const [appearForm,   setAppearForm]   = useState(settings.appearance);
  const [systemForm,   setSystemForm]   = useState(settings.system);
  const [backupForm,   setBackupForm]   = useState(settings.backup);

  // ── Load settings on mount ─────────────────────────────────────────────────
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // ── Sync form state when store settings update (e.g. after API load) ──────
  useEffect(() => {
    setGeneralForm(settings.general);
    setProfileForm(settings.profile);
    setSecurityForm(settings.security);
    setNotifForm(settings.notifications);
    setAppearForm(settings.appearance);
    setSystemForm(settings.system);
    setBackupForm(settings.backup);
  }, [settings]);

  // ── Generic field change handler factory ───────────────────────────────────
  // Creates an onChange handler for a given form setter.
  // Supports text inputs, checkboxes, and selects.
  const makeChangeHandler = useCallback((setter) => (e) => {
    const { name, value, type, checked } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // ── Convenience change handlers for each section ───────────────────────────
  const handleGeneralChange  = makeChangeHandler(setGeneralForm);
  const handleProfileChange  = makeChangeHandler(setProfileForm);
  const handlePasswordChange = makeChangeHandler(setPasswordForm);
  const handleSecurityChange = makeChangeHandler(setSecurityForm);
  const handleNotifChange    = makeChangeHandler(setNotifForm);
  const handleAppearChange   = makeChangeHandler(setAppearForm);
  const handleSystemChange   = makeChangeHandler(setSystemForm);
  const handleBackupChange   = makeChangeHandler(setBackupForm);

  // ── Submit handlers — validate → call store → show toast ──────────────────

  const handleSaveGeneral = useCallback(async () => {
    const errors = validateGeneral(generalForm);
    if (!isValid(errors)) { setGeneralErrors(errors); return; }
    setGeneralErrors({});
    const result = await saveGeneral(generalForm);
    result.success
      ? showToast("General settings saved", "success")
      : showToast(result.message, "error");
  }, [generalForm, saveGeneral, showToast]);

  const handleSaveProfile = useCallback(async () => {
    const errors = validateProfile(profileForm);
    if (!isValid(errors)) { setProfileErrors(errors); return; }
    setProfileErrors({});
    const result = await saveProfile(profileForm);
    result.success
      ? showToast("Profile updated successfully", "success")
      : showToast(result.message, "error");
  }, [profileForm, saveProfile, showToast]);

  const handleChangePassword = useCallback(async () => {
    const errors = validateChangePassword(passwordForm);
    if (!isValid(errors)) { setPasswordErrors(errors); return; }
    setPasswordErrors({});
    const result = await changePassword(passwordForm);
    if (result.success) {
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showToast("Password changed successfully", "success");
    } else {
      showToast(result.message, "error");
    }
  }, [passwordForm, changePassword, showToast]);

  const handleAvatarChange = useCallback(async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    const result = await uploadAvatar(formData);
    result.success
      ? showToast("Avatar updated successfully", "success")
      : showToast(result.message, "error");
  }, [uploadAvatar, showToast]);

  const handleSaveSecurity = useCallback(async () => {
    const result = await saveSecurity(securityForm);
    result.success
      ? showToast("Security settings saved", "success")
      : showToast(result.message, "error");
  }, [securityForm, saveSecurity, showToast]);

  const handleSaveNotifications = useCallback(async () => {
    const result = await saveNotifications(notifForm);
    result.success
      ? showToast("Notification settings saved", "success")
      : showToast(result.message, "error");
  }, [notifForm, saveNotifications, showToast]);

  const handleSaveAppearance = useCallback(async () => {
    const result = await saveAppearance(appearForm);
    result.success
      ? showToast("Appearance settings saved", "success")
      : showToast(result.message, "error");
  }, [appearForm, saveAppearance, showToast]);

  const handleSaveSystem = useCallback(async () => {
    const result = await saveSystem(systemForm);
    result.success
      ? showToast("System settings saved", "success")
      : showToast(result.message, "error");
  }, [systemForm, saveSystem, showToast]);

  const handleClearCache = useCallback(async () => {
    const result = await clearCache();
    result.success
      ? showToast("Cache cleared successfully", "success")
      : showToast(result.message, "error");
  }, [clearCache, showToast]);

  const handleBackupNow = useCallback(async () => {
    const result = await backupNow();
    result.success
      ? showToast("Backup started successfully", "success")
      : showToast(result.message, "error");
  }, [backupNow, showToast]);

  const handleSaveBackup = useCallback(async () => {
    const result = await saveBackup(backupForm);
    result.success
      ? showToast("Backup settings saved", "success")
      : showToast(result.message, "error");
  }, [backupForm, saveBackup, showToast]);

  // ── Danger zone handlers ───────────────────────────────────────────────────

  const handleLogoutAllConfirm = useCallback(async () => {
    const result = await logoutAllDevices();
    setShowLogoutAllModal(false);
    if (result.success) {
      showToast("All devices logged out", "success");
      // Note: redirect to /login should happen here once API is live.
      // e.g. navigate(ROUTES.LOGIN, { replace: true });
    } else {
      showToast(result.message, "error");
    }
  }, [logoutAllDevices, showToast]);

  const handleDeleteAccountConfirm = useCallback(async () => {
    if (deleteConfirmText !== "DELETE") {
      showToast('Type "DELETE" to confirm account deletion', "error");
      return;
    }
    const result = await deleteAccount({ confirmationText: deleteConfirmText });
    if (result.success) {
      showToast("Account deleted. Redirecting…", "info");
      setShowDeleteModal(false);
      // Note: redirect to /login after account deletion once API is live.
    } else {
      showToast(result.message, "error");
    }
  }, [deleteConfirmText, deleteAccount, showToast]);

  return {
    // Page state
    activeTab, setActiveTab,
    loading,
    saving,

    // Form data
    generalForm,
    profileForm,
    passwordForm,
    securityForm,
    notifForm,
    appearForm,
    systemForm,
    backupForm,

    // Form errors
    generalErrors,
    profileErrors,
    passwordErrors,

    // Change handlers
    handleGeneralChange,
    handleProfileChange,
    handlePasswordChange,
    handleSecurityChange,
    handleNotifChange,
    handleAppearChange,
    handleSystemChange,
    handleBackupChange,

    // Avatar
    handleAvatarChange,

    // Submit handlers
    handleSaveGeneral,
    handleSaveProfile,
    handleChangePassword,
    handleSaveSecurity,
    handleSaveNotifications,
    handleSaveAppearance,
    handleSaveSystem,
    handleClearCache,
    handleBackupNow,
    handleSaveBackup,

    // Danger zone
    showLogoutAllModal, setShowLogoutAllModal,
    showDeleteModal,    setShowDeleteModal,
    deleteConfirmText,  setDeleteConfirmText,
    handleLogoutAllConfirm,
    handleDeleteAccountConfirm,

    // Toasts
    toasts,
    removeToast,
  };
};
