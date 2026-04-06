# 💰 Finance Dashboard Backend

## 📌 Overview

This project is a backend system for a **Finance Dashboard application** built as part of a backend engineering assessment. It demonstrates clean API design, modular architecture, role-based access control, and efficient data processing.

The system allows users to manage financial transactions, control access based on roles, and retrieve summarized analytics for dashboard visualization.

---

## 🚀 Tech Stack

- **Node.js + Express.js**
- **TypeScript**
- **PostgreSQL**
- **Prisma ORM (v7)**
- **Zod (Validation)**
- **JWT (Authentication)**
- **pnpm (Package Manager)**

---

## 🧠 Architecture

The project follows a **modular, feature-based architecture**:

```
src/
  config/
  middleware/
  modules/
    auth/
    users/
    finance/
    dashboard/
  utils/
  app.ts
  constants.ts
server.ts
```

### 🔹 Key Design Principles

- Separation of concerns (Controller / Service / Routes)
- Centralized error handling
- Middleware-based validation and authorization
- Scalable and maintainable structure

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-Based Access Control (RBAC)

### 👥 Roles

- **VIEWER** → Read-only (no access to transactions)
- **ANALYST** → Read + analytics
- **ADMIN** → Full access (CRUD + user management)

### 🔒 Security Features

- Password hashing using Argon2
- Protected routes using middleware
- Inactive users blocked from login and API access

---

## 👤 User Management

- Admin can create users
- Update user roles (`VIEWER`, `ANALYST`, `ADMIN`)
- Enable/disable users (`ACTIVE`, `INACTIVE`)
- Pagination support for user listing

---

## 💰 Financial Records Management

### Features

- Create transactions
- View transactions
- Update transactions
- Delete transactions

### Fields

- Amount
- Type (`INCOME`, `EXPENSE`)
- Category
- Date
- Note

### 🔍 Filtering

- By type
- By category
- By date range

---

## 📊 Dashboard APIs

Provides summary-level analytics:

- Total Income
- Total Expenses
- Net Balance
- Category-wise breakdown (type-aware)
- Recent transactions

### ⚡ Optimizations

- Database-level aggregation (`aggregate`, `groupBy`)
- Parallel query execution using `Promise.all`
- Optional date filtering for dynamic insights

---

## 🛡️ Access Control

| Role    | Permissions               |
| ------- | ------------------------- |
| VIEWER  | No access to transactions |
| ANALYST | Read + dashboard          |
| ADMIN   | Full control              |

---

## 🧱 Validation & Error Handling

- Input validation using **Zod**
- Centralized error handling using:
  - `ApiError`
  - Global error middleware

- Consistent API responses via `ApiResponse`

---

## 🧪 API Overview

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`

### Users (ADMIN)

- `POST /api/v1/users`
- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `PATCH /api/v1/users/:id/role`
- `PATCH /api/v1/users/:id/status`

### Transactions

- `POST /api/v1/transactions` (ADMIN)
- `GET /api/v1/transactions` (ADMIN, ANALYST)
- `PATCH /api/v1/transactions/:id` (ADMIN)
- `DELETE /api/v1/transactions/:id` (ADMIN)

### Dashboard

- `GET /api/v1/dashboard/summary`

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/dadhichvansh/Finance-Dashboard.git
cd Finance-Dashboard
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Create a `.env` file:

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
```

- Refer to `.env.example` file for required variables.

### 4. Run migrations

```bash
pnpm run db:migrate
```

### 5. Start server

```bash
pnpm dev
```

### 🐳 Run with Docker

```bash
docker-compose up --build
```

---

## 🧠 Design Decisions

- Used **Prisma ORM** for type-safe DB operations
- Chose **Zod** for lightweight and scalable validation
- Implemented **RBAC via middleware** for flexibility
- Optimized dashboard using DB aggregation instead of in-memory processing

---

## ⚠️ Tradeoffs

- JWT is stateless (no token invalidation implemented)
- No caching layer (e.g., Redis) for dashboard queries
- Basic validation (no advanced schema relationships)

---

## 🔮 Future Improvements

- Pagination for transactions
- Redis caching for dashboard
- Rate limiting
- Unit and integration tests

---

## 📌 Notes

This project focuses on **clarity, correctness, and maintainability** rather than unnecessary complexity, aligning with the requirements of the assignment.

---

## 🔥 Summary

This backend demonstrates:

- Clean architecture
- Strong access control
- Efficient data handling
- Scalable design patterns

It fulfills all core requirements of the assignment while maintaining production-level coding practices.

---

## 📚 API Documentation

This project includes interactive API documentation using Swagger UI.

To access it locally:

1. Start the server
2. Open: http://localhost:5000/api/v1/docs

The documentation allows testing all endpoints, including authenticated routes using JWT.

---
