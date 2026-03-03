#!/bin/bash

echo ""
echo "🏠 LuxeHaven Real Estate App — Setup Script"
echo "============================================"
echo ""

# Check node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js v18+ required. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install server deps
echo "📦 Installing server dependencies..."
cd server
npm install
echo "✅ Server dependencies installed"
echo ""

# Install client deps
echo "📦 Installing client dependencies..."
cd ../client
npm install
echo "✅ Client dependencies installed"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To start the app, open TWO terminal windows:"
echo ""
echo "  Terminal 1 (Backend):"
echo "  ─────────────────────"
echo "  cd server && npm run dev"
echo ""
echo "  Terminal 2 (Frontend):"
echo "  ──────────────────────"
echo "  cd client && npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
