#!/bin/bash

# Login to the app container
docker compose --file ducker-compose.yml exec --user node npm-dev-server bash
