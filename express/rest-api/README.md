<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [REST API](#rest-api)
  - [Overview](#overview)
  - [Status](#status)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# REST API

## Overview

This project is a REST API that provides a set of functions that can be used to interact with various third-party services. The API is built using Express.js and is designed to be deployed as a serverless function on Google Cloud Functions.

## Status

| Service  | Function Name                          | Implemented? | Documented? | Tested? |
| -------- | -------------------------------------- | ------------ | ----------- | ------- |
| Wallot   | createUser                             | ❌           | ❌          | ❌      |
| Alpaca   | createAlpacaAccount                    | ❌           | ❌          | ❌      |
| Alpaca   | createAlpacaAchRelationship            | ❌           | ❌          | ❌      |
| Alpaca   | createAlpacaOrder                      | ❌           | ❌          | ❌      |
| Alpaca   | requestAlpacaAchTransfer               | ❌           | ❌          | ❌      |
| Firebase | createFirebaseAuthCustomToken          | ✅           | ✅          | ✅      |
| Stripe   | createStripeCustomer                   | ❌           | ❌          | ❌      |
| Stripe   | attachStripePaymentMethod              | ❌           | ❌          | ❌      |
| Stripe   | createStripeFinancialConnectionSession | ❌           | ❌          | ❌      |
| Stripe   | createStripeSubscription               | ❌           | ❌          | ❌      |
