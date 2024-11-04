// src/pages/ManagePostsPage.js
import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../services/api';
import Button from '../components/Button';

function ManagePostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        alert('Post deleted successfully');
        // Refetch posts
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div>
      <h1>Manage Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {post.title}
            <Button onClick={() => handleDelete(post._id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagePostsPage;
