/**
 * LOADER COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable full-area loading spinner.
 * Use inside any table/card while data is being fetched.
 *
 * Props:
 *   text – optional loading text (defaults to "Loading…")
 */
export default function Loader({ text = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-600 border-t-transparent" />
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
}
