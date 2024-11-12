// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // Importa o ícone de seta da biblioteca react-icons

const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 1rem;
  padding: 8px 12px;
  margin-bottom: 16px;
  transition: color 0.3s;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; // Reduz o tamanho da fonte em telas menores
  }
`;

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)}>
      Voltar
    </Button>
  );
}

export default BackButton;
