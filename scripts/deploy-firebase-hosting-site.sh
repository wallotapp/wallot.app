#!/bin/bash

# Exit on error
set -e

# Usage: ./deploy-firebase-hosting-site.sh <site_name> <firebase_site_id>
SITE_NAME=$1
FIREBASE_SITE_ID=$2

if [[ -z "$SITE_NAME" ]]; then
  echo "Usage: $0 <site_name>"
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
    npm run build-site --site_name=${SITE_NAME} --deployment_environment=${SECRET_CRED_DEPLOYMENT_ENVIRONMENT} &&
    npm run deploy-site --site_name=${SITE_NAME} --firebase_site_id=${FIREBASE_SITE_ID} --firebase_project_id=${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PROJECT_ID}
  "
