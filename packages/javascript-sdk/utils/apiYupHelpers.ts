import { getApiResourceYupHelpers } from 'ergonomic';

export const idPrefixByCollection = {
	alpaca_account: 'alp_acct',
	alpaca_asset: 'alp_ast',
	auth_credential: 'cred',
	forecast: 'fr',
	funding_account: 'fn',
	invoice: 'inv',
	license: 'lic',
	model: 'mod',
	order: 'ord',
	payment_method: 'pm',
	position: 'pos',
	recommendation: 'rec',
	stock: 'stck',
	transaction: 'tr',
	user: 'usr',
} as const;
export const apiYupHelpers = getApiResourceYupHelpers(
	[
		'alpaca_account',
		'alpaca_asset',
		'auth_credential',
		'forecast',
		'funding_account',
		'invoice',
		'license',
		'model',
		'order',
		'payment_method',
		'position',
		'recommendation',
		'stock',
		'transaction',
		'user',
	],
	idPrefixByCollection,
);
