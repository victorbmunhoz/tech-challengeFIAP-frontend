// src/pages/AdminPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../styles/Container';
import styled from 'styled-components';

const ContentContainer = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
  text-align: center; // Centraliza o título
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; // Espaçamento entre os botões
  align-items: center; // Centraliza os botões horizontalmente
  margin-top: 20px;
  width: 100%; // Garante que a largura ocupe todo o espaço disponível

  @media (min-width: 768px) {
    flex-direction: row; // Alinha os botões lado a lado em telas maiores
    justify-content: center; // Centraliza os botões horizontalmente
    gap: 40px; // Aumenta o espaçamento entre os botões em telas maiores
  }
`;

const CustomButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 300px; // Limita a largura máxima dos botões
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-3px); // Adiciona um efeito de "elevação" ao passar o mouse
  }

  @media (min-width: 768px) {
    font-size: 1.1rem; // Aumenta o tamanho da fonte em telas maiores
    padding: 18px 24px; // Ajusta o padding para um botão maior em telas maiores
  }

  @media (min-width: 1024px) {
    font-size: 1.2rem; // Tamanho da fonte ainda maior em telas grandes
    padding: 20px 30px; // Mais padding em telas grandes
  }
`;

function AdminPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <ContentContainer>Página de Administração</ContentContainer>
      <ButtonContainer>
        <CustomButton onClick={() => navigate('/manage-users')}>Gerenciar Usuários</CustomButton>
        <CustomButton onClick={() => navigate('/manage-posts')}>Gerenciar Posts</CustomButton>
      </ButtonContainer>
    </Container>
  );
}

export default AdminPage;
