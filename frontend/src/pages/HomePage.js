// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import { getPosts } from '../services/api';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const NoPostsMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 2rem;
`;

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    }
    fetchPosts();
  }, []);

  // Filtra os posts com base no termo de pesquisa
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Buscar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      {filteredPosts.length > 0 ? (
        <PostsGrid>
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </PostsGrid>
      ) : (
        <NoPostsMessage>nenhum post disponível</NoPostsMessage>
      )}
    </Container>
  );
}

export default HomePage;
