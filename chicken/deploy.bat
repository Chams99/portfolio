@echo off
echo 🐔 Chicken Adventure Deployment Script
echo ======================================

REM Check if build exists
if not exist "out" (
    echo ❌ Build not found. Running npm run build...
    npm run build
)

if not exist "out" (
    echo ❌ Build failed. Please check for errors.
    pause
    exit /b 1
)

echo ✅ Build found in out/ directory

REM Check if server details provided
if "%1"=="" (
    echo Usage: deploy.bat [server-username] [server-path]
    echo Example: deploy.bat myuser /var/www/html
    echo.
    echo Or set environment variables:
    echo set DEPLOY_USER=myuser
    echo set DEPLOY_PATH=/var/www/html
    pause
    exit /b 1
)

set USERNAME=%1
set SERVER_PATH=%2

echo 🚀 Deploying to %USERNAME%@server:%SERVER_PATH%/chicken/

REM Create remote directory
ssh %USERNAME%@server "mkdir -p %SERVER_PATH%/chicken"

REM Upload files
echo 📤 Uploading files...
scp -r out/* %USERNAME%@server:%SERVER_PATH%/chicken/

if %ERRORLEVEL% EQU 0 (
    echo ✅ Deployment successful!
    echo 🌐 Your game should be available at: https://chames.youssef.tn/chicken
) else (
    echo ❌ Deployment failed. Please check your connection and server details.
)

pause 