#!/bin/bash

## Open environment variables, if they are missing or empty (REST API)
([ ! -s express/rest-api/.env ] && code express/rest-api/.env || true);
([ ! -s express/rest-api/gmailApiServiceAccount.json ] && code express/rest-api/gmailApiServiceAccount.json || true);

