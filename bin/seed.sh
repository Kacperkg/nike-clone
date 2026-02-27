#!/bin/bash
# Seed the database with sample Nike products
# Usage:  bash bin/seed.sh         — add products (skip duplicates)
#         bash bin/seed.sh --clear  — wipe existing products first

cd backend

if [ -d "venv" ]; then
    source venv/bin/activate
fi

python manage.py seed_products "$@"
