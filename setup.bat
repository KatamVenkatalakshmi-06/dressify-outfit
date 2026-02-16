@echo off
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║         Dressify - Backend & Frontend Starter          ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Node.js is not installed!
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed

REM Check if MongoDB is running (attempt connection)
echo.
echo Checking MongoDB connection...
timeout /t 2 /nobreak >nul

REM Navigate to backend
cd /d "%~dp0backend" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Could not navigate to backend directory
    echo.
    pause
    exit /b 1
)

REM Install backend dependencies
echo.
echo ═══════════════════════════════════════════════════════════
echo  Installing Backend Dependencies...
echo ═══════════════════════════════════════════════════════════
npm install

if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to install backend dependencies
    pause
    exit /b 1
)

REM Check for .env file
if not exist ".env" (
    echo.
    echo ⚠  WARNING: backend\.env file not found!
    echo    Copy backend\.env.example to backend\.env
    echo    Edit backend\.env with your MongoDB URI and Google Client ID
    echo.
    copy ".env.example" ".env" >nul
    echo    Created .env from template. Please edit it!
    echo.
)

REM Go back to root
cd /d "%~dp0"

REM Install frontend dependencies
echo.
echo ═══════════════════════════════════════════════════════════
echo  Installing Frontend Dependencies...
echo ═══════════════════════════════════════════════════════════
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ✗ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo ═══════════════════════════════════════════════════════════
echo ✓ Installation Complete!
echo ═══════════════════════════════════════════════════════════
echo.
echo Next Steps:
echo.
echo 1. IMPORTANT: Setup MongoDB
echo    Option A: Download from https://www.mongodb.com/try/download/community
echo    Option B: Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
echo.
echo 2. Configure Environment Variables
echo    Edit: backend\.env
echo    Required:
echo      - MONGODB_URI (your database connection string)
echo      - GOOGLE_CLIENT_ID (from Google Cloud Console)
echo.
echo 3. Setup Google OAuth
echo    - Go to: https://console.cloud.google.com/
echo    - Create a new project
echo    - Enable Google+ API
echo    - Create OAuth 2.0 credentials (Web application)
echo    - Add authorized redirect URIs:
echo        * http://localhost:8080
echo        * http://localhost:5173
echo    - Copy Client ID to backend\.env
echo.
echo 4. Start the Backend
echo    - Open Command Prompt in: backend\
echo    - Run: npm run dev
echo.
echo 5. Start the Frontend
echo    - Open Command Prompt in: dressify-outfit\
echo    - Run: npm run dev
echo.
echo 6. Open Browser
echo    - Navigate to: http://localhost:8080
echo.
echo ═══════════════════════════════════════════════════════════
echo.
pause
