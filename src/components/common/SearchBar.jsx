/**
 * SEARCH BAR COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable search input with built-in input sanitization.
 * - Max 50 characters
 * - Only allows safe characters (letters, digits, spaces, @, ., _, -)
 * - Prevents malicious input from reaching the API
 *
 * Props:
 *   value       – current search string (controlled)
 *   onChange    – called with the new value string
 *   placeholder – input placeholder text
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
}) {
  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw.length > 50) return;
    if (!/^[a-zA-Z0-9\s@._-]*$/.test(raw)) return;
    onChange(raw);
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={50}
        className="w-full md:w-80 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
      />
    </div>
  );
}
