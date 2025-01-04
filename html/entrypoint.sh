#!/bin/bash

# Exit on error
set -e

# Change to the app directory
cd /app

# Install dependencies
npm install

# Start the app
npm run dev
