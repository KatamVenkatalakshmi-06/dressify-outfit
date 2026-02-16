# Dressify - Complete Setup Guide

## Project Structure

```
dressify-outfit/
├── src/                    # Frontend React app
│   ├── pages/
│   │   ├── Auth.tsx       # Login/Signup with Google OAuth
│   │   ├── Home.tsx
│   │   └── ...
│   ├── services/
│   │   └── api.ts         # API endpoints
│   ├── contexts/
│   │   └── AppContext.tsx # User state management
│   └── ...
├── backend/               # Node.js/Express API
│   ├── routes/
│   │   ├── auth.js        # Authentication endpoints
│   │   └── users.js       # User profile endpoints
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── middleware/
│   │   └── auth.js        # JWT authentication
│   ├── server.js          # Express server
│   ├── package.json
│   ├── .env               # Environment variables
│   └── README.md
└── package.json
```

## Step 1: Frontend Setup

Frontend is already setup! Just run the dev server.

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Setup MongoDB

**Option A: Local MongoDB**
1. Download from https://www.mongodb.com/try/download/community
2. Install and run MongoDB
3. Connection string: `mongodb://localhost:27017/dressify`

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dressify?retryWrites=true&w=majority`

### 2.4 Configure Environment Variables

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/dressify  # or your cloud URI
JWT_SECRET=your_secret_key_here
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id
```

### 2.5 Setup Google OAuth (Important!)

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:8080`
   - `http://localhost:5173`
7. Copy "Client ID" to `backend/.env` → `GOOGLE_CLIENT_ID=`

### 2.6 Start Backend Server
```bash
npm run dev
```

You should see:
```
✓ Backend server running on http://localhost:5000
✓ Connected to MongoDB
```

## Step 3: Update Frontend Configuration

Edit `src/pages/Auth.tsx` and replace:
```typescript
const client_id = "YOUR_GOOGLE_CLIENT_ID_HERE"
```

With your actual Google Client ID from Google Cloud Console.

## Step 4: Run Both Servers

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

### Terminal 2: Frontend
```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

## Features Now Available

✅ **Email/Password Authentication**
- Sign Up: Create new account with email and password
- Login: Sign in with existing account
- Password hashing with bcryptjs

✅ **Google OAuth Integration**
- One-click Google Sign-In
- Auto-creates user from Google profile
- Links Google account to existing email

✅ **User Data Persistence**
- User profiles saved to MongoDB
- User preferences stored
- Design history saved

✅ **API Endpoints**
- Authentication endpoints
- User profile management
- Design saving and retrieval
- JWT token validation

## Testing the Application

### 1. Test Email Registration
- Go to http://localhost:8080
- Enter Name, Email, Password
- Click "Sign Up"
- Check backend console for confirmation

### 2. Test Email Login
- Go to http://localhost:8080
- Switch to "Sign In" mode
- Enter Email and Password
- Click "Sign In"

### 3. Test Google OAuth
- Click "Continue with Google"
- You'll be redirected to Google login
- After authentication, user is created/logged in

### 4. Verify Backend
```bash
# Health check
curl http://localhost:5000/api/health

# Get a user's profile (replace TOKEN with actual token)
curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/users/profile
```

## Important Notes

⚠️ **Google Client ID**
- Must update `GOOGLE_CLIENT_ID` in backend `.env`
- Must update the same Client ID in frontend
- Without this, Google OAuth won't work

⚠️ **MongoDB**
- Ensure MongoDB is running (local or Atlas)
- First request will auto-create the database
- Users are stored with unique email constraint

⚠️ **Tokens**
- JWT tokens expire after 30 days
- Stored in localStorage on frontend
- Sent to backend with every authenticated request

⚠️ **CORS**
- Backend allows requests from:
  - http://localhost:8080 (frontend)
  - http://localhost:5173 (Vite dev)
  - http://192.168.1.2:8080 (LAN)

## Stopping Servers

Press `Ctrl+C` in each terminal to stop the servers.

## Next Steps

1. ✅ Frontend running
2. ✅ Backend setup
3. ✅ Google OAuth configured
4. 📝 Go to http://localhost:8080 and test!

## Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB is running
- Verify connection string in `.env`
- Check credentials if using Atlas

### "Google login not working"
- Verify GOOGLE_CLIENT_ID is set in `.env`
- Check Client ID is in Google Cloud Console
- Ensure redirect URIs are correct in Google Console

### "Token validation failed"
- Clear localStorage in browser DevTools
- Login again to get new token
- Check JWT_SECRET matches in backend

### "CORS error"
- Ensure backend is running
- Check frontend URL is in cors() whitelist

## Support & Resources

- MongoDB: https://docs.mongodb.com/
- Express: https://expressjs.com/
- Google OAuth: https://developers.google.com/identity
- JWT: https://jwt.io/
- React: https://react.dev/
