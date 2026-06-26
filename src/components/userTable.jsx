import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";

export default function UserTable({
  users,
  onEdit,
  onDelete,
  onUpload,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="px-4 py-3 font-semibold">ID</th>
            <th className="px-4 py-3 font-semibold">Photo</th>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Address</th>
            <th className="px-4 py-3 font-semibold">Role</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-center">
                  {user.id}
                </td>

                <td className="px-4 py-3">
                  <img
                    src={
                      user.photo ||
                      "https://via.placeholder.com/50"
                    }
                    alt={user.name}
                    className="w-12 h-12 rounded-full mx-auto object-cover border"
                  />
                </td>

                <td className="px-4 py-3 text-center">
                  {user.name}
                </td>

                <td className="px-4 py-3 text-center">
                  {user.email}
                </td>

                <td className="px-4 py-3 text-center">
                  {user.address}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === "Tailor"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center items-center gap-2">
                    {/* Edit */}
                    <button
                      onClick={() => onEdit(user)}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition"
                      title="Edit User"
                    >
                      <FaEdit />
                    </button>

                    {/* Upload Photo */}
                    <label
                      className="bg-black hover:bg-gray-800 text-white p-2 rounded cursor-pointer transition"
                      title="Upload Photo"
                    >
                      <FaUpload />

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            onUpload(user.id, file);
                          }
                        }}
                      />
                    </label>

                    {/* Delete */}
                    <button
                      onClick={() => onDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-gray-500"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}