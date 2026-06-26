/**
 * SAVE BUTTON
 * ─────────────────────────────────────────────────────────────────────────────
 * Consistent "Save Changes" button used at the bottom of every settings section.
 *
 * Props:
 *   onClick  – submit handler
 *   loading  – disables button and shows spinner text while saving
 *   label    – override button text (default: "Save Changes")
 */

export default function SaveButton({ onClick, loading = false, label = "Save Changes" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Saving…
        </>
      ) : (
        label
      )}
    </button>
  );
}
