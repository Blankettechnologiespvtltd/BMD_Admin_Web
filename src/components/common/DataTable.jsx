/**
 * DATA TABLE COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Generic reusable table that renders any columns × rows data.
 *
 * Props:
 *   columns   – array of { key, label, render? }
 *               key    – property name on row object
 *               label  – header text
 *               render – optional: (value, row) => JSX
 *   rows      – array of data objects
 *   loading   – shows loader
 *   emptyText – shown when rows is empty
 *   keyField  – the field used as React key (default: "id")
 *
 * Usage:
 *   <DataTable
 *     columns={[
 *       { key: "Id", label: "ID" },
 *       { key: "FullName", label: "Name" },
 *       { key: "Role", label: "Role", render: (v) => <StatusBadge status={v} /> },
 *     ]}
 *     rows={users}
 *     loading={loading}
 *   />
 */

import { memo } from "react";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

function DataTable({
  columns = [],
  rows = [],
  loading = false,
  emptyTitle = "No records found",
  emptyMessage = "Try adjusting your search or adding new records.",
  keyField = "Id",
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow border border-gray-100">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-teal-600 text-white">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-semibold whitespace-nowrap first:rounded-tl-2xl last:rounded-tr-2xl"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <EmptyState title={emptyTitle} message={emptyMessage} />
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr
                key={row[keyField] ?? idx}
                className="border-b border-gray-50 hover:bg-teal-50/40 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render
                      ? col.render(row[col.key], row,idx)
                      : (row[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default memo(DataTable);
