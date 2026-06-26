/**
 * DANGER ZONE COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Irreversible, high-consequence actions: logout all devices, delete account.
 * Each action is protected behind a confirmation modal.
 *
 * API connection points (when ready):
 *   POST   /api/v1/admin/auth/logout-all → logoutAllDevices (then clear cookies & redirect)
 *   DELETE /api/v1/admin/account         → deleteAccount (then redirect to /login)
 *
 * Props (from useSettings hook via SettingsPage):
 *   showLogoutAllModal      – boolean
 *   setShowLogoutAllModal   – setter
 *   onLogoutAllConfirm      – handler
 *   savingLogoutAll         – boolean
 *   showDeleteModal         – boolean
 *   setShowDeleteModal       – setter
 *   deleteConfirmText       – string (must equal "DELETE")
 *   setDeleteConfirmText     – setter
 *   onDeleteAccountConfirm  – handler
 *   savingDeleteAccount     – boolean
 */

import { MdLogout, MdDeleteForever, MdWarning } from "react-icons/md";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

// ── Danger action card ─────────────────────────────────────────────────────────
function DangerAction({ icon: Icon, title, description, buttonLabel, buttonStyle, onClick, loading }) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-4 py-5 first:pt-0 last:pb-0 border-b border-red-50 last:border-0">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition disabled:opacity-60 ${buttonStyle}`}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Processing…
          </>
        ) : (
          buttonLabel
        )}
      </button>
    </div>
  );
}

export default function DangerZone({
  showLogoutAllModal,
  setShowLogoutAllModal,
  onLogoutAllConfirm,
  savingLogoutAll,
  showDeleteModal,
  setShowDeleteModal,
  deleteConfirmText,
  setDeleteConfirmText,
  onDeleteAccountConfirm,
  savingDeleteAccount,
}) {
  return (
    <>
      {/* ── Danger Zone Card ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border-2 border-red-100 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
            <MdWarning size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-red-700">Danger Zone</h3>
            <p className="text-sm text-gray-400 mt-0.5">
              Actions here are irreversible. Please proceed with caution.
            </p>
          </div>
        </div>

        <div className="border-t border-red-50 pt-5">
          <DangerAction
            icon={MdLogout}
            title="Logout All Devices"
            description="Immediately invalidate all active sessions across every device and browser. You will need to log in again."
            buttonLabel="Logout All Devices"
            buttonStyle="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
            onClick={() => setShowLogoutAllModal(true)}
            loading={savingLogoutAll}
          />

          <DangerAction
            icon={MdDeleteForever}
            title="Delete Account"
            description="Permanently delete your admin account and all associated data. This cannot be undone."
            buttonLabel="Delete Account"
            buttonStyle="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
            onClick={() => setShowDeleteModal(true)}
            loading={savingDeleteAccount}
          />
        </div>
      </div>

      {/* ── Logout All Devices Confirmation Modal ────────────────────────────── */}
      <ConfirmationModal
        isOpen={showLogoutAllModal}
        title="Logout All Devices"
        message="This will immediately terminate all active sessions across every device. You will be redirected to the login page."
        confirmLabel="Yes, Logout All"
        confirmStyle="bg-amber-500 hover:bg-amber-600"
        onConfirm={onLogoutAllConfirm}
        onCancel={() => setShowLogoutAllModal(false)}
        loading={savingLogoutAll}
      />

      {/* ── Delete Account Confirmation Modal ────────────────────────────────── */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <MdDeleteForever size={22} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Delete Account</h3>
            </div>

            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              This action is <strong className="text-red-600">permanent and irreversible</strong>.
              All your data will be deleted. To confirm, type{" "}
              <strong className="font-mono text-gray-800">DELETE</strong> below.
            </p>

            {/* Type DELETE input */}
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder='Type "DELETE" to confirm'
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent mb-5 font-mono"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { setShowDeleteModal(false); setDeleteConfirmText(""); }}
                disabled={savingDeleteAccount}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDeleteAccountConfirm}
                disabled={savingDeleteAccount || deleteConfirmText !== "DELETE"}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition disabled:opacity-60"
              >
                {savingDeleteAccount ? "Deleting…" : "Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
