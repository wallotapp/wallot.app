import * as yup from 'yup';
import { getEnum, Keys } from 'ergonomic';

export const alpacaAccountProperties = {
	alpaca_account_account_number: yup.string().nullable().default(null), // "689760856"
	alpaca_account_agreements: yup
		.array()
		.of(
			yup.object().shape({
				agreement: yup.string().nullable().default(null),
				ip_address: yup.string().nullable().default(null),
				signed_at: yup.string().nullable().default(null),
			}),
		)
		.nullable()
		.default(null), // { "agreement": "customer_agreement", "signed_at": "2024-12-12T01:59:15.126099757Z", "ip_address": "127.0.0.1" }
	alpaca_account_auto_approve: yup.boolean().nullable().default(null), // `null`
	alpaca_account_contact: yup
		.object()
		.shape({
			city: yup.string().nullable().default(null), // "San Mateo"
			email_address: yup.string().nullable().default(null), // "john@example.com"
			local_street_address: yup.string().nullable().default(null), // `null`
			phone_number: yup.string().nullable().default(null), // "226-555-0970"
			postal_code: yup.string().nullable().default(null), // "94401"
			state: yup.string().nullable().default(null), // "CA"
			street_address: yup.array().of(yup.string()).nullable().default(null), // ["20 N San Mateo Dr"]
		})
		.nullable()
		.default(null),
	alpaca_account_crypto_status: yup.string().nullable().default(null), // "INACTIVE" or (presumably) "ACTIVE"
	alpaca_account_currency: yup.string().nullable().default(null), // "USD"
	alpaca_account_disclosures: yup
		.object()
		.shape({
			immediate_family_exposed: yup.boolean().nullable().default(null),
			is_affiliated_exchange_or_finra: yup.boolean().nullable().default(null),
			is_affiliated_exchange_or_iiroc: yup.boolean().nullable().default(null),
			is_control_person: yup.boolean().nullable().default(null),
			is_discretionary: yup.boolean().nullable().default(null),
			is_politically_exposed: yup.boolean().nullable().default(null),
		})
		.nullable()
		.default(null),
	alpaca_account_documents: yup
		.array()
		.of(
			yup.object().shape({
				content: yup.string().nullable().default(null),
				content_data: yup.string().nullable().default(null),
				created_at: yup.string().nullable().default(null),
				document_type: yup.string().nullable().default(null),
				id: yup.string().nullable().default(null),
				mime_type: yup.string().nullable().default(null),
			}),
		)
		.nullable()
		.default(null),
	// { "document_type": "identity_verification", "document_sub_type": "passport", "id": "44c...daf", "content": "https://s3....d77", "created_at": "2024-..." }
	// { "document_type": "identity_verification", "document_sub_type": "passport", "content": "/9j/4AA..==", "content_data": null, "mime_type": "image/jpeg" }
	alpaca_account_enabled_assets: yup
		.array()
		.of(yup.string())
		.nullable()
		.default(null), // ["us_equity"]
	alpaca_account_id: yup.string().nullable().default(null), // v4 uuid
	alpaca_account_identity: yup
		.object()
		.shape({
			country_of_birth: yup.string().nullable().default(null), // "USA"
			country_of_citizenship: yup.string().nullable().default(null), // "USA"
			country_of_tax_residence: yup.string().nullable().default(null), // "USA"
			date_of_birth: yup.string().nullable().default(null), // "1970-01-01"
			family_name: yup.string().nullable().default(null),
			given_name: yup.string().nullable().default(null),
			tax_id: yup.string().nullable().default(null), // "123-55-4321"
			tax_id_type: yup.string().nullable().default(null), // "USA_SSN"
		})
		.nullable()
		.default(null),
	alpaca_account_last_equity: yup.number().nullable().default(null), // "0" or "1236.31"
	alpaca_account_minor_identity: yup.string().nullable().default(null), // `null`
	alpaca_account_status: yup.string().nullable().default(null), // "SUBMITTED" or "ACTIVE"
	alpaca_account_trading_configurations: yup
		.object()
		.shape({
			fractional_trading: yup.boolean().nullable().default(null),
		})
		.nullable()
		.default(null), // `null` or { "fractional_trading": true }
	alpaca_account_trading_type: yup.string().nullable().default(null), // "margin"
	alpaca_account_trusted_contact: yup
		.object()
		.shape({
			email_address: yup.string().nullable().default(null),
			family_name: yup.string().nullable().default(null),
			given_name: yup.string().nullable().default(null),
		})
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
