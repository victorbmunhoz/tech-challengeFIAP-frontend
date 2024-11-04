const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Models
const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String, // Store hashed passwords in a real-world application
});

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

// Routes for Posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
});
// Rota para listar todos os usuários
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Rota para criar um novo usuário
app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verifique se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Crie um novo usuário
    const newUser = new User({ username, password }); // Lembre-se de hashear a senha em produção
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Rota para editar um usuário
app.put('/api/users/:id', async (req, res) => {
  const { username, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Rota para deletar um usuário
app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Simple login route for demonstration
app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
