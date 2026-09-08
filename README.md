# 1Fi Marketplace - Full-Stack Smart Financing & EMI Platform

A production-quality full-stack e-commerce marketplace web application for smartphone purchasing with flexible EMI financing options, dynamic variant selection, zero-cost EMI plans, instant cashback breakdown, and purchase review modal workflows.

---

## 🌟 Features

- **Flagship Marketplace**: Browse flagship smartphones (Apple iPhone 17 Pro, Samsung Galaxy S24 Ultra, Google Pixel 9 Pro).
- **Dynamic Variant Switching**: Real-time updates to product images, pricing, MRP strikethroughs, and discount badges upon switching storage (128GB/256GB/512GB) or color finishes without page reloads.
- **Dynamic EMI Plan Recalculation**: Selectable 6, 12, 24, and 36-month EMI cards offering 0% interest and up to ₹6,000 instant cashback, recalculating dynamically based on active variant selection.
- **RESTful API Backend**: Powered by Node.js, Express, and Mongoose with centralized error handling, input validation, and clean controller/route separation.
- **Zero-Config Database Support**: Connects to MongoDB Atlas / Local MongoDB via `MONGO_URI`, with an automatic fallback to `mongodb-memory-server` for instant out-of-the-box execution without pre-installed databases.
- **Purchase Review Modal**: Interactive confirmation workflow summarizing selected device, color, storage, monthly EMI payment, tenure, interest rate, and total payable amount.
- **Responsive & Accessible UI**: Fintech-inspired aesthetic designed with Tailwind CSS, Lucide icons, skeleton loaders, error states, and responsive layouts tested for desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS, Vanilla CSS design tokens
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Fallback DB**: MongoDB Memory Server (Dev zero-config)

---

## 📁 Project Structure

```text
1Fi/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # MongoDB & Memory Server fallback connection
│   │   ├── controllers/
│   │   │   └── productController.js # Product & EMI business logic
│   │   ├── middleware/
│   │   │   └── errorHandler.js   # Centralized Express error handlers
│   │   ├── models/
│   │   │   └── Product.js        # Mongoose schema with variant & EMI subdocs
│   │   ├── routes/
│   │   │   └── productRoutes.js   # Express API routes
│   │   ├── seed/
│   │   │   ├── seedData.js       # Smartphone product catalog seed data
│   │   │   └── seed.js           # Database seed script
│   │   └── server.js             # Express server entry point
│   ├── .env                      # Backend environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductGallery.jsx
│   │   │   ├── VariantSelector.jsx
│   │   │   ├── PriceSection.jsx
│   │   │   ├── EMIPlanCard.jsx
│   │   │   ├── EMIPlanSelector.jsx
│   │   │   ├── ProductHighlights.jsx
│   │   │   ├── ProductSpecifications.jsx
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx    # Application shell layout
│   │   ├── pages/                # Route pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── ComingSoonPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/
│   │   │   └── productService.js # Axios API service wrapper
│   │   ├── utils/
│   │   │   └── formatters.js     # Currency & math formatters
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                      # Frontend environment variables
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 2. Backend Setup
Navigate into the `/backend` directory, install dependencies, seed the database, and start the development server:

```bash
cd backend
npm install
npm run seed
npm run dev
```

The backend server will run on **`http://localhost:5000`**.

### 3. Frontend Setup
In a separate terminal, navigate into the `/frontend` directory, install dependencies, and start Vite dev server:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will open on **`http://localhost:3000`**.

---

## 🔑 Environment Variables

### Backend (`/backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/1fi_marketplace
NODE_ENV=development
```

### Frontend (`/frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## 🗄️ Database Schema & Seed Data

### Product Schema
```json
{
  "name": "Apple iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "brand": "Apple",
  "category": "smartphones",
  "description": "Flagship iPhone featuring titanium unibody design...",
  "images": ["https://images.unsplash.com/..."],
  "highlights": ["6.3-inch Super Retina XDR OLED Display", "A19 Pro Bionic Chip"],
  "variants": [
    {
      "id": "iphone-17-pro-256gb-silver",
      "name": "256GB / Silver",
      "color": "Silver",
      "colorCode": "#E3E4E5",
      "storage": "256GB",
      "price": 119900,
      "mrp": 134900,
      "image": "https://images.unsplash.com/...",
      "stock": 18
    }
  ],
  "emiPlans": [
    {
      "id": "emi-iphone-24m",
      "tenure": 24,
      "monthlyAmount": 4999,
      "interestRate": 0,
      "cashback": 5000,
      "processingFee": 0,
      "totalAmount": 119976,
      "isRecommended": true
    }
  ]
}
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/products` | Retrieve all products (Supports `?search=`, `?brand=`, `?category=`) |
| `GET` | `/api/products/:slug` | Retrieve single product details by slug |
| `GET` | `/api/products/:slug/emi-plans` | Retrieve EMI plans for product by slug |

### Example API Response (`GET /api/products/iphone-17-pro`)
```json
{
  "success": true,
  "data": {
    "name": "Apple iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "variants": [
      {
        "id": "iphone-17-pro-256gb-silver",
        "name": "256GB / Silver",
        "color": "Silver",
        "storage": "256GB",
        "price": 119900,
        "mrp": 134900
      }
    ],
    "emiPlans": [
      {
        "id": "emi-iphone-24m",
        "tenure": 24,
        "monthlyAmount": 4999,
        "interestRate": 0,
        "cashback": 5000,
        "isRecommended": true
      }
    ]
  }
}
```

---

## 🚀 Deployment Guide

### Database Deployment (MongoDB Atlas)
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Obtain connection string URI (e.g. `mongodb+srv://<username>:<password>@cluster.mongodb.net/1fi_marketplace`).
3. Update `MONGO_URI` in production backend environment variables.

### Backend Deployment (Render / Railway)
1. Push code repository to GitHub.
2. Create a Node.js Web Service on [Render](https://render.com).
3. Set Build Command: `cd backend && npm install`
4. Set Start Command: `cd backend && node src/server.js`
5. Configure Environment Variables: `MONGO_URI`, `PORT=5000`, `NODE_ENV=production`.

### Frontend Deployment (Vercel / Netlify)
1. Create a Web App project on [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Set Environment Variable: `VITE_API_URL=https://your-backend-api.onrender.com`.

---

## 📜 License
Developed for 1Fi Full-Stack Marketplace Evaluation. All rights reserved.
