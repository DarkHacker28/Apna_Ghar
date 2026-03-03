# 🏠 Apna Ghar — Real Estate Rental Platform

A full-stack enterprise-grade rental apartment application built with **Next.js**, **Node.js**, and simulated **AWS services** for local development.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org))
- **npm** v9+ (comes with Node.js)
- **VS Code** ([Download](https://code.visualstudio.com))

---

## 📁 Project Structure

```
realestate-app/
├── client/          # Next.js Frontend
├── server/          # Node.js + Express Backend
└── README.md
```

---

## 🖥️ Backend Setup

```bash
cd server
npm install
npm run dev
```
Backend runs on: **http://localhost:5000**

---

## 🌐 Frontend Setup

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```
Frontend runs on: **http://localhost:3000**

---

## ✅ Features

- 🏘️ Browse & Search Rental Listings
- 🔍 Advanced Filter (Price, Beds, Location)
- 🗺️ Interactive Map View
- 💾 Favorites / Wishlist
- 📋 Property Detail Pages
- 🔐 Auth (Login/Register) — simulated locally
- ✨ Rich Animations with Framer Motion
- 📱 Fully Responsive Design

---

## 🌐 AWS Architecture (Production)

```
Route 53 → CloudFront → Amplify (Next.js)
                      → API Gateway → EC2 (Express)
                                   → RDS (PostgreSQL)
                                   → S3 (Images)
                      → Cognito (Auth)
```

---

## 🔑 Environment Variables

### client/.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=LuxeHaven
```

### server/.env
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-key-here
```
