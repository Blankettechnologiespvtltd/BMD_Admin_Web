/**
 * USER STORE (Zustand)
 * ─────────────────────────────────────────────────────────────────────────────
 * Feature-specific state for the Users module.
 *
 * STATE:
 *   users        – array of user objects from backend
 *   selectedUser – currently viewed user details (for View modal)
 *   loading      – true while any API call is in-flight
 *   detailLoading– true while fetching individual user details
 *   error        – last error message (null if none)
 *
 * ACTIONS:
 *   fetchUsers()      – load all users from backend
 *   fetchUserById()   – load a single user's full details
 *   createUser()      – create user and refresh list
 *   deleteUser()      – delete user and refresh list
 *   clearSelectedUser()– reset selectedUser back to null
 *   clearError()      – reset error state
 *
 * DATA FLOW:
 *   Component → calls store action → store calls userApi → updates state → component re-renders
 */

import { create } from "zustand";
import { userApi } from "../api/userApi";
import { parseError } from "../../../utils/errorParser";

const useUserStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  users: [],
  selectedUser: null,
  loading: false,
  detailLoading: false,
  error: null,
  page: 1,
  limit: 10,
  total: 0,

  // ── Internal helper: normalize response to array ───────────────────────────
  // Backend may return: User[] directly, { data: User[] }, or { items: User[] }
  _normalize: (data) => {

    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.users)) return data.users;

    if (Array.isArray(data?.data)) return data.data;

    if (Array.isArray(data?.items)) return data.items;

    return [];
  },

  // ── fetchUsers ─────────────────────────────────────────────────────────────
  fetchUsers: async (page = 1) => {
    console.log("Page received:", page);
  set({ loading: true });

  try {
    const res = await userApi.getAll(page, get().limit);

    const users = get()._normalize(res.data);

    set({
      users,
      page: res.data.page,
      limit: res.data.limit,
      total: res.data.total,
      loading: false,
    });
  } catch (err) {
    set({
      error: parseError(err),
      loading: false,
    });
  }
},
  // ── fetchUserById ──────────────────────────────────────────────────────────
  // Fetches full user details for the View modal.
  // We fetch fresh from API (not from local list) to always get complete data.
  fetchUserById: async (id) => {
    set({ detailLoading: true, selectedUser: null });
    try {
      const res = await userApi.getById(id);
      const user = res.data?.data || res.data;
      set({ selectedUser: user, detailLoading: false });
    } catch (err) {
      set({
        error: parseError(err, "Failed to load user details"),
        detailLoading: false,
      });
    }
  },

  // ── createUser ─────────────────────────────────────────────────────────────
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      await userApi.create(userData);
      await get().fetchUsers(); // refresh list after create
      return { success: true };
    } catch (err) {
      const message = parseError(err, "Failed to create user");
      set({ error: message, loading: false });
      return { success: false, message };
    }
  },

  // ── deleteUser ─────────────────────────────────────────────────────────────
  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await userApi.delete(id);
      await get().fetchUsers(); // refresh list after delete
      return { success: true };
    } catch (err) {
      const message = parseError(err, "Failed to delete user");
      set({ error: message, loading: false });
      return { success: false, message };
    }
  },

  // ── Helpers ────────────────────────────────────────────────────────────────
  clearSelectedUser: () => set({ selectedUser: null }),
  clearError: () => set({ error: null }),
}));

export default useUserStore;
