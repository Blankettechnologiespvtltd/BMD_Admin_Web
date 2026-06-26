/**
 * STATUS BADGE COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Displays a colored pill badge for status values.
 *
 * Props:
 *   status – string (e.g. "active", "inactive", "pending", "completed")
 *   label  – optional override for display text (defaults to status)
 *
 * Usage:
 *   <StatusBadge status="active" />
 *   <StatusBadge status="pending" label="Awaiting Payment" />
 */

const STATUS_STYLES = {
  active:     "bg-green-100 text-green-700",
  inactive:   "bg-gray-100 text-gray-500",
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  completed:  "bg-teal-100 text-teal-700",
  cancelled:  "bg-red-100 text-red-600",
  admin:      "bg-purple-100 text-purple-700",
  superadmin: "bg-indigo-100 text-indigo-700",
  employee:   "bg-teal-100 text-teal-700",
  tailor:     "bg-orange-100 text-orange-700",
  user:       "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ status, label }) {
  const key = status?.toLowerCase() || "";
  const style = STATUS_STYLES[key] || "bg-gray-100 text-gray-600";
  const text = label || (status ? status.charAt(0).toUpperCase() + status.slice(1) : "-");

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      {text}
    </span>
  );
}
