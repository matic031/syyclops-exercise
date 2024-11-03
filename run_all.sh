#!/bin/bash

cd backend || exit

cp .env.example .env

echo "Setting up backend virtual environment and dependencies..."
if ! python3 -m venv .venv; then
    python -m venv .venv
fi

source .venv/bin/activate
pip install "fastapi[standard]" pytest
pip install fastapi-cors
pip install python-dotenv

echo "Starting backend FastAPI server..."
fastapi dev main.py &
BACKEND_PID=$!

cd ../frontend || exit
cp .env.example .env
echo "Installing frontend dependencies..."
npm install

echo "Starting frontend development server..."
npm run start &
FRONTEND_PID=$!

wait $BACKEND_PID
wait $FRONTEND_PID
