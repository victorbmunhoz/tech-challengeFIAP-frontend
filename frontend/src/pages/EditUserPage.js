// src/pages/EditUserPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserById, updateUser } from '../services/api';
import BackButton from '../components/BackButton';
import Container from '../styles/Container';
import { useParams, useNavigate } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
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

function EditUserPage() {
  const { userId } = useParams();

  console.log(userId);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserById(userId);
        setUsername(data.username);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    }
    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, { username, password });
      alert('Usuário atualizado com sucesso');
      navigate('/manage-users');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <Container>
      <BackButton />
      <Form onSubmit={handleSubmit}>
        <Title>Editar Usuário</Title>
        <Input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Salvar Alterações</Button>
      </Form>
    </Container>
  );
}

export default EditUserPage;
