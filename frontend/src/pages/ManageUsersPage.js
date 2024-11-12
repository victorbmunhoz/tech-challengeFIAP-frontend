// src/pages/ManageUsersPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUsers, deleteUser } from '../services/api';
import BackButton from '../components/BackButton';
import Container from '../styles/Container';
import { useNavigate } from 'react-router-dom';

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const TableWrapper = styled.div`
  overflow-x: auto; /* Permite rolagem horizontal em telas menores */
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  th {
    text-align: left;
    padding: 12px 16px;
    font-weight: 600;
  }
`;

const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: #f8f9fa;
    }

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const TableRow = styled.tr`
  td {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
    color: ${({ theme }) => theme.colors.text};

    &:last-child {
      text-align: right; /* Alinha os botões à direita */
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &.delete {
    background-color: #ff4d4d;
    &:hover {
      background-color: #cc0000;
    }
  }

  &.edit {
    background-color: ${({ theme }) => theme.colors.secondary};
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryHover};
    }
  }
`;

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(userId);
        alert('Usuário excluído com sucesso');
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  return (
    <Container>
      <BackButton />
      <Title>Gerenciar Usuários</Title>
      <Button onClick={() => navigate('/new-user')}>Criar Novo Usuário</Button>
      <TableWrapper>
        <Table>
          <TableHead>
            <tr>
              <th>Nome de Usuário</th>
              <th>Ações</th>
            </tr>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <td>{user.username}</td>
                <td>
                  <ButtonsContainer>
                    <Button className="edit" onClick={() => navigate(`/edit-user/${user._id}`)}>
                      Editar
                    </Button>
                    <Button className="delete" onClick={() => handleDelete(user._id)}>
                      Excluir
                    </Button>
                  </ButtonsContainer>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Container>
  );
}

export default ManageUsersPage;
