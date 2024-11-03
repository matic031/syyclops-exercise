#!/bin/bash

cd backend || exit

echo "Setting up backend virtual environment and dependencies..."
if ! python3 -m venv .venv; then
    python -m venv .venv
fi

source .venv/bin/activate
pip install "fastapi[standard]" pytest

echo "Starting backend FastAPI server..."
fastapi dev main.py &
BACKEND_PID=$!

cd ../frontend || exit
echo "Installing frontend dependencies..."
npm install

echo "Starting frontend development server..."
npm run start &
FRONTEND_PID=$!

wait $BACKEND_PID
wait $FRONTEND_PID
