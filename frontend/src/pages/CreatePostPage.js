// src/pages/CreatePostPage.js
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { createPost } from '../services/api';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert('All fields are required!');
      return;
    }

    try {
      await createPost({ title, author, content });
      alert('Post created successfully!');
      setTitle('');
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
      ></textarea>
      <Button type="submit">Create Post</Button>
    </form>
  );
}

export default CreatePostPage;