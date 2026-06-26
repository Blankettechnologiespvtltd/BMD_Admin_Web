/**
 * SETTINGS MODULE — BARREL EXPORT
 * ─────────────────────────────────────────────────────────────────────────────
 * Single entry point for the Settings feature.
 * The router imports SettingsPage from here.
 *
 * Usage (already set up in router/index.jsx):
 *   const SettingsPage = lazy(() => import("../../features/settings"));
 *
 * If you prefer the explicit path import, that works too:
 *   const SettingsPage = lazy(() => import("../../features/settings/pages/SettingsPage"));
 */

export { default } from "./pages/SettingsPage";
