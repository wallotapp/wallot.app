import { AlpacaAsset, alpacaAssetsApi } from '../models/index.js';

describe('AlpacaAsset', () => {
	test('exampleAlpacaAsset', () => {
		const { apiResourceDefaultJson } = alpacaAssetsApi;
		const exampleAlpacaAsset: AlpacaAsset = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AlpacaAsset',
			attributes: [],
			class: 'us_equity',
			easy_to_borrow: false,
			exchange: 'NYSE',
			fractionable: false,
			id: '',
			maintenance_margin_requirement: 0,
			margin_requirement_long: '',
			margin_requirement_short: '',
			marginable: false,
			status: 'active',
			shortable: false,
			symbol: '',
			tradable: false,
		};
		expect(exampleAlpacaAsset).toEqual<typeof exampleAlpacaAsset>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'alpaca_asset',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AlpacaAsset',
			attributes: [],
			class: 'us_equity',
			easy_to_borrow: false,
			exchange: 'NYSE',
			fractionable: false,
			id: '',
			maintenance_margin_requirement: 0,
			margin_requirement_long: '',
			margin_requirement_short: '',
			marginable: false,
			status: 'active',
			shortable: false,
			symbol: '',
			tradable: false,
		});
	});
});
