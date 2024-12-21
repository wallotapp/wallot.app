import { AssetOrder, assetOrdersApi } from '../models/index.js';

describe('AssetOrder', () => {
	test('exampleAssetOrder', () => {
		const { apiResourceDefaultJson } = assetOrdersApi;
		const exampleAssetOrder: AssetOrder = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AssetOrder',
			alpaca_order_id: '',
			amount: 0,
			asset: '',
			order: '',
			position: '',
			recommendations: [],
		};
		expect(exampleAssetOrder).toEqual<typeof exampleAssetOrder>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'asset_order',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AssetOrder',
			amount: 0,
			alpaca_order_id: '',
			asset: '',
			order: '',
			position: '',
			recommendations: [],
		});
	});
});
