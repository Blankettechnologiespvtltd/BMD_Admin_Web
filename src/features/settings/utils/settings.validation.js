/**
 * SETTINGS VALIDATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure validation functions for each settings section.
 * Called from useSettings hook before any API call is made.
 *
 * Each function returns an errors object:
 *   {} (empty)  → valid, proceed with API call
 *   { field: "message" } → invalid, show errors in form
 */

// ── General Settings ──────────────────────────────────────────────────────────
export const validateGeneral = (data) => {
  const errors = {};

  if (!data.siteName?.trim())
    errors.siteName = "Site name is required";

  if (!data.companyName?.trim())
    errors.companyName = "Company name is required";

  if (!data.email?.trim())
    errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Enter a valid email address";

  if (data.phone?.trim() && !/^\+?[\d\s\-()]{7,20}$/.test(data.phone.trim()))
    errors.phone = "Enter a valid phone number";

  if (!data.timezone)
    errors.timezone = "Timezone is required";

  if (!data.language)
    errors.language = "Language is required";

  return errors;
};

// ── Profile Settings ──────────────────────────────────────────────────────────
export const validateProfile = (data) => {
  const errors = {};

  if (!data.name?.trim())
    errors.name = "Name is required";
  else if (data.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";

  if (!data.email?.trim())
    errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Enter a valid email address";

  return errors;
};

// ── Change Password ───────────────────────────────────────────────────────────
export const validateChangePassword = (data) => {
  const errors = {};

  if (!data.currentPassword)
    errors.currentPassword = "Current password is required";

  if (!data.newPassword)
    errors.newPassword = "New password is required";
  else if (data.newPassword.length < 8)
    errors.newPassword = "Password must be at least 8 characters";

  if (!data.confirmPassword)
    errors.confirmPassword = "Please confirm your new password";
  else if (data.newPassword !== data.confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  if (data.currentPassword && data.newPassword &&
      data.currentPassword === data.newPassword)
    errors.newPassword = "New password must differ from current password";

  return errors;
};

// ── Security Settings ─────────────────────────────────────────────────────────
// No strict validation needed — all fields are select/toggle controls.
// This is a placeholder for future rules (e.g. 2FA setup flow).
export const validateSecurity = (_data) => {
  return {};
};

// ── Notification Settings ─────────────────────────────────────────────────────
// All boolean toggles — no validation required currently.
export const validateNotifications = (_data) => {
  return {};
};

// ── Appearance Settings ───────────────────────────────────────────────────────
// All controlled selects — no free-text validation required.
export const validateAppearance = (_data) => {
  return {};
};

// ── System Settings ───────────────────────────────────────────────────────────
export const validateSystem = (_data) => {
  return {};
};

// ── Backup Settings ───────────────────────────────────────────────────────────
export const validateBackup = (_data) => {
  return {};
};

// ── Shared helper ─────────────────────────────────────────────────────────────
/** Returns true if the errors object has zero keys (i.e. form is valid). */
export const isValid = (errors) => Object.keys(errors).length === 0;
