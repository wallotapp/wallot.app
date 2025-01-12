import { Model } from '../../models/models/modelProperties.js';
import { ModelFamily } from '../../modelFamilies/models/modelFamilyProperties.js';
import { OpenAiModel } from '../../openAiModels/models/openAiModelProperties.js';
import { OpenAiModelFamily } from '../../openAiModelFamilies/models/openAiModelFamilyProperties.js';

export type Trade = {
	amount: string; // String number of dollars, e.g. '1000' for $1,000.00
	date: string; // UTC date, e.g. '2024-12-21T01:11:14.887Z'
	rationale: string; // Investment thesis
	symbol: string;
};

export type TradeNetGainResults = {
	num_shares: number;
	entry_date: string;
	entry_price: number;
	days_held: number;
	exit_date: string;
	exit_price: number;
	net_gain: number;
	net_gain_rate: number;
};

export type TradeNetGain = {
	trade: Trade;
	results: TradeNetGainResults;
};

export type InvestmentProduct = {
	entry_date: string;
	model: {
		financial_model: Model;
		financial_model_family: ModelFamily;
		llm: OpenAiModel;
		llm_family: OpenAiModelFamily;
	};
	title: string;
	description: string;
	trades: Trade[];
};

export type InvestmentProductNetGainResults = Omit<
	TradeNetGainResults,
	'num_shares'
>;
export type InvestmentProductNetGain = {
	investment_product: Omit<InvestmentProduct, 'trades'> & {
		trades: TradeNetGain[];
	};
	results: InvestmentProductNetGainResults;
};
