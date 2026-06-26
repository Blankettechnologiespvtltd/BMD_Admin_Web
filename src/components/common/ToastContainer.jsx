/**
 * TOAST CONTAINER COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders toast notifications in the top-right corner.
 * Connected to useToast hook via props.
 *
 * Props:
 *   toasts   – array of { id, message, type } from useToast
 *   onRemove – (id) => void to dismiss a toast
 *
 * Toast types: "success" | "error" | "info" | "warning"
 */

const TOAST_STYLES = {
  success: "bg-teal-600",
  error:   "bg-red-500",
  info:    "bg-blue-600",
  warning: "bg-amber-500",
};

const TOAST_ICONS = {
  success: "✓",
  error:   "✕",
  info:    "ℹ",
  warning: "⚠",
};

export default function ToastContainer({ toasts = [], onRemove }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${TOAST_STYLES[toast.type] || TOAST_STYLES.success}
            text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3
            min-w-[260px] max-w-sm pointer-events-auto animate-slide-in`}
        >
          <span className="font-bold text-lg leading-none">
            {TOAST_ICONS[toast.type] || TOAST_ICONS.success}
          </span>
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => onRemove?.(toast.id)}
            className="text-white/70 hover:text-white text-lg leading-none ml-1"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
