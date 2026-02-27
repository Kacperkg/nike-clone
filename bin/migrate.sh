#!/bin/bash

cd backend

if [ -d "venv" ]; then
    source venv/bin/activate
fi

python manage.py makemigrations
python manage.py migrate
