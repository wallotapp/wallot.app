#!/bin/bash

## Install project dependencies
npm install;

## Format the project (This command normalizes line endings, which is especially important on Windows.)
npm run format && git add .;

## Install React native dependencies
# None

## Install firebase-tools globally
(command -v npm >/dev/null && npm ls --global | grep -q firebase-tools) || npm i --global firebase-tools;

## Install symmetric-tools globally
(command -v npm >/dev/null && npm ls --global | grep -q symmetric-tools) || npm i --global symmetric-tools;
