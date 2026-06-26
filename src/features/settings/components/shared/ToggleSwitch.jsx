/**
 * TOGGLE SWITCH
 * ─────────────────────────────────────────────────────────────────────────────
 * Accessible toggle switch used across Security and Notification sections.
 *
 * Props:
 *   name      – input name attribute (must match form field key)
 *   checked   – controlled boolean value
 *   onChange  – change handler
 *   label     – visible label text
 *   description – optional helper text shown below label
 *   disabled  – disables the toggle
 */

export default function ToggleSwitch({ name, checked, onChange, label, description, disabled = false }) {
  const handleClick = () => {
    if (disabled) return;
    // Synthesise a change event so the same makeChangeHandler from the hook works.
    onChange({ target: { name, type: "checkbox", checked: !checked } });
  };

  return (
    <div className="flex items-start justify-between gap-4 py-3">
      {/* Label side */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>

      {/* Toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={handleClick}
        disabled={disabled}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
          ${checked ? "bg-teal-600" : "bg-gray-200"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
