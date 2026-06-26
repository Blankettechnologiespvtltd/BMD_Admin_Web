/**
 * SETTINGS CONSTANTS
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralises all settings tab configuration, dropdown options, and default
 * form values so that nothing is hard-coded inside components.
 *
 * To add a new settings section:
 *   1. Add an entry to SETTINGS_TABS
 *   2. Create the component in ../components/
 *   3. Register it in the page's TAB_COMPONENTS map
 *   → No other files need changing.
 */

// ── Tab navigation config ─────────────────────────────────────────────────────
// id    : unique key, used to match the active tab
// label : text shown in the sidebar tab list
// icon  : react-icons identifier (resolved in SettingsPage)
export const SETTINGS_TABS = [
  { id: "general",       label: "General",       icon: "MdSettings"            },
  { id: "profile",       label: "Profile",       icon: "FaUserCircle"          },
  { id: "security",      label: "Security",      icon: "MdSecurity"            },
  { id: "notifications", label: "Notifications", icon: "MdNotifications"       },
  { id: "appearance",    label: "Appearance",    icon: "MdPalette"             },
  { id: "system",        label: "System",        icon: "MdDns"                 },
  { id: "backup",        label: "Backup",        icon: "MdBackup"              },
  { id: "danger",        label: "Danger Zone",   icon: "MdWarning"             },
];

// ── Default form values ───────────────────────────────────────────────────────
// These are shown while API data hasn't loaded yet (placeholder state).
// Replace with real API response values once getSettings() is connected.
export const DEFAULT_SETTINGS = {
  general: {
    siteName:    "BookMyDarzi",
    companyName: "BookMyDarzi Pvt. Ltd.",
    email:       "admin@bookmydarzi.com",
    phone:       "",
    timezone:    "Asia/Kolkata",
    language:    "en",
  },
  profile: {
    name:      "Admin",
    email:     "admin@bookmydarzi.com",
    role:      "superadmin",
    avatarUrl: "",
  },
  security: {
    twoFactorEnabled: false,
    loginAlerts:      true,
    sessionTimeout:   "60",
    passwordPolicy:   "medium",
  },
  notifications: {
    emailNotifications: true,
    pushNotifications:  false,
    smsNotifications:   false,
    weeklyReports:      true,
  },
  appearance: {
    theme:        "light",
    sidebarStyle: "default",
    density:      "comfortable",
    accentColor:  "teal",
  },
  system: {
    maintenanceMode: false,
    logLevel:        "error",
  },
  backup: {
    autoBackup:      false,
    backupFrequency: "daily",
    lastBackupAt:    null,
  },
};

// ── Dropdown option lists ─────────────────────────────────────────────────────

export const TIMEZONE_OPTIONS = [
  { value: "Asia/Kolkata",    label: "IST — Asia/Kolkata (UTC+5:30)"     },
  { value: "UTC",             label: "UTC — Coordinated Universal Time"   },
  { value: "America/New_York",label: "EST — America/New York (UTC-5)"    },
  { value: "America/Chicago", label: "CST — America/Chicago (UTC-6)"     },
  { value: "America/Denver",  label: "MST — America/Denver (UTC-7)"      },
  { value: "America/Los_Angeles", label: "PST — America/Los Angeles (UTC-8)" },
  { value: "Europe/London",   label: "GMT — Europe/London (UTC+0)"       },
  { value: "Europe/Paris",    label: "CET — Europe/Paris (UTC+1)"        },
  { value: "Asia/Dubai",      label: "GST — Asia/Dubai (UTC+4)"          },
  { value: "Asia/Singapore",  label: "SGT — Asia/Singapore (UTC+8)"      },
  { value: "Asia/Tokyo",      label: "JST — Asia/Tokyo (UTC+9)"          },
  { value: "Australia/Sydney",label: "AEST — Australia/Sydney (UTC+10)"  },
];

export const LANGUAGE_OPTIONS = [
  { value: "en",  label: "English"  },
  { value: "hi",  label: "Hindi"    },
  { value: "ur",  label: "Urdu"     },
  { value: "ta",  label: "Tamil"    },
  { value: "te",  label: "Telugu"   },
  { value: "ar",  label: "Arabic"   },
  { value: "fr",  label: "French"   },
  { value: "de",  label: "German"   },
  { value: "es",  label: "Spanish"  },
];

export const SESSION_TIMEOUT_OPTIONS = [
  { value: "15",   label: "15 minutes"  },
  { value: "30",   label: "30 minutes"  },
  { value: "60",   label: "1 hour"      },
  { value: "120",  label: "2 hours"     },
  { value: "480",  label: "8 hours"     },
  { value: "1440", label: "24 hours"    },
  { value: "0",    label: "Never"       },
];

export const PASSWORD_POLICY_OPTIONS = [
  { value: "low",    label: "Low — Minimum 6 characters"                        },
  { value: "medium", label: "Medium — 8+ chars, letters & numbers"              },
  { value: "high",   label: "High — 12+ chars, uppercase, numbers & symbols"    },
];

export const THEME_OPTIONS = [
  { value: "light",  label: "Light"  },
  { value: "dark",   label: "Dark"   },
  { value: "system", label: "System" },
];

export const SIDEBAR_STYLE_OPTIONS = [
  { value: "default",   label: "Default — Full labels"   },
  { value: "compact",   label: "Compact — Smaller items" },
  { value: "icon-only", label: "Icon Only"               },
];

export const DENSITY_OPTIONS = [
  { value: "comfortable", label: "Comfortable"  },
  { value: "compact",     label: "Compact"      },
  { value: "spacious",    label: "Spacious"     },
];

export const ACCENT_COLOR_OPTIONS = [
  { value: "teal",   label: "Teal"   },
  { value: "blue",   label: "Blue"   },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "rose",   label: "Rose"   },
];

export const LOG_LEVEL_OPTIONS = [
  { value: "error", label: "Error — Only critical errors" },
  { value: "warn",  label: "Warn — Errors and warnings"   },
  { value: "info",  label: "Info — General information"   },
  { value: "debug", label: "Debug — Full verbose output"  },
];

export const BACKUP_FREQUENCY_OPTIONS = [
  { value: "daily",   label: "Daily"   },
  { value: "weekly",  label: "Weekly"  },
  { value: "monthly", label: "Monthly" },
];

// ── Accent color CSS map ──────────────────────────────────────────────────────
// Used in AppearanceSettings to render colour swatches.
export const ACCENT_COLOR_CLASSES = {
  teal:   "bg-teal-500",
  blue:   "bg-blue-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  rose:   "bg-rose-500",
};
