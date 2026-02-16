# Dressify Backend API

Complete backend for the Dressify outfit customization application with user authentication, data persistence, and Google OAuth integration.

## Features

- ✅ User registration & login with email/password
- ✅ Google OAuth authentication
- ✅ JWT token-based session management
- ✅ User profile management
- ✅ Design saving & retrieval
- ✅ MongoDB database persistence
- ✅ CORS enabled for frontend integration

## Prerequisites

- Node.js 16+ (installed ✓)
- MongoDB (local or cloud)
- npm or yarn

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup MongoDB

#### Option A: Local MongoDB (Windows)

**Download & Install:**
1. Visit https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Run the installer and follow the setup wizard
4. MongoDB will run as a Windows service by default

**Start MongoDB:**
```bash
# Windows - MongoDB runs as a service automatically
# Or manually start:
mongod
```

**Create Database:**
```bash
# MongoDB will auto-create the database on first connection
# Just run the backend, it will create 'dressify' database
```

#### Option B: MongoDB Cloud (Recommended)

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/dressify?retryWrites=true&w=majority`
4. Update `.env` file with your connection string

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
MONGODB_URI=mongodb://localhost:27017/dressify
JWT_SECRET=your_secret_key_here
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Setup Google OAuth

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:8080`
   - `http://localhost:5173`
6. Copy your Client ID to `.env`

## Running the Backend

### Development Mode

```bash
npm run dev
```

Output:
```
✓ Backend server running on http://localhost:5000
✓ Connected to MongoDB
```

### Production Mode

```bash
npm start
```

## API Endpoints

### Authentication

**Sign Up**
- `POST /api/auth/signup`
- Body: `{ name, email, password }`
- Returns: `{ success, token, user }`

**Login**
- `POST /api/auth/login`
- Body: `{ email, password }`
- Returns: `{ success, token, user }`

**Google OAuth**
- `POST /api/auth/google`
- Body: `{ googleToken }`
- Returns: `{ success, token, user }`

**Verify Token**
- `POST /api/auth/verify`
- Body: `{ token }`
- Returns: `{ success, user }`

### User Profile

**Get Profile** (Requires Auth)
- `GET /api/users/profile`
- Headers: `Authorization: Bearer {token}`
- Returns: `{ success, user }`

**Update Profile** (Requires Auth)
- `PUT /api/users/profile`
- Headers: `Authorization: Bearer {token}`
- Body: `{ name, picture }`
- Returns: `{ success, message }`

### Designs

**Save Design** (Requires Auth)
- `POST /api/users/save-design`
- Headers: `Authorization: Bearer {token}`
- Body: `{ designData, name }`
- Returns: `{ success, message, designId }`

**Get Saved Designs** (Requires Auth)
- `GET /api/users/saved-designs`
- Headers: `Authorization: Bearer {token}`
- Returns: `{ success, designs }`

## Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  googleId: String,
  picture: String,
  authProvider: String ("email" | "google"),
  createdAt: Date,
  updatedAt: Date
}
```

### Saved Designs Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  name: String,
  designData: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB credentials (if cloud)

### CORS Error
- Check `cors()` configuration in `server.js`
- Ensure frontend URL is in allowed origins

### Token Expired
- Token expires after 30 days (configurable in `middleware/auth.js`)
- User needs to login again to get new token

### Google OAuth Issues
- Verify Google Client ID is correct
- Check authorized redirect URIs in Google Cloud Console
- Token must be ID token, not access token

## Deployment

### Heroku
```bash
heroku login
heroku create dressify-backend
git push heroku main
```

### Environment Variables on Heroku
```bash
heroku config:set MONGODB_URI=your_mongoDB_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set GOOGLE_CLIENT_ID=your_client_id
```

## Security Notes

- ⚠️ Change `JWT_SECRET` in production
- ⚠️ Use MongoDB Cloud with strong credentials
- ⚠️ Enable HTTPS in production
- ⚠️ Set secure cookie flags
- ⚠️ Rate limit API endpoints
- ⚠️ Validate all input data

## Support

For issues or questions, check:
- MongoDB docs: https://docs.mongodb.com/
- Express docs: https://expressjs.com/
- Google OAuth: https://developers.google.com/identity
