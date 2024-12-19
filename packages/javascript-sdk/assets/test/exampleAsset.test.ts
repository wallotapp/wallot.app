import { Asset, assetsApi } from '../models/index.js';

describe('Asset', () => {
	test('exampleAsset', () => {
		const { apiResourceDefaultJson } = assetsApi;
		const exampleAsset: Asset = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Asset',
			alpaca_asset: '',
			alpha_vantage_company: '',
		};
		expect(exampleAsset).toEqual<typeof exampleAsset>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'asset',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Asset',
			alpaca_asset: '',
			alpha_vantage_company: '',
		});
	});
});
