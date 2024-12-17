#!/bin/bash

# Usage: ./test-health-endpoints.sh <deployment_environment> <host_type>
DEPLOYMENT_ENVIRONMENT=$1
HOST_TYPE=$2

# Check if the deployment environment and host type are provided
if [[ -z "$DEPLOYMENT_ENVIRONMENT" || -z "$HOST_TYPE" ]]; then
  echo "Usage: $0 <deployment_environment> <host_type>"
  exit 1
fi

# Define the directory for the Express.js REST API
rest_api_dir="./functions/rest-api"

# Define the mappings from host type to URLs for each environment
declare -A live_origins=(
	["local"]="http://localhost:17101"
	["cloud-functions"]="https://us-central1-app-wallot-production.cloudfunctions.net/rest_api"
	["primary"]="https://us-central1-app-wallot-production.cloudfunctions.net/rest_api"
)
declare -A test_origins=(
	["local"]="http://localhost:7101"
	["cloud-functions"]="https://us-central1-app-wallot-staging.cloudfunctions.net/rest_api"
	["primary"]="https://us-central1-app-wallot-staging.cloudfunctions.net/rest_api"
)

# Assign the corresponding URL to the origin
if [[ $DEPLOYMENT_ENVIRONMENT == "live" ]]; then
	origin=${live_origins[$HOST_TYPE]}
else
	origin=${test_origins[$HOST_TYPE]}
fi

# Generate a timestamp in the desired format
timestamp=$(date -u +"%Y%m%dT%H%M%SZ")

echo "Starting REST API smoke tests for origin: $origin"

# Define base directories for logs and create timestamped subdirectories for success and error responses
success_log_dir="./logs/api-smoke-test-logs/$timestamp/success-requests"
mkdir -p "$success_log_dir"

error_log_dir="./logs/api-smoke-test-logs/$timestamp/error-requests"
mkdir -p "$error_log_dir"

# Read the Gmail Notifications secret token from .env file
gmail_notifications_token=$(grep 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY_ID' $rest_api_dir/.env | cut -d '"' -f 2)

# Read the Stripe secret token from .env file
stripe_token=$(grep 'SECRET_CRED_FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY_ID' $rest_api_dir/.env | cut -d '"' -f 2)

# Define the platform name
platform_name="Wallot"

# Read the Smoke Test recipient email from .env file
smoke_test_recipient_email=$(grep 'SECRET_CRED_SMOKE_TEST_RECIPIENT_EMAIL' $rest_api_dir/.env | cut -d '"' -f 2)

# Initialize counters
success_count=0
error_count=0

# Function to execute curl command and direct output based on response status
function check_url {
	echo "Checking $2..."
	response=$(sh -c "$1 -s -o temp_response.json -w \"%{http_code}\"")
	if [[ $response == 2* ]]; then
		mv temp_response.json "$success_log_dir/$2.json"
		echo "Success ✅"
		((success_count++))
	else
		mv temp_response.json "$error_log_dir/$2.json"
		echo "Error ❌"
		((error_count++))
	fi
}

# Execute curl commands for each URL and handle the output
check_url "curl -X 'POST' $origin/v0/health/ok" "health-ok"
check_url "curl -X 'POST' $origin/v0/health/firebase" "health-firebase"
check_url "curl -X 'POST' $origin/v0/health/js-sdk" "health-js-sdk"
check_url "curl -X 'POST' $origin/v0/health/ergonomic" "health-ergonomic"
check_url "curl -X 'POST' -H 'Authorization: Bearer $gmail_notifications_token' -H 'Content-Type: application/json' -d '{\"html_body\":\"<p>This is an automated test notification triggered by one of the $platform_name API smoke tests. If you are reading this, everything is working well.</p>\",\"recipient_email\":\"$smoke_test_recipient_email\",\"subject\":\"[Smoke Test] $platform_name Notification - $timestamp\"}' $origin/v0/health/notifications" "health-notifications"
check_url "curl -X 'POST' -H 'Authorization: Bearer $stripe_token' -H 'Content-Type: application/json' -d '{\"name\":\"[$platform_name Smoke Test] Jenny Rosen\", \"email\":\"jenny.rosen+$timestamp@example.com\"}' $origin/v0/health/stripe-api" "health-stripe-api"
