// src/pages/PostDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/api';

function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the specific post from the API
    async function fetchPost() {
      try {
        const data = await getPostById(postId);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
    fetchPost();
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By {post.author}</p>
      <div>{post.content}</div>
    </div>
  );
}

export default PostDetailPage;
