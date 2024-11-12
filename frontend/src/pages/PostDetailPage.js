// src/pages/PostDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/api';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import Container from '../styles/Container';

const ContentContainer = styled.div`
  margin: 40px;
  word-wrap: break-word; // Quebra palavras longas para evitar estouro
  overflow-wrap: break-word;
  max-width: 100%; // Garante que o conteúdo não ultrapasse a largura da tela

  @media (max-width: 768px) {
    margin: 20px; // Reduz a margem em telas menores
  }

  p {
    margin-bottom: 1.5em; // Adiciona uma margem extra abaixo de cada parágrafo
  }
`;

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

  // Divide o conteúdo por quebras de linha e renderiza cada parágrafo
  const renderContentWithParagraphs = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  return (
    <Container>
      <BackButton />
      <h1>{post.title}</h1>
      <p>By {post.author}</p>
      <ContentContainer>{renderContentWithParagraphs(post.content)}</ContentContainer>
    </Container>
  );
}

export default PostDetailPage;
