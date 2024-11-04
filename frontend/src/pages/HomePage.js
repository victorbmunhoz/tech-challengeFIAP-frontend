import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import Input from '../components/Input';
import { getPosts } from '../services/api';

const Container = styled.div`
  padding: 2rem;
`;

const SearchBar = styled.div`
  margin-bottom: 1.5rem;
`;

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch posts from the API when the component mounts
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

  // Filter posts based on the search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      {filteredPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
}

export default HomePage;