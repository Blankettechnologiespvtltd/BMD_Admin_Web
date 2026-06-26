/**
 * SETTINGS CARD
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable white card container used by every settings section.
 * Keeps layout consistent across all panels without repeating Tailwind classes.
 *
 * Props:
 *   title       – card section heading
 *   description – optional subtitle / helper text
 *   children    – the form fields / content
 */

export default function SettingsCard({ title, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Card header */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 mt-0.5">{description}</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-5" />

      {/* Content */}
      {children}
    </div>
  );
}
