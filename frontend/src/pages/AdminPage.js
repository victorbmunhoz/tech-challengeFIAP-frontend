// src/pages/AdminPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Page</h1>
      <Button onClick={() => navigate('/manage-users')}>Manage Users</Button>
      <Button onClick={() => navigate('/manage-posts')}>Manage Posts</Button>
    </div>
  );
}

export default AdminPage;
