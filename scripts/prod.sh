#!/bin/bash

# Production deployment script
# This script starts the application in production mode with Docker

echo "🚀 Starting App in Production Mode"
echo "==================================="

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ Error: .env.production file not found!"
    echo "   Please create .env.production with your production environment variables."
    exit 1
fi

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Error: Docker is not running!"
    echo "   Please start Docker and try again."
    exit 1
fi

echo "📦 Building and starting production container..."
echo "   - Running in optimized production mode"
echo ""

# Start production environment (detached)
docker compose -f docker-compose.prod.yml up --build -d

# Wait for app to be ready
echo "⏳ Waiting for application to be ready..."
sleep 5

# Run database migrations
echo "📜 Applying latest schema with Drizzle..."
npm run db:migrate

echo ""
echo "🎉 Production environment started!"
echo "   Application: http://localhost:3000"
echo ""
echo "Useful commands:"
echo "   View logs:  docker logs -f myapp-app-prod"
echo "   Stop app:   docker compose -f docker-compose.prod.yml down"
