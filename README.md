# <img src="https://nestjs.com/img/logo-small.svg" alt="Nest.js logo" width="24"/> NestJS API – Login (REST), User & Menu Data (GraphQL)

This is a simple backend API built with **NestJS** that supports both REST and GraphQL.

[🌐 Live Demo](https://api-demo10.icatchu.id)

## 🔧 Features

- 🛡️ **Login via REST** (`/auth/login`) with secure JWT authentication
- 👤 **Fetch user data** using GraphQL
- 📋 **Fetch menu data** using GraphQL
- 📡 GraphQL endpoint at `/graphql`
- 🔄 Data seeder available via `npm run seed`

## 🚀 Tech Stack

| Category        | Tools / Libraries               |
| --------------- | ------------------------------- |
| Framework       | [NestJS](https://nestjs.com/)   |
| Language        | TypeScript                      |
| Authentication  | JWT, Passport                   |
| GraphQL Support | Apollo Server + @nestjs/graphql |
| Database        | MongoDB (via Mongoose)          |
| Hashing         | bcrypt / bcryptjs               |
| Seeding Tool    | nestjs-command (`npm run seed`) |

## 🛠️ Deployment & OPS Stack

This project uses the following stack for deployment and infrastructure:

- **VPS** – Hosts the application
- **Docker** – Builds and runs the application in isolated environments
- **Nginx** – Serves as a reverse proxy and handles routing
- **GitHub Actions** – CI/CD pipeline for build and deployment automation
- **Cloudflare** – Provides DNS management, firewall, and DDoS protection

## 📂 Project Structure

```
src/
├── auth/ # Handles login logic, JWT strategy, user & menu access
├── graphql/ # GraphQL module configuration
├── schemas/ # Mongoose schemas/models for MongoDB collections
├── seed/ # Data seeding logic for users and menus
├── app.module.ts # Root module that combines all modules
└── main.ts # Entry point; sets up CORS, cookie parser, and starts the app
```

## 🔐 Authentication

Login endpoint:

**POST** `/auth/login`

### 🧾 Request Body
```json
{
  "username": "admin",
  "password": "admin123"
}
```
- Returns JWT access token
- Use token in Authorization header for GraphQL and protected routes

## 🧵 GraphQL Access

GraphQL endpoint:  
**POST** `/graphql`

### 📡 Example Queries

```graphql
query {
  user {
    _id
    username
    role
    status
  }
}

query {
  menus {
    title
    path
    icon
    roles
  }
}
```

## ✍️ Author

Made with ❤️ by Jo  
[LinkedIn](https://www.linkedin.com/in/joshua-ather)
