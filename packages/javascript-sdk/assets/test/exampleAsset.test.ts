import { Asset, assetsApi } from '../models/index.js';

describe('Asset', () => {
	test('exampleAsset', () => {
		const { apiResourceDefaultJson } = assetsApi;
		const exampleAsset: Asset = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Asset',
			symbol: '',
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
			alpaca_asset_name: '',
			alpaca_asset_status: 'active',
			alpaca_asset_shortable: false,
			alpaca_asset_symbol: '',
			alpaca_asset_tradable: false,
			alpha_vantage_company_200DayMovingAverage: '',
			alpha_vantage_company_50DayMovingAverage: '',
			alpha_vantage_company_52WeekHigh: '',
			alpha_vantage_company_52WeekLow: '',
			alpha_vantage_company_Address: '',
			alpha_vantage_company_AnalystRatingBuy: '',
			alpha_vantage_company_AnalystRatingHold: '',
			alpha_vantage_company_AnalystRatingSell: '',
			alpha_vantage_company_AnalystRatingStrongBuy: '',
			alpha_vantage_company_AnalystRatingStrongSell: '',
			alpha_vantage_company_AnalystTargetPrice: '',
			alpha_vantage_company_AssetType: '',
			alpha_vantage_company_Beta: '',
			alpha_vantage_company_BookValue: '',
			alpha_vantage_company_CIK: '',
			alpha_vantage_company_Currency: '',
			alpha_vantage_company_Country: '',
			alpha_vantage_company_Description: '',
			alpha_vantage_company_DividendDate: '',
			alpha_vantage_company_DividendPerShare: '',
			alpha_vantage_company_DividendYield: '',
			alpha_vantage_company_DilutedEPSTTM: '',
			alpha_vantage_company_EBITDA: '',
			alpha_vantage_company_EPS: '',
			alpha_vantage_company_EVToEBITDA: '',
			alpha_vantage_company_EVToRevenue: '',
			alpha_vantage_company_ExDividendDate: '',
			alpha_vantage_company_Exchange: '',
			alpha_vantage_company_FiscalYearEnd: '',
			alpha_vantage_company_ForwardPE: '',
			alpha_vantage_company_GrossProfitTTM: '',
			alpha_vantage_company_Industry: '',
			alpha_vantage_company_LatestQuarter: '',
			alpha_vantage_company_MarketCapitalization: '',
			alpha_vantage_company_Name: '',
			alpha_vantage_company_OfficialSite: '',
			alpha_vantage_company_OperatingMarginTTM: '',
			alpha_vantage_company_PEGRatio: '',
			alpha_vantage_company_PERatio: '',
			alpha_vantage_company_PriceToBookRatio: '',
			alpha_vantage_company_PriceToSalesRatioTTM: '',
			alpha_vantage_company_ProfitMargin: '',
			alpha_vantage_company_QuarterlyEarningsGrowthYOY: '',
			alpha_vantage_company_QuarterlyRevenueGrowthYOY: '',
			alpha_vantage_company_ReturnOnAssetsTTM: '',
			alpha_vantage_company_ReturnOnEquityTTM: '',
			alpha_vantage_company_RevenuePerShareTTM: '',
			alpha_vantage_company_RevenueTTM: '',
			alpha_vantage_company_Sector: '',
			alpha_vantage_company_SharesOutstanding: '',
			alpha_vantage_company_Symbol: '',
			alpha_vantage_company_TrailingPE: '',
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
			symbol: '',
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
			alpaca_asset_name: '',
			alpaca_asset_status: 'active',
			alpaca_asset_shortable: false,
			alpaca_asset_symbol: '',
			alpaca_asset_tradable: false,
			alpha_vantage_company_200DayMovingAverage: '',
			alpha_vantage_company_50DayMovingAverage: '',
			alpha_vantage_company_52WeekHigh: '',
			alpha_vantage_company_52WeekLow: '',
			alpha_vantage_company_Address: '',
			alpha_vantage_company_AnalystRatingBuy: '',
			alpha_vantage_company_AnalystRatingHold: '',
			alpha_vantage_company_AnalystRatingSell: '',
			alpha_vantage_company_AnalystRatingStrongBuy: '',
			alpha_vantage_company_AnalystRatingStrongSell: '',
			alpha_vantage_company_AnalystTargetPrice: '',
			alpha_vantage_company_AssetType: '',
			alpha_vantage_company_Beta: '',
			alpha_vantage_company_BookValue: '',
			alpha_vantage_company_CIK: '',
			alpha_vantage_company_Currency: '',
			alpha_vantage_company_Country: '',
			alpha_vantage_company_Description: '',
			alpha_vantage_company_DividendDate: '',
			alpha_vantage_company_DividendPerShare: '',
			alpha_vantage_company_DividendYield: '',
			alpha_vantage_company_DilutedEPSTTM: '',
			alpha_vantage_company_EBITDA: '',
			alpha_vantage_company_EPS: '',
			alpha_vantage_company_EVToEBITDA: '',
			alpha_vantage_company_EVToRevenue: '',
			alpha_vantage_company_ExDividendDate: '',
			alpha_vantage_company_Exchange: '',
			alpha_vantage_company_FiscalYearEnd: '',
			alpha_vantage_company_ForwardPE: '',
			alpha_vantage_company_GrossProfitTTM: '',
			alpha_vantage_company_Industry: '',
			alpha_vantage_company_LatestQuarter: '',
			alpha_vantage_company_MarketCapitalization: '',
			alpha_vantage_company_Name: '',
			alpha_vantage_company_OfficialSite: '',
			alpha_vantage_company_OperatingMarginTTM: '',
			alpha_vantage_company_PEGRatio: '',
			alpha_vantage_company_PERatio: '',
			alpha_vantage_company_PriceToBookRatio: '',
			alpha_vantage_company_PriceToSalesRatioTTM: '',
			alpha_vantage_company_ProfitMargin: '',
			alpha_vantage_company_QuarterlyEarningsGrowthYOY: '',
			alpha_vantage_company_QuarterlyRevenueGrowthYOY: '',
			alpha_vantage_company_ReturnOnAssetsTTM: '',
			alpha_vantage_company_ReturnOnEquityTTM: '',
			alpha_vantage_company_RevenuePerShareTTM: '',
			alpha_vantage_company_RevenueTTM: '',
			alpha_vantage_company_Sector: '',
			alpha_vantage_company_SharesOutstanding: '',
			alpha_vantage_company_Symbol: '',
			alpha_vantage_company_TrailingPE: '',
		});
	});
});
