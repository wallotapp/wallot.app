#!/bin/bash

# Exit on error
set -e

# Usage: ./deploy-firebase-hosting-site.sh <web_app_name> <firebase_site_id>
WEB_APP_NAME=$1
FIREBASE_SITE_ID=$2

if [[ -z "$WEB_APP_NAME" ]]; then
  echo "Usage: $0 <web_app_name>"
  exit 1
fi

# Run Docker container to deploy the function
docker run --rm \
  -v "${GITHUB_WORKSPACE:-$(pwd)}:/usr/src/app" \
  -w "/usr/src/app" \
  -e FIREBASE_TOKEN \
  monorepo-image \
  /bin/bash -c "
    npm ci &&
    npm run build &&
    cd ~ &&
    npm install -g firebase-tools@13.0.2 &&
    cd - &&
    npm run build-web-app --web_app_name=${WEB_APP_NAME} --deployment_environment=${SECRET_CRED_DEPLOYMENT_ENVIRONMENT} &&
    npm run deploy-web-app --web_app_name=${WEB_APP_NAME} --firebase_site_id=${FIREBASE_SITE_ID} --firebase_project_id=${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PROJECT_ID}
  "
