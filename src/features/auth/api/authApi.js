/**
 * AUTH API
 * ─────────────────────────────────────────────────────────────────────────────
 * All authentication-related API calls live here.
 * Components NEVER call API directly – they use the auth store which calls this.
 *
 * Endpoints:
 *   POST /auth/email/login   – admin login
 *   POST /auth/refresh       – get new access token using refresh token
 *   POST /auth/logout        – invalidate session on server
 */

import api from "../../../api/axiosInstance";

export const authApi = {
  /**
   * Login with email + password.
   * Backend returns access_token and optionally refresh_token.
   */
  login: (email, password) =>
    api.post("/auth/email/login?include_user=false", { email, password }),

  /**
   * Refresh the access token using a stored refresh token.
   */
  refreshToken: (refreshToken) =>
    api.post("/auth/refresh", { refresh_token: refreshToken }),

  /**
   * Logout – tells the server to invalidate the refresh token.
   */
  logout: () => api.post("/auth/logout"),
};
