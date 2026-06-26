/**
 * USERS PAGE
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the main Users Management page.
 *
 * This component is PURELY DECLARATIVE — no business logic here.
 * All logic lives in the useUsers() hook.
 *
 * This page renders:
 *   1. Page header (title + Add User button)
 *   2. Search bar
 *   3. User table
 *   4. Add User modal (conditional)
 *   5. View User modal (conditional)
 *   6. Delete confirmation modal (conditional)
 *   7. Toast notifications
 */

import { FaUserPlus } from "react-icons/fa";
import { useUsers } from "../hooks/useUsers";

import UserTable from "../components/UserTable";
import AddUserModal from "../components/AddUserModal";
import ViewUserModal from "../components/ViewUserModal";
import Pagination from "../../../components/common/Pagination";
import SearchBar from "../../../components/common/SearchBar";
import ToastContainer from "../../../components/common/ToastContainer";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

export default function UsersPage() {
  const {
    users,
    loading,
    page,
    total,
    limit,
    selectedUser,
    detailLoading,
    search,
    setSearch,
    showAddModal,
    setShowAddModal,
    viewUserId,
    deleteTarget,
    deleteLoading,
    handleAdd,
    handleViewOpen,
    handleViewClose,
    handleDeleteRequest,
    handleDeleteConfirm,
    handleDeleteCancel,
    toasts,
    removeToast,
    fetchUsers,
  } = useUsers();
  console.log("Users from store:", users);
  console.log({
  page,
  total,
  limit,
});
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="p-6 max-w-7xl mx-auto">
        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manage admin panel users and their roles
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
          >
            <FaUserPlus size={14} />
            Add User
          </button>
        </div>

        {/* ── Search Bar ─────────────────────────────────────────────────── */}
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, email, mobile, role…"
          />
        </div>

        {/* ── User Table ─────────────────────────────────────────────────── */}
        <UserTable
          users={users}
          loading={loading}
          onView={handleViewOpen}
          onDelete={handleDeleteRequest}
        />
      </div>



      <div className=" mt-0 flex justify-end pr-6">
        
  <Pagination
    currentPage={page}
    totalPages={Math.ceil(total / limit)}
    onPageChange={fetchUsers}
  />
  
  
</div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}

      {/* Add User Modal */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
          loading={loading}
        />
      )}

      {/* View User Modal — only shown when a userId is selected */}
      {viewUserId !== null && (
        <ViewUserModal
          user={selectedUser}
          detailLoading={detailLoading}
          onClose={handleViewClose}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteTarget}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.FullName}"? This action cannot be undone.`}
        confirmLabel="Delete User"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        loading={deleteLoading}
      />

     
    </div>
  );
}
