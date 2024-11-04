// src/pages/ManageUsersPage.js
import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import Button from '../components/Button';

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleCreateOrUpdateUser = async () => {
    try {
      if (editingUserId) {
        await updateUser(editingUserId, { username, password });
        alert('User updated successfully');
      } else {
        await createUser({ username, password });
        alert('User created successfully');
      }
      setEditingUserId(null);
      setUsername('');
      setPassword('');
      // Refetch users
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error creating/updating user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setUsername(user.username);
    setPassword(user.password);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        alert('User deleted successfully');
        // Refetch users
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleCreateOrUpdateUser}>
        {editingUserId ? 'Update User' : 'Create User'}
      </Button>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username}
            <Button onClick={() => handleEdit(user)}>Edit</Button>
            <Button onClick={() => handleDelete(user._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsersPage;
