# 🛒 ShopEasy — Full-Stack E-Commerce (Lab 13)

Amazon-clone built with **React + Node.js/Express + MongoDB**

---

## 📁 Project Structure

```
ecommerce/
├── backend/           ← Node.js + Express API
│   ├── models/        ← Mongoose schemas (Product, User, Order)
│   ├── routes/        ← REST API routes
│   ├── middleware/    ← JWT auth & admin middleware
│   ├── server.js      ← Entry point
│   ├── seed.js        ← Sample data seeder
│   └── .env           ← ⚠️ Add your MongoDB URI here
│
└── frontend/          ← React + Vite app
    └── src/
        ├── components/  ← Navbar, ProductCard, etc.
        ├── context/     ← AuthContext, CartContext
        ├── pages/       ← All route pages
        └── utils/       ← Axios API instance
```

---

## ⚙️ Setup Instructions

### 1. Configure Environment Variables

Open `backend/.env` and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce   ← Change this
JWT_SECRET=your_super_secret_key_here           ← Change this
```

For **MongoDB Atlas**, your URI looks like:
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ecommerce
```

---

### 2. Install & Run Backend

```bash
cd backend
npm install
npm run seed      # Seeds 12 products + admin + customer
npm run dev       # Starts on http://localhost:5000
```

---

### 3. Install & Run Frontend

```bash
cd frontend
npm install
npm run dev       # Starts on http://localhost:3000
```

---

## 🔑 Demo Credentials (after seeding)

| Role     | Email                  | Password     |
|----------|------------------------|--------------|
| Admin    | admin@shop.com         | admin123     |
| Customer | john@example.com       | customer123  |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| POST   | /api/auth/register | Register new user, returns JWT |
| POST   | /api/auth/login    | Login, returns JWT             |
| GET    | /api/auth/me       | Get logged-in user (protected) |

### Products
| Method | Endpoint            | Description                         |
|--------|---------------------|-------------------------------------|
| GET    | /api/products       | Get all (supports ?search=&category=) |
| GET    | /api/products/:id   | Get single product                  |
| POST   | /api/products       | Add product (admin only)            |
| PUT    | /api/products/:id   | Update product (admin only)         |
| DELETE | /api/products/:id   | Delete product (admin only)         |

### Orders
| Method | Endpoint        | Description                     |
|--------|-----------------|---------------------------------|
| POST   | /api/orders     | Place order (logged-in users)   |
| GET    | /api/orders/my  | Get my orders (logged-in users) |
| GET    | /api/orders     | Get all orders (admin only)     |
| PUT    | /api/orders/:id | Update order status (admin only)|

---

## 🧪 Testing with Postman

1. **Register or Login** → copy the `token` from response
2. Set header: `Authorization: Bearer <your_token>`
3. Test protected endpoints

---

## ✅ Features Implemented

- [x] Product listing with search & category filter
- [x] Product detail page with stock indicator
- [x] Shopping cart (persisted in localStorage)
- [x] User registration & login (JWT)
- [x] Protected routes (customer & admin)
- [x] Order placement with stock decrement
- [x] Order history page
- [x] Admin dashboard — manage products
- [x] Admin add/edit/delete products
- [x] Password hashing with bcrypt
- [x] Role-based access control (customer/admin)
