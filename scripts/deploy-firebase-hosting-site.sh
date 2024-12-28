#!/bin/bash

# Exit on error
set -e

# Usage: ./deploy-firebase-hosting-site.sh <site_name>
SITE_NAME=$1

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
    echo \"${HTTPS_NEXT_PUBLIC_VARIABLES}\" >> ./sites/${SITE_NAME}/.env.local &&
    echo \"${SHARED_HTTPS_NEXT_PUBLIC_VARIABLES}\" >> ./sites/${SITE_NAME}/.env.local &&
    if [ \"${SECRET_CRED_DEPLOYMENT_ENVIRONMENT}\" = \"live\" ]; then
      echo 'NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT=live' >> ./sites/${SITE_NAME}/.env.local;
      mv ./sites/${SITE_NAME}/public/robots.live.txt ./sites/${SITE_NAME}/public/robots.txt;
      rm ./sites/${SITE_NAME}/public/robots.test.txt;
    else
      echo 'NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT=test' >> ./sites/${SITE_NAME}/.env.local;
      mv ./sites/${SITE_NAME}/public/robots.test.txt ./sites/${SITE_NAME}/public/robots.txt
      rm ./sites/${SITE_NAME}/public/robots.live.txt;
    fi &&
    echo \"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PROJECT_ID}\" | while read -n1 char; do echo -n "$char "; done; echo;
    npm run build-site --site_name=${SITE_NAME} --deployment_environment=${SECRET_CRED_DEPLOYMENT_ENVIRONMENT} &&
    npm run deploy-site --site_name=${SITE_NAME} --firebase_site_id=${FIREBASE_SITE_ID} --firebase_project_id=${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PROJECT_ID}
  "
