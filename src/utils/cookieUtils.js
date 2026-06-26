/**
 * COOKIE UTILITIES
 * ─────────────────────────────────────────────────────────────────────────────
 * All cookie operations go through this file.
 * We store auth tokens in cookies (NOT localStorage) for security.
 *
 * Why cookies over localStorage?
 *   - Can be set HttpOnly (XSS protection)
 *   - Works with same-site settings (CSRF protection)
 *   - Survives page refresh just like localStorage
 *
 * secure: true  → only sent over HTTPS (enforced in production)
 * sameSite: Strict → cookie not sent in cross-site requests
 */

import Cookies from "js-cookie";
import ENV from "../constants/env";

const COOKIE_KEYS = {
  ACCESS_TOKEN: "bmd_access_token",
  REFRESH_TOKEN: "bmd_refresh_token",
};

const SECURE = ENV.IS_PROD;

export const cookieUtils = {
  // ── Access Token ────────────────────────────────────────────────────────────
  getAccessToken: () => Cookies.get(COOKIE_KEYS.ACCESS_TOKEN) || null,

  setAccessToken: (token) =>
    Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, token, {
      expires: 1,           // 1 day
      secure: SECURE,
      sameSite: "Strict",
    }),

  removeAccessToken: () => Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN),

  // ── Refresh Token ───────────────────────────────────────────────────────────
  getRefreshToken: () => Cookies.get(COOKIE_KEYS.REFRESH_TOKEN) || null,

  setRefreshToken: (token) =>
    Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, token, {
      expires: 7,           // 7 days
      secure: SECURE,
      sameSite: "Strict",
    }),

  removeRefreshToken: () => Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN),

  // ── Clear Everything ────────────────────────────────────────────────────────
  clearAll: () => {
    Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
    Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
  },
};
