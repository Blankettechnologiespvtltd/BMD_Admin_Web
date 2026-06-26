import { FaUserCircle } from "react-icons/fa";
import Loader from "../../../components/common/Loader";
import { formatDate, formatBoolean } from "../../../utils/formatters";

/**
 * ONLY THESE FIELDS WILL BE SHOWN IN UI
 */
const FIELDS_TO_SHOW = [
  "Id",
  "FullName",
  "Email",
  "Mobile",
  "Role",
  "IsActive",
  "IsEmailVerified",
  "IsMobileVerified",
  "Address",
  "Gender",
  "CreatedAt",
  "UpdatedAt",
];

/**
 * Boolean fields
 */
const BOOL_FIELDS = new Set([
  "IsActive",
  "IsEmailVerified",
  "IsMobileVerified",
]);

/**
 * Date fields
 */
const DATE_FIELDS = new Set(["CreatedAt", "UpdatedAt"]);

/**
 * Skip objects safely
 */
function renderValue(key, value) {
  if (value === null || value === undefined || value === "") return "-";

  // ❌ skip nested objects like EditProfile
  if (typeof value === "object") return "-";

  if (BOOL_FIELDS.has(key)) return formatBoolean(value);
  if (DATE_FIELDS.has(key)) return formatDate(value);

  return String(value);
}

/**
 * Row component
 */
function FieldRow({ label, value }) {
  return (
    <div className="py-2.5 border-b border-gray-50 last:border-0">
      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
        {label}
      </dt>
      <dd className="text-sm text-gray-800 break-words">{value}</dd>
    </div>
  );
}

export default function ViewUserModal({
  user,
  detailLoading,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[85vh] overflow-hidden">
        <div className="p-6 max-h-[85vh] overflow-y-auto  ">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            User Details
          </h2>

        
        </div>

        {/* LOADING */}
        {detailLoading && <Loader text="Loading user details..." />}

        {/* USER DATA */}
        {!detailLoading && user && (
          <>
            {/* AVATAR */}
            <div className="flex justify-center mb-6">
              {user.ProfileImageUrl ? (
                <img
                  src={user.ProfileImageUrl}
                  alt={user.FullName}
                  className="w-20 h-20 rounded-full object-cover border-2 border-teal-500"
                />
              ) : (
                <FaUserCircle size={72} className="text-gray-200" />
              )}
            </div>

            {/* FIELDS */}
            <dl className="divide-y divide-gray-50">
              {FIELDS_TO_SHOW.map((key) => {
                const rawValue = user?.[key];

                let label = key;

                // readable labels
                const LABELS = {
                  Id: "User ID",
                  FullName: "Full Name",
                  Email: "Email",
                  Mobile: "Mobile",
                  Role: "Role",
                  IsActive: "Active",
                  IsEmailVerified: "Email Verified",
                  IsMobileVerified: "Mobile Verified",
                  Address: "Address",
                  Gender: "Gender",
                  CreatedAt: "Member Since",
                  UpdatedAt: "Last Updated",
                };

                return (
                  <FieldRow
                    key={key}
                    label={LABELS[key] || key}
                    value={renderValue(key, rawValue)}
                  />
                );
              })}
            </dl>
          </>
        )}

        {/* EMPTY STATE */}
        {!detailLoading && !user && (
          <p className="text-center text-gray-400 py-10">
            No user data found
          </p>
        )}

        {/* FOOTER */}
        <div className="mt-2 flex justify-center">
          <button
            onClick={onClose}
          className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}