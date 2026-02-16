# 🔧 Dressify Deployment Troubleshooting Guide

If something went wrong, you're in the right place. Find your problem below.

---

## 🆘 Frontend Issues

### Frontend won't load (white/blank page)

**Problem:** https://dressify.vercel.app shows blank page or error

**Solutions (try in order):**

1. **Clear cache:**
   ```
   Ctrl+Shift+Delete (Windows) → Clear browsing data
   ```
   Then refresh page

2. **Check Vercel deployment:**
   - Go to https://vercel.com/dashboard
   - Click the dressify project
   - Recent deployments should show ✅ (green)
   - If red ❌ → Check build logs for errors

3. **Check environment variable:**
   - In Vercel → Settings → Environment Variables
   - VITE_API_URL should be set
   - Make sure it's the correct Render URL
   - Redeploy after fixing

4. **Check backend is running:**
   - Visit https://dressify-backend.onrender.com/api/health
   - Should see JSON response
   - If 404 or timeout → backend isn't running

5. **Check browser console:**
   - Right-click → Inspect → Console tab
   - Look for red error messages
   - Screenshot helps for debugging

---

### Buttons don't work / API errors in console

**Problem:** Clicking sign up/login gives errors or doesn't work

**Solutions:**

1. **Check API URL:**
   - Right-click → Inspect → Console
   - Look for fetch/API errors
   - URL should be `https://dressify-backend.onrender.com/api`
   - Not `http://` (should be `https://`)
   - Not `localhost` (should be production URL)

2. **Verify Vercel env var:**
   - https://vercel.com/dashboard → dressify → Settings
   - VITE_API_URL = `https://dressify-backend.onrender.com/api`
   - Redeploy: Click "Deployments" → Most recent → "Redeploy"

3. **Wait for backend to wake up:**
   - Free Render tier spins down after 15 minutes
   - First request takes 30 seconds
   - Click button again if it timed out

---

### Page loads slowly

**Problem:** Takes 30+ seconds to load

**Cause:** Render free tier cold-start

**Solutions:**

1. **This is normal:**
   - Free Render tier auto-pauses after inactivity
   - First request wakes it up (30 seconds)
   - Subsequent requests are fast

2. **Upgrade for production:**
   - Go to https://dashboard.render.com
   - Select service → Settings
   - Upgrade to "Standard" ($7/month)
   - Keeps server always warm

---

## 🆘 Backend Issues

### Backend won't start / error in Render logs

**Problem:** Render shows build failed or service crashed

**Check logs:**
1. https://dashboard.render.com
2. Click `dressify-backend` service
3. Scroll to "Logs" at bottom
4. Look for red error messages

**Common errors:**

| Error | Fix |
|-------|-----|
| `Cannot find module 'express'` | npm install not run; check package.json |
| `MONGODB_URI not defined` | Environment variable missing in Render |
| `connect ECONNREFUSED` | MongoDB connection string wrong |
| `JWT_SECRET undefined` | Environment variable missing |
| `EADDRINUSE` | Port already in use (shouldn't happen in Render) |

**Solutions:**

1. **Check environment variables:**
   - https://dashboard.render.com
   - Select service → Environment
   - MONGODB_URI present? ✅
   - JWT_SECRET present? ✅
   - All passwords correct? ✅
   - Redeploy if changed

2. **Check MongoDB connection string:**
   - Format: `mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority`
   - DO NOT use `<PASSWORD>` placeholder
   - Replace with actual password
   - NO spaces around colons
   - URL must include `/dressify` at end

3. **Redeploy:**
   - https://dashboard.render.com
   - Select service
   - Manual deploy → "Deploy latest commit"

---

### Backend responds with 500 error

**Problem:** API returns error 500

**Check what's happening:**
```bash
curl https://dressify-backend.onrender.com/api/health
```

If error appears, check Render logs:
1. https://dashboard.render.com
2. Scroll to "Logs"
3. See the actual error message

**Common causes:**
- MongoDB not connected
- Wrong database name
- Collections don't exist yet

**Fix:**
- Connection string correct? 
- MongoDB Atlas cluster running?
- Database user password correct?
- Try from local: `cd backend && npm run dev`

---

### Health check works but signup/login fails

**Problem:** Backend running but authentication doesn't work

**Check:**
1. Is MongoDB connected?
   - In Render logs, should see "Connected to MongoDB"
   - If not, MONGODB_URI is wrong

2. Is database created?
   - Go to MongoDB Atlas
   - Click cluster → Collections
   - `dressify` database should exist with `users` collection
   - If not, run signup once to create it

3. Are env vars correct?
   - JWT_SECRET set? ✅
   - MONGODB_URI correct? ✅
   - NODE_ENV = production? ✅

---

## 🆘 Database Issues

### Can't connect to MongoDB

**Problem:** Backend can't reach MongoDB Atlas

**Solutions:**

1. **Check IP whitelist:**
   - MongoDB Atlas → Network Access
   - Your Render IP should be whitelisted
   - Easiest: Allow 0.0.0.0/0 (anywhere)
   - ⚠️ Security risk - only for development

2. **Check connection string:**
   ```
   mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
   ```
   - Replace `PASSWORD` with actual password
   - Replace `cluster0` with your cluster name
   - Check `mongodb.net` (not `mongodb.com`)
   - Check `/dressify` at end

3. **Verify database user:**
   - MongoDB Atlas → Database Access
   - User `dressify_user` should exist
   - Password matches in connection string?
   - Has `atlasAdmin` role?

4. **Check cluster status:**
   - MongoDB Atlas → Clusters
   - Cluster should show "RUNNING" (green)
   - Not paused or error state

---

### Data not saving to database

**Problem:** Signup works but user not in MongoDB

**Check:**
1. Signup successful? (see success message)
2. Check MongoDB:
   - Atlas Dashboard → Collections
   - Filter `dressify` database → `users` collection
   - User should appear there

3. If not in database:
   - Check backend logs (API error?)
   - Check console (frontend error?)
   - Try again

**If still not working:**
- Check MONGODB_URI in Render
- Check database name is `dressify`
- Create collection manually:
  - MongoDB Atlas → Database → Collections → Create
  - Collection name: `users`

---

### Database storage full

**Problem:** Can't save more data (free tier limit reached)

**Cause:** Free MongoDB tier is 512MB

**Solutions:**
1. Delete old test data
2. Upgrade to paid MongoDB tier
3. Archive old designs/users

---

## 🆘 Authentication Issues

### Signup works but login fails

**Problem:** Can sign up new user but can't login

**Check:**
1. Is password hashed?
   - In MongoDB, password should look like: `$2b$10$...` (bcrypt format)
   - Not plain text!

2. Try signup again:
   - Fresh user might not exist
   - Check MongoDB collection

3. Check password exact match:
   - Passwords are case-sensitive
   - No spaces at beginning/end

---

### "Invalid token" error

**Problem:** Logged in but getting token error

**Cause:** JWT token expired or invalid

**Solutions:**
1. Log out and log in again
2. Clear localStorage:
   ```javascript
   localStorage.clear()
   ```
3. Refresh page and try again

**If still fails:**
- JWT_SECRET changed on backend?
- All users have invalid tokens
- Users must login again

---

### Password not hashing

**Problem:** Passwords saving as plain text in database

**Check backend message:**
- Should see "bcrypt imported" in startup logs
- Should see hashed password like `$2b$10$...`

**If plain text:**
- bcryptjs not installed
- In backend: `npm install bcryptjs`
- Restart backend
- Delete old users and signup again

---

## 🆘 GitHub Issues

### Code won't push to GitHub

**Problem:** `git push` fails

**Solutions:**

1. **Authentication issue:**
   ```bash
   git config --global user.email "your@email.com"
   git config --global user.name "Your Name"
   ```

2. **Remote not set:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/dressify-outfit.git
   git push -u origin main
   ```

3. **Branch mismatch:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

### Vercel/Render not detecting changes

**Problem:** Pushed to GitHub but no auto-deploy

**Check:**
1. Code actually pushed:
   ```bash
   git log
   ```
   Should show your commits

2. GitHub has changes:
   - https://github.com/YOUR_USERNAME/dressify-outfit
   - Files should be updated
   - Recent commits visible

3. Vercel/Render connected to GitHub:
   - Vercel: https://vercel.com/dashboard
   - Render: https://dashboard.render.com
   - Both should show "Connected to GitHub"

4. Redeploy manually:
   - Vercel: Deployments → Most recent → Redeploy
   - Render: Manual deploy → "Deploy latest commit"

---

## 🆘 Google OAuth Issues

### Google Sign-In button doesn't appear

**Problem:** No Google button on signup page

**Cause:** Google Client ID not configured

**Fix:**
1. Do you have Google Client ID?
   - Check Render environment: GOOGLE_CLIENT_ID
   - If empty/missing → not configured

2. To add:
   - Follow Google OAuth setup in ENV_VARIABLES_GUIDE.md
   - Get Client ID from Google Cloud Console
   - Add to Render environment variables
   - Redeploy backend

---

### Google login fails

**Problem:** Click Google Sign-In, error appears

**Check:**
1. Client ID correct in Render?
2. Callback URL in Google Console:
   - Should be: `https://dressify-backend.onrender.com/api/auth/google/callback`
3. Frontend URL in Google Console:
   - Should be: `https://dressify.vercel.app`

---

## 🆘 Performance Issues

### App is very slow

**Causes & fixes:**

| Issue | Fix |
|-------|-----|
| Render free tier cold start | Wait 30 sec, upgrade to paid |
| MongoDB far away | Use same region for deployment |
| Large image uploads | Not implemented yet |
| Too many requests | Free tier has limits |

---

### Getting "rate limited" errors

**Problem:** Too many API requests

**Cause:** Free tiers have request limits

**Fix:**
- Upgrade to paid plans
- Spread requests over time
- Don't spam buttons

---

## 🆘 Security Issues

### Secret keys visible in logs

**Problem:** See password/keys in logs

**Fix:** 
- Don't commit `.env` files
- Don't console.log() secrets
- Verify `.gitignore` includes:
  ```
  .env
  .env.local
  backend/.env
  node_modules/
  ```

---

### Getting CORS errors

**Problem:** Frontend can't reach backend (CORS error)

**Check:**
1. Backend CORS configured?
   - Should accept Vercel URL
   - Should accept Render URL

2. In backend server.js:
   ```javascript
   const allowedOrigins = [
     'https://dressify.vercel.app',
     'https://dressify-backend.onrender.com',
     'http://localhost:3000'
   ];
   ```

3. Redeploy backend if changed

---

## 🎯 Quick Diagnosis Checklist

**When something breaks:**

```
□ What error do you see exactly?
□ In frontend (browser) or backend (API)?
□ Check browser console (F12)
□ Check Render logs
□ Check Vercel logs
□ Is backend running? (test health check)
□ Is database connected? (check Render logs)
□ Are environment variables correct?
□ Are credentials correct? (passwords, keys)
□ When did it last work?
□ What changed since then?
```

---

## 📞 Get Help

### Step 1: Gather information
```
1. Full error message (copy exactly)
2. Screenshot of error
3. What were you doing?
4. What did you expect?
5. What happened instead?
```

### Step 2: Check resources
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Commands reference
- [ENV_VARIABLES_GUIDE.md](ENV_VARIABLES_GUIDE.md) - Variable explanations
- [CLOUD_DEPLOYMENT_GUIDE.md](CLOUD_DEPLOYMENT_GUIDE.md) - Technical details
- [CLOUD_DEPLOYMENT_WINDOWS.md](CLOUD_DEPLOYMENT_WINDOWS.md) - Step by step
- Render docs: https://render.com/docs
- Vercel docs: https://vercel.com/docs
- MongoDB docs: https://www.mongodb.com/docs/atlas/

### Step 3: Check logs
- **Vercel logs:** https://vercel.com/dashboard → Deployments → View
- **Render logs:** https://dashboard.render.com → Service → Logs
- **Browser logs:** F12 → Console tab
- **Local logs:** Terminal where you ran `npm run dev`

---

## 🚀 Still Stuck?

If nothing here helps:

1. **Start fresh:**
   - Delete MongoDB user, create new one
   - Redeploy both services
   - Clear browser cache

2. **Test locally:**
   - `npm run dev` (frontend)
   - `cd backend && npm run dev` (backend)
   - Works locally? Problem is in cloud setup

3. **Rollback:**
   - Compare `.env` from before
   - Check what changed
   - Undo changes, redeploy

---

## ✅ Verification Commands

Test each component:

```bash
# Frontend loads
curl https://dressify.vercel.app/
# Should return HTML

# API responds
curl https://dressify-backend.onrender.com/api/health
# Should return JSON with status

# Database connected
# Check Render logs for "Connected to MongoDB"

# Signup works
# Use frontend, fill form, submit
# Check MongoDB for new user

# Login works
# Use credentials from signup
# Should show success
```

---

## 📋 Before You Restart Everything

Try this first:

1. Clear browser cache
2. Check all environment variables
3. Verify MongoDB is running
4. Redeploy (don't rebuild, just redeploy)
5. Wait 5 minutes
6. Try again

Usually fixes 80% of issues!

---

**If all else fails:** Go back to [START_HERE.md](START_HERE.md) and carefully re-read the deployment steps.

*Last Updated: February 16, 2026*
