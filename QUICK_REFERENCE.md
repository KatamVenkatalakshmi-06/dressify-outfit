# Dressify Cloud Deployment - Quick Reference Card

Print or bookmark this page!

---

## 🎯 Your Deployment URLs

```
Frontend:  https://dressify.vercel.app
Backend:   https://dressify-backend.onrender.com
API:       https://dressify-backend.onrender.com/api
Database:  https://cloud.mongodb.com (Atlas Dashboard)
GitHub:    https://github.com/YOUR_USERNAME/dressify-outfit
```

---

## 📋 5-Step Deployment Process

### Step 1: MongoDB Atlas (Database)
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up → Create Organization → Create Project
3. Create Cluster (FREE mie)
4. Create User: username=dressify_user
5. Get Connection String
6. Save: MONGODB_URI
```

### Step 2: GitHub Push
```
git add .
git commit -m "Deploy to production"
git push origin main
```

### Step 3: Render (Backend)
```
1. Go to https://render.com
2. New → Web Service → Select GitHub repo
3. Build: cd backend && npm install
4. Start: cd backend && npm start
5. Environment Variables:
   MONGODB_URI = (from step 1)
   JWT_SECRET = (32+ random chars)
   NODE_ENV = production
   PORT = 10000
   FRONTEND_URL = https://dressify.vercel.app
6. Deploy!
```

### Step 4: Vercel (Frontend)
```
1. Go to https://vercel.com
2. New → Import from Git → Select repo
3. Environment Variables:
   VITE_API_URL = https://dressify-backend.onrender.com/api
4. Deploy!
```

### Step 5: Test
```
Frontend: https://dressify.vercel.app
Backend:  https://dressify-backend.onrender.com/api/health
Test signup/login
```

---

## 🔑 Critical Environment Variables

### Backend (Render)
```
MONGODB_URI        = mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
JWT_SECRET         = (32+ character random string, NO placeholder!)
NODE_ENV           = production
PORT               = 10000
FRONTEND_URL       = https://dressify.vercel.app
GOOGLE_CLIENT_ID   = (optional, from Google Cloud)
```

### Frontend (Vercel)
```
VITE_API_URL = https://dressify-backend.onrender.com/api
```

---

## ✅ Verification Checklist

```
MongoDB Atlas
□ Account created
□ Cluster created
□ User created: dressify_user
□ Connection string saved

GitHub
□ Code pushed to GitHub

Render (Backend)
□ Service created
□ All env vars set
□ Shows "Live" status

Vercel (Frontend)
□ Project imported
□ VITE_API_URL set
□ Deployment successful

Testing
□ Frontend loads
□ Backend responds
□ Sign up works
□ Login works
□ User in MongoDB
```

---

## 🚨 Common Mistakes

❌ **MongoDB Connection**
```
WRONG:  mongodb://db.mongodb.net/
        (missing +srv)
WRONG:  mongodb+srv://user:pass@cluster/
        (trailing slash)
RIGHT:  mongodb+srv://dressify_user:password@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
```

❌ **API URL**
```
WRONG:  http://dressify-backend.onrender.com/api
        (should be HTTPS)
WRONG:  https://dressify-backend.onrender.com
        (missing /api)
RIGHT:  https://dressify-backend.onrender.com/api
```

❌ **JWT Secret**
```
WRONG:  your_secret_key
        (placeholder)
WRONG:  123456
        (too simple)
RIGHT:  sK9$mX2&pQ8@nZ4#vL6!jT1%bC3rU7^wE4(p
        (32+ chars, random, mixed case/symbols)
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Frontend won't load | Clear cache, check Vercel deployment |
| Can't connect to backend | Render free tier spins down (30s startup) |
| Database connection failed | Check MONGODB_URI password & IP whitelist |
| CORS error | Verify FRONTEND_URL in Render, VITE_API_URL in Vercel |
| Signup not saving to DB | Check MONGODB_URI & network request |
| API returns 404 | Verify correct backend URL with right path |

---

## 📞 Helpful Resources

| Service | Docs | Dashboard |
|---------|------|-----------|
| Vercel | https://vercel.com/docs | https://vercel.com/dashboard |
| Render | https://render.com/docs | https://dashboard.render.com |
| MongoDB | https://www.mongodb.com/docs/atlas/ | https://cloud.mongodb.com |
| GitHub | https://docs.github.com | https://github.com |

---

## 💰 Pricing

| Service | Free | Upgrade |
|---------|------|---------|
| Vercel | ✅ Unlimited | Usually not needed |
| Render | ✅ Limited (slow) | $7/mo for production |
| MongoDB | ✅ 512MB | $57/mo for more storage |
| **Total** | **Free/Limited** | **~$7-10/mo** |

---

## 🔄 Update Workflow After Deployment

```
You make changes
    ↓
git add . && git commit -m "..." && git push origin main
    ↓
GitHub notifies services
    ↓
Render auto-rebuilds backend
Vercel auto-rebuilds frontend
    ↓
Both auto-redeploy (5-10 mins)
    ↓
Changes live!
```

---

## 📊 Monitoring

### Check Status
- Vercel: https://vercel.com/dashboard
- Render: https://dashboard.render.com
- MongoDB: https://cloud.mongodb.com

### View Logs
- Render: Dashboard → Service → Logs
- Vercel: Dashboard → Deployments → View

### Test Health
```
Frontend: https://dressify.vercel.app
Backend:  https://dressify-backend.onrender.com/api/health
```

---

## 🎯 Success Indicators

✅ You're live when:

1. Vercel shows green checkmark
2. Render shows "Live" 
3. Frontend loads without errors
4. Backend API responds to requests
5. User signup creates database entry
6. Login works with saved credentials

---

## 📝 Important Files

| File | Purpose |
|------|---------|
| `CLOUD_DEPLOYMENT_WINDOWS.md` | Step-by-step guide |
| `CLOUD_DEPLOYMENT_GUIDE.md` | Technical details |
| `ENV_VARIABLES_GUIDE.md` | All env vars explained |
| `CLOUD_DEPLOYMENT_SUMMARY.md` | Overview & tips |
| `vercel.json` | Vercel configuration |
| `render.yaml` | Render configuration |
| `backend/.env` | Local config (don't commit) |

---

## 🚀 Pro Tips

1. **Save everything as you go**
   - MongoDB connection string
   - JWT secret
   - Google Client ID
   - Vercel URL
   - Render URL

2. **Test locally before deploying**
   - `npm run dev` (frontend)
   - `cd backend && npm run dev` (backend)
   - Try signup/login

3. **Keep secrets secure**
   - Never commit `.env` files
   - Never share your MongoDB password
   - Use strong random strings for JWT_SECRET

4. **Document your setup**
   - Save connection strings securely
   - Note which service is deployed where
   - Keep backup of MongoDB settings

5. **Monitor regularly**
   - Check dashboards weekly
   - Review logs for errors
   - Monitor storage usage

---

## ❓ Questions?

| Question | Answer |
|----------|--------|
| How do I redeploy? | Push to GitHub, services auto-redeploy |
| Can I use my own domain? | Yes, add to Vercel/Render settings |
| How do I add more features? | Code locally, test, push to GitHub |
| Is it secure? | Yes, HTTPS everywhere, passwords hashed |
| Can I go back to local? | Yes, update VITE_API_URL to localhost:5000 |

---

## 🎉 You Did It!

Your app is now:
- ✅ Hosted on the cloud
- ✅ Accessible worldwide
- ✅ Using production database
- ✅ Professional looking
- ✅ Auto-scalable
- ✅ Secure

**Share your app:** https://dressify.vercel.app

---

**Bookmark this page!**
Print this card and keep it handy for quick reference during deployment.

Last Updated: February 16, 2026
