import * as yup from 'yup';

export const alpacaAccountProperties = {
	alpaca_account_account_number: yup.string().nullable().default(null),
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
		.default(null),
	alpaca_account_auto_approve: yup.boolean().nullable().default(null),
	alpaca_account_contact: yup
		.object()
		.shape({
			city: yup.string().nullable().default(null),
			email_address: yup.string().nullable().default(null),
			phone_number: yup.string().nullable().default(null),
			postal_code: yup.string().nullable().default(null),
			state: yup.string().nullable().default(null),
			street_address: yup.array().of(yup.string()).nullable().default(null),
		})
		.nullable()
		.default(null),
	alpaca_account_currency: yup.string().nullable().default(null),
	alpaca_account_disclosures: yup
		.object()
		.shape({
			is_affiliated_exchange_or_finra: yup.boolean().nullable().default(null),
			is_control_person: yup.boolean().nullable().default(null),
			is_politically_exposed: yup.boolean().nullable().default(null),
		})
		.nullable()
		.default(null),
	alpaca_account_documents: yup
		.array()
		.of(
			yup.object().shape({
				content: yup.string().nullable().default(null),
				document_type: yup.string().nullable().default(null),
			}),
		)
		.nullable()
		.default(null),
	alpaca_account_enabled_assets: yup
		.array()
		.of(yup.string())
		.nullable()
		.default(null),
	alpaca_account_id: yup.string().nullable().default(null),
	alpaca_account_identity: yup
		.object()
		.shape({
			country_of_birth: yup.string().nullable().default(null),
			country_of_citizenship: yup.string().nullable().default(null),
			country_of_tax_residence: yup.string().nullable().default(null),
			date_of_birth: yup.string().nullable().default(null),
			family_name: yup.string().nullable().default(null),
			given_name: yup.string().nullable().default(null),
			tax_id: yup.string().nullable().default(null),
			tax_id_type: yup.string().nullable().default(null),
		})
		.nullable()
		.default(null),
	alpaca_account_last_equity: yup.number().nullable().default(null),
	alpaca_account_minor_identity: yup.string().nullable().default(null),
	alpaca_account_status: yup.string().nullable().default(null),
	alpaca_account_trading_configurations: yup.object().nullable().default(null),
	alpaca_account_trading_type: yup.string().nullable().default(null),
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
