# E-Commerce-free-api-aggregator

## 📦 Free eCommerce & Book API Aggregator

Over 500+ unified, sanitized, and production-ready REST API built using Express.js and Supabase, aggregating multiple free public APIs into a single consistent backend.

This project is ideal for:

Frontend developers

Practice projects

Prototyping eCommerce apps

Learning backend architecture

## 🎯 Project Goal

The main goal of this project is to provide a free, simple, and unified product data API that developers can use for learning, prototyping, and building real-world demo applications without worrying about backend infrastructure.

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

## 📡 API Endpoints
### Get Products
Pagination is enabled by default with page=1 and limit=10.
To fetch a different set of results, specify the desired page and limit values in the query parameters (see Example 2).
- example : https://e-commerce-free-api.vercel.app/products
- example : https://e-commerce-free-api.vercel.app/products?page=1&limit=10
```jsx 
GET /products
GET /products?page=1&limit=10
```
### Get Single Product
- example : https://e-commerce-free-api.vercel.app/product?id=1552
```jsx 
GET /products/:id
```
### Filter by Category
- example : https://e-commerce-free-api.vercel.app/category
- example : https://e-commerce-free-api.vercel.app/product_category/category?name=beauty
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

## 📝 API Documentation – Pagination Example
Endpoint: /products
Description: Fetch a list of products. Supports pagination using page and limit query parameters.
- Query Parameters:
Parameter	     Type	      Description	               Default
- page 	     - number   - The page number to fetch	- 1
- limit 	     - number   - Number of items per page	- 10

### Example Request:
- GET /products?page=1&limit=10
- Response 
```jsx 
{
  "page": 1,
  "limit": 10,
  "total": 50,
  "products": [
    {
      "id": 1,
      "name": "Product 1",
      "price": 29.99,
      "category": "electronics"
    },
    {
      "id": 2,
      "name": "Product 2",
      "price": 19.99,
      "category": "books"
    }
    // ...more products
  ]
}
```
### Usage Notes:
- page=1&limit=10 → fetches the first 10 products
- page=2&limit=5 → fetches the 0 to 5th products
- If no page or limit is provided, default is page=1 and limit=10

## ⛓️‍💥 Where You Can Use This API
This API is designed to help developers quickly build and test e-commerce–related features without setting up their own backend or database. It can be used in a wide range of applications, including:

### 🛒 Frontend E-Commerce Projects
- Product listing pages
- Category-based product filtering
- Search and sorting features
- Pagination and infinite scrolling UI
- Product detail pages

Ideal for React, Next.js, Vue, or any frontend framework that needs mock or demo product data.

### 📱 Practice & Learning Projects
- Practicing REST API integration
- Learning pagination, filtering, and query parameters
- Building CRUD-style UI (read-only data)
- College or portfolio projects

Great for beginners who want to focus on frontend and API handling instead of database setup.

### 🧪 Testing & Prototyping
- UI/UX prototyping
- Testing API-driven components
- Performance testing with paginated data
- Mock backend for hackathons or MVPs

Helps teams move faster during early-stage development.

### 🔗 Backend Integration & Middleware
- Aggregating multiple free APIs into a single source
- Normalizing product data formats
- Acting as a middleware layer between frontend and third-party APIs

Useful for projects that need consistent data from multiple providers.

### 📊 Data Visualization & Dashboards
- Product analytics dashboards
- Category-wise product charts
- Price comparison tools
- Inventory-style UI simulations

Can be used to build admin-style dashboards or analytics demos.