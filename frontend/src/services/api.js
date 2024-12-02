import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL do back-end
});

export default api;

// Utilitário para tratar erros de requisição
const handleApiError = (error, context) => {
  console.error(`Error in ${context}:`, error.response?.data || error.message);
  throw error;
};

// Funções relacionadas a Posts
export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    handleApiError(error, 'getPosts');
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'getPostById');
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'createPost');
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await api.put(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'updatePost');
  }
};

export const deletePost = async (postId) => {
  try {
    await api.delete(`/posts/${postId}`);
  } catch (error) {
    handleApiError(error, 'deletePost');
  }
};

// Funções relacionadas a Usuários
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    handleApiError(error, 'loginUser');
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    handleApiError(error, 'getUsers');
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'getUserById');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'createUser');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'updateUser');
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'deleteUser');
  }
};
