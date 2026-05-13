# Full-Stack E-Commerce Web Application (Amazon Clone)

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Ready-purple?style=for-the-badge&logo=vite)

A premium, fully responsive Full-Stack E-Commerce Web Application built using the MERN stack. Designed with an ultra-modern, glassmorphism-inspired UI, this project offers a smooth shopping experience with a fully functional cart, elegant product displays, and dynamic Light/Dark mode themes.

## 📸 Screenshots

*(Replace the paths below with actual screenshots of your application)*

### Home Page (Light / Dark Mode)
![Home Page](frontend/public/images/home_placeholder.png)

### Product Detail Page
![Product Detail](frontend/public/images/product_placeholder.png)

### Shopping Cart
![Shopping Cart](frontend/public/images/cart_placeholder.png)

### Authentication
![Login Page](frontend/public/images/login_placeholder.png)

## ✨ Features

- **Premium UI/UX:** Custom CSS variables, smooth transitions, and glassmorphism elements.
- **Dark & Light Mode:** Fully integrated and persistent theme toggling.
- **Fully Responsive:** Adapts seamlessly to mobile, tablet, and desktop screens.
- **Product Management:** Dynamic grid layouts and beautifully crafted product detail pages.
- **Shopping Cart:** Real-time state management using React Context API with animated toast notifications on adding items.
- **Authentication:** Secure user login and registration flows.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, CSS3, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **State Management:** React Context API

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed or an Atlas URI

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/samishahid516/Full-Stack-E-Commerce-Web-Application-Amazon-Clone-.git
   cd Full-Stack-E-Commerce-Web-Application-Amazon-Clone-
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup:**
   Create a `.env` file in the `backend` directory and add your MongoDB URI:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_secret_key
   ```

5. **Seed the Database:**
   ```bash
   cd backend
   node seed.js
   ```

6. **Run the Application:**
   Open two terminal windows:
   - Terminal 1 (Backend): `cd backend && npm start`
   - Terminal 2 (Frontend): `cd frontend && npm run dev`

Open `http://localhost:3000` to view it in the browser!

---

**Developed by Muhammad Sami**
