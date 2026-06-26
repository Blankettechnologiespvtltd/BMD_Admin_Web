/**
 * FORM INPUT COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable labeled input field.
 * Reduces repetition in every form across all modules.
 *
 * Props:
 *   label       – visible label text
 *   name        – input name attribute (used by onChange)
 *   type        – "text" | "email" | "password" | "tel" | etc.
 *   value       – controlled value
 *   onChange    – (e) => handler
 *   placeholder – placeholder text
 *   required    – makes field required
 *   disabled    – disables the input
 *   error       – field-level error message
 *   hint        – helper text shown below input
 *   accentColor – ring color class (default teal)
 */
export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  hint = "",
  accentColor = "focus:ring-teal-500",
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1.5 text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:border-transparent
          ${error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}
          ${accentColor}
          ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        `}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
