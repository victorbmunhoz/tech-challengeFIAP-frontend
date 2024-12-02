# Blog App - Tech Challenge

Este é um projeto de blog desenvolvido como parte do **Tech Challenge Full Stack**, utilizando **React** no front-end, **Node.js** no back-end e **MongoDB** como banco de dados. O projeto foi desenvolvido para oferecer uma experiência completa de gestão de posts e usuários, com autenticação e autorização.

---

## Tecnologias Usadas

- **Front-End**: React, Styled Components
- **Back-End**: Node.js, Express.js, Mongoose
- **Banco de Dados**: MongoDB
- **Gerenciamento de Estado**: Context API
- **Estilização**: Styled Components

---

## Funcionalidades

### Front-End
- **Página Inicial**: Lista de posts com busca por título.
- **Detalhes do Post**: Exibe o conteúdo completo de um post.
- **Gestão de Posts**: Criação, edição e exclusão (restrito a admins).
- **Gestão de Usuários**: Criação, edição e exclusão de usuários (restrito a admins).
- **Autenticação**: Login e logout com controle de acesso.

### Back-End
- **API RESTful** para interação com o banco de dados.
- Criação automática de um usuário admin inicial (username: `fiap`, senha: `12345`).
- Validação e tratamento de erros em todas as rotas.

---

## Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (>= 16.13)
- **MongoDB** instalado e em execução.

### Passo 1: Configuração do Back-End
1. Navegue até o diretório do back-end:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` com a string de conexão do MongoDB:
   ```
   MONGO_URI=mongodb://localhost:27017/tech_challenge
   PORT=5000
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
   O back-end estará disponível em `http://localhost:5000`.

### Passo 2: Configuração do Front-End
1. Navegue até o diretório do front-end:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   O front-end estará disponível em `http://localhost:3000`.

---

## Notas Adicionais

- Use **MongoDB Compass** para visualizar os dados do banco.
- Para testar as rotas do back-end, utilize ferramentas como **Postman** ou **Insomnia**.

---

## Contribuidores

- Desenvolvedor: **Victor Munhoz**
