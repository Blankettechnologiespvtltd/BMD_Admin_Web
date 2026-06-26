/**
 * EMPTY STATE COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Shown when a list/table has zero items to display.
 *
 * Props:
 *   title   – headline text
 *   message – supporting description
 *   icon    – optional emoji/icon (defaults to 📭)
 */
export default function EmptyState({ title = "Nothing here yet", message = "", icon = "📭" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <span className="text-5xl">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      {message && <p className="text-sm text-gray-400 max-w-xs">{message}</p>}
    </div>
  );
}
