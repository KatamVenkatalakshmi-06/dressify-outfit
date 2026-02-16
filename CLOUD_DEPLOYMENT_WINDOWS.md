# Cloud Deployment - Step-by-Step (Windows)

Complete step-by-step guide to deploy Dressify to Vercel, Render, and MongoDB Atlas.

---

## 📋 What You'll Do

1. Setup MongoDB Atlas (Database) ✅
2. Push code to GitHub ✅
3. Deploy backend to Render ✅
4. Deploy frontend to Vercel ✅
5. Configure everything ✅
6. Test production ✅

**Time required:** ~30-45 minutes

---

## Step 1: MongoDB Atlas Setup (Database)

### 1.1 Create MongoDB Account

1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Sign Up"**
3. Choose **"Sign up with Google"** or create account
4. Verify email

### 1.2 Create Organization & Project

1. Click "Create New Organization"
2. Name: `Dressify`
3. Click "Create Organization"
4. Click "Create New Project"
5. Name: `dressify-production`
6. Click "Create Project"

### 1.3 Create Database Cluster

1. Click **"Create Deployment"**
2. Choose **"FREE"** tier (M0)
3. **Cloud Provider:** AWS, Google Cloud, or Azure (doesn't matter)
4. **Region:** Select one closest to you
   - US: Virginia (us-east-1)
   - EU: Germany (eu-central-1)
   - Asia: Singapore (ap-southeast-1)
5. **Cluster Name:** `cluster0` (default is fine)
6. Click **"Create Deployment"**
7. ⏳ Wait 5-10 minutes for cluster to be ready

### 1.4 Create Database User

1. Go to **"Security"** → **"Database Access"**
2. Click **"Add New Database User"**
3. **Authentication Method:** Password
4. **Username:** `dressify_user`
5. **Password:** Click **"Generate Secure Password"**
   - **⚠️ Copy this password! You'll need it!**
6. **Database User Privileges:** Atlas Admin
7. Click **"Add User"**

### 1.5 Add IP Whitelist

1. Go to **"Security"** → **"Network Access"**
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** (or add specific IPs later)
4. Description: `Production - Render`
5. Click **"Confirm"**

### 1.6 Get Connection String

1. Go to **"Deployment"** → Click your cluster
2. Click **"Connect"**
3. Choose **"Connect your application"**
4. **Driver:** Node.js
5. **Version:** Pick latest
6. Copy the connection string:
   ```
   mongodb+srv://dressify_user:<password>@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
   ```

7. **Replace `<password>` with your actual password** (from step 1.4)

**⚠️ SAVE THIS CONNECTION STRING! You'll need it for Render!**

---

## Step 2: Push Code to GitHub

### 2.1 Create GitHub Repository

1. Go to: **https://github.com/new**
2. **Repository name:** `dressify-outfit`
3. **Description:** Full-stack outfit customization platform
4. Choose **Public** or **Private**
5. ✅ **Uncheck** "Add a README" (we have one)
6. Click **"Create repository"**

### 2.2 Push Code to GitHub

Open Command Prompt or PowerShell:

```powershell
# Navigate to project
cd "C:\Users\DELL\Desktop\cap-6 sem\dressify-outfit"

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Full-stack dressify app with backend"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dressify-outfit.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

You'll be asked for GitHub credentials - provide your username and personal access token (or use OAuth).

✅ **Your code is now on GitHub!**

---

## Step 3: Deploy Backend to Render

### 3.1 Create Render Account

1. Go to: **https://render.com/**
2. Click **"Get Started"**
3. Sign up with GitHub (easier!) or email
4. Authorize Render to access your GitHub

### 3.2 Create Backend Service

1. Dashboard → **"New +"** → **"Web Service"**
2. Select your `dressify-outfit` repository
3. Click **"Connect"**

### 3.3 Configure Service

Fill in the form:

| Field | Value |
|-------|-------|
| **Name** | `dressify-backend` |
| **Environment** | `Node` |
| **Region** | Pick closest to you |
| **Branch** | `main` |
| **Build Command** | `cd backend && npm install` |
| **Start Command** | `cd backend && npm run start` |
| **Instance Type** | `Free` |

### 3.4 Add Environment Variables

Scroll down to **"Environment Variables"**

Click **"Add Environment Variable"** for each:

```
Key: MONGODB_URI
Value: mongodb+srv://dressify_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority

Key: JWT_SECRET
Value: your_very_secure_secret_key_change_this_min_32_characters

Key: NODE_ENV
Value: production

Key: PORT
Value: 10000

Key: GOOGLE_CLIENT_ID
Value: (optional for now, setup later)

Key: FRONTEND_URL
Value: https://dressify.vercel.app
```

### 3.5 Deploy

1. Click **"Create Web Service"**
2. Render will build and deploy automatically
3. Wait for green **"Live"** status (5-10 minutes)
4. Copy your backend URL: `https://dressify-backend.onrender.com`

✅ **Backend is live!**

#### ⚠️ Note: Free Tier Limitations
- Service spins down after 15 mins of inactivity
- First request takes 30 seconds to start
- Upgrade to paid ($7/mo) for continuous running

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account

1. Go to: **https://vercel.com/**
2. Click **"Sign Up"**
3. **Sign up with GitHub** (easiest)
4. Authorize Vercel

### 4.2 Import Project

1. Vercel Dashboard → **"Add New"** → **"Project"**
2. Select your `dressify-outfit` repository
3. Click **"Import"**

### 4.3 Configure Project

Settings should auto-detect, but verify:

| Field | Value |
|-------|-------|
| **Project Name** | `dressify` |
| **Framework** | `Vite` |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 4.4 Add Environment Variables

1. Scroll to **"Environment Variables"**
2. Add one variable:

```
Name: VITE_API_URL
Value: https://dressify-backend.onrender.com/api
```

**Replace with your actual Render URL!**

### 4.5 Deploy

1. Click **"Deploy"**
2. Wait for deployment to complete (3-5 minutes)
3. You'll get a URL: `https://dressify.vercel.app`

✅ **Frontend is live!**

---

## Step 5: Configure Google OAuth (Optional)

If you want Google login to work:

### 5.1 Create Google Cloud Project

1. Go to: **https://console.cloud.google.com/**
2. Click **"Select a Project"** → **"New Project"**
3. **Project name:** `Dressify`
4. Click **"Create"**
5. Wait for project to be created

### 5.2 Enable Google+ API

1. Search for **"Google+ API"**
2. Click it
3. Click **"Enable"**

### 5.3 Create OAuth Credentials

1. Go to **"Credentials"** (left menu)
2. Click **"Create Credentials"** → **"OAuth Client ID"**
3. Click **"Configure OAuth Consent Screen"**
4. Choose **"External"**
5. **App name:** `Dressify`
6. **User support email:** Your email
7. Scroll down → Add your email again
8. Click **"Save and Continue"**
9. Click **"Save and Continue"** (skip scopes)
10. Click **"Save and Continue"** (skip test users)
11. Click **"Back to Credentials"**

### 5.4 Create Web App Credentials

1. Click **"Create Credentials"** → **"OAuth Client ID"**
2. **Application type:** Web application
3. **Name:** `Dressify Web`
4. **Authorized JavaScript Origins:** Add:
   - `https://dressify.vercel.app`
   - `https://dressify-backend.onrender.com`
5. **Authorized redirect URIs:** Add:
   - `https://dressify-backend.onrender.com/api/auth/google`
   - `https://dressify.vercel.app`
6. Click **"Create"**
7. Copy **Client ID** (you'll need this)

### 5.5 Update Render Environment Variable

1. Render Dashboard → Your Backend Service
2. **Settings** → **Environment Variables**
3. Edit or add `GOOGLE_CLIENT_ID`
4. Paste your Client ID
5. Click **"Save"**
6. Service will auto-redeploy

---

## Step 6: Test Everything

### 6.1 Test Backend Health

Open browser and visit:
```
https://dressify-backend.onrender.com/api/health
```

You should see:
```json
{
  "status": "Server is running",
  "environment": "production",
  "timestamp": "2024-02-16T..."
}
```

### 6.2 Test Frontend

Open browser:
```
https://dressify.vercel.app
```

You should see the Dressify login page.

### 6.3 Test Sign Up

1. Click **"Sign Up"**
2. Enter: Name, Email, Password
3. Click **"Sign Up"**
4. You should be redirected to **"Home"**
5. Check MongoDB Atlas - user should appear in database

### 6.4 Test Login

1. Logout (if there's a logout button)
2. Login page → Sign In
3. Enter email and password
4. You should be logged in

### 6.5 Test Browser Console

1. Open browser **DevTools** (F12)
2. Go to **Network** tab
3. Try signup/login again
4. You should see requests going to:
   - `https://dressify-backend.onrender.com/api/auth/signup`
   - `https://dressify-backend.onrender.com/api/auth/login`

✅ **Everything works!**

---

## Step 7: Future Updates

### Deploying Updated Code

When you make changes:

```powershell
# Make your changes
# (edit files, test locally)

# Commit to git
git add .
git commit -m "Update feature xyz"
git push origin main
```

**Both Vercel and Render will automatically:**
1. Detect the push
2. Re-build
3. Re-deploy
4. Show new version in 5-10 minutes

### Updating Environment Variables

**For Backend (Render):**
1. Go to https://dashboard.render.com
2. Select "dressify-backend"
3. Go to "Environment"
4. Edit variables
5. Click "Save"
6. Service redeploys automatically

**For Frontend (Vercel):**
1. Go to https://vercel.com/dashboard
2. Select "dressify"
3. Go to "Settings" → "Environment Variables"
4. Edit variables
5. Click "Save"
6. You need to redeploy manually (click "Redeploy")

---

## 🔗 Your Production URLs

Once everything is deployed:

- **Frontend:** https://dressify.vercel.app
- **Backend API:** https://dressify-backend.onrender.com/api
- **MongoDB:** MongoDB Atlas Dashboard

Share your frontend URL with friends!

---

## 💰 Costs

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | Yes (unlimited) | Free ✅ |
| Render | Yes (limited) | $7/mo for production |
| MongoDB | Yes (512MB) | Free ✅ |
| **Total** | **Limited** | **~$7/mo** |

To keep free: Use Render free tier (slow, spins down)
To optimize: Upgrade Render to $7/mo paid tier

---

## 🐛 Troubleshooting

### "Cannot reach frontend"
```
Solution:
1. Check Vercel deployment succeeded (green checkmark)
2. Clear browser cache
3. Try incognito window
```

### "Cannot reach backend"
```
Solution:
1. Check Render shows "Live"
2. Free tier might be spinning up (takes 30s first time)
3. Check MONGODB_URI is correct in Render env vars
4. Check MongoDB IP whitelist allows Render
```

### "MongoDB connection error"
```
Solution:
1. Verify password in MONGODB_URI (no special chars issues)
2. Check IP whitelist on MongoDB Atlas includes "anywhere"
3. Ensure database user exists (dressify_user)
4. Test connection string locally first
```

### "CORS error"
```
Solution:
1. Verify backend CORS includes vercel.app URL
2. Ensure FRONTEND_URL env var is set in Render
3. Frontend should make requests to backend API URL
```

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created (dressify_user)
- [ ] Connection string saved securely
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured on both
- [ ] Google OAuth configured (optional)
- [ ] Backend health check working
- [ ] Frontend loads without errors
- [ ] Sign up works
- [ ] Login works
- [ ] User data appears in MongoDB

---

## 🎉 You're Live!

Your Dressify app is now hosted in the cloud!

Share your app: https://dressify.vercel.app

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Docs: https://www.mongodb.com/docs/atlas/
- GitHub Docs: https://docs.github.com/

Good luck! 🚀
