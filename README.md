# Finance Tracker - BackEnd

![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)

API REST para gerenciamento de finanças pessoais, permitindo controle de receitas e despesas. Desenvolvida com Node.js, Express, PostgreSQL e Prisma ORM, oferece autenticação segura e endpoints para análise financeira do usuário.

## ✨ Funcionalidades

- ✅ Autenticação JWT
- ✅ CRUD completo de transações financeiras
- ✅ Filtros e busca de transações
- ✅ Gerenciamento de usuários
- ✅ Criptografia de senhas
- ✅ Validação de dados

## 🚀 Como Executar

### 📋 Pré-requisitos

```
Node.js (versão 16 ou superior)
npm ou yarn
PostgreSQL (versão 12 ou superior)
Git
```

### 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/emanuel-henrique/Finance_Tracker-BackEnd.git
cd Finance_Tracker-BackEnd
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env`:
```env
SERVER_PORT=3000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/finance_tracker
TOKEN_SECRET=seu_secret_aqui
```

4. Gere o Prisma Client:
```bash
npx prisma generate
```

5. Execute as migrations do banco de dados:
```bash
npx prisma migrate dev
```

6. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [Express](https://expressjs.com/) - Framework web
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados
- [Prisma](https://www.prisma.io/docs) - ORM
- [JWT](https://jwt.io/) - Autenticação
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Criptografia de senhas

## 🔌 Endpoints da API

### Autenticação
- `POST /sessions` - Login e geração de token
  ```json
  {
    "email": "usuario@email.com",
    "password": "senha123"
  }
  ```

### Usuário
- `POST /users/create` - Cadastrar novo usuário
- `PUT /users/update` - Atualizar usuário (requer autenticação)

### Transações
- `POST /transactions/create` - Criar transação (requer autenticação)
  ```json
  {
    "title": "Salário",
    "amount": 5000.00,
    "type": "Receita",
  }
  ```
- `GET /transactions/:id` - Buscar transação por ID
- `GET /transactions/?type=Despesa&title=` - Filtrar transações
- `PUT /transactions/:id` - Atualizar transação
- `DELETE /transactions/:id` - Deletar transação

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Queries seguras com Prisma ORM
- Validação de dados nas rotas

## 👨‍💻 Autor

**Emanuel Henrique** - [GitHub](https://github.com/emanuel-henrique) | [LinkedIn](https://www.linkedin.com/in/emanuel-henrique-38b264392/)

## 📝 Sobre o Projeto

Projeto desenvolvido para aplicar conhecimentos em desenvolvimento backend, APIs RESTful e banco de dados relacionais.

---

⭐ Se este projeto te ajudou de alguma forma, considere dar uma estrela!
