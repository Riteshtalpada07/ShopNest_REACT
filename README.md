# ShopNest — Full-Stack E-Commerce Website

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ShopNest-brightgreen?style=for-the-badge)](https://shopnest-react.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Riteshtalpada07/ShopNest_REACT)

ShopNest is a modern, full-stack e-commerce web application that lets customers browse products, filter by category, view product details, and manage a shopping cart — while giving administrators a dedicated dashboard to manage products, categories, and store statistics.

The project is built as a **monorepo** with a **React frontend** and an **Express + MongoDB backend**, bundled together for production so a single server serves both the API and the built React app.

---

## Live Demo

**Website:** [https://shopnest-react.onrender.com/](https://shopnest-react.onrender.com/)

**Repository:** [https://github.com/Riteshtalpada07/ShopNest_REACT](https://github.com/Riteshtalpada07/ShopNest_REACT)

---

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [User Roles](#user-roles)
- [Screens & Routes](#screens--routes)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)

---

## Features

### Customer (User)

- **User authentication** — Register and log in with email and password
- **Home page** — Hero banner, featured products, and category browsing
- **Product catalog** — View all products with name, price, stock, and images
- **Category filtering** — Browse products by category
- **Product details** — Full product page with description, quantity selector, and similar products
- **Shopping cart** — Add products to cart, view cart items, quantities, and total cost
- **Responsive UI** — Mobile-friendly layout built with Tailwind CSS

### Admin

- **Protected admin panel** — Only users with the `admin` role can access `/admin`
- **Dashboard** — Overview of total users, categories, products, and latest added products
- **Product management** — Create, read, update, and delete products
- **Category management** — Create, read, update, and delete categories
- **Image uploads** — Product and category images are uploaded to **Cloudinary**

### Backend

- **RESTful API** built with Express 5
- **MongoDB** database with Mongoose ODM
- **JWT authentication** stored in HTTP-only cookies
- **Role-based access control** (user vs admin)
- **CORS** enabled with credentials support

---

## Tech Stack

| Layer      | Technologies |
|------------|--------------|
| Frontend   | React 19, Vite 6, React Router 7, Tailwind CSS 4, Axios, React Hot Toast, Lucide React, Remix Icon |
| Backend    | Node.js, Express 5, Mongoose 8, JWT, bcrypt (SHA-256 hashing), Cookie Parser, Morgan |
| Database   | MongoDB |
| Storage    | Cloudinary (product & category images) |
| Tooling    | ESLint, Nodemon |

---

## Project Structure

```
E-Commerce Website/
├── Frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── Admin/               # Admin dashboard & management pages
│   │   │   ├── component/       # Admin UI components (AddProduct, SideBar, etc.)
│   │   │   ├── dashbord.jsx     # Admin layout wrapper
│   │   │   ├── product.jsx      # Product management page
│   │   │   └── category.jsx     # Category management page
│   │   ├── components/          # Shared components (NavLogo, NavSearch, etc.)
│   │   ├── pages/               # Customer-facing pages
│   │   │   ├── Home.jsx
│   │   │   ├── login.jsx
│   │   │   ├── register.jsx
│   │   │   ├── Card.jsx         # Shopping cart
│   │   │   ├── ProductDetails.jsx
│   │   │   └── AdminRoute.jsx   # Admin route guard
│   │   ├── App.jsx              # Main router & cart logic
│   │   └── main.jsx
│   ├── vite.config.js           # Builds to Backend/public
│   └── package.json
│
├── Backend/                     # Express API server
│   ├── src/
│   │   ├── config/              # DB, Cloudinary, env config
│   │   ├── controllers/         # Route handlers
│   │   ├── middlewares/         # Auth & admin guards
│   │   ├── models/              # Mongoose schemas (User, Product, Category, Cart)
│   │   ├── router/              # API route definitions
│   │   ├── services/            # Image upload service
│   │   └── app.js               # Express app setup
│   ├── public/                  # Built React app (generated on build)
│   └── server.js                # Entry point
│
├── package.json                 # Root scripts (build & start)
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- [Cloudinary](https://cloudinary.com/) account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd "E-Commerce Website"
   ```

2. **Install backend dependencies**

   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../Frontend
   npm install
   ```

4. **Create environment file**

   Create a `.env` file inside the `Backend` folder:

   ```env
   MONGO_URI=mongodb://localhost:27017/shopnest
   JWT_SECRET=your_super_secret_jwt_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   PORT=3000
   ```

5. **Run in development**

   **Terminal 1 — Backend:**
   ```bash
   cd Backend
   npm run dev
   ```

   **Terminal 2 — Frontend:**
   ```bash
   cd Frontend
   npm run dev
   ```

   The Vite dev server runs the React app (typically at `http://localhost:5173`). Configure a proxy in Vite if needed, or run the production build for full-stack testing.

6. **Run in production mode**

   From the project root:

   ```bash
   npm run build
   npm start
   ```

   This builds the React app into `Backend/public` and starts the Express server on port `3000`.

---

## Environment Variables

| Variable           | Required | Description                          |
|--------------------|----------|--------------------------------------|
| `MONGO_URI`        | Yes      | MongoDB connection string            |
| `JWT_SECRET`       | Yes      | Secret key for signing JWT tokens    |
| `CLOUD_NAME`       | Yes      | Cloudinary cloud name                |
| `CLOUD_API_KEY`    | Yes      | Cloudinary API key                   |
| `CLOUD_API_SECRET` | Yes      | Cloudinary API secret                |
| `PORT`             | No       | Server port (default: `3000`)        |

---

## Available Scripts

### Root (`package.json`)

| Script   | Description |
|----------|-------------|
| `npm run build` | Installs dependencies, builds the frontend into `Backend/public`, and installs backend deps |
| `npm start`     | Starts the production server (`node Backend/server.js`) |

### Frontend (`Frontend/package.json`)

| Script          | Description |
|-----------------|-------------|
| `npm run dev`   | Start Vite dev server with hot reload |
| `npm run build` | Build React app to `Backend/public` |
| `npm run preview` | Preview production build |
| `npm run lint`  | Run ESLint |

### Backend (`Backend/package.json`)

| Script        | Description |
|---------------|-------------|
| `npm start`   | Start Express server |
| `npm run dev` | Start server with Nodemon (auto-restart) |

---

## API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint    | Access    | Description              |
|--------|-------------|-----------|--------------------------|
| POST   | `/register` | Public    | Register a new user      |
| POST   | `/login`    | Public    | Log in and receive JWT cookie |
| GET    | `/me`       | Auth      | Get current user profile |
| GET    | `/logout`   | Public    | Clear auth cookie        |

### Products — `/api/product`

| Method | Endpoint           | Access    | Description                    |
|--------|--------------------|-----------|--------------------------------|
| GET    | `/`                | Public    | Get all products               |
| GET    | `/:id`             | Public    | Get single product + similar   |
| GET    | `/category/:id`    | Public    | Get products by category       |
| POST   | `/`                | Admin     | Create a product               |
| PUT    | `/:id`             | Admin     | Update a product               |
| DELETE | `/:id`             | Admin     | Delete a product               |

### Categories — `/api/category`

| Method | Endpoint | Access | Description           |
|--------|----------|--------|-----------------------|
| GET    | `/`      | Public | Get all categories    |
| POST   | `/`      | Admin  | Create a category     |
| PUT    | `/:id`   | Admin  | Update a category     |
| DELETE | `/:id`   | Admin  | Delete a category     |

### Cart — `/api/card`

| Method | Endpoint | Access | Description              |
|--------|----------|--------|--------------------------|
| POST   | `/add`   | Auth   | Add product to cart      |
| GET    | `/:id`   | Auth   | Get cart by user ID      |

### Admin — `/api/admin`

| Method | Endpoint  | Access | Description                    |
|--------|-----------|--------|--------------------------------|
| GET    | `/stats`  | Admin  | Dashboard stats & latest products |

---

## User Roles

| Role    | Permissions |
|---------|-------------|
| `user`  | Browse products, view details, add to cart, manage own account |
| `admin` | All user permissions + access to admin dashboard, product CRUD, category CRUD, dashboard statistics |

> **Note:** Only one admin account can be registered. Attempting to register a second admin will be rejected.

---

## Screens & Routes

### Customer Routes

| Route            | Page              | Description                    |
|------------------|-------------------|--------------------------------|
| `/`              | Home              | Hero, all products, categories |
| `/login`         | Login             | User/admin login               |
| `/register`      | Register          | New user registration          |
| `/product/:id`   | Product Details   | Single product view            |
| `/cart`          | Cart              | Shopping cart                  |

### Admin Routes (protected)

| Route              | Page                | Description              |
|--------------------|---------------------|--------------------------|
| `/admin`           | Dashboard           | Stats & latest products  |
| `/admin/product`   | Product Management  | Add/edit/delete products |
| `/admin/category`  | Category Management | Add/edit/delete categories |

---

## Deployment

The app is designed for **single-server deployment** and is currently hosted on **Render**:

**Live URL:** [https://shopnest-react.onrender.com/](https://shopnest-react.onrender.com/)

1. Run `npm run build` from the root — this compiles the React frontend into `Backend/public`.
2. Run `npm start` — Express serves the static React build and the API from the same port.
3. Set all environment variables on your hosting platform (e.g. Render, Railway, VPS).
4. Use a cloud MongoDB instance (e.g. MongoDB Atlas) for production.

---

## Data Models

### User
- `username`, `email`, `password`, `role`, `phone`, `address`, `verified`

### Product
- `name`, `description`, `price`, `stock`, `category` (ref), `imageUrl`, timestamps

### Category
- `name`, `imageUrl`, timestamps

### Cart
- `user` (ref), `products[]` with `product` (ref) and `quantity`

---

## Future Enhancements

The following features are planned or referenced in project documentation but not yet implemented:

- Wishlist
- Order management & checkout
- Payment integration
- Product reviews & ratings
- Coupon/discount system
- User profile & order history

---

## License

This project is for educational and portfolio purposes. Add your preferred license here.

---

## Author

Built as a full-stack e-commerce project — **ShopNest**.
