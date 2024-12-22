import * as yup from 'yup';
import { getEnum, Keys } from 'ergonomic';

export const alpacaAccountAgreementsProperties = {
	agreement: yup.string().nullable().default(null),
	ip_address: yup.string().nullable().default(null),
	signed_at: yup.string().nullable().default(null),
} as const;
export const alpacaAccountContactProperties = {
	city: yup.string().nullable().default(null), // "San Mateo"
	email_address: yup.string().nullable().default(null), // "john@example.com"
	phone_number: yup.string().nullable().default(null), // "813-555-0970"
	postal_code: yup.string().nullable().default(null), // "94401"
	state: yup.string().nullable().default(null), // "CA"
	street_address: yup.array().of(yup.string()).nullable().default(null), // ["20 N San Mateo Dr"]
} as const;
export const alpacaAccountDisclosuresProperties = {
	immediate_family_exposed: yup.boolean().nullable().default(null),
	is_affiliated_exchange_or_finra: yup.boolean().nullable().default(null),
	is_affiliated_exchange_or_iiroc: yup.boolean().nullable().default(null),
	is_control_person: yup.boolean().nullable().default(null),
	is_discretionary: yup.boolean().nullable().default(null),
	is_politically_exposed: yup.boolean().nullable().default(null),
} as const;
export const alpacaAccountDocumentsProperties = {
	content: yup.string().nullable().default(null),
	content_data: yup.string().nullable().default(null),
	created_at: yup.string().nullable().default(null),
	document_type: yup.string().nullable().default(null),
	id: yup.string().nullable().default(null),
	mime_type: yup.string().nullable().default(null),
} as const;
export const alpacaAccountIdentityProperties = {
	country_of_birth: yup.string().nullable().default(null), // "USA"
	country_of_citizenship: yup.string().nullable().default(null), // "USA"
	country_of_tax_residence: yup.string().nullable().default(null), // "USA"
	date_of_birth: yup.string().nullable().default(null), // "1970-01-01"
	family_name: yup.string().nullable().default(null),
	given_name: yup.string().nullable().default(null),
	tax_id: yup.string().nullable().default(null), // "123-55-4321"
	tax_id_type: yup.string().nullable().default(null), // "USA_SSN"
} as const;
export const alpacaAccountTradingConfigurationsProperties = {
	fractional_trading: yup.boolean().nullable().default(null),
} as const;
export const alpacaAccountTrustedContactProperties = {
	email_address: yup.string().nullable().default(null),
	family_name: yup.string().nullable().default(null),
	given_name: yup.string().nullable().default(null),
} as const;

export const AlpacaAccountStatusEnum = getEnum([
	'INACTIVE', // Account not set to trade given asset.
	'ONBOARDING', // An application is expected for this user, but has not been submitted yet.
	'SUBMITTED', // The application has been submitted and in process.
	'SUBMISSION_FAILED', // Used to display if failure on submission
	'ACTION_REQUIRED', // The application requires manual action.
	'ACCOUNT_UPDATED', // Used to display when Account has been modified by user
	'APPROVAL_PENDING', // Initial value. The application approval process is in process.
	'APPROVED', // The account application has been approved, and waiting to be ACTIVE
	'REJECTED', // The account application is rejected for some reason
	'ACTIVE', // The account is fully active. Trading and funding are processed under this status.
	'ACCOUNT_CLOSED', // The account is closed.
]);
export type AlpacaAccountStatus = keyof typeof AlpacaAccountStatusEnum.obj;

export const alpacaAccountProperties = {
	alpaca_account_account_number: yup.string().nullable().default(null), // "689760856"
	alpaca_account_agreements: yup
		.array()
		.of(yup.object(alpacaAccountAgreementsProperties))
		.nullable()
		.default(null), // { "agreement": "customer_agreement", "signed_at": "2024-12-12T01:59:15.126099757Z", "ip_address": "127.0.0.1" }
	alpaca_account_auto_approve: yup.boolean().nullable().default(null), // `null`
	alpaca_account_contact: yup
		.object(alpacaAccountContactProperties)
		.nullable()
		.default(null),
	alpaca_account_crypto_status: yup.string().nullable().default(null), // "INACTIVE" or (presumably) "ACTIVE"
	alpaca_account_currency: yup.string().nullable().default(null), // "USD"
	alpaca_account_disclosures: yup
		.object(alpacaAccountDisclosuresProperties)
		.nullable()
		.default(null),
	alpaca_account_documents: yup
		.array()
		.of(yup.object(alpacaAccountDocumentsProperties))
		.nullable()
		.default(null),
	// { "document_type": "identity_verification", "document_sub_type": "passport", "id": "44c...daf", "content": "https://s3....d77", "created_at": "2024-..." }
	// { "document_type": "identity_verification", "document_sub_type": "passport", "content": "/9j/4AA..==", "content_data": null, "mime_type": "image/jpeg" }
	alpaca_account_enabled_assets: yup
		.array()
		.of(yup.string())
		.nullable()
		.default(null), // ["us_equity"]
	alpaca_account_id: yup.string().nullable().default(null).meta({
		unique_key: true,
	}), // v4 uuid
	alpaca_account_identity: yup
		.object(alpacaAccountIdentityProperties)
		.nullable()
		.default(null),
	alpaca_account_last_equity: yup.number().nullable().default(null), // "0" or "1236.31"
	alpaca_account_minor_identity: yup.string().nullable().default(null), // `null`
	alpaca_account_status: yup.string().nullable().default(null), // "SUBMITTED" or "ACTIVE"
	alpaca_account_trading_configurations: yup
		.object(alpacaAccountTradingConfigurationsProperties)
		.nullable()
		.default(null), // `null` or { "fractional_trading": true }
	alpaca_account_trading_type: yup.string().nullable().default(null), // "margin"
	alpaca_account_trusted_contact: yup
		.object(alpacaAccountTrustedContactProperties)
		.nullable()
		.default(null),
} as const;

export const AlpacaAccountPropertyNameEnum = getEnum(
	Keys(alpacaAccountProperties),
);
export type AlpacaAccountPropertyName =
	keyof typeof AlpacaAccountPropertyNameEnum.obj;

export type RemoveAlpacaAccountPrefix<T> = {
	[K in keyof T as K extends `alpaca_account_${infer Rest}` ? Rest : K]: T[K];
};
