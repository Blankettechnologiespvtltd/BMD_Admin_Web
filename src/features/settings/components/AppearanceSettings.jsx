/**
 * APPEARANCE SETTINGS COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Theme, sidebar style, density, accent colour.
 *
 * API connection point (when ready):
 *   GET  /api/v1/admin/settings              → loads appearance section
 *   PUT  /api/v1/admin/settings/appearance   → called on "Save Appearance"
 *
 * Note: Actual theme switching (dark mode etc.) requires a ThemeContext.
 * These settings currently save the preference to the backend only.
 * Implement a ThemeProvider in src/app/providers/ to consume them.
 *
 * Props (from useSettings hook via SettingsPage):
 *   form     – appearForm state
 *   onChange – handleAppearChange
 *   onSave   – handleSaveAppearance
 *   saving   – saving.appearance boolean
 */

import SettingsCard from "./shared/SettingsCard";
import SaveButton from "./shared/SaveButton";
import {
  THEME_OPTIONS,
  SIDEBAR_STYLE_OPTIONS,
  DENSITY_OPTIONS,
  ACCENT_COLOR_OPTIONS,
  ACCENT_COLOR_CLASSES,
} from "../constants/settings.constants";

function SelectField({ label, name, value, onChange, options, hint }) {
  return (
    <div>
      <label className="block mb-1.5 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export default function AppearanceSettings({ form, onChange, onSave, saving }) {
  // Accent colour swatch click → synthesise change event
  const handleAccentClick = (colorValue) => {
    onChange({ target: { name: "accentColor", value: colorValue, type: "select-one" } });
  };

  return (
    <div className="space-y-6">
      {/* ── Theme & Layout ────────────────────────────────────────────────── */}
      <SettingsCard
        title="Theme & Layout"
        description="Customise how the admin panel looks and feels."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <SelectField
            label="Theme"
            name="theme"
            value={form.theme}
            onChange={onChange}
            options={THEME_OPTIONS}
            hint="Dark mode requires ThemeProvider setup."
          />
          <SelectField
            label="Sidebar Style"
            name="sidebarStyle"
            value={form.sidebarStyle}
            onChange={onChange}
            options={SIDEBAR_STYLE_OPTIONS}
          />
          <SelectField
            label="Density"
            name="density"
            value={form.density}
            onChange={onChange}
            options={DENSITY_OPTIONS}
            hint="Controls spacing throughout the panel."
          />
        </div>
      </SettingsCard>

      {/* ── Accent Colour ─────────────────────────────────────────────────── */}
      <SettingsCard
        title="Accent Colour"
        description="The primary brand colour used for buttons, active states, and table headers."
      >
        <div className="flex flex-wrap gap-4">
          {ACCENT_COLOR_OPTIONS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleAccentClick(color.value)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition
                ${form.accentColor === color.value
                  ? "border-gray-800 shadow-md"
                  : "border-transparent hover:border-gray-200"
                }
              `}
              title={color.label}
            >
              <span
                className={`w-9 h-9 rounded-full shadow-inner ${ACCENT_COLOR_CLASSES[color.value]}`}
              />
              <span className="text-xs font-medium text-gray-600">{color.label}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Currently selected: <strong className="text-gray-600 capitalize">{form.accentColor}</strong>
        </p>
      </SettingsCard>

      {/* ── Save ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <SaveButton onClick={onSave} loading={saving} />
      </div>
    </div>
  );
}
