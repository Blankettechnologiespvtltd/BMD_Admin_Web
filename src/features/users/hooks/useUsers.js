/**
 * useUsers HOOK
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom hook that connects the Users page to the user store.
 * Encapsulates:
 *   - Initial data fetch on mount
 *   - Search/filter logic
 *   - Action handlers (add, delete) with toast notifications
 *   - Modal open/close state
 *
 * Why a hook instead of putting logic in the page component?
 *   - Keeps the page component purely declarative (just JSX)
 *   - Logic is testable in isolation
 *   - If the page is refactored to a different UI, logic stays the same
 */

import { useEffect, useState, useCallback, useMemo } from "react";
import useUserStore from "../store/userStore";
import { useToast } from "../../../hooks/useToast";

export const useUsers = () => {
const {
  users,
  loading,
  page,
  total,
  limit,
  detailLoading,
  selectedUser,
  fetchUsers,
  fetchUserById,
  createUser,
  deleteUser,
  clearSelectedUser,
} = useUserStore();

  const { toasts, showToast, removeToast } = useToast();

  // ── Local UI state ─────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewUserId, setViewUserId] = useState(null);         // ID for View modal
  const [deleteTarget, setDeleteTarget] = useState(null);     // user object for confirm dialog
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Fetch on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ── When viewUserId changes, fetch that user's details ─────────────────────
  useEffect(() => {
    if (viewUserId !== null) {
      fetchUserById(viewUserId);
    } else {
      clearSelectedUser();
    }
  }, [viewUserId, fetchUserById, clearSelectedUser]);

  // ── Filtered users (memoized to avoid recalculating on unrelated renders) ──
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter((u) =>
      `${u?.FullName ?? ""} ${u?.Email ?? ""} ${u?.Mobile ?? ""} ${u?.Role ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [users, search]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleAdd = useCallback(
    async (formData) => {
      const result = await createUser(formData);
      if (result.success) {
        setShowAddModal(false);
        showToast("User created successfully", "success");
      } else {
        showToast(result.message, "error");
      }
    },
    [createUser, showToast]
  );

  const handleViewOpen = useCallback((userId) => {
    setViewUserId(userId);
  }, []);

  const handleViewClose = useCallback(() => {
    setViewUserId(null);
  }, []);

  const handleDeleteRequest = useCallback((user) => {
    setDeleteTarget(user);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const result = await deleteUser(deleteTarget.Id);
    setDeleteLoading(false);
    setDeleteTarget(null);
    if (result.success) {
      showToast("User deleted successfully", "success");
    } else {
      showToast(result.message, "error");
    }
  }, [deleteTarget, deleteUser, showToast]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteTarget(null);
  }, []);

 return {
  // Data
  users: filteredUsers,
  loading,
  page,
  total,
  limit,
  selectedUser,
  detailLoading,

  // Search
  search,
  setSearch,

  // Modals
  showAddModal,
  setShowAddModal,
  viewUserId,
  deleteTarget,
  deleteLoading,

  // Handlers
  handleAdd,
  handleViewOpen,
  handleViewClose,
  handleDeleteRequest,
  handleDeleteConfirm,
  handleDeleteCancel,

  // Pagination
  fetchUsers,

  // Toast
  toasts,
  removeToast,
};
};