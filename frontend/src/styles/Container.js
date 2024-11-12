// src/styles/Container.js
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding: 40px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default Container;
