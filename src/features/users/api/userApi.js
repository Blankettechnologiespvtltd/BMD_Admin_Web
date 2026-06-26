/**
 * USER API
 * ─────────────────────────────────────────────────────────────────────────────
 * All user-related backend API calls live here.
 * The store calls these methods. Components never import this directly.
 *
 * Why separate API layer?
 *   - Changing the backend URL or payload shape only requires editing this file
 *   - Components stay clean and don't know about axios or HTTP
 *   - Easy to mock in tests
 *
 * Endpoints used:
 *   GET    /users          – list all users
 *   GET    /users/:id      – get single user by ID
 *   POST   /users          – create a new user
 *   DELETE /users/:id      – delete a user
 */

import api from "../../../api/axiosInstance";

export const userApi = {
  /**
   * Fetch all users.
   * Response shape: { data: User[] } or User[] directly.
   * Normalization is handled in userStore._normalizeUsers().
   */
 getAll: (page = 1, limit = 10) =>
  api.get(`/admin/users?page=${page}&limit=${limit}`),

  /**
   * Fetch a single user by ID.
   * Called when "View More" is clicked to get full details.
   */
  getById: (id) => api.get(`/admin/users/${id}`),

  /**
   * Create a new user.
   * Payload: { first_name, last_name, email, mobile, role, is_active }
   * Note: password is intentionally EXCLUDED per spec requirements.
   */
  create: (userData) => api.post("/users", userData),

  /**
   * Delete a user by ID.
   * Permanently removes from database.
   */
  delete: (id) => api.delete(`/users/${id}`),
};
