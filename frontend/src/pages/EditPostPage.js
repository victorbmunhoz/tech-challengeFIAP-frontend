// src/pages/EditPostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import { getPostById, updatePost } from '../services/api';
import Container from '../styles/Container';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  width: 100%;
  margin: 40px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

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
        console.error('Erro ao buscar o post:', error);
      }
    }
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(postId, { title, author, content });
      alert('Post atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o post:', error);
      alert('Erro ao atualizar o post. Tente novamente.');
    }
  };

  return (
    <Container>
      <BackButton />
      <Form onSubmit={handleSubmit}>
        <Title>Editar Post</Title>
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50} // Limite de 50 caracteres
          required
        />
        <Input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={50} // Limite de 50 caracteres
          required
        />
        <TextArea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
        ></TextArea>
        <Button type="submit">Salvar Alterações</Button>
      </Form>
    </Container>
  );
}

export default EditPostPage;
