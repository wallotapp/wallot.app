import { getApiResourceYupHelpers } from 'ergonomic';

export const idPrefixByCollection = {
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
