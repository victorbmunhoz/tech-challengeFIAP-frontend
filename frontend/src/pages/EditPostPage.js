// src/pages/EditPostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { getPostById, updatePost } from '../services/api';

function EditPostPage() {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostById(postId);
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(postId, { title, author, content });
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
      ></textarea>
      <Button type="submit">Save Changes</Button>
    </form>
  );
}

export default EditPostPage;
