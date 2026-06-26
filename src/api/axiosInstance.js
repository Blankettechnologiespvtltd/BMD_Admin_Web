/**
 * AXIOS INSTANCE
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the SINGLE axios instance used across the entire app.
 *
 * What it does automatically:
 *   1. Attaches Authorization header with Bearer token on every request
 *   2. On 401 → attempts token refresh using the refresh token
 *   3. If refresh succeeds → retries the original request
 *   4. If refresh fails → clears cookies and redirects to /login
 *
 * All features/*//*.js files import THIS instance, not raw axios.
 */

import axios from "axios";
import ENV from "../constants/env";
import { cookieUtils } from "../utils/cookieUtils";

const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ── Token refresh queue ──────────────────────────────────────────────────────
// Prevents multiple simultaneous refresh calls when many 401s arrive at once.
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) =>
    error ? promise.reject(error) : promise.resolve(token)
  );
  failedQueue = [];
};

// ── REQUEST interceptor: attach access token ─────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = cookieUtils.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE interceptor: handle 401 + refresh ───────────────────────────────
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const original = error.config;

    // Only attempt refresh on 401, and only once per request
    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = cookieUtils.getRefreshToken();

      if (!refreshToken) {
        cookieUtils.clearAll();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Queue subsequent 401s while a refresh is in-flight
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          })
          .catch(Promise.reject);
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${ENV.API_BASE_URL}/auth/refresh`,
          { refresh_token: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newAccess =
          res.data?.access_token || res.data?.access_Token || res.data?.token;
        const newRefresh =
          res.data?.refresh_token || res.data?.refresh_Token;

        if (!newAccess) throw new Error("No access token in refresh response");

        cookieUtils.setAccessToken(newAccess);
        if (newRefresh) cookieUtils.setRefreshToken(newRefresh);

        processQueue(null, newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        cookieUtils.clearAll();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
