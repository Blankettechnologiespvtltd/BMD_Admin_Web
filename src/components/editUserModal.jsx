import { useState } from "react";

export default function EditUserModal({
  user,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(user);

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-xl font-bold mb-4">
          Edit User
        </h2>

        <input
          value={form.name}
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          value={form.email}
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          value={form.address}
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <select
          value={form.role}
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option>User</option>
          <option>Tailor</option>
        </select>

        <h3 className="font-semibold mb-2">
          Change Password
        </h3>

        <input
          type="password"
          placeholder="Current Password"
          className="border w-full p-2 mb-3"
        />

        <input
          type="password"
          placeholder="New Password"
          className="border w-full p-2 mb-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border w-full p-2 mb-3"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>

          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}