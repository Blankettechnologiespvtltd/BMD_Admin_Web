/**
 * SETTINGS STORE (Zustand)
 * ─────────────────────────────────────────────────────────────────────────────
 * Feature-specific state for the Settings module.
 * Mirrors the exact same pattern as userStore.js.
 *
 * STATE:
 *   settings      – current settings object (all sections merged)
 *   loading       – true while initial getSettings() is in-flight
 *   saving        – map of { sectionKey: boolean } — true while that section saves
 *   error         – last global error message (null if none)
 *
 * ACTIONS:
 *   loadSettings()          – fetch all settings on page mount
 *   saveGeneral(data)       – update general section
 *   saveProfile(data)       – update profile section
 *   changePassword(data)    – change password
 *   uploadAvatar(formData)  – upload a new avatar image
 *   saveSecurity(data)      – update security section
 *   saveNotifications(data) – update notification prefs
 *   saveAppearance(data)    – update appearance prefs
 *   saveSystem(data)        – update system settings
 *   clearCache()            – trigger cache clear
 *   backupNow()             – trigger manual backup
 *   saveBackup(data)        – update auto-backup settings
 *   logoutAllDevices()      – invalidate all sessions
 *   deleteAccount(data)     – permanently delete account
 *   clearError()            – reset error state
 *
 * DATA FLOW:
 *   Component → useSettings hook → store action → settingsApi → updates state → re-render
 */

import { create } from "zustand";
import { settingsApi } from "../api/settingsApi";
import { parseError } from "../../../utils/errorParser";
import { DEFAULT_SETTINGS } from "../constants/settings.constants";

const useSettingsStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  settings: DEFAULT_SETTINGS,   // populated from API; defaults used until then
  loading: false,                // initial page load spinner
  saving: {},                    // { general: true } when that section is saving
  error: null,

  // ── Internal helpers ───────────────────────────────────────────────────────
  _setSaving: (section, value) =>
    set((s) => ({ saving: { ...s.saving, [section]: value } })),

  _mergeSettings: (section, data) =>
    set((s) => ({
      settings: { ...s.settings, [section]: { ...s.settings[section], ...data } },
    })),

  // ── loadSettings ───────────────────────────────────────────────────────────
  // Called once on page mount. Populates all sections from a single API call.
  loadSettings: async () => {
    set({ loading: true, error: null });
    try {
      const res = await settingsApi.getSettings();
      // If API returns data, merge it over defaults. If null (placeholder), keep defaults.
      if (res.data) {
        set({ settings: { ...DEFAULT_SETTINGS, ...res.data }, loading: false });
      } else {
        set({ loading: false }); // placeholder mode — keep DEFAULT_SETTINGS
      }
    } catch (err) {
      set({ error: parseError(err, "Failed to load settings"), loading: false });
    }
  },

  // ── saveGeneral ────────────────────────────────────────────────────────────
  saveGeneral: async (data) => {
    get()._setSaving("general", true);
    try {
      await settingsApi.updateGeneral(data);
      get()._mergeSettings("general", data);
      get()._setSaving("general", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("general", false);
      return { success: false, message: parseError(err, "Failed to save general settings") };
    }
  },

  // ── saveProfile ────────────────────────────────────────────────────────────
  saveProfile: async (data) => {
    get()._setSaving("profile", true);
    try {
      await settingsApi.updateProfile(data);
      get()._mergeSettings("profile", data);
      get()._setSaving("profile", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("profile", false);
      return { success: false, message: parseError(err, "Failed to save profile") };
    }
  },

  // ── changePassword ─────────────────────────────────────────────────────────
  changePassword: async (data) => {
    get()._setSaving("password", true);
    try {
      await settingsApi.changePassword(data);
      get()._setSaving("password", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("password", false);
      return { success: false, message: parseError(err, "Failed to change password") };
    }
  },

  // ── uploadAvatar ───────────────────────────────────────────────────────────
  uploadAvatar: async (formData) => {
    get()._setSaving("avatar", true);
    try {
      const res = await settingsApi.uploadAvatar(formData);
      const avatarUrl = res.data?.avatarUrl;
      if (avatarUrl) get()._mergeSettings("profile", { avatarUrl });
      get()._setSaving("avatar", false);
      return { success: true, avatarUrl };
    } catch (err) {
      get()._setSaving("avatar", false);
      return { success: false, message: parseError(err, "Failed to upload avatar") };
    }
  },

  // ── saveSecurity ───────────────────────────────────────────────────────────
  saveSecurity: async (data) => {
    get()._setSaving("security", true);
    try {
      await settingsApi.updateSecurity(data);
      get()._mergeSettings("security", data);
      get()._setSaving("security", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("security", false);
      return { success: false, message: parseError(err, "Failed to save security settings") };
    }
  },

  // ── saveNotifications ──────────────────────────────────────────────────────
  saveNotifications: async (data) => {
    get()._setSaving("notifications", true);
    try {
      await settingsApi.updateNotifications(data);
      get()._mergeSettings("notifications", data);
      get()._setSaving("notifications", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("notifications", false);
      return { success: false, message: parseError(err, "Failed to save notification settings") };
    }
  },

  // ── saveAppearance ─────────────────────────────────────────────────────────
  saveAppearance: async (data) => {
    get()._setSaving("appearance", true);
    try {
      await settingsApi.updateAppearance(data);
      get()._mergeSettings("appearance", data);
      get()._setSaving("appearance", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("appearance", false);
      return { success: false, message: parseError(err, "Failed to save appearance settings") };
    }
  },

  // ── saveSystem ─────────────────────────────────────────────────────────────
  saveSystem: async (data) => {
    get()._setSaving("system", true);
    try {
      await settingsApi.updateSystem(data);
      get()._mergeSettings("system", data);
      get()._setSaving("system", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("system", false);
      return { success: false, message: parseError(err, "Failed to save system settings") };
    }
  },

  // ── clearCache ─────────────────────────────────────────────────────────────
  clearCache: async () => {
    get()._setSaving("clearCache", true);
    try {
      await settingsApi.clearCache();
      get()._setSaving("clearCache", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("clearCache", false);
      return { success: false, message: parseError(err, "Failed to clear cache") };
    }
  },

  // ── backupNow ──────────────────────────────────────────────────────────────
  backupNow: async () => {
    get()._setSaving("backupNow", true);
    try {
      await settingsApi.backupNow();
      get()._setSaving("backupNow", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("backupNow", false);
      return { success: false, message: parseError(err, "Failed to start backup") };
    }
  },

  // ── saveBackup ─────────────────────────────────────────────────────────────
  saveBackup: async (data) => {
    get()._setSaving("backup", true);
    try {
      await settingsApi.updateBackup(data);
      get()._mergeSettings("backup", data);
      get()._setSaving("backup", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("backup", false);
      return { success: false, message: parseError(err, "Failed to save backup settings") };
    }
  },

  // ── logoutAllDevices ───────────────────────────────────────────────────────
  logoutAllDevices: async () => {
    get()._setSaving("logoutAll", true);
    try {
      await settingsApi.logoutAllDevices();
      get()._setSaving("logoutAll", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("logoutAll", false);
      return { success: false, message: parseError(err, "Failed to logout all devices") };
    }
  },

  // ── deleteAccount ──────────────────────────────────────────────────────────
  deleteAccount: async (data) => {
    get()._setSaving("deleteAccount", true);
    try {
      await settingsApi.deleteAccount(data);
      get()._setSaving("deleteAccount", false);
      return { success: true };
    } catch (err) {
      get()._setSaving("deleteAccount", false);
      return { success: false, message: parseError(err, "Failed to delete account") };
    }
  },

  // ── clearError ─────────────────────────────────────────────────────────────
  clearError: () => set({ error: null }),
}));

export default useSettingsStore;
