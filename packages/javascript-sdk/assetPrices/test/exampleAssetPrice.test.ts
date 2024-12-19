import { AssetPrice, assetPricesApi } from '../models/index.js';

describe('AssetPrice', () => {
	test('exampleAssetPrice', () => {
		const { apiResourceDefaultJson } = assetPricesApi;
		const exampleAssetPrice: AssetPrice = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AssetPrice',
			alpha_vantage_stock_price: '',
			asset: '',
		};
		expect(exampleAssetPrice).toEqual<typeof exampleAssetPrice>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'asset_price',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AssetPrice',
			alpha_vantage_stock_price: '',
			asset: '',
		});
	});
});
