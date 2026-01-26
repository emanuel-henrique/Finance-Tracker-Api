# Finance Tracker - BackEnd

API REST para gerenciamento de finanças pessoais, permitindo controle de receitas, despesas. Desenvolvida com Node.js, Express,PostgreSQL e PrismaORM, oferece autenticação e endpoints para análise financeira do usuário.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Para executar este projeto, você precisará ter instalado:

```
Node.js (versão 16 ou superior)
npm ou yarn
PostgreSQL (versão 12 ou superior)
Git
```

### 🔧 Instalação

Siga estes passos para configurar o ambiente de desenvolvimento:

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

4. Edite o arquivo `.env` com suas credenciais:

```env
SERVER_PORT=3000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/finance_tracker
TOKEN_SECRET=seu_secret_aqui
```

6. Gere o PrismaClient:

```bash
npx prisma generate
```

7. Execute as migrations do banco de dados:

```bash
npx prisma migrate dev
```

8. Inicie o servidor de desenvolvimento:

```bash
npm start

O servidor estará rodando em `http://localhost:suaporta`
```

## 🛠️ Construído com

- [Node.js](https://nodejs.org/) - Runtime JavaScript
- [Express](https://expressjs.com/) - Framework web minimalista
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Prisma](https://www.prisma.io/docs) - ORM para Node.js
- [JWT](https://jwt.io/) - Autenticação via JSON Web Tokens
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Hashing de senhas
- [ESLint](https://eslint.org/) - Linter para JavaScript
- [Prettier](https://prettier.io/) - Formatador de código
- [dotenv](https://www.npmjs.com/package/dotenv) - Gerenciamento de variáveis de ambiente

## 🔌 API Endpoints

### Sessions

- `POST /sessions` - Login e geração token

### Usuário

- `POST /users/create` - Cadastrar novo usuário
- `PUT /users/update` - Atualizar informações do usuário

### Transações

- `POST /transactions/create` - Criar nova transação
- `GET /transactions/:id` - Detalhes transação por ID
- `GET /transactions/?type=Despesa&title=` - Filtro de pesquisa das transações
- `PUT /transactions/:id` - Atualizar transação
- `DELETE /transactions/:id` - Deletar transação

## ✒️ Autores

- **Emanuel Henrique** - _Desenvolvimento Backend e DB_ - [Dev](https://github.com/emanuel-henrique)

- **Emanuel Henrique** - Desenvolvimento FrontEnd - [Dev](https://github.com/emanuel-henrique)

## 🎁 Expressões de gratidão

- Conte a outras pessoas sobre este projeto 📢
- Dê uma ⭐️ no projeto se ele te ajudou!
- Compartilhe seu feedback para melhorarmos continuamente

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Tokens JWT com expiração configurável
- Validação de entrada em todas as rotas
- CORS configurado adequadamente
