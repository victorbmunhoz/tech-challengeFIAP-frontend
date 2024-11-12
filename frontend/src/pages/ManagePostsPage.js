// src/pages/ManagePostsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts, deletePost } from '../services/api';
import Container from '../styles/Container';
import BackButton from '../components/BackButton';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PostsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PostItem = styled.li`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
`;

const PostAuthor = styled.p`
  margin: 5px 0 0;
  color: #777;
  font-size: 0.9rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &.delete {
    background-color: red;
    &:hover {
      background-color: darkred;
    }
  }
`;

function ManagePostsPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await deletePost(postId);
        alert('Post excluído com sucesso!');
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error('Erro ao excluir o post:', error);
      }
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleAddNewPost = () => {
    navigate('/create');
  };

  return (
    <Container>
      <BackButton />
      <Header>
        <h2>Gerenciar Posts</h2>
      </Header>
        <Button onClick={handleAddNewPost}>Adicionar Novo Post</Button>
      <PostsList>
        {posts.map((post) => (
          <PostItem key={post._id}>
            <PostDetails>
              <PostTitle>{post.title}</PostTitle>
              <PostAuthor>Por {post.author}</PostAuthor>
            </PostDetails>
            <ButtonsContainer>
              <Button onClick={() => handleEdit(post._id)}>Editar</Button>
              <Button className="delete" onClick={() => handleDelete(post._id)}>Excluir</Button>
            </ButtonsContainer>
          </PostItem>
        ))}
      </PostsList>
    </Container>
  );
}

export default ManagePostsPage;
