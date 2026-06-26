/**
 * AUTH STORE (Zustand)
 * ─────────────────────────────────────────────────────────────────────────────
 * Global authentication state.
 *
 * State:
 *   accessToken     – JWT token for API calls (also in cookie for persistence)
 *   refreshToken    – Used to get new access tokens silently
 *   isAuthenticated – Derived boolean. true when accessToken exists.
 *
 * Actions:
 *   login()         – Called after successful login. Stores tokens in cookies.
 *   setAccessToken()– Called by axios interceptor after silent token refresh.
 *   logout()        – Clears all tokens and resets state.
 *
 * Initialization:
 *   On page load, state is initialized from cookies so the user stays logged in.
 */

import { create } from "zustand";
import { cookieUtils } from "../../../utils/cookieUtils";

const useAuthStore = create((set) => ({
  // ── Initial state read from cookies (persists across browser refresh) ──────
  accessToken: cookieUtils.getAccessToken(),
  refreshToken: cookieUtils.getRefreshToken(),
  isAuthenticated: !!cookieUtils.getAccessToken(),

  // ── Actions ──────────────────────────────────────────────────────────────────
  login: (accessToken, refreshToken) => {
    cookieUtils.setAccessToken(accessToken);
    if (refreshToken) cookieUtils.setRefreshToken(refreshToken);
    set({ accessToken, refreshToken: refreshToken || null, isAuthenticated: true });
  },

  setAccessToken: (accessToken) => {
    cookieUtils.setAccessToken(accessToken);
    set({ accessToken, isAuthenticated: true });
  },

  logout: () => {
    cookieUtils.clearAll();
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
