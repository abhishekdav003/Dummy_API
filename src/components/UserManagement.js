import React, { useState } from "react";
import axios from "axios";
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    if (!showUsers) {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response.data.users);
    }
    setShowUsers(!showUsers);
  };

  const addUser = async () => {
    const response = await axios.post(
      "https://dummyjson.com/users/add",
      newUser
    );
    setUsers([...users, response.data]);
    setNewUser({ firstName: "", lastName: "", age: "" });
  };

  const updateUser = async (id) => {
    const response = await axios.put(
      `https://dummyjson.com/users/${id}`,
      editingUser
    );
    setUsers(users.map((user) => (user.id === id ? response.data : user)));
    setEditingUser(null);
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://dummyjson.com/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>

      <button onClick={fetchUsers} className="toggle-users-btn">
        {showUsers ? "Hide Users" : "Show Users"}
      </button>

      {showUsers && (
        <div className="user-list">
          <h2>Users</h2>
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <p>Age: {user.age}</p>
              <button onClick={() => setEditingUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <div className="add-user">
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={(e) =>
            setNewUser({ ...newUser, firstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {editingUser && (
        <div className="edit-user">
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="First Name"
            value={editingUser.firstName}
            onChange={(e) =>
              setEditingUser({ ...editingUser, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={editingUser.lastName}
            onChange={(e) =>
              setEditingUser({ ...editingUser, lastName: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Age"
            value={editingUser.age}
            onChange={(e) =>
              setEditingUser({ ...editingUser, age: e.target.value })
            }
          />
          <button onClick={() => updateUser(editingUser.id)}>
            Update User
          </button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
