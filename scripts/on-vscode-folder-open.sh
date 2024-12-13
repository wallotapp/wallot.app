#!/bin/bash

## Open environment variables, if they are missing or empty (REST API)
([ ! -s expressjs-servers/rest-api/.env ] && code expressjs-servers/rest-api/.env || true);
([ ! -s expressjs-servers/rest-api/gmailApiServiceAccount.json ] && code expressjs-servers/rest-api/gmailApiServiceAccount.json || true);

