#!/bin/bash

echo "🚀 ATS Checker App Deployment Script"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Build the frontend
echo "📦 Building frontend..."
cd client
npm run build
cd ..

echo "✅ Frontend built successfully"

# Check if build was successful
if [ ! -d "client/build" ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

echo "🎉 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Frontend: Deploy 'client/build' folder to Vercel/Netlify"
echo "2. Backend: Deploy 'server' folder to Railway/Render"
echo "3. Update environment variables with your deployment URLs"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
