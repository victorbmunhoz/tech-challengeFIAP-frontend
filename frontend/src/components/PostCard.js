// src/components/PostCard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Author = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin: 0 0 1rem;
  color: #444;
  font-size: 1rem;
  line-height: 1.4;
`;

const ReadMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

function PostCard({ post }) {
  // Limita o conteúdo a 80 caracteres
  const shortContent =
    post.content.length > 80 ? post.content.substring(0, 80) + '...' : post.content;

  return (
    <Card>
      <Title>{post.title}</Title>
      <Author>Escrito por {post.author}</Author>
      <Description>{shortContent}</Description>
      <ReadMoreLink to={`/post/${post._id}`}>Ler mais...</ReadMoreLink>
    </Card>
  );
}

export default PostCard;
