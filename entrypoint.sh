#!/bin/sh
if [ "$NODE_ENV" = "production" ]; then
  echo "Backend: Running in production mode"
  exec node dist/main.js
else
  echo "Backend: Running in development mode"
  npm install
  exec npm run start:dev
fi