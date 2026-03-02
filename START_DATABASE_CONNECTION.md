# 🚀 Database Connection - Start Here

**Last Updated:** February 18, 2026  
**Status:** ✅ Ready to Use

---

## ⚡ Get Started in 5 Minutes

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Set Up Environment Variables
The `.env` file should already exist. Verify it has:

**For Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/dressify
JWT_SECRET=dressify_secret_key_2024_change_this_in_production
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
JWT_SECRET=dressify_secret_key_2024_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Step 3: Verify Database Connection
```bash
npm run verify-db
```

✅ You should see: `✅ All verification tests passed!`

### Step 4: Start Backend Server
```bash
npm run dev
```

✅ You should see:
```
⏳ Connecting to MongoDB...
✓ MongoDB connection verified
✓ MongoDB indexes created/verified
✓ Database connection verified
✓ Backend server running on port 5000
```

### Step 5: Test the API
```bash
curl http://localhost:5000/api/health
```

✅ You should get:
```json
{
  "status": "Server is running",
  "environment": "development",
  "timestamp": "2024-02-18T10:30:45.123Z"
}
```

---

## 📍 What Changed?

**The server now properly connects to MongoDB BEFORE starting the web server.**

This ensures:
- ✅ No race conditions
- ✅ Reliable database access
- ✅ Better error messages
- ✅ Production-ready setup

---

## 🆘 Something Not Working?

### Error: "Connection refused"
**Solution:** Make sure MongoDB is running

```bash
# Windows
mongosh

# Linux/Mac
mongosh
```

If this fails, install [MongoDB Community](https://www.mongodb.com/try/download/community)

### Error: "Authentication failed"
**Solution:** Check your MONGODB_URI in `.env`

Verify:
- Username and password are correct
- Database name is `dressify`
- IP is whitelisted (if using MongoDB Atlas)

### Error: "Server started but can't connect"
**Solution:** Run the verification script

```bash
npm run verify-db
```

This shows exactly what's wrong with your connection.

---

## 📚 Documentation

- **Quick Reference:** `DB_QUICK_REFERENCE.md`
- **Full Setup Guide:** `DATABASE_CONNECTION_GUIDE.md`
- **What Changed:** `DATABASE_CONNECTION_IMPROVEMENTS.md`
- **Implementation Details:** `DATABASE_IMPLEMENTATION_COMPLETE.md`

---

## ✅ Verification Checklist

Before running the frontend, make sure:

- [ ] `npm run verify-db` shows ✅ All tests passed
- [ ] `npm run dev` starts without errors
- [ ] Can reach `http://localhost:5000/api/health`
- [ ] MongoDB is accessible (local or Atlas)
- [ ] `.env` file has MONGODB_URI set

---

## 🎯 What's Next?

1. **Get backend running** ← You are here
2. Start frontend: `npm run dev` (in root directory)
3. Open http://localhost:5173
4. Test signup/login with database

---

## 💡 Pro Tips

### Useful Commands
```bash
# Verify connection anytime
npm run verify-db

# Check MongoDB locally
mongosh

# View database in MongoDB Atlas
https://cloud.mongodb.com/v2

# See backend logs
npm run dev
```

### For Production

Before deploying, update:
1. `MONGODB_URI` - Use MongoDB Atlas connection
2. `JWT_SECRET` - Use 32+ character random string
3. `NODE_ENV` - Set to `production`
4. `FRONTEND_URL` - Set to your Vercel URL
5. IP whitelist in MongoDB Atlas

---

## 🔗 Connection Flow

```
Frontend (localhost:5173)
        ↓
   API Call
        ↓
Backend (localhost:5000)
        ↓
Database Connection Pool (2-10 connections)
        ↓
MongoDB (local or Atlas)
        ↓
✅ Data returned
```

---

## ❓ Still Need Help?

1. **Check the docs:** `DATABASE_CONNECTION_GUIDE.md`
2. **Run verification:** `npm run verify-db`
3. **Check logs:** Look at `npm run dev` output
4. **Common issues:** See `DATABASE_CONNECTION_GUIDE.md` → Troubleshooting

---

**Ready? Get started:** `cd backend && npm run verify-db`

