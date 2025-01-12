import { Model } from '../../models/models/modelProperties.js';
import { ModelFamily } from '../../modelFamilies/models/modelFamilyProperties.js';
import { OpenAiModel } from '../../openAiModels/models/openAiModelProperties.js';
import { OpenAiModelFamily } from '../../openAiModelFamilies/models/openAiModelFamilyProperties.js';

export type Trade = {
	amount: string; // String number of dollars, e.g. '1000' for $1,000.00
	date: string; // UTC date, e.g. '2024-12-21T01:11:14.887Z'
	id: string; // UUID
	rationale: string; // Investment thesis
	symbol: string;
};

export type TradeNetGainResults = {
	num_shares: number;
	entry_date: string;
	entry_aggregate_price: number; // USD in cents
	entry_share_price: number; // USD in cents
	days_held: number;
	exit_date: string;
	exit_aggregate_price: number; // USD in cents
	exit_share_price: number; // USD in cents
	net_gain: number; // USD in cents
	net_gain_rate: number; // Decimal (e.g. 0.1 for 10%)
	summary: 'win' | 'loss';
};

export type TradeNetGain = {
	trade: Trade;
	results: TradeNetGainResults;
};

export type InvestmentProduct = {
	entry_date: string;
	id: string; // UUID
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
	'num_shares' | 'entry_share_price' | 'exit_share_price'
> & {
	average_net_gain_for_winners: number | null; // USD in cents -- null if no winners
	average_net_gain_rate_for_winners: number | null; // Decimal (e.g. 0.1 for 10%) -- null if no winners
	average_net_loss_for_losers: number | null; // USD in cents -- null if no losers
	average_net_loss_rate_for_losers: number | null; // Decimal (e.g. 0.1 for 10%) -- null if no losers
	num_winners: number;
	num_losers: number;
	hit_rate: number; // Decimal (e.g. 0.1 for 10%)
};
export type InvestmentProductNetGain = {
	id: string; // UUID
	investment_product: Omit<InvestmentProduct, 'trades'> & {
		trades: TradeNetGain[];
	};
	results: InvestmentProductNetGainResults;
};
