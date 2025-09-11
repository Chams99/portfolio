#!/bin/bash

# Chicken Adventure Deployment Script
# Usage: ./deploy.sh [server-username] [server-path]

echo "🐔 Chicken Adventure Deployment Script"
echo "======================================"

# Check if build exists
if [ ! -d "out" ]; then
    echo "❌ Build not found. Running npm run build..."
    npm run build
fi

if [ ! -d "out" ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

echo "✅ Build found in out/ directory"

# Check if server details provided
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: ./deploy.sh [username] [server-path]"
    echo "Example: ./deploy.sh myuser /var/www/html"
    echo ""
    echo "Or set environment variables:"
    echo "export DEPLOY_USER=myuser"
    echo "export DEPLOY_PATH=/var/www/html"
    exit 1
fi

USERNAME=$1
SERVER_PATH=$2

echo "🚀 Deploying to $USERNAME@server:$SERVER_PATH/chicken/"

# Create remote directory
ssh $USERNAME@server "mkdir -p $SERVER_PATH/chicken"

# Upload files
echo "📤 Uploading files..."
scp -r out/* $USERNAME@server:$SERVER_PATH/chicken/

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your game should be available at: https://chames.youssef.tn/chicken"
else
    echo "❌ Deployment failed. Please check your connection and server details."
    exit 1
fi 