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
bash functions/rest-api/smoke-tests/test-health-endpoints.sh test local
bash functions/rest-api/smoke-tests/test-health-endpoints.sh test cloud-functions
bash functions/rest-api/smoke-tests/test-health-endpoints.sh test primary
```

## Architecture:

```mermaid
erDiagram
	%% Mirror Relationships
	ACH_TRANSFER ||--o| ALPACA_ACH_TRANSFER : "mirrors"
	ASSET ||--|| ALPACA_ASSET : "mirrors"
	ASSET ||--|| ALPHA_VANTAGE_COMPANY : "mirrors"
	ASSET_ORDER ||--o| ALPACA_ORDER : "mirrors"
	ASSET_PRICE ||--|| ALPHA_VANTAGE_STOCK_PRICE : "mirrors"
	BANK_ACCOUNT ||--o| ALPACA_ACH_RELATIONSHIP : "mirrors"
	BANK_ACCOUNT ||--|| STRIPE_FINANCIAL_CONNECTION_ACCOUNT : "mirrors"
	INVOICE ||--|| STRIPE_INVOICE : "mirrors"
	MODEL ||--|| OPEN_AI_MODEL : "mirrors"
	LICENSE ||--|| STRIPE_SUBSCRIPTION : "mirrors"
	PAYMENT_METHOD ||--|| STRIPE_PAYMENT_METHOD : "mirrors"
	POSITION ||--o| ALPACA_POSITION : "mirrors"
	RECOMMENDATION ||--|| OPEN_AI_RECOMMENDATION : "mirrors"
	USER ||--o| ALPACA_ACCOUNT : "mirrors"
	USER ||--|| STRIPE_CUSTOMER : "mirrors"

	%% Ownership Relationships
	EQUITY_ACCOUNT ||--o{ POSITION : "owns"
	MODEL_FAMILY ||--o{ MODEL : "owns"
	OPEN_AI_MODEL_FAMILY ||--o{ OPEN_AI_MODEL : "owns"
	ORDER ||--o{ ASSET_ORDER : "owns"
	USER ||--|| AUTH_CREDENTIAL : "owns"
	USER ||--|| EQUITY_ACCOUNT : "owns"
	USER ||--o{ IDENTITY_VERIFICATION_DOCUMENT : "owns"
	USER ||--|| LICENSE : "owns"
	USER ||--o{ ORDER : "owns"
	USER ||--o{ PAYMENT_METHOD : "owns"
	USER ||--o{ RECOMMENDATION : "owns"

	%% Production Relationships
	MODEL ||--o{ RECOMMENDATION : "produces"
	RECOMMENDATION }o--o{ ASSET_ORDER : "factors_into"
	STRIPE_FINANCIAL_CONNECTION_SESSION ||--o{ STRIPE_FINANCIAL_CONNECTION_ACCOUNT : "produces"
	USER ||--o{ STRIPE_FINANCIAL_CONNECTION_SESSION : "produces"

	%% Similarity Relationships
	MODEL_FAMILY }o--o{ PARAMETER : "caters_to"
	USER ||--o{ PARAMETER : "fits"

	%% Computation Relationships
	BANK_ACCOUNT ||--o{ ACH_TRANSFER : "derives_from_the_computation_of"
	POSITION |o--o{ ASSET_ORDER : "derives_from_the_computation_of"
	RECOMMENDATION }|--|{ NEWS_REPORT : "derives_from_the_computation_of"
	RECOMMENDATION }|--|{ ASSET_PRICE : "derives_from_the_computation_of"

	%% Transaction Relationships
	INVOICE }|--|| PAYMENT_METHOD : "charges"
	LICENSE ||--o{ INVOICE : "bills"
	ORDER }|--o| BANK_ACCOUNT : "debits_or_credits"

	%% Proxy Relationships
	PAYMENT_METHOD ||--|| BANK_ACCOUNT : "represents"
	POSITION ||--|| ASSET : "represents"
	ASSET_ORDER ||--|| ASSET : "represents"
	ASSET_PRICE }|--|| ASSET : "represents"

	%% Entity Definitions
	ACH_TRANSFER {
    string alpaca_ach_transfer FK "min(1)"
    string bank_account FK "min(1)"
  }
  ASSET {
    string alpaca_asset FK "min(1)"
    string alpha_vantage_company FK "min(1)"
  }
  ASSET_ORDER {
    string alpaca_order FK "nullable"
    string asset FK "min(1)"
    string order FK "min(1)"
    string position FK "min(1)"
    string[] recommendations FK "nullable"
  }
  ASSET_PRICE {
    string asset FK "min(1)"
		string alpha_vantage_stock_price FK "min(1)"
  }
  AUTH_CREDENTIAL {
    string user FK "min(1)"
  }
  BANK_ACCOUNT {
    string alpaca_ach_relationship FK "nullable"
    string stripe_financial_connection_account FK "min(1)"
  }
  EQUITY_ACCOUNT {
    string user FK "min(1)"
  }
  INVOICE {
    string license FK "min(1)"
    string payment_method FK "min(1)"
    string stripe_invoice FK "min(1)"
  }
  LICENSE {
    string stripe_subscription FK "nullable"
    string user FK "min(1)"
  }
  MODEL {
    string model_family FK "min(1)"
    string open_ai_model FK "min(1)"
  }
  MODEL_FAMILY {
    string open_ai_model_family FK "min(1)"
    string[] parameters FK "min(1)"
  }
  ORDER {
    string bank_account FK "min(1)"
    string user FK "min(1)"
  }
  PAYMENT_METHOD {
    string bank_account FK "min(1)"
    string stripe_payment_method FK "nullable"
    string user FK "min(1)"
  }
  POSITION {
    string alpaca_position FK "min(1)"
    string asset FK "min(1)"
    string equity_account FK "min(1)"
  }
  RECOMMENDATION {
    string[] asset_prices FK "min(1)"
    string model FK "min(1)"
    string[] news_reports FK "min(1)"
    string open_ai_recommendation FK "min(1)"
    string user FK "nullable"
  }
  STRIPE_FINANCIAL_CONNECTION_ACCOUNT {
    string stripe_financial_connection_session FK "min(1)"
  }
  USER {
    string alpaca_account FK "nullable"
    string[] parameters FK "nullable"
    string stripe_customer FK "min(1)"
  }
```

## User Experience:

![Wallot User Experience](readme-media/wallot-user-experience.png)

> @kamarmack - replace this placeholder image with a screenshot of the user experience

## Key Terms:

> @kamarmack - add a list of key terms and the explanations for each terms
