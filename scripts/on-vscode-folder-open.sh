#!/bin/bash

## Open environment variables, if they are missing or empty (REST API)
([ ! -s functions/rest-api/.env ] && code functions/rest-api/.env || true);
([ ! -s functions/rest-api/gmailApiServiceAccount.json ] && code functions/rest-api/gmailApiServiceAccount.json || true);

## Open environment variables, if they are missing or empty (Webhooks)
([ ! -s functions/webhooks/.env ] && code functions/webhooks/.env || true);
([ ! -s functions/webhooks/gmailApiServiceAccount.json ] && code functions/webhooks/gmailApiServiceAccount.json || true);
