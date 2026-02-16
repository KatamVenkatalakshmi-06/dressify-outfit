# Cloud Deployment Setup - Complete Guide

## 🎯 Overview

This guide will deploy Dressify to:
- **Frontend:** Vercel (https://vercel.com)
- **Backend:** Render (https://render.com)
- **Database:** MongoDB Atlas (https://www.mongodb.com/cloud/atlas)

## 📋 Prerequisites

1. GitHub account (to push code)
2. Vercel account (free - https://vercel.com)
3. Render account (free - https://render.com)
4. MongoDB Atlas account (free - https://www.mongodb.com/cloud/atlas)

---

## Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create Organization and Project

### 1.2 Create Cluster
1. Click "Create Deployment"
2. Choose "FREE" tier
3. Select Cloud Provider (AWS/Google Cloud/Azure - doesn't matter)
4. Select Region close to you
5. Create Cluster (takes ~5 mins)

### 1.3 Create Database User
1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. **Username:** `dressify_user`
4. **Password:** Generate strong password (copy it!)
5. Click "Add User"

### 1.4 Add IP Whitelist
1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (or add specific IPs later)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Databases" → Your cluster
2. Click "Connect"
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<username>` and `<password>` with your user credentials

**Connection String Format:**
```
mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
```

**Save this connection string - you'll need it for Render!**

---

## Step 2: Setup GitHub Repository

### 2.1 Initialize Git (if not already done)
```bash
cd "c:\Users\DELL\Desktop\cap-6 sem\dressify-outfit"
git init
git add .
git commit -m "Initial commit: Dressify full-stack app"
```

### 2.2 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `dressify-outfit`
3. Description: "Full-stack outfit customization app"
4. Choose "Public" or "Private" (your choice)
5. Click "Create repository"

### 2.3 Push Code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/dressify-outfit.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Render

### 3.1 Create Render Account
1. Go to https://render.com/
2. Sign up (free)
3. Verify email

### 3.2 Create Web Service
1. Dashboard → "New +" → "Web Service"
2. Connect GitHub account
3. Select your `dressify-outfit` repository
4. Click "Connect"

### 3.3 Configure Service
| Setting | Value |
|---------|-------|
| Name | `dressify-backend` |
| Environment | `Node` |
| Region | Choose closest to you |
| Build Command | `cd backend && npm install` |
| Start Command | `cd backend && npm start` |
| Instance Type | `Free` |

### 3.4 Add Environment Variables
1. Scroll to "Environment"
2. Click "Add Environment Variable" for each:

```
MONGODB_URI = mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority

JWT_SECRET = your_very_secure_secret_key_here_min_32_chars

PORT = 10000

NODE_ENV = production

GOOGLE_CLIENT_ID = YOUR_GOOGLE_CLIENT_ID
```

### 3.5 Deploy
1. Click "Create Web Service"
2. Render will deploy automatically
3. Wait for "Live" status
4. Copy your backend URL (e.g., `https://dressify-backend.onrender.com`)

#### ⚠️ Important: Free Tier Spin Down
- Render free tier spins down after 15 mins of inactivity
- Your backend will take 30 seconds to start on first request
- For production, upgrade to paid plan

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account
1. Go to https://vercel.com/
2. Sign up with GitHub
3. Authorize Vercel

### 4.2 Import Project
1. Vercel Dashboard → "Add New" → "Project"
2. Select your `dressify-outfit` repository
3. Click "Import"

### 4.3 Configure Project
| Setting | Value |
|---------|-------|
| Project name | `dressify` |
| Framework | `Vite` |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

### 4.4 Add Environment Variables
1. Scroll to "Environment Variables"
2. Add one variable:

```
VITE_API_URL = https://dressify-backend.onrender.com/api
```

Replace with your actual Render backend URL!

### 4.5 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. You'll get a URL like `https://dressify.vercel.app`

---

## Step 5: Update Configuration Files

### 5.1 Update Backend `.env` for Production
Edit `backend/.env`:

```env
MONGODB_URI=mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_secret_key_change_this_in_production
PORT=10000
NODE_ENV=production
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
FRONTEND_URL=https://dressify.vercel.app
```

### 5.2 Update Frontend API URL
Edit `src/services/api.ts`:

```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```

### 5.3 Add CORS Update for Production
Edit `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://dressify.vercel.app',  // Add your Vercel URL
    'https://dressify-backend.onrender.com'
  ],
  credentials: true
}));
```

### 5.4 Update Google OAuth
1. Go to Google Cloud Console
2. Add authorized URIs:
   - `https://dressify.vercel.app`
   - `https://dressify-backend.onrender.com`

---

## Step 6: Testing Cloud Deployment

### 6.1 Test Backend
```bash
curl https://dressify-backend.onrender.com/api/health
```

Expected response:
```json
{"status":"Server is running"}
```

### 6.2 Test Frontend
Open browser: `https://dressify.vercel.app`

### 6.3 Test Authentication
1. Go to signup page
2. Create new account with email/password
3. Check MongoDB Atlas - user should be saved
4. Login with same credentials
5. Try Google OAuth (if configured)

### 6.4 Test API Integration
Open browser DevTools → Network tab
- Signup/Login should hit your Render backend
- Check requests go to `https://dressify-backend.onrender.com/api/*`

---

## 📱 Deployment Architecture

```
Users
  ↓
CDN/Cache (Vercel)
  ↓
Frontend React App (Vercel)
  ├─ UI Components
  ├─ State Management
  └─ API Calls
       ↓ (HTTPS)
       ↓
Backend API (Render)
  ├─ Authentication
  ├─ User Management
  └─ Design Operations
       ↓
MongoDB Atlas (Cloud)
  ├─ Users Collection
  ├─ Designs Collection
  └─ Backups
```

---

## 🚀 Redeployment Process

### When You Push Code Changes:

**1. Update Backend**
```bash
git add backend/
git commit -m "Update backend logic"
git push origin main
```
Render auto-detects and redeploys!

**2. Update Frontend**
```bash
git add src/
git commit -m "Update UI"
git push origin main
```
Vercel auto-detects and redeploys!

---

## 💾 Backup MongoDB

### Automatic Backups
1. MongoDB Atlas → Your Cluster → "Backup"
2. Backups are automatic (daily during free tier)
3. Retained for 7 days

### Manual Backup
```bash
# Download backup from Atlas dashboard
# Or use MongoDB tools:
mongodump --uri "mongodb+srv://user:password@cluster.mongodb.net/dressify"
```

---

## 🔒 Security Checklist

- [ ] Unique, strong JWT_SECRET (>32 characters)
- [ ] Secure MongoDB password
- [ ] MongoDB IP whitelist (don't allow all)
- [ ] Frontend only makes requests to backend
- [ ] CORS configured for your domain only
- [ ] Google Client ID kept secret
- [ ] SSL/TLS enabled (automatic on Vercel/Render)
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all routes

---

## 📊 Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel Frontend | ✅ Unlimited | Free |
| Render Backend | ✅ Yes (slow) | $7/mo for production |
| MongoDB Atlas | ✅ 512MB storage | Free |
| **Total** | **Free (slow)** | **~$7/mo for production** |

### Upgrade Path
As you grow:
1. Render $7/mo → $12/mo (faster tier)
2. MongoDB Free → $57/mo (more storage)
3. Vercel Pro $20/mo (if needed - usually free is enough)

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
```
Solution:
1. Check Render shows "Live" status
2. Verify VITE_API_URL in Vercel env vars
3. Check CORS in backend/server.js
4. Render free tier spins down - may take 30s first request
```

### "MongoDB connection failed"
```
Solution:
1. Verify MONGODB_URI has correct password
2. Check IP whitelist in MongoDB Atlas
3. Ensure database user exists
4. Test connection string locally first
```

### "Google OAuth not working"
```
Solution:
1. Add https://dressify.vercel.app to Google Cloud Console URIs
2. Verify GOOGLE_CLIENT_ID is set in Render
3. Check browser console for errors
```

### "Vercel shows CSS/Images broken"
```
Solution:
1. Check build output in Vercel dashboard
2. Verify tailwind.config.ts paths
3. Rebuild: Delete `.next` folder, push again
```

---

## 📈 Monitor Your Cloud Deployments

### Vercel Dashboard
- https://vercel.com/dashboard
- View deployments, logs, analytics
- Monitor page speed

### Render Dashboard
- https://dashboard.render.com
- View logs: Dashboard → Service → "Logs"
- Monitor uptime

### MongoDB Atlas
- https://cloud.mongodb.com
- View data size, connections
- Monitor performance

---

## 🔄 CI/CD Pipeline

Your deployments are already automated!

**How it works:**
1. You push code to GitHub
2. GitHub notifies Vercel & Render
3. They pull latest code
4. Automatic build & test
5. Automatic deployment if successful

**To manually redeploy:**

**From Vercel:**
- Dashboard → Your Project → "Deployments" → Redeploy

**From Render:**
- Dashboard → Your Service → "Manual Deploy"

---

## 📞 Support & Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- GitHub Actions: https://github.com/features/actions

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] MongoDB connection string saved
- [ ] Code pushed to GitHub
- [ ] Render backend deployed
- [ ] Vercel frontend deployed
- [ ] Environment variables set on both platforms
- [ ] Google OAuth URIs updated
- [ ] Backend CORS updated for Vercel URL
- [ ] Frontend VITE_API_URL set to Render URL
- [ ] Tested signup/login on production
- [ ] Tested API integration
- [ ] Tested Google OAuth

---

## 🎉 You're Live!

Your Dressify app is now on the internet!

- **Frontend:** https://dressify.vercel.app
- **Backend API:** https://dressify-backend.onrender.com
- **Database:** MongoDB Atlas

Share your app with friends! 🚀
