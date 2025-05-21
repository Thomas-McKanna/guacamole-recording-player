#!/bin/bash

# Set variables
IMAGE_NAME="guacamole-recording-player"
CONTAINER_NAME="guacamole-recording-player"
PORT=8080

# Stop and remove existing container if it exists
echo "Cleaning up existing container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Build the image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Run the container
echo "Starting container..."
docker run --name $CONTAINER_NAME -p $PORT:80 $IMAGE_NAME

# Note: The container will run in the foreground and output will be visible
# The URL will be printed when the container starts
echo "Application is available at: http://localhost:$PORT" 