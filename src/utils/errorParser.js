/**
 * ERROR PARSER
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralized function to extract a human-readable message from API errors.
 *
 * Usage:
 *   import { parseError } from "@/utils/errorParser";
 *   const message = parseError(error, "Failed to load data");
 */

export const parseError = (error, fallback = "Something went wrong") => {
  return (
    error?.response?.data?.detail ||
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
};
