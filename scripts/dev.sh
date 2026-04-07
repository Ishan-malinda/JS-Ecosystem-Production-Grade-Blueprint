#!/bin/bash

# Development startup script
# This script starts the application in development mode with Docker

echo "🚀 Starting App in Development Mode"
echo "===================================="

# Check if .env.development exists
if [ ! -f .env.development ]; then
    echo "❌ Error: .env.development file not found!"
    echo "   Please copy .env.example to .env.development and update with your credentials."
    echo "   Run: cp .env.example .env.development"
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "   Please start Docker Desktop and try again."
    exit 1
fi

echo "📦 Building and starting development containers..."
echo "   - PostgreSQL database will start first"
echo "   - Application will run with hot reload enabled"
echo ""

# Start development environment
docker compose -f docker-compose.dev.yml up --build

echo ""
echo "🎉 Development environment started!"
echo "   Application: http://localhost:3000"
echo "   Database: postgres://dev:devpassword@localhost:5432/myapp_dev"
echo ""
echo "To stop the environment, press Ctrl+C or run: docker compose -f docker-compose.dev.yml down"
