import { getApiResourceYupHelpers } from 'ergonomic';

export const idPrefixByResourceName = {
	ach_transfer: 'ach_tf',
	alpaca_account: 'alp_acct',
	alpaca_ach_relationship: 'alp_ach_rel',
	alpaca_asset: 'alp_ast',
	alpaca_order: 'alp_ord',
	alpaca_position: 'alp_pos',
	alpha_vantage_company: 'av_co',
	asset: 'ast',
	asset_order: 'ast_ord',
	asset_price: 'ast_pr',
	auth_credential: 'cred',
	bank_account: 'bnk',
	equity_account: 'eq',
	identity_verification_document: 'id_ver',
	invoice: 'inv',
	license: 'lic',
	model: 'mod',
	model_family: 'mod_fm',
	news_report: 'rep',
	open_ai_model: 'opai_mod',
	open_ai_model_family: 'opai_mod_fm',
	open_ai_recommendation: 'opai_rec',
	order: 'ord',
	parameter: 'param',
	payment_method: 'pm',
	position: 'pos',
	recommendation: 'rec',
	stripe_customer: 'strp_cus',
	stripe_financial_connection_account: 'strp_fc_acct',
	stripe_financial_connection_session: 'strp_fc_sn',
	stripe_invoice: 'strp_inv',
	stripe_payment_method: 'strp_pm',
	stripe_subscription: 'strp_sub',
	user: 'usr',
} as const;
export const apiYupHelpers = getApiResourceYupHelpers(
	[
		'ach_transfer',
		'alpaca_account',
		'alpaca_ach_relationship',
		'alpaca_asset',
		'alpaca_order',
		'alpaca_position',
		'alpha_vantage_company',
		'asset',
		'asset_order',
		'asset_price',
		'auth_credential',
		'bank_account',
		'equity_account',
		'identity_verification_document',
		'invoice',
		'license',
		'model',
		'model_family',
		'news_report',
		'open_ai_model',
		'open_ai_model_family',
		'open_ai_recommendation',
		'order',
		'parameter',
		'payment_method',
		'position',
		'recommendation',
		'stripe_customer',
		'stripe_financial_connection_account',
		'stripe_financial_connection_session',
		'stripe_invoice',
		'stripe_payment_method',
		'stripe_subscription',
		'user',
	],
	idPrefixByResourceName,
);
