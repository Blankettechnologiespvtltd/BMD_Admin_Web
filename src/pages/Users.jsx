import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import { initialUsers } from "../data/users";

export default function Users() {
  const [users, setUsers] =
    useState(initialUsers);

  const [search, setSearch] =
    useState("");

  const [showAdd, setShowAdd] =
    useState(false);

  const [editUser, setEditUser] =
    useState(null);

  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email} ${u.role} ${u.address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const addUser = (newUser) => {

  const emailExists = users.some(
    (user) =>
      user.email.toLowerCase() ===
      newUser.email.toLowerCase()
  );

  if (emailExists) {
    alert("Email already exists!");
    return;
  }

  const user = {
    ...newUser,
    id: users.length + 1,
    photo:
      newUser.photo ||
      "https://i.pravatar.cc/150",
  };

  setUsers([...users, user]);
};
 const updateUser = (updatedUser) => {

  const emailExists = users.some(
    (user) =>
      user.id !== updatedUser.id &&
      user.email.toLowerCase() ===
      updatedUser.email.toLowerCase()
  );

  if (emailExists) {
    alert("Email already exists!");
    return;
  }

  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === updatedUser.id
        ? updatedUser
        : user
    )
  );

  setSelectedUser(null);
};

  const deleteUser = (id) => {
    setUsers(
      users.filter(
        (u) => u.id !== id
      )
    );
  };

  const handleUpload = (id, file) => {
  const imageUrl = URL.createObjectURL(file);

  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === id
        ? { ...user, photo: imageUrl }
        : user
    )
  );
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          All Users
        </h1>

        <button
          onClick={() =>
            setShowAdd(true)
          }
          className="bg-teal-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaUserPlus />
          Add User
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="mt-6">
        <UserTable
          users={filteredUsers}
          onEdit={setEditUser}
          onDelete={deleteUser}
          onUpload={handleUpload}
        />
      </div>

      {showAdd && (
        <AddUserModal
          onClose={() =>
            setShowAdd(false)
          }
          onAdd={addUser}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() =>
            setEditUser(null)
          }
          onSave={updateUser}
        />
      )}

    </div>
  );
}