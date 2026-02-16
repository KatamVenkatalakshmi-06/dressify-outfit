# 📋 Dressify Deployment Checklist

Use this checklist to track your progress through the deployment process.

---

## Phase 1: Prepare Your Local Environment ✈️

- [ ] Clone repository from GitHub
- [ ] Install Node.js (v18+)
- [ ] Run `npm install` in project root
- [ ] Run `npm install` in `backend/` directory
- [ ] Test frontend: `npm run dev` (localhost:8080)
- [ ] Test backend: `cd backend && npm run dev` (localhost:5000)
- [ ] Test signup/login locally
- [ ] Test database operations locally

**Status:** _____________________

---

## Phase 2: Prepare Cloud Accounts 🌐

### MongoDB Atlas
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Create MongoDB account
- [ ] Create new organization
- [ ] Create new project (name: dressify)
- [ ] Create cluster (M0 free tier)
- [ ] Wait for cluster to initialize (5-10 minutes)
- [ ] Create database user:
  - [ ] Username: `dressify_user`
  - [ ] Password: _________________ (save this!)
  - [ ] Permissions: Admin
- [ ] Get connection string:
  ```
  mongodb+srv://dressify_user:<PASSWORD>@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
  ```
  - [ ] Save: paste here _______________________________________________

- [ ] Add IP to whitelist:
  - [ ] Go to Network Access
  - [ ] Add IP Address
  - [ ] Choose "Allow access from anywhere" (0.0.0.0/0)
  - [ ] Confirm

**MongoDB Status:** _____________________

### GitHub
- [ ] Create GitHub account (if needed)
- [ ] Go to https://github.com
- [ ] Create new repository: `dressify-outfit`
- [ ] Make it PUBLIC
- [ ] Repository link: https://github.com/YOUR_USERNAME/dressify-outfit

**GitHub Status:** _____________________

### Render
- [ ] Go to https://render.com
- [ ] Click "Sign Up"
- [ ] Sign up with GitHub (recommended)
- [ ] Authorize Render to access GitHub

**Render Account Status:** _____________________

### Vercel
- [ ] Go to https://vercel.com
- [ ] Click "Sign Up"
- [ ] Sign up with GitHub (recommended)
- [ ] Authorize Vercel to access GitHub

**Vercel Account Status:** _____________________

### Google OAuth (Optional)
- [ ] Go to https://console.cloud.google.com
- [ ] Create new project: `dressify`
- [ ] Enable Google+ API
- [ ] Create OAuth credentials:
  - [ ] Type: Web Application
  - [ ] Authorized JavaScript origins: https://dressify.vercel.app
  - [ ] Authorized redirect URIs: https://dressify-backend.onrender.com/api/auth/google/callback
- [ ] Save Client ID: ___________________

**Google OAuth Status:** _____________________

---

## Phase 3: Push Code to GitHub 📤

In project root directory:

```bash
git init
git add .
git commit -m "Initial deployment setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dressify-outfit.git
git push -u origin main
```

- [ ] Connected with git repo
- [ ] All files committed
- [ ] Pushed to GitHub main branch
- [ ] Verify on GitHub: all files visible

**GitHub Push Status:** _____________________

---

## Phase 4: Deploy Backend to Render 🔧

### 4.1 Create Service
- [ ] Go to https://dashboard.render.com
- [ ] New → Web Service
- [ ] Select `dressify-outfit` repository
- [ ] Choose `backend` directory (or specify in build command)
- [ ] Service name: `dressify-backend`
- [ ] Environment: Node
- [ ] Build: `cd backend && npm install`
- [ ] Start: `cd backend && npm start`
- [ ] Plan: Free
- [ ] Create service

### 4.2 Set Environment Variables
In Render dashboard, go to Environment:

- [ ] MONGODB_URI = `mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority`
- [ ] JWT_SECRET = (generate: 32+ random chars) ___________________
- [ ] NODE_ENV = `production`
- [ ] PORT = `10000`
- [ ] FRONTEND_URL = `https://dressify.vercel.app`
- [ ] GOOGLE_CLIENT_ID = (from Google Console, if using) ___________________

### 4.3 Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check status (should show "Live")
- [ ] Save your backend URL: https://dressify-backend.onrender.com

**Backend Deployment Status:** _____________________

### 4.4 Test Backend
```bash
curl https://dressify-backend.onrender.com/api/health
```

- [ ] Backend responds with health check
- [ ] No errors in logs

**Backend Testing Status:** _____________________

---

## Phase 5: Deploy Frontend to Vercel 🎨

### 5.1 Import Project
- [ ] Go to https://vercel.com/dashboard
- [ ] New → Import Git Repository
- [ ] Select `dressify-outfit`
- [ ] Framework: Vite
- [ ] Root directory: ./
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Import project

### 5.2 Set Environment Variables
- [ ] VITE_API_URL = `https://dressify-backend.onrender.com/api`

### 5.3 Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (1-3 minutes)
- [ ] Check status (should show checkmark)
- [ ] Save your frontend URL: https://dressify.vercel.app

**Frontend Deployment Status:** _____________________

---

## Phase 6: Production Testing 🧪

### 6.1 Frontend Load Test
- [ ] Open https://dressify.vercel.app in browser
- [ ] Page loads without errors
- [ ] All styles render correctly
- [ ] Navigation works

**Frontend Load:** ✅ ❌

### 6.2 Backend Health Check
- [ ] Open https://dressify-backend.onrender.com/api/health
- [ ] Returns JSON response
- [ ] Status shows "ok"

**Backend Health:** ✅ ❌

### 6.3 Sign Up Test
- [ ] In frontend, click "Sign Up"
- [ ] Enter email: `test@example.com`
- [ ] Enter password: `Test123!@#`
- [ ] Click sign up
- [ ] See success message or redirect to home

**Sign Up Test:** ✅ ❌

### 6.4 Database Test
- [ ] Log into MongoDB Atlas
- [ ] Navigate to `dressify` database
- [ ] Click on `users` collection
- [ ] Verify test user is there with:
  - [ ] Email: test@example.com
  - [ ] Name field
  - [ ] Password (encrypted)
  - [ ] createdAt timestamp

**Database Test:** ✅ ❌

### 6.5 Login Test
- [ ] Log out (if needed)
- [ ] Click "Sign In" / "Login"
- [ ] Enter email: `test@example.com`
- [ ] Enter password: `Test123!@#`
- [ ] Click login
- [ ] Redirected to home page
- [ ] User info displays

**Login Test:** ✅ ❌

### 6.6 Design Save Test (Optional)
- [ ] Customize an outfit/design
- [ ] Click "Save Design"
- [ ] See success message
- [ ] In MongoDB, check `designs` collection for saved design

**Design Save Test:** ✅ ❌

**Overall Production Status:** _____________________

---

## Phase 7: Post-Deployment Setup 🎯

### Domain (Optional)
- [ ] Custom domain configured in Vercel
- [ ] SSL certificate active
- [ ] DNS records updated

**Domain Status:** _____________________

### Monitoring
- [ ] Added Vercel to bookmarks
- [ ] Added Render to bookmarks
- [ ] Added MongoDB to bookmarks
- [ ] Set up alerts (optional)

**Monitoring Status:** _____________________

### Documentation
- [ ] Bookmarked QUICK_REFERENCE.md
- [ ] Saved all credentials securely
- [ ] Created backup of MongoDB connection string
- [ ] Noted all deployed URLs:
  - Frontend: https://dressify.vercel.app
  - Backend: https://dressify-backend.onrender.com
  - API: https://dressify-backend.onrender.com/api
  - MongoDB Dashboard: https://cloud.mongodb.com

**Documentation Status:** _____________________

---

## Phase 8: Ongoing Maintenance 🔧

After deployment:

- [ ] Monitor error logs weekly
- [ ] Check MongoDB storage usage
- [ ] Update code as needed (git push triggers auto-redeploy)
- [ ] Test with real users
- [ ] Gather feedback
- [ ] Plan improvements

---

## Summary

```
PHASE 1 - Prepare Local:    ░░░░░░░░░░ 0%
PHASE 2 - Cloud Accounts:   ░░░░░░░░░░ 0%
PHASE 3 - Push to GitHub:   ░░░░░░░░░░ 0%
PHASE 4 - Deploy Backend:   ░░░░░░░░░░ 0%
PHASE 5 - Deploy Frontend:  ░░░░░░░░░░ 0%
PHASE 6 - Test Everything:  ░░░░░░░░░░ 0%
PHASE 7 - Post-Deploy:      ░░░░░░░░░░ 0%
─────────────────────────────────────
OVERALL:                     ░░░░░░░░░░ 0%
```

---

## 🎉 Congratulations! 🎉

When all items are checked:

✅ Your app is live on the web  
✅ Anyone can access it  
✅ Users can sign up and login  
✅ Data is safe in MongoDB  
✅ Updates deploy automatically  

**Your live URL:** https://dressify.vercel.app

---

## 📞 Need Help?

| Issue | Solution |
|-------|----------|
| Stuck? | Read `CLOUD_DEPLOYMENT_WINDOWS.md` for detailed steps |
| Questions? | Check `ENV_VARIABLES_GUIDE.md` for environment setup |
| Technical? | See `CLOUD_DEPLOYMENT_GUIDE.md` for architecture |
| Quick lookup? | Use `QUICK_REFERENCE.md` card |

---

**Print this page and check off each item as you go!**

---

*Deployment Checklist v1.0*  
*Last Updated: February 16, 2026*
