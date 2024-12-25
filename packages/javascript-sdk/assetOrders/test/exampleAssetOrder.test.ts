import { AssetOrder, assetOrdersApi } from '../models/index.js';

describe('AssetOrder', () => {
	test('exampleAssetOrder', () => {
		const { apiResourceDefaultJson } = assetOrdersApi;
		const exampleAssetOrder: AssetOrder = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AssetOrder',
			amount: 0,
			asset: '',
			order: '',
			position: '',
			recommendations: [],
			alpaca_order_asset_class: null,
			alpaca_order_asset_id: null,
			alpaca_order_canceled_at: null,
			alpaca_order_client_order_id: null,
			alpaca_order_created_at: null,
			alpaca_order_expired_at: null,
			alpaca_order_extended_hours: null,
			alpaca_order_failed_at: null,
			alpaca_order_filled_at: null,
			alpaca_order_filled_avg_price: null,
			alpaca_order_filled_qty: null,
			alpaca_order_id: '',
			alpaca_order_limit_price: null,
			alpaca_order_notional: null,
			alpaca_order_order_class: null,
			alpaca_order_order_type: null,
			alpaca_order_qty: null,
			alpaca_order_replaced_at: null,
			alpaca_order_replaced_by: null,
			alpaca_order_replaces: null,
			alpaca_order_side: 'buy',
			alpaca_order_stop_price: null,
			alpaca_order_submitted_at: null,
			alpaca_order_symbol: null,
			alpaca_order_time_in_force: null,
			alpaca_order_type: null,
			alpaca_order_updated_at: null,
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
			asset: '',
			order: '',
			position: '',
			recommendations: [],
			alpaca_order_asset_class: null,
			alpaca_order_asset_id: null,
			alpaca_order_canceled_at: null,
			alpaca_order_client_order_id: null,
			alpaca_order_created_at: null,
			alpaca_order_expired_at: null,
			alpaca_order_extended_hours: null,
			alpaca_order_failed_at: null,
			alpaca_order_filled_at: null,
			alpaca_order_filled_avg_price: null,
			alpaca_order_filled_qty: null,
			alpaca_order_id: '',
			alpaca_order_limit_price: null,
			alpaca_order_notional: null,
			alpaca_order_order_class: null,
			alpaca_order_order_type: null,
			alpaca_order_qty: null,
			alpaca_order_replaced_at: null,
			alpaca_order_replaced_by: null,
			alpaca_order_replaces: null,
			alpaca_order_status: null,
			alpaca_order_side: 'buy',
			alpaca_order_stop_price: null,
			alpaca_order_submitted_at: null,
			alpaca_order_symbol: null,
			alpaca_order_time_in_force: null,
			alpaca_order_type: null,
			alpaca_order_updated_at: null,
		});
	});
});
