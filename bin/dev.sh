#!/bin/bash

echo "🚀 Starting development environment..."

PROJECT_ROOT=$(dirname "$(dirname "$(realpath "$0")")")

# Start database
echo "🐳 Starting Docker database..."
cd "$PROJECT_ROOT"
docker compose up -d

# Start backend
echo "🐍 Starting Django backend..."
cd "$PROJECT_ROOT/backend"

if [ -d "venv" ]; then
    source venv/bin/activate
fi

python manage.py runserver &

# Start frontend
echo "⚡ Starting frontend..."
cd "$PROJECT_ROOT/frontend"

pnpm dev &

echo "✅ Development servers started!"
echo "Backend → http://127.0.0.1:8000"
echo "Frontend → http://localhost:3000"
