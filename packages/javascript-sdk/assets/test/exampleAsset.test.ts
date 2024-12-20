import { Asset, assetsApi } from '../models/index.js';

describe('Asset', () => {
	test('exampleAsset', () => {
		const { apiResourceDefaultJson } = assetsApi;
		const exampleAsset: Asset = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Asset',
			alpaca_asset_attributes: [],
			alpaca_asset_class: 'us_equity',
			alpaca_asset_easy_to_borrow: false,
			alpaca_asset_exchange: 'NYSE',
			alpaca_asset_fractionable: false,
			alpaca_asset_id: '',
			alpaca_asset_maintenance_margin_requirement: 0,
			alpaca_asset_margin_requirement_long: '',
			alpaca_asset_margin_requirement_short: '',
			alpaca_asset_marginable: false,
			alpaca_asset_status: 'active',
			alpaca_asset_shortable: false,
			alpaca_asset_symbol: '',
			alpaca_asset_tradable: false,
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
			alpaca_asset_attributes: [],
			alpaca_asset_class: 'us_equity',
			alpaca_asset_easy_to_borrow: false,
			alpaca_asset_exchange: 'NYSE',
			alpaca_asset_fractionable: false,
			alpaca_asset_id: '',
			alpaca_asset_maintenance_margin_requirement: 0,
			alpaca_asset_margin_requirement_long: '',
			alpaca_asset_margin_requirement_short: '',
			alpaca_asset_marginable: false,
			alpaca_asset_status: 'active',
			alpaca_asset_shortable: false,
			alpaca_asset_symbol: '',
			alpaca_asset_tradable: false,
			alpha_vantage_company: '',
		});
	});
});
