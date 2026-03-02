# 🗄️ Database Connection Setup Guide

## Overview
Dressify uses **MongoDB** for data storage. This guide helps you set up and verify the database connection.

## Prerequisites
- MongoDB installed locally OR MongoDB Atlas account
- Node.js installed
- Backend dependencies installed (`npm install` in `/backend`)

---

## ✅ Local Development Setup

### 1. Install MongoDB Locally

**Windows:**
```bash
# Download and install from: https://www.mongodb.com/try/download/community
# Or use Chocolatey:
choco install mongodb-community
```

**After installation:**
```bash
# Start MongoDB service
# Windows: MongoDB runs as a service automatically after installation

# Verify connection
mongosh
# You should see: test>
# Type: exit (to quit)
```

### 2. Configure Environment Variables

**File:** `backend/.env`

```dotenv
# MongoDB Connection (Local)
MONGODB_URI=mongodb://localhost:27017/dressify

# JWT Configuration
JWT_SECRET=dressify_secret_key_2024_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

### 3. Start the Backend

```bash
cd backend
npm install
npm run dev
# Expected output:
# ⏳ Connecting to MongoDB...
# ✓ MongoDB connection verified
# ✓ MongoDB indexes created/verified
# ✓ Database connection verified
# ✓ Backend server running on port 5000
```

---

## ☁️ MongoDB Atlas (Cloud) Setup

### 1. Create MongoDB Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up for free
- Create a new project

### 2. Create a Cluster
1. Click "Create a Cluster"
2. Choose free tier (M0)
3. Select your region (closest to your deployment)
4. Create cluster (takes 5-10 minutes)

### 3. Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Enter username: `dressify_user`
4. Enter password: generate a secure password
5. Click "Add User"

### 4. Get Connection String
1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Copy the connection string

### 5. Update Environment Variables

**File:** `backend/.env`

```dotenv
# MongoDB Connection (Atlas)
MONGODB_URI=mongodb+srv://dressify_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority

# Replace:
# - YOUR_PASSWORD with your actual password
# - cluster0.xxxxx with your cluster details
```

### 6. Whitelist IP (Important)
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. For development: Add `0.0.0.0/0` (allows all)
4. For production: Add your specific server IP

---

## 🔍 Verify Database Connection

### Check Local MongoDB
```bash
# In a new terminal
mongosh

# Commands:
show databases           # List all databases
use dressify            # Switch to dressify database
db.users.findOne()      # Check users collection
db.users.countDocuments() # Count users
```

### Check Backend Connection
```bash
# Test the health endpoint
curl http://localhost:5000/api/health

# Expected response:
# {"status":"Server is running","environment":"development","timestamp":"2024-02-18T..."}
```

### Test Authentication
```bash
# Sign up endpoint
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Expected response:
# {"success":true,"message":"User registered successfully","token":"eyJhb...","user":{...}}
```

---

## ⚠️ Common Issues & Fixes

### Issue: "Connection refused"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:**
- Ensure MongoDB is running locally: `mongosh`
- Or use MongoDB Atlas connection string
- Check `MONGODB_URI` in `.env`

### Issue: "Authentication failed"
```
Error: unauthorized
```
**Fix:**
- Verify username and password in connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user exists in "Database Access"

### Issue: "Server started but database not connected"
```
✓ Backend server running on port 5000
✗ MongoDB connection error ...
```
**Fix:**
- This means server started before DB connection
- Check backend logs for specific error
- Verify network connectivity to MongoDB

### Issue: "MONGODB_URI not set"
```
Error: Invalid connection string
```
**Fix:**
- Create `backend/.env` file (or copy from `.env.example`)
- Add valid `MONGODB_URI`
- Restart backend: `npm run dev`

---

## 🚀 Production Deployment

### For Render Backend:
```dotenv
MONGODB_URI=mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
JWT_SECRET=<32+ character secure random string>
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### For Vercel Frontend:
```
VITE_API_URL=https://your-render-backend.onrender.com
```

---

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  picture: String (URL),
  authProvider: String ("email" | "google"),
  createdAt: Date,
  updatedAt: Date
}
```

### Designs Collection (to be added)
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  description: String,
  designData: Object,
  thumbnail: String (URL),
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## ✨ New Connection Features

### Automatic Features Implemented:
✅ **Connection Pooling** - Reuses connections efficiently  
✅ **Retry Mechanism** - Auto-retries failed connections  
✅ **Health Check** - Pings database to verify connection  
✅ **Graceful Shutdown** - Closes connections cleanly  
✅ **Better Error Messages** - Clear troubleshooting info  
✅ **Index Management** - Auto-creates required indexes  

### Connection Flow:
```
startServer()
  ↓
await connectDB()
  ↓
Test connection with ping
  ↓
Create indexes
  ↓
Start Express server
  ↓
Ready to handle requests
```

---

## 🔐 Security Best Practices

1. **Never commit `.env`** - Add to `.gitignore`
2. **Use strong passwords** - Min 32 characters in production
3. **Rotate JWT_SECRET** - Invalidates old tokens
4. **Update MONGODB_URI** - Don't share connection strings
5. **IP Whitelist** - Restrict database access to known IPs
6. **Environment variables** - Use `.env` for all secrets

---

## 📞 Need Help?

1. Check logs: `npm run dev` in `/backend`
2. Test connection: `mongosh` (local) or check Atlas dashboard
3. Verify `.env` file has correct values
4. Check network/firewall settings
5. Review MongoDB documentation: https://docs.mongodb.com

---

**Last Updated:** February 18, 2026  
**Status:** ✅ Production Ready
