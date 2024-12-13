#!/bin/bash

# Exit on error
set -e

# Usage: ./deploy-firebase-cloud-function.sh <server_name>
SERVER_NAME=$1

if [[ -z "$SERVER_NAME" ]]; then
  echo "Usage: $0 <server_name>"
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
    cd expressjs-servers/${SERVER_NAME} &&
    npm i &&
    echo 'Deployment environment (live or test)' &&
    echo 'SECRET_CRED_DEPLOYMENT_ENVIRONMENT=\"${SECRET_CRED_DEPLOYMENT_ENVIRONMENT}\"' >> .env &&
    echo 'Firebase environment variables' &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_AUTH_URI=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_AUTH_URI}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_EMAIL=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_EMAIL}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_ID=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_ID}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY_ID=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY_ID}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PROJECT_ID=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PROJECT_ID}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_TOKEN_URI=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_TOKEN_URI}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_TYPE=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_TYPE}\"' >> .env &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_UNIVERSE_DOMAIN=\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_UNIVERSE_DOMAIN}\"' >> .env &&
    echo '{\"type\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_TYPE}\",\"project_id\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PROJECT_ID}\",\"private_key_id\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY_ID}\",\"private_key\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY}\",\"client_email\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_EMAIL}\",\"client_id\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_ID}\",\"auth_uri\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_AUTH_URI}\",\"token_uri\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_TOKEN_URI}\",\"auth_provider_x509_cert_url\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL}\",\"client_x509_cert_url\":\"${SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL}\"}' > gmailApiServiceAccount.json &&
    echo 'SECRET_CRED_FIREBASE_ADMIN_STORAGE_BUCKET_NAME=\"${SECRET_CRED_FIREBASE_ADMIN_STORAGE_BUCKET_NAME}\"' >> .env &&
    echo 'Server protocol environment variables' &&
    echo 'SECRET_CRED_SERVER_PROTOCOL=\"https\"' >> .env &&
    echo 'Email notification environment variables' &&
    echo 'SECRET_CRED_SMOKE_TEST_RECIPIENT_EMAIL=\"${SECRET_CRED_SMOKE_TEST_RECIPIENT_EMAIL}\"' >> .env &&
    echo 'Custom environment variables' &&
    echo 'SECRET_CRED_ALPHA_VANTAGE_API_KEY=\"${SECRET_CRED_ALPHA_VANTAGE_API_KEY}\"' >> .env &&
    echo 'SECRET_CRED_ALPACA_API_KEY=\"${SECRET_CRED_ALPACA_API_KEY}\"' >> .env &&
    echo 'SECRET_CRED_ALPACA_API_SECRET=\"${SECRET_CRED_ALPACA_API_SECRET}\"' >> .env &&
    echo 'SECRET_CRED_OPENAI_API_KEY=\"${SECRET_CRED_OPENAI_API_KEY}\"' >> .env &&
    echo 'SECRET_CRED_STRIPE_API_KEY=\"${SECRET_CRED_STRIPE_API_KEY}\"' >> .env &&
    echo 'SECRET_CRED_STRIPE_PREMIUM_LICENSE_PRODUCT_ID=\"${SECRET_CRED_STRIPE_PREMIUM_LICENSE_PRODUCT_ID}\"' >> .env &&
    echo 'SECRET_CRED_STRIPE_PREMIUM_LICENSE_PRODUCT_MONTHLY_PRICE_ID=\"${SECRET_CRED_STRIPE_PREMIUM_LICENSE_PRODUCT_MONTHLY_PRICE_ID}\"' >> .env &&
    cd - &&
    npm run deploy-server --deployment_environment=${SECRET_CRED_DEPLOYMENT_ENVIRONMENT} --server_name=${SERVER_NAME}
  "
