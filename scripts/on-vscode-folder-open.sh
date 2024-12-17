#!/bin/bash

## Open environment variables, if they are missing or empty (REST API)
([ ! -s functions/rest-api/.env ] && code functions/rest-api/.env || true);
([ ! -s functions/rest-api/gmailApiServiceAccount.json ] && code functions/rest-api/gmailApiServiceAccount.json || true);

