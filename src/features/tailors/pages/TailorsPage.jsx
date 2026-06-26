/**
 * USER TABLE COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the list of users in a DataTable.
 * Uses the shared DataTable component + StatusBadge for role display.
 *
 * Props:
 *   users           – filtered user array from useUsers hook
 *   loading         – show skeleton/loader
 *   onView(userId)  – open View modal for a user
 *   onDelete(user)  – trigger delete confirmation for a user
 */

import { memo } from "react";
import { FaEye, FaTrash, FaUserCircle } from "react-icons/fa";
import DataTable from "../../../components/common/DataTable";
import StatusBadge from "../../../components/common/StatusBadge";

function UserTable({ users = [], loading = false, onView, onDelete }) {
  // Column definitions for DataTable.
  // The `render` function gives full control over how each cell looks.
  const columns = [
    {
      key: "Id",
      label: "ID",
      render: (val) => (
        <span className="text-gray-500 font-mono text-xs">{val ?? "-"}</span>
      ),
    },
    {
      key: "ProfileImageUrl",
      label: "Photo",
      render: (url, row) =>
        url ? (
          <img
            src={url}
            alt={row.FullName}
            className="w-9 h-9 rounded-full object-cover border-2 border-teal-500"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <FaUserCircle size={34} className="text-gray-300" />
        ),
    },
    {
      key: "FullName",
      label: "Name",
      render: (val) => (
        <span className="font-medium text-gray-800">{val || "-"}</span>
      ),
    },
    { key: "Email",  label: "Email"  },
    { key: "Mobile", label: "Mobile" },
    {
      key: "Role",
      label: "Role",
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: "_actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {/* View More → fetches full user details from API */}
          <button
            onClick={() => onView?.(row.Id)}
            title="View Details"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition font-medium"
          >
            <FaEye size={12} />
            View
          </button>

          {/* Delete → triggers confirmation dialog */}
          <button
            onClick={() => onDelete?.(row)}
            title="Delete User"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg transition font-medium"
          >
            <FaTrash size={12} />
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={users}
      loading={loading}
      emptyTitle="No users found"
      emptyMessage="Try a different search term or add a new user."
    />
  );
}

export default memo(UserTable);
