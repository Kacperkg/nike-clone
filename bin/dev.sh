#!/bin/bash

set -e

echo "🚀 Starting development environment..."

PROJECT_ROOT=$(dirname "$(dirname "$(realpath "$0")")")

############################################
# Cleanup old dev processes
############################################

echo "🧹 Cleaning existing dev servers..."

pkill -f "manage.py runserver" || true
pkill -f "pnpm dev" || true

############################################
# Start database
############################################

echo "🐳 Starting Docker database..."

cd "$PROJECT_ROOT"
docker compose up -d

echo "⏳ Waiting for PostgreSQL..."

# Wait until postgres is ready
until docker compose exec -T db pg_isready -U postgres > /dev/null 2>&1; do
    sleep 1
done

echo "✅ Database ready!"

############################################
# Start backend
############################################

echo "🐍 Starting Django backend..."

cd "$PROJECT_ROOT/backend"

if [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
else
    echo "⚠️ Virtual environment not found!"
fi

python manage.py migrate --noinput

python manage.py runserver 127.0.0.1:8000 &

############################################
# Start frontend
############################################

echo "⚡ Starting frontend..."

cd "$PROJECT_ROOT/frontend"

pnpm dev --port 3000 &

############################################

echo "✅ Development servers started!"
echo ""
echo "Backend → http://127.0.0.1:8000"
echo "Frontend → http://localhost:3000"
echo ""

wait
