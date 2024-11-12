// src/pages/CreatePostPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import BackButton from '../components/BackButton';
import { createPost } from '../services/api';
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

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      await createPost({ title, author, content });
      alert('Post criado com sucesso!');
      setTitle('');
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Erro ao criar o post:', error);
      alert('Erro ao criar o post. Tente novamente.');
    }
  };

  return (
    <Container>
      <BackButton />
      <Form onSubmit={handleSubmit}>
        <Title>Criar Novo Post</Title>
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
        <Button type="submit">Criar Post</Button>
      </Form>
    </Container>
  );
}

export default CreatePostPage;
