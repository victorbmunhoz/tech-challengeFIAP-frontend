const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Verifica se a variável de ambiente MONGO_URI está definida
if (!process.env.MONGO_URI) {
  console.error('Erro: MONGO_URI não está definida no arquivo .env');
  process.exit(1); // Finaliza o servidor se não há URI do banco
}

console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
    initializeDatabase(); // Inicializa o banco de dados com usuário e post padrão
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Finaliza o servidor se a conexão falhar
  });

// Models
const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String, // Em produção, armazene senhas com hash
  role: { type: String, default: 'user' },
});

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

// Função para inicializar o banco de dados
async function initializeDatabase() {
  try {
    // Criar usuário inicial
    const existingUser = await User.findOne({ username: 'fiap' });
    if (!existingUser) {
      const newUser = new User({
        username: 'fiap',
        password: '12345', // Apenas para desenvolvimento
        role: 'admin',
      });
      await newUser.save();
      console.log('Usuário inicial criado: fiap / senha: 12345');
    } else {
      console.log('Usuário inicial já existe.');
    }

    // Criar post inicial
    const existingPost = await Post.findOne({ title: 'Post Inicial' });
    if (!existingPost) {
      const newPost = new Post({
        title: 'Post Inicial',
        author: 'Admin',
        content: 'Este é o primeiro post do sistema, criado automaticamente.',
      });
      await newPost.save();
      console.log('Post inicial criado com sucesso.');
    } else {
      console.log('Post inicial já existe.');
    }
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
  }
}

// Rotas para posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post não encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o post' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ error: 'Post não encontrado' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o post' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post não encontrado' });
    res.json({ message: 'Post excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o post' });
  }
});

// Rotas para usuários
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o usuário' });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Usuário já existe' });

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { username, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, password }, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
