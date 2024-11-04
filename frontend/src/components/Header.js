// src/components/Header.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.nav`
  a {
    color: white;
    margin: 0 1rem;
    text-decoration: none;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
`;

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <h1>Blog App</h1>
      {isAuthenticated && <h2>Bem vindo, {user?.username}!</h2>}
      <NavLinks>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/admin">Admin</Link>}
      </NavLinks>
      {isAuthenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={() => navigate('/login')}>Login</Button>
      )}
    </HeaderContainer>
  );
}

export default Header;
