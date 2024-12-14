# REST API

## Overview

This project is a REST API that provides a set of functions that can be used to interact with various third-party services. The API is built using Express.js and is designed to be deployed as a serverless function on Google Cloud Functions.

## Status

| Function Name                                  | Path                                                                                | Implemented? | Documented? | Tested? |
| ---------------------------------------------- | ----------------------------------------------------------------------------------- | ------------ | ----------- | ------- |
| createUserFunction                             | ./app/wallot/users/createUserFunction.js                                            | ❌           | ❌          | ❌      |
| createAlpacaAccountFunction                    | ./app/alpaca/accounts/createAlpacaAccountFunction.js                                | ❌           | ❌          | ❌      |
| createAlpacaAchRelationshipFunction            | ./app/alpaca/achRelationships/createAlpacaAchRelationshipFunction.js                | ❌           | ❌          | ❌      |
| createAlpacaAchTransferFunction                | ./app/alpaca/achTransfers/createAlpacaAchTransferFunction.js                        | ❌           | ❌          | ❌      |
| createAlpacaOrderFunction                      | ./app/alpaca/orders/createAlpacaOrderFunction.js                                    | ❌           | ❌          | ❌      |
| createFirebaseAuthCustomTokenFunction          | ./app/firebase/auth/createFirebaseAuthCustomTokenFunction.js                        | ✅           | ✅          | ✅      |
| attachStripePaymentMethodFunction              | ./app/stripe/paymentMethods/attachStripePaymentMethodFunction.js                    | ❌           | ❌          | ❌      |
| createStripeFinancialConnectionSessionFunction | ./app/stripe/financialConnections/createStripeFinancialConnectionSessionFunction.js | ❌           | ❌          | ❌      |
| createStripeSubscriptionFunction               | ./app/stripe/subscriptions/createStripeSubscriptionFunction.js                      | ❌           | ❌          | ❌      |
