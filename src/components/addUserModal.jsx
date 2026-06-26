import { useState } from "react";

export default function AddUserModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "User",
  });

  const handleSubmit = () => {
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[450px]">
        <h2 className="text-xl font-bold mb-4">
          Add User
        </h2>

        <input
          placeholder="Name"
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Address"
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
        />

        <select
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

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
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