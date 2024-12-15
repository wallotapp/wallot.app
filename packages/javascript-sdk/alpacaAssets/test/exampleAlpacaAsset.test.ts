import { AlpacaAsset, alpacaAssetsApi } from '../models/index.js';

describe('AlpacaAsset', () => {
	test('exampleAlpacaAsset', () => {
		const { apiResourceDefaultJson } = alpacaAssetsApi;
		const exampleAlpacaAsset: AlpacaAsset = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AlpacaAsset',
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
		});
	});
});
