#!/bin/bash

# Enable strict error handling
set -euo pipefail

# Configuration
readonly COMPOSE_FILE="compose.yml"
readonly NETWORK_NAME="ndc-network"
readonly PROJECT_NAME="ndc"

# Set current GID/UID in environment variables
APPLICATION_GID=$(id -g)
APPLICATION_UID=$(id -u)
export APPLICATION_GID APPLICATION_UID

# Docker Compose command wrapper
COMPOSE_CMD="docker compose --file ${COMPOSE_FILE} --project-name ${PROJECT_NAME}"

# Function to stop and prune Docker containers
stop_docker() {
  echo "Stopping all running Docker containers..."
  docker ps -q | xargs -r docker stop

  echo "Stopping Docker containers..."
  ${COMPOSE_CMD} down --remove-orphans

  echo "Removing dangling Docker resources..."
  docker container prune -f
  docker network prune -f
  docker builder prune -f
  docker image prune -f
  docker volume prune -f
}

start_docker() {
  # Create the network for the services
  docker network create "$NETWORK_NAME" >/dev/null 2>&1 || true

  # Build images
  echo "Building Docker images..."
  ${COMPOSE_CMD} build \
    --build-arg APPLICATION_GID="${APPLICATION_GID}" \
    --build-arg APPLICATION_UID="${APPLICATION_UID}"

  # Start services
  echo "Starting Docker containers..."
  ${COMPOSE_CMD} up
}

# Check argument
case "${1:-start}" in
"stop")
  stop_docker
  ;;
"restart")
  stop_docker
  start_docker
  ;;
"start" | "")
  start_docker
  ;;
*)
  echo "Usage: bash $0 [start|stop|restart]" >&2
  exit 1
  ;;
esac
