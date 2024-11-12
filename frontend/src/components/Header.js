// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  cursor: pointer;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const UserGreeting = styled.span`
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
`;

function Header() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>BlogProfessores</Logo>
      <Nav>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/admin">Admin</Link>}
      </Nav>
      <UserSection>
        {isAuthenticated ? (
          <>
            <UserGreeting>Bem-vindo, {user?.username}!</UserGreeting>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button onClick={() => navigate('/login')}>Login</Button>
        )}
      </UserSection>
    </HeaderContainer>
  );
}

export default Header;
