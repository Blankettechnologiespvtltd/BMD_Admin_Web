/**
 * FORMATTERS
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure utility functions for formatting display values.
 * These are stateless – just input → output.
 */

/**
 * Format an ISO date string into a readable local date+time.
 * Returns "-" if value is falsy.
 */
export const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Capitalize first letter of a string.
 */
export const capitalize = (str) => {
  if (!str) return "-";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert a backend boolean to "Yes" / "No".
 */
export const formatBoolean = (value) => (value ? "Yes" : "No");

/**
 * Safely get nested object value with a fallback.
 */
export const safeGet = (obj, key, fallback = "-") =>
  obj?.[key] !== undefined && obj?.[key] !== null && obj?.[key] !== ""
    ? obj[key]
    : fallback;
