#!/bin/bash
# NovaSathi Landing Page — Development Startup Script

echo "🌟 Starting NovaSathi Landing Page Development Servers..."
echo ""

# Start backend
echo "🚀 Starting Backend (Express + MongoDB) on port 5001..."
cd server && npm run dev &
BACKEND_PID=$!

sleep 2

# Start frontend
echo "⚡ Starting Frontend (React + Vite) on port 5173..."
cd ../client && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers started!"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5001"
echo "   API Docs: http://localhost:5001/api/health"
echo ""
echo "Press Ctrl+C to stop both servers."

# Wait for both
wait $BACKEND_PID $FRONTEND_PID
