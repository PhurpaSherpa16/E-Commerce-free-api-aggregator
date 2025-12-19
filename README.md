# E-Commerce-free-api-aggregator

## 📦 Free eCommerce & Book API Aggregator

A unified, sanitized, and production-ready REST API built using Express.js and Supabase, aggregating multiple free public APIs into a single consistent backend.

This project is ideal for:

Frontend developers

Practice projects

Prototyping eCommerce apps

Learning backend architecture

## 🚀 Features

🔗 Aggregates multiple free public APIs

🧹 Normalizes & sanitizes inconsistent data

🗄️ Stores clean data in Supabase (PostgreSQL)

⚡ Serves data via Express REST API

📄 Pagination, filtering & sorting support

📚 Supports products + books

🔐 Safe seeding with duplicate prevention

## 🌐 Free APIs Used
This project aggregates data from:
1. DummyJSON - https://dummyjson.com/products?limit=194
2. EscuelaJS - https://api.escuelajs.co/api/v1/products?offset=0&limit=22
3. Fake Store API - https://fakestoreapi.com/products
4. FreeAPI – Products - https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=1000

## 🧠 Architecture Overview
``` 
External APIs
     ↓
Data Normalization Layer
     ↓
Sanitization & Validation
     ↓
Supabase (PostgreSQL)
     ↓
Express REST API
     ↓
Client / Frontend 
```

## 🗃️ Database Design (Supabase)
- products
- product_images
- tags
- product_tags
- books
- authors
- book_author

Relational & normalized schema.

## 📡 API Endpoints
### Get Products
- example : https://e-commerce-free-api-aggregator-l3mg.vercel.app/products
```jsx 
GET /products
GET /products?page=1&limit=10
```
### Get Single Product
- example : https://e-commerce-free-api-aggregator-l3mg.vercel.app/product?id=1552
```jsx 
GET /products/:id
```
### Filter by Category
- example : https://e-commerce-free-api-aggregator-l3mg.vercel.app/category
- example : https://e-commerce-free-api-aggregator-l3mg.vercel.app/product_category/category?name=beauty
```jsx 
GET /products/category/:name
```

## 🛠️ Tech Stack
- Node.js
- Express.js
- Supabase (PostgreSQL)
- JavaScript (ESM)
- REST API

## ⚙️ Setup & Installation
```jsx 
git clone https://github.com/yourusername/free-ecommerce-apis-aggregator.git
cd free-ecommerce-apis-aggregator
npm install
```
### Create .env:
```jsx
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
PORT=9000
```
### Run:
```jsx
npm run dev
```