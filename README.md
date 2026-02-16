# ✦ Dressify - Outfit Customization Platform

A full-stack web application for designing and customizing outfits with backend user authentication, data persistence, and Google OAuth integration.

## 🎯 Features

### Frontend
- 👗 Interactive outfit designer with customizable components
- 🎨 Color and pattern customization
- 💾 Save and manage multiple designs
- 📱 Responsive design

### Backend
# ✦ Dressify - Outfit Customization Platform

A full-stack web application for designing and customizing outfits with backend user authentication, data persistence, and Google OAuth integration.

## 🎯 Features

### Frontend
- 👗 Interactive outfit designer with customizable components
- 🎨 Color and pattern customization
- 💾 Save and manage multiple designs
- 📱 Responsive design

### Backend
- ✅ User authentication (Email/Password + Google OAuth)
- 🔐 JWT token-based sessions
- 💿 MongoDB data persistence
- 👤 User profile management

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
cd backend && npm install && cd ..
```

### 2. Setup MongoDB & Google OAuth
See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions

### 3. Configure Environment
Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/dressify
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_client_id
```

### 4. Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

### 5. Start Frontend (Terminal 2)
```bash
npm run dev
```

### 6. Open Browser
Navigate to: **http://localhost:8080**

## 📁 Project Structure

```
dressify-outfit/
├── src/                     # React Frontend
│   ├── pages/Auth.tsx      # Login/Signup with OAuth
│   ├── services/api.ts     # Backend API integration
│   ├── contexts/           # State management
│   └── ...
├── backend/                # Node.js/Express API
│   ├── routes/auth.js      # Authentication endpoints
│   ├── routes/users.js     # User management endpoints
│   ├── config/db.js        # MongoDB connection
│   ├── server.js           # Express server
│   └── .env                # Configuration
├── SETUP_GUIDE.md          # Detailed setup guide
├── setup.bat               # Windows auto-setup
└── README.md               # This file
```

## 🔌 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google` | Google OAuth login |
| GET | `/api/users/profile` | Get user profile (Auth) |
| POST | `/api/users/save-design` | Save design (Auth) |

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express, MongoDB, JWT
- **Auth:** Email/Password + Google OAuth 2.0

## 📚 Documentation

- [Full Setup Guide](./SETUP_GUIDE.md) - Step-by-step instructions
- [Backend Documentation](./backend/README.md) - API details
- [Troubleshooting Guide](./SETUP_GUIDE.md#troubleshooting) - Common issues

## ⚙️ Requirements

- Node.js 16+
- MongoDB (local or Atlas cloud)
- Google Cloud Console account (for OAuth)

## 🚦 Status

✅ Frontend: Ready
✅ Backend: Ready  
✅ Database: Configurable
✅ Authentication: Email + Google OAuth
✅ User Data Persistence: MongoDB

## 📖 Getting Started

1. Run `setup.bat` (Windows) or follow [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Configure MongoDB connection
3. Setup Google OAuth credentials
4. Start backend and frontend
5. Visit http://localhost:8080

---

Made with ❤️ for outfit customization

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
