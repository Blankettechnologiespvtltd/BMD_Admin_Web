/**
 * APP ROOT
 * ─────────────────────────────────────────────────────────────────────────────
 * The root of the React application.
 *
 * Responsibilities:
 *   - Wrap the app in BrowserRouter (enables react-router)
 *   - Render the AppRouter which handles all routing logic
 *
 * Why is this so minimal?
 *   - Each concern lives in its own layer (router, layout, features)
 *   - This file should almost never need to change
 *   - New providers (React Query, theme, etc.) can be added here later
 */

import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/router/index";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
