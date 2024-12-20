import * as yup from 'yup';
import { getEnum, Keys } from 'ergonomic';

export const alphaVantageCompanyProperties = {
	alpha_vantage_company_200DayMovingAverage: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_50DayMovingAverage: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_52WeekHigh: yup.string().nullable().default(null),
	alpha_vantage_company_52WeekLow: yup.string().nullable().default(null),
	alpha_vantage_company_Address: yup.string().nullable().default(null),
	alpha_vantage_company_AnalystRatingBuy: yup.string().nullable().default(null),
	alpha_vantage_company_AnalystRatingHold: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_AnalystRatingSell: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_AnalystRatingStrongBuy: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_AnalystRatingStrongSell: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_AnalystTargetPrice: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_AssetType: yup.string().nullable().default(null),
	alpha_vantage_company_Beta: yup.string().nullable().default(null),
	alpha_vantage_company_BookValue: yup.string().nullable().default(null),
	alpha_vantage_company_CIK: yup.string().nullable().default(null),
	alpha_vantage_company_Currency: yup.string().nullable().default(null),
	alpha_vantage_company_Country: yup.string().nullable().default(null),
	alpha_vantage_company_Description: yup.string().nullable().default(null),
	alpha_vantage_company_DividendDate: yup.string().nullable().default(null),
	alpha_vantage_company_DividendPerShare: yup.string().nullable().default(null),
	alpha_vantage_company_DividendYield: yup.string().nullable().default(null),
	alpha_vantage_company_DilutedEPSTTM: yup.string().nullable().default(null),
	alpha_vantage_company_EBITDA: yup.string().nullable().default(null),
	alpha_vantage_company_EPS: yup.string().nullable().default(null),
	alpha_vantage_company_EVToEBITDA: yup.string().nullable().default(null),
	alpha_vantage_company_EVToRevenue: yup.string().nullable().default(null),
	alpha_vantage_company_ExDividendDate: yup.string().nullable().default(null),
	alpha_vantage_company_Exchange: yup.string().nullable().default(null),
	alpha_vantage_company_FiscalYearEnd: yup.string().nullable().default(null),
	alpha_vantage_company_ForwardPE: yup.string().nullable().default(null),
	alpha_vantage_company_GrossProfitTTM: yup.string().nullable().default(null),
	alpha_vantage_company_Industry: yup.string().nullable().default(null),
	alpha_vantage_company_LatestQuarter: yup.string().nullable().default(null),
	alpha_vantage_company_MarketCapitalization: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_Name: yup.string().nullable().default(null),
	alpha_vantage_company_OfficialSite: yup.string().nullable().default(null),
	alpha_vantage_company_OperatingMarginTTM: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_PEGRatio: yup.string().nullable().default(null),
	alpha_vantage_company_PERatio: yup.string().nullable().default(null),
	alpha_vantage_company_PriceToBookRatio: yup.string().nullable().default(null),
	alpha_vantage_company_PriceToSalesRatioTTM: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_ProfitMargin: yup.string().nullable().default(null),
	alpha_vantage_company_QuarterlyEarningsGrowthYOY: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_QuarterlyRevenueGrowthYOY: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_ReturnOnAssetsTTM: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_ReturnOnEquityTTM: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_RevenuePerShareTTM: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_RevenueTTM: yup.string().nullable().default(null),
	alpha_vantage_company_Sector: yup.string().nullable().default(null),
	alpha_vantage_company_SharesOutstanding: yup
		.string()
		.nullable()
		.default(null),
	alpha_vantage_company_Symbol: yup
		.string()
		.defined()
		.meta({ unique_key: true }),
	alpha_vantage_company_TrailingPE: yup.string().nullable().default(null),
} as const;

export const AlphaVantageCompanyPropertyNameEnum = getEnum(
	Keys(alphaVantageCompanyProperties),
);
export type AlphaVantageCompanyPropertyName =
	keyof typeof AlphaVantageCompanyPropertyNameEnum.obj;
