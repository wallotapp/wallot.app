#!/bin/bash

## Open smoke test environment variables, if they are missing or empty
([ ! -s smoke-tests/.env ] && code smoke-tests/.env || true);

## Open environment variables, if they are missing or empty (REST API)
([ ! -s expressjs-servers/rest-api/.env ] && code expressjs-servers/rest-api/.env || true);
([ ! -s expressjs-servers/rest-api/gmailApiServiceAccount.json ] && code expressjs-servers/rest-api/gmailApiServiceAccount.json || true);

