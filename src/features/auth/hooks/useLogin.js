/**
 * useLogin HOOK
 * ─────────────────────────────────────────────────────────────────────────────
 * Encapsulates the login flow so the Login component stays purely presentational.
 *
 * What this hook does:
 *   1. Calls authApi.login() with email + password
 *   2. Extracts tokens from the response (handles different field names)
 *   3. Stores tokens via authStore.login()
 *   4. Returns loading/error state for the UI
 *
 * The Login component only needs to call `submit(email, password)`.
 */

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import useAuthStore from "../store/authStore";
import { parseError } from "../../../utils/errorParser";
import ROUTES from "../../../constants/routes";

export const useLogin = () => {
const navigate = useNavigate();
const login = useAuthStore((s) => s.login);

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const submit = useCallback(
async (email, password) => {
setError("");
setLoading(true);

  try {
    const res = await authApi.login(email, password);

    const data = res.data;

    const accessToken =
      data?.access_token ||
      data?.accessToken ||
      data?.token;

    const refreshToken =
      data?.refresh_token ||
      data?.refreshToken;

    if (!accessToken) {
      throw new Error("No access token received from server");
    }

    // Decode JWT token
    let payload = null;

    try {
      payload = JSON.parse(
        atob(accessToken.split(".")[1])
      );
    } catch {
      throw new Error("Invalid access token");
    }

    const role = payload?.role;

    // Only admins can access admin panel
    if (
      role !== "admin" &&
      role !== "superadmin" &&
      role !== "super_admin"
    ) {
      throw new Error(
        "Access denied. Only administrators can log in."
      );
    }

    // Save tokens in Zustand + Cookies
    login(accessToken, refreshToken);

    // Redirect to users page
    navigate(ROUTES.USERS, {
      replace: true,
    });
  } catch (err) {
    setError(
      err?.message?.includes("Access denied")
        ? err.message
        : parseError(
            err,
            "Login failed. Please try again."
          )
    );
  } finally {
    setLoading(false);
  }
},
[login, navigate]

);

return {
submit,
loading,
error,
};
};