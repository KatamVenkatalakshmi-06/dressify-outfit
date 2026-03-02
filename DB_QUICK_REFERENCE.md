# ⚡ Database Connection - Quick Reference

## 🚀 Quick Start

```bash
# 1. Backend setup
cd backend
npm install

# 2. Create .env (copy from .env.example if needed)
# Add: MONGODB_URI=mongodb://localhost:27017/dressify

# 3. Verify database
npm run verify-db

# 4. Start server
npm run dev
```

---

## 📍 Key Files

| File | Purpose |
|------|---------|
| `backend/config/db.js` | MongoDB connection & pool management |
| `backend/server.js` | Server startup with DB awaiting |
| `backend/middleware/auth.js` | JWT token generation & verification |
| `backend/verify-db.js` | Database connection tester |
| `backend/.env` | Environment variables |

---

## 🔧 Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Verify database connection
npm run verify-db

# Test API
curl http://localhost:5000/api/health
```

---

## 🌍 Environment Variables

**Local Development** (`.env`):
```
MONGODB_URI=mongodb://localhost:27017/dressify
JWT_SECRET=dressify_secret_key_2024_change_in_production
PORT=5000
NODE_ENV=development
```

**MongoDB Atlas** (Production):
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dressify?retryWrites=true&w=majority
JWT_SECRET=<32+ character random string>
PORT=5000
NODE_ENV=production
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Connection refused | Start MongoDB: `mongosh` |
| Authentication failed | Check MONGODB_URI credentials |
| Port already in use | Change PORT in `.env` or kill process |
| Server won't start | Run `npm run verify-db` first |
| Database not accessible | Verify network/firewall/whitelisting |

---

## ✅ Connection Checklist

Before deploying:
- [ ] MongoDB running or Atlas accessible
- [ ] `.env` file created with valid MONGODB_URI
- [ ] `npm run verify-db` passes all tests
- [ ] `npm run dev` shows all success messages
- [ ] Can reach `/api/health` endpoint
- [ ] JWT_SECRET set (min 32 chars in production)
- [ ] CORS origins updated if needed
- [ ] All environment variables set

---

## 📊 Server Startup Sequence

```
npm run dev
    ↓
Load .env
    ↓
async startServer()
    ↓
await connectDB()
    ├─ Connect to MongoDB         ✓
    ├─ Verify with ping           ✓
    ├─ Create indexes             ✓
    └─ Return database instance   ✓
    ↓
Listen on PORT 5000
    ↓
Ready for requests ✅
```

---

## 🔗 API Health Check

```bash
curl http://localhost:5000/api/health

Response:
{
  "status": "Server is running",
  "environment": "development",
  "timestamp": "2024-02-18T10:30:45.123Z"
}
```

---

## 📚 Full Documentation

- **Database Guide:** `DATABASE_CONNECTION_GUIDE.md`
- **Connection Improvements:** `DATABASE_CONNECTION_IMPROVEMENTS.md`
- **Backend Readme:** `backend/README.md`
- **Setup Guide:** `SETUP_GUIDE.md`

---

**Version:** 2.0 (Enhanced)  
**Status:** ✅ Production Ready  
**Last Updated:** February 18, 2026
