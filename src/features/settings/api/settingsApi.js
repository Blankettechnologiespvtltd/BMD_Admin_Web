/**
 * SETTINGS API
 * ─────────────────────────────────────────────────────────────────────────────
 * All settings-related backend API calls live here.
 * The store calls these methods. Components never import this directly.
 *
 * WHY PLACEHOLDER METHODS?
 *   - APIs are not built yet, but the frontend is fully wired.
 *   - When backend is ready, replace the comment body with a real api.xxx() call.
 *   - Zero changes required in the store, hook, or components.
 *
 * INTEGRATION GUIDE (per method):
 *   Each method documents its HTTP verb, endpoint, request body, and response shape.
 *   Follow those comments exactly when connecting real APIs.
 */

import api from "../../../api/axiosInstance";

export const settingsApi = {
  // ─────────────────────────────────────────────────────────────────────────
  // GET ALL SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Load all settings in a single call on page mount.
   *
   * HTTP Method : GET
   * Endpoint    : /api/v1/admin/settings
   * Auth        : Bearer token (auto-attached by axiosInstance)
   *
   * Expected Response:
   * {
   *   general:       { siteName, companyName, email, phone, timezone, language },
   *   profile:       { name, email, role, avatarUrl },
   *   security:      { twoFactorEnabled, loginAlerts, sessionTimeout, passwordPolicy },
   *   notifications: { emailNotifications, pushNotifications, smsNotifications, weeklyReports },
   *   appearance:    { theme, sidebarStyle, density, accentColor },
   *   system:        { maintenanceMode, logLevel },
   *   backup:        { autoBackup, backupFrequency, lastBackupAt }
   * }
   *
   * TO CONNECT: uncomment the line below and delete the placeholder return.
   */
  getSettings: () => {
    // return api.get("/api/v1/admin/settings");
    return Promise.resolve({ data: null }); // placeholder — remove when API is ready
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GENERAL SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Save general site/company information.
   *
   * HTTP Method : PUT
   * Endpoint    : /api/v1/admin/settings/general
   * Auth        : Bearer token
   *
   * Request Body:
   * {
   *   siteName    : string,
   *   companyName : string,
   *   email       : string (valid email),
   *   phone       : string,
   *   timezone    : string (e.g. "Asia/Kolkata"),
   *   language    : string (e.g. "en")
   * }
   *
   * Expected Response: { success: true, message: "General settings updated" }
   *
   * TO CONNECT: uncomment below.
   */
  updateGeneral: (data) => {
    // return api.put("/api/v1/admin/settings/general", data);
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROFILE SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Update the logged-in admin's profile (name, email).
   *
   * HTTP Method : PUT
   * Endpoint    : /api/v1/admin/profile
   * Auth        : Bearer token
   *
   * Request Body:
   * {
   *   name  : string,
   *   email : string (valid email)
   * }
   *
   * Expected Response: { success: true, message: "Profile updated" }
   *
   * TO CONNECT: uncomment below.
   */
  updateProfile: (data) => {
    // return api.put("/api/v1/admin/profile", data);
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CHANGE PASSWORD
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Change the logged-in admin's password.
   *
   * HTTP Method : POST
   * Endpoint    : /api/v1/admin/profile/change-password
   * Auth        : Bearer token
   *
   * Request Body:
   * {
   *   currentPassword : string,
   *   newPassword     : string (min 8 chars),
   *   confirmPassword : string (must match newPassword — validated frontend-only)
   * }
   *
   * Note: confirmPassword should NOT be sent to backend; validate match on frontend.
   *
   * Expected Response: { success: true, message: "Password changed successfully" }
   *
   * TO CONNECT: uncomment below.
   */
  changePassword: (data) => {
    // const { currentPassword, newPassword } = data;
    // return api.post("/api/v1/admin/profile/change-password", { currentPassword, newPassword });
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // UPLOAD AVATAR
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Upload a new profile photo for the admin.
   *
   * HTTP Method : POST
   * Endpoint    : /api/v1/admin/profile/avatar
   * Auth        : Bearer token
   * Content-Type: multipart/form-data
   *
   * Request Body: FormData with key "avatar" → File object (image/*)
   *
   * Expected Response: { success: true, avatarUrl: "https://cdn.example.com/avatar.jpg" }
   *
   * TO CONNECT: uncomment below.
   */
  uploadAvatar: (formData) => {
    // return api.post("/api/v1/admin/profile/avatar", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    return Promise.resolve({ data: { success: true, avatarUrl: null } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SECURITY SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Save security preferences.
   *
   * HTTP Method : PUT
   * Endpoint    : /api/v1/admin/settings/security
   * Auth        : Bearer token
   *
   * Request Body:
   * {
   *   twoFactorEnabled : boolean,
   *   loginAlerts      : boolean,
   *   sessionTimeout   : number (minutes, e.g. 30 | 60 | 120 | 480),
   *   passwordPolicy   : string ("low" | "medium" | "high")
   * }
   *
   * Expected Response: { success: true, message: "Security settings updated" }
   *
   * TO CONNECT: uncomment below.
   */
  updateSecurity: (data) => {
    // return api.put("/api/v1/admin/settings/security", data);
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NOTIFICATION SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Save notification preferences.
   *
   * HTTP Method : PUT
   * Endpoint    : /api/v1/admin/settings/notifications
   * Auth        : Bearer token
   *
   * Request Body:
   * {
   *   emailNotifications : boolean,
   *   pushNotifications  : boolean,
   *   smsNotifications   : boolean,
   *   weeklyReports      : boolean
   * }
   *
   * Expected Response: { success: true, message: "Notification settings updated" }
   *
   * TO CONNECT: uncomment below.
   */
  updateNotifications: (data) => {
    // return api.put("/api/v1/admin/settings/notifications", data);
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // APPEARANCE SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Save appearance/theme preferences.
   *
   * HTTP Method : PUT
   * Endpoint    : /api/v1/admin/settings/appearance
   * Auth        : Bearer token
   *
   * Request Body:
   * {
   *   theme       : string ("light" | "dark" | "system"),
   *   sidebarStyle: string ("default" | "compact" | "icon-only"),
   *   density     : string ("comfortable" | "compact" | "spacious"),
   *   accentColor : string ("teal" | "blue" | "purple" | "orange" | "rose")
   * }
   *
   * Expected Response: { success: true, message: "Appearance settings updated" }
   *
   * TO CONNECT: uncomment below.
   */
  updateAppearance: (data) => {
    // return api.put("/api/v1/admin/settings/appearance", data);
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SYSTEM SETTINGS
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Toggle maintenance mode or log level.
   *
   * HTTP Method : PUT
   * Endpoint    : /api/v1/admin/settings/system
   * Auth        : Bearer token
   *
   * Request Body:
   * {
   *   maintenanceMode : boolean,
   *   logLevel        : string ("error" | "warn" | "info" | "debug")
   * }
   *
   * Expected Response: { success: true, message: "System settings updated" }
   *
   * TO CONNECT: uncomment below.
   */
  updateSystem: (data) => {
    // return api.put("/api/v1/admin/settings/system", data);
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  /**
   * Clear server-side cache.
   *
   * HTTP Method : POST
   * Endpoint    : /api/v1/admin/system/clear-cache
   * Auth        : Bearer token
   * Request Body: (none)
   *
   * Expected Response: { success: true, message: "Cache cleared" }
   *
   * TO CONNECT: uncomment below.
   */
  clearCache: () => {
    // return api.post("/api/v1/admin/system/clear-cache");
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BACKUP
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Trigger a manual backup immediately.
   *
   * HTTP Method : POST
   * Endpoint    : /api/v1/admin/backup/now
   * Auth        : Bearer token
   * Request Body: (none)
   *
   * Expected Response: { success: true, message: "Backup started", jobId: "abc123" }
   *
   * TO CONNECT: uncomment below.
   */
  backupNow: () => {
    // return api.post("/api/v1/admin/backup/now");
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  /**
   * Save auto-backup settings.
   *
   * HTTP Method : PUT
   * Endpoint    : /api/v1/admin/settings/backup
   * Auth        : Bearer token
   *
   * Request Body:
   * {
   *   autoBackup      : boolean,
   *   backupFrequency : string ("daily" | "weekly" | "monthly")
   * }
   *
   * Expected Response: { success: true, message: "Backup settings updated" }
   *
   * TO CONNECT: uncomment below.
   */
  updateBackup: (data) => {
    // return api.put("/api/v1/admin/settings/backup", data);
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DANGER ZONE
  // ─────────────────────────────────────────────────────────────────────────
  /**
   * Invalidate all active sessions for this admin account.
   *
   * HTTP Method : POST
   * Endpoint    : /api/v1/admin/auth/logout-all
   * Auth        : Bearer token
   * Request Body: (none)
   *
   * Expected Response: { success: true, message: "All sessions terminated" }
   * Side effect: Client should also clear local cookies and redirect to /login.
   *
   * TO CONNECT: uncomment below.
   */
  logoutAllDevices: () => {
    // return api.post("/api/v1/admin/auth/logout-all");
    return Promise.resolve({ data: { success: true } }); // placeholder
  },

  /**
   * Permanently delete the admin account.
   *
   * HTTP Method : DELETE
   * Endpoint    : /api/v1/admin/account
   * Auth        : Bearer token
   * Request Body: { confirmationText: "DELETE" } — require the user to type "DELETE"
   *
   * ⚠ This is irreversible. Protect behind a confirmation modal.
   *
   * Expected Response: { success: true, message: "Account deleted" }
   *
   * TO CONNECT: uncomment below.
   */
  deleteAccount: (data) => {
    // return api.delete("/api/v1/admin/account", { data });
    return Promise.resolve({ data: { success: true } }); // placeholder
  },
};
