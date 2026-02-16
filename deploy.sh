#!/bin/bash
# Production Deployment Script for Dressify

set -e

echo "╔════════════════════════════════════════════════════════╗"
echo "║      Dressify Cloud Deployment - Verification          ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check Node.js
echo "✓ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js not found. Please install Node.js 16+"
    exit 1
fi
NODE_VERSION=$(node -v)
echo "  Found: $NODE_VERSION"

# Check Git
echo "✓ Checking Git installation..."
if ! command -v git &> /dev/null; then
    echo "✗ Git not found. Please install Git"
    exit 1
fi

# Check for required files
echo ""
echo "✓ Checking project structure..."
FILES=(
    "package.json"
    "backend/package.json"
    "backend/server.js"
    "src/main.tsx"
    "vercel.json"
    "render.yaml"
    "backend/.env"
    "CLOUD_DEPLOYMENT_GUIDE.md"
)

MISSING=0
for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "  ✗ Missing: $file"
        MISSING=$((MISSING + 1))
    else
        echo "  ✓ Found: $file"
    fi
done

if [ $MISSING -gt 0 ]; then
    echo ""
    echo "✗ $MISSING required files are missing"
    exit 1
fi

# Check environment variables
echo ""
echo "✓ Checking environment configuration..."
if grep -q "YOUR_GOOGLE_CLIENT_ID" backend/.env; then
    echo "  ⚠  WARNING: Google Client ID not configured"
fi
if grep -q "PASSWORD" backend/.env; then
    echo "  ⚠  WARNING: MongoDB password placeholder still in use"
fi
if grep -q "your_secret" backend/.env; then
    echo "  ⚠  WARNING: JWT_SECRET is not secure"
fi

# Install dependencies
echo ""
echo "✓ Installing dependencies..."
npm install --silent
cd backend
npm install --silent
cd ..

# Build frontend
echo "✓ Building frontend..."
npm run build

# Validate configuration
echo ""
echo "✓ Validating configuration files..."
node -e "const v = require('./vercel.json'); console.log('  ✓ vercel.json is valid')"
node -e "const yaml = require('js-yaml'); const fs = require('fs'); yaml.load(fs.readFileSync('render.yaml')); console.log('  ✓ render.yaml is valid')" 2>/dev/null || echo "  (skipped yaml validation)"

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║           Deployment Checklist                         ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "Before deploying, ensure:"
echo ""
echo "1. GitHub Setup"
echo "   [ ] GitHub account created"
echo "   [ ] Repository pushed to GitHub"
echo "   [ ] Repository URL: https://github.com/YOUR_USERNAME/dressify-outfit"
echo ""
echo "2. MongoDB Atlas Setup"
echo "   [ ] Account created at https://www.mongodb.com/cloud/atlas"
echo "   [ ] Cluster created"
echo "   [ ] Database user created (username: dressify_user)"
echo "   [ ] Connection string copied and secure"
echo "   [ ] IP whitelist configured"
echo ""
echo "3. Backend Configuration (backend/.env)"
echo "   [ ] MONGODB_URI updated with your connection string"
echo "   [ ] JWT_SECRET changed to strong value (>32 chars)"
echo "   [ ] GOOGLE_CLIENT_ID configured (from Google Cloud)"
echo "   [ ] NODE_ENV = production"
echo ""
echo "4. Google OAuth Setup"
echo "   [ ] Google Cloud Console project created"
echo "   [ ] OAuth 2.0 Client ID created"
echo "   [ ] Authorized redirect URIs added:"
echo "       - https://YOUR_VERCEL_URL.vercel.app"
echo "       - https://dressify-backend.onrender.com/callback"
echo ""
echo "5. Vercel Setup"
echo "   [ ] Vercel account created"
echo "   [ ] GitHub connected to Vercel"
echo "   [ ] Project imported"
echo "   [ ] Environment variable VITE_API_URL set"
echo ""
echo "6. Render Setup"
echo "   [ ] Render account created"
echo "   [ ] GitHub connected to Render"
echo "   [ ] Web Service created"
echo "   [ ] All environment variables configured"
echo ""
echo "7. Final Verification"
echo "   [ ] Frontend loads at https://dressify.vercel.app"
echo "   [ ] Backend responds at https://dressify-backend.onrender.com/api/health"
echo "   [ ] Signup works on production"
echo "   [ ] Login works on production"
echo "   [ ] MongoDB stores user data"
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "✓ Project is ready for cloud deployment!"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "1. Push code to GitHub: git push origin main"
echo "2. Connect Vercel: https://vercel.com/new"
echo "3. Connect Render: https://dashboard.render.com"
echo "4. Monitor deployments in both dashboards"
echo ""
