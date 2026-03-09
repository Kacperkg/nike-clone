#!/bin/bash

set -e

echo "🛑 Stopping development environment..."

PROJECT_ROOT=$(dirname "$(dirname "$(realpath "$0")")")

############################################
# Stop frontend & backend
############################################

echo "🔌 Stopping dev servers..."

pkill -f "manage.py runserver" || true
pkill -f "pnpm dev" || true

############################################
# Stop Docker services
############################################

echo "🐳 Stopping Docker containers..."

cd "$PROJECT_ROOT"
docker compose down

############################################

echo "✅ Development environment stopped!"
