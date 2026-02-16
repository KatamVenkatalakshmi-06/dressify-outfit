# Production Environment Variables Checklist

Use this checklist to ensure all environment variables are correctly set up.

## Backend Environment Variables (Render)

### Required Variables

#### Database
```
MONGODB_URI = mongodb+srv://dressify_user:<PASSWORD>@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority
```
- [ ] Connection string is correct
- [ ] Username is `dressify_user`
- [ ] Password is your actual MongoDB password (not placeholder)
- [ ] Database name is `dressify`
- [ ] Connection parameters included

#### Authentication
```
JWT_SECRET = <32+ character random string>
```
- [ ] Length: minimum 32 characters
- [ ] NOT "your_secret" or any placeholder
- [ ] Contains mix of upper, lower, numbers, symbols
- [ ] Example: `sK9$mX2&pQ8@nZ4#vL6!jT1%bC3`

#### Server
```
PORT = 10000
```
- [ ] Must be 10000 (Render uses dynamic ports)

```
NODE_ENV = production
```
- [ ] Must be "production" for cloud
- [ ] Enables production optimizations

#### Frontend Integration
```
FRONTEND_URL = https://dressify.vercel.app
```
- [ ] Replace with your actual Vercel URL
- [ ] Must be HTTPS
- [ ] No trailing slash

#### Google OAuth (Optional)
```
GOOGLE_CLIENT_ID = <your_google_client_id>
```
- [ ] Get from Google Cloud Console
- [ ] Starts with letters/numbers (like: `123456789-xxxxx.apps.googleusercontent.com`)
- [ ] Leave empty for now if not configured

### How to Set (Render Dashboard)

1. Go to https://dashboard.render.com
2. Select "dressify-backend" service
3. Click "Settings" tab
4. Scroll to "Environment Variables"
5. Click "Add Environment Variable"
6. Enter Key and Value
7. Click blue arrow to confirm
8. Click "Save" at bottom
9. Service will auto-redeploy (3-5 minutes)

---

## Frontend Environment Variables (Vercel)

### Required Variables

#### API Base URL
```
VITE_API_URL = https://dressify-backend.onrender.com/api
```
- [ ] Replace with your actual Render backend URL
- [ ] Must include `/api` at end
- [ ] Must be HTTPS
- [ ] No trailing slash after `/api`

**Examples:**
- ✅ `https://dressify-backend.onrender.com/api`
- ❌ `https://dressify-backend.onrender.com/api/` (trailing slash)
- ❌ `https://dressify-backend.onrender.com` (missing /api)
- ❌ `http://dressify-backend.onrender.com/api` (must be HTTPS)

### How to Set (Vercel Dashboard)

1. Go to https://vercel.com/dashboard
2. Select "dressify" project
3. Click "Settings" tab
4. Go to "Environment Variables"
5. Click "Add"
6. Enter Name (`VITE_API_URL`) and Value
7. Click "Save"
8. You must manually **"Redeploy"** from "Deployments" tab
9. Select latest deployment → Click "Redeploy"
10. Wait for deployment to complete (3-5 minutes)

---

## MongoDB Atlas Configuration

### User Account
- [ ] Username: `dressify_user`
- [ ] Password: (securely stored)
- [ ] Role: Atlas Admin

### Network Access
- [ ] IP Whitelist allows Render region
- [ ] OR "Allow Access from Anywhere" is enabled
- [ ] Status shows green checkmark

### Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER/DATABASE?parameters
```

**Breaking it down:**
- `USERNAME` = `dressify_user`
- `PASSWORD` = Your MongoDB password (no special URL encoding needed usually, but test if issues)
- `CLUSTER` = Your cluster name (e.g., `cluster0.xxxxx.mongodb.net`)
- `DATABASE` = `dressify`
- `?retryWrites=true&w=majority` = Connection parameters (usually default)

### Test Connection Locally

Before setting in production:

```bash
# Windows PowerShell
$env:MONGODB_URI='your_connection_string_here'
node -e "
const { MongoClient } = require('mongodb');
MongoClient.connect(process.env.MONGODB_URI).then(() => {
  console.log('✓ Connection successful');
  process.exit(0);
}).catch(err => {
  console.error('✗ Connection failed:', err.message);
  process.exit(1);
});
"
```

---

## Google OAuth Configuration (Optional)

### Google Cloud Console Setup

1. Project created
2. Google+ API enabled
3. OAuth Client ID created
4. Application URIs configured:

```
Authorized JavaScript Origins:
- https://dressify.vercel.app
- https://dressify-backend.onrender.com

Authorized Redirect URIs:
- https://dressify-backend.onrender.com/api/auth/google
- https://dressify.vercel.app
```

### Client ID Location

Copy from Google Cloud Console → Credentials → OAuth 2.0 Client IDs → Web application

Format: `123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com`

### Set in Render

1. Render Dashboard → dressify-backend
2. Environment Variables → Add
3. Key: `GOOGLE_CLIENT_ID`
4. Value: Your Client ID from Google Cloud
5. Save and service redeploys

---

## Verification Checklist

### Test Backend

```bash
curl https://dressify-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "Server is running",
  "environment": "production"
}
```

### Test Frontend

1. Open https://dressify.vercel.app
2. Should load without errors
3. Check browser console (F12) for errors

### Test API Integration

1. Open DevTools (F12)
2. Go to Network tab
3. Try signup
4. Should see request to `https://dressify-backend.onrender.com/api/auth/signup`
5. Should see 200/201 response

### Test Database

1. Go to MongoDB Atlas Dashboard
2. Collections → Your Database → Users collection
3. Should see your test user after signup

---

## Security Checklist

### Secrets Management

- [ ] JWT_SECRET is NOT "test_secret" or placeholder
- [ ] JWT_SECRET has 32+ characters
- [ ] No hardcoded secrets in code files
- [ ] Never commit `.env` to GitHub (only `.env.example`)
- [ ] MongoDB password is strong (16+ chars)
- [ ] Google Client ID is kept private

### Network Security

- [ ] MongoDB uses IP whitelist (not "allow anywhere" after testing)
- [ ] CORS configured for specific domains only
- [ ] HTTPS enforced everywhere (never HTTP)
- [ ] Rate limiting enabled on API (if configured)

### Data Protection

- [ ] Passwords hashed with bcryptjs in database
- [ ] Tokens expire after 30 days
- [ ] Sensitive data not logged to console in production
- [ ] Database backups enabled (MongoDB Atlas auto-backups)

---

## Common Mistakes to Avoid

❌ **Connection String Issues:**
- `mongodb://db.mongodb.net` ← Wrong (should be `mongodb+srv://`)
- `mongodb+srv://user:pass@cluster0.mongodb.net/` ← Wrong (trailing slash)
- `mongodb+srv://user:pass123!@cluster.mongodb.net` ← Special char issues

✅ **Correct:**
- `mongodb+srv://dressify_user:mypassword@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority`

---

❌ **API URL Issues:**
- `http://dressify-backend.onrender.com/api` ← Wrong (should be HTTPS)
- `https://dressify-backend.onrender.com` ← Wrong (missing `/api`)
- `https://dressify-backend.onrender.com/api/` ← Wrong (trailing slash)

✅ **Correct:**
- `https://dressify-backend.onrender.com/api`

---

❌ **JWT Secret Issues:**
- `jwt_secret` ← Too short
- `your_secret_key` ← Placeholder
- `123456` ← Too simple

✅ **Correct:**
- `sK9$mX2&pQ8@nZ4#vL6!jT1%bC3rU7^wE4(pO2)` ← 40 characters, mixed

---

## Environment Variable Template

### Render Backend (.env)

```env
# Database
MONGODB_URI=mongodb+srv://dressify_user:PASSWORD@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority

# Security
JWT_SECRET=32charMinSecureRandomStingHere1234567890

# Server
PORT=10000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://dressify.vercel.app

# Google OAuth (optional)
GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnop.apps.googleusercontent.com
```

### Vercel Frontend (.env.production)

```env
VITE_API_URL=https://dressify-backend.onrender.com/api
```

---

## What to Do If You Make a Mistake

### Wrong MongoDB Connection String

1. Render Dashboard → dressify-backend → Settings
2. Edit MONGODB_URI
3. Correct the connection string
4. Click Save (auto-redeploys)
5. Check logs to verify connection successful

### Wrong VITE_API_URL

1. Vercel Dashboard → dressify → Settings
2. Edit environment variable
3. Change to correct Render URL
4. Deployments tab → Click latest → "Redeploy"
5. Wait 3-5 mins for new deployment

### Need to Regenerate JWT Secret

1. Generate new random string (32+ chars)
2. Update MONGODB_URI on Render
3. Click Save (service redeploys)
4. All users will need to login again (tokens invalidated)

---

## Support & References

- Render Env Vars: https://render.com/docs/environment-variables
- Vercel Env Vars: https://vercel.com/docs/concepts/projects/environment-variables
- MongoDB Connections: https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/
- JWT Best Practices: https://tools.ietf.org/html/rfc8949

---

**Last Updated:** February 16, 2026
