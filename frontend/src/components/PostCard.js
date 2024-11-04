// src/components/PostCard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
`;

const Author = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

function PostCard({ post }) {
  return (
    <Card>
      <Title>{post.title}</Title>
      <Author>Escrito por {post.author}</Author>
      <p>{post.description}</p>
      <Link to={`/post/${post._id}`}>Read More</Link>
    </Card>
  );
}

export default PostCard;
