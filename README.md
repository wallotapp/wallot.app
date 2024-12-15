<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Wallot](#wallot)
  - [Testing the APIs:](#testing-the-apis)
    - [REST API](#rest-api)
  - [Architecture:](#architecture)
  - [User Experience:](#user-experience)
  - [Key Terms:](#key-terms)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Wallot

## Testing the APIs:

### REST API

```
bash expressjs-servers/rest-api/smoke-tests/test-health-endpoints.sh test local
bash expressjs-servers/rest-api/smoke-tests/test-health-endpoints.sh test cloud-functions
bash expressjs-servers/rest-api/smoke-tests/test-health-endpoints.sh test primary
```

## Architecture:

```mermaid
erDiagram
	%% Mirror Relationships
	ACH_TRANSFER ||--|| ALPACA_ACH_TRANSFER : "mirrors"
	BANK_ACCOUNT ||--|| ALPACA_ACH_RELATIONSHIP : "mirrors"
	BANK_ACCOUNT ||--|| STRIPE_FINANCIAL_CONNECTION_ACCOUNT : "mirrors"
	INVOICE ||--|| STRIPE_INVOICE : "mirrors"
	MODEL ||--|| OPEN_AI_MODEL : "mirrors"
	MODEL_FAMILY ||--|| OPEN_AI_MODEL_FAMILY : "mirrors"
	LICENSE ||--|| STRIPE_SUBSCRIPTION : "mirrors"
	PAYMENT_METHOD ||--|| STRIPE_PAYMENT_METHOD : "mirrors"
	POSITION ||--|| ALPACA_POSITION : "mirrors"
	RECOMMENDATION ||--|| OPEN_AI_RECOMMENDATION : "mirrors"
	STOCK ||--|| ALPACA_ASSET : "mirrors"
	STOCK ||--|| ALPHA_VANTAGE_COMPANY : "mirrors"
	STOCK_ORDER ||--|| ALPACA_ORDER : "mirrors"
	USER ||--|| ALPACA_ACCOUNT : "mirrors"
	USER ||--|| STRIPE_CUSTOMER : "mirrors"

	%% Ownership Relationships
	EQUITY_ACCOUNT ||--o{ BANK_ACCOUNT : "owns"
	EQUITY_ACCOUNT ||--o{ POSITION : "owns"
	LICENSE ||--o{ INVOICE : "owns"
	MODEL_FAMILY ||--o{ MODEL : "owns"
	ORDER ||--o{ STOCK_ORDER : "owns"
	USER ||--|| AUTH_CREDENTIAL : "owns"
	USER ||--|| EQUITY_ACCOUNT : "owns"
	USER ||--o{ ORDER : "owns"
	USER ||--|| LICENSE : "owns"
	USER ||--o{ PAYMENT_METHOD : "owns"

	%% Production Relationships
	MODEL ||--o{ FORECAST : "produces"
	MODEL ||--o{ RECOMMENDATION : "produces"
	RECOMMENDATION }o--o{ STOCK_ORDER : "factors_into"
	STRIPE_FINANCIAL_CONNECTION_SESSION ||--o{ STRIPE_FINANCIAL_CONNECTION_ACCOUNT : "produces"

	%% Similarity Relationships
	MODEL_FAMILY }o--o{ USER_PERSONA : "caters_to"
	RECOMMENDATION }o--o{ USER_PERSONA : "caters_to"
	USER ||--|{ USER_PERSONA : "fits"

	%% Computation Relationships
	BANK_ACCOUNT ||--o{ ACH_TRANSFER : "is_computed_as_the_result_of"
	POSITION ||--o{ STOCK_ORDER : "is_computed_as_the_result_of"
	RECOMMENDATION }|--|{ FORECAST : "is_computed_as_the_result_of"

	%% Prediction Relationships
	FORECAST }|--|| STOCK : "predicts"

	%% Transaction Relationships
	INVOICE }|--|| PAYMENT_METHOD : "charges"

	%% Proxy Relationships
	PAYMENT_METHOD ||--|| BANK_ACCOUNT : "represents"
	POSITION ||--|| STOCK : "represents"
	STOCK_ORDER ||--|| STOCK : "represents"
```

## User Experience:

![Wallot User Experience](readme-media/wallot-user-experience.png)

> @kamarmack - replace this placeholder image with a screenshot of the user experience

## Key Terms:

> @kamarmack - add a list of key terms and the explanations for each terms
