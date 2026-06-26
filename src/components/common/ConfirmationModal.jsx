/**
 * CONFIRMATION MODAL COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable "Are you sure?" dialog.
 * Replaces window.confirm() with a styled, accessible modal.
 *
 * Props:
 *   isOpen       – whether modal is visible
 *   title        – modal headline
 *   message      – body message
 *   confirmLabel – confirm button text (default: "Delete")
 *   confirmStyle – Tailwind class override for confirm btn (default: red)
 *   onConfirm    – called when user clicks confirm
 *   onCancel     – called when user clicks cancel or overlay
 *   loading      – disables buttons while an action is in-flight
 */
export default function ConfirmationModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  confirmStyle = "bg-red-600 hover:bg-red-700",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-xl text-white text-sm font-medium transition disabled:opacity-60 ${confirmStyle}`}
          >
            {loading ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
