// src/pages/LoginPage.js
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/api';
import styled from 'styled-components';
import Container from '../styles/Container';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;
  margin: 50px auto;
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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 0.9rem;
`;

function LoginPage() {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Faça a requisição de login ao servidor
      const data = await loginUser({ username, password });

      if (data.message === 'Login successful') {
        setIsAuthenticated(true);
        setUser({ username, ...data.userDetails });
        navigate('/admin');
      } else {
        setError('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
