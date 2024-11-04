# Blog App - Projeto de Tech Challenge

Este é um projeto de um aplicativo de blog desenvolvido como parte do Tech Challenge da sua formação em desenvolvimento Full Stack. Ele inclui uma interface front-end construída com React e um servidor back-end em Node.js com MongoDB.

---

## Requisitos

- **Node.js** (versão 14 ou superior)
- **MongoDB** (instalado e em execução)

---

## Como Rodar o Projeto

### 1. Configurar e Rodar o Back-End

1. Navegue até o diretório do back-end:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Certifique-se de que o MongoDB está rodando. Se estiver usando o MongoDB local, inicie-o:
   ```bash
   mongod
   ```
4. Configure a string de conexão com o MongoDB no arquivo `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/tech_challenge
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```
6. O back-end estará disponível em `http://localhost:5000`.

---

### 2. Configurar e Rodar o Front-End

1. Navegue até o diretório do front-end:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do React:
   ```bash
   npm start
   ```
4. O front-end estará disponível em `http://localhost:3000`.

---

## Funcionalidades Principais

- **Gestão de Usuários**: Criação, edição e exclusão de usuários (somente admin).
- **Gestão de Posts**: Criação, edição e exclusão de posts.
- **Autenticação**: Login e logout com controle de acesso às páginas protegidas.

---

## Notas Adicionais

- Use **MongoDB Compass** ou **Mongo Shell** para visualizar e gerenciar o banco de dados.
- Para testar as rotas da API, você pode usar ferramentas como **Postman** ou **Insomnia**.

---

## Contribuição

Sinta-se à vontade para sugerir melhorias ou relatar problemas ao desenvolver o projeto.

---

**Enjoy coding! 🚀**
