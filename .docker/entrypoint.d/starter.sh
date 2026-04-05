#!/bin/bash

# Enable strict error handling
set -euo pipefail

# Navigate to project directory
cd /app/codebase || exit 1

echo "Installing dependencies..."
bun install --frozen-lockfile

echo "Starting the application..."
exec "$@"
