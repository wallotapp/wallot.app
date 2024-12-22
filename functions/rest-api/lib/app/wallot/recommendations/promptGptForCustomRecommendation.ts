import { getCurrencyUsdStringFromCents } from 'ergonomic';
import {
	ActivateUserParams,
	Recommendation,
	riskPreferenceLabelDictionary,
} from '@wallot/js';
import { variables } from '../../../variables';

export type PromptGptForCustomRecommendationParams = unknown;
export const promptGptForCustomRecommendation = async (
	params: PromptGptForCustomRecommendationParams,
): Promise<Recommendation> => {
	const { risk_preference, capital_level } = params as ActivateUserParams;
	const capitalFormatted = getCurrencyUsdStringFromCents(Number(capital_level));
	// Locate pertinent NEWS_REPORTs
	// Locate pertinent ASSET_PRICEs
	// Construct RECOMMENDATION

	// Construct prompt
	const fullStockTradingInstruction = `- You are allowed to choose any stocks trading on the NASDAQ or NYSE.`;
	const limitedStockTradingInstruction = `- You are allowed to choose any stocks from the following list of fourteen options:
	- AAPL
	- MSFT
	- GOOGL
	- META
	- TSLA
	- NVDA
	- AMZN
	- SQ
	- SHOP
	- ZM
	- CRWD
	- SNOW
	- DOCU
	- PLTR`;
	const stockTradingInstruction = variables.SERVER_VAR_FEATURE_FLAGS
		.ENABLE_ALL_US_EQUITIES
		? fullStockTradingInstruction
		: limitedStockTradingInstruction;
	const prompt = `Act as an expert stock analyst whose goal is to recommend stocks trading on NYSE or NASDAQ for me to purchase that you believe will see an increase in share price. My risk tolerance is ${risk_preference}, i.e. I prefer a ${riskPreferenceLabelDictionary[risk_preference]} investing strategy. I am investing ${capitalFormatted} of capital.

Instructions:
${stockTradingInstruction}
- Provide your response in JSON format.
- Include a summary title and detailed description of your investment recommendation.
- Include the official tickers of the stocks that you recommend, the amount of capital to invest in each stock, and the rationale for each recommendation.
- Factor in my capital investment budget when recommending stocks. Divide the budget in the way that you believe will produce the best results.
- Use investment strategies that proved successful before.

For example, if you were to recommend using a $1,000 budget to invest $500 in Microsoft (MSFT), $100 in Apple (AAPL), and $400 in Amazon (AMZN) your response should have the following structure:

\`\`\`json
{
	"best_orders": [
		{ "symbol": "MSFT", "amount": "500", "rationale": "Strong revenue growth from business- and government-focused cloud services and software products. The company is also an industry leader in Artificial Intelligence (AI) research and development." },
		{ "symbol": "AAPL", "amount": "100", "rationale": "Consistent year-over-year revenue growth from iPhones, iPads, and add-on services." },
		{ "symbol": "AMZN", "amount": "400", "rationale": "Continued revenue expansion through e-commerce, cloud (AWS), and streaming services." },
	],
	"description": "After careful analysis, we recommend investing in Microsoft (MSFT), Apple (AAPL), and Amazon (AMZN), a diversified portfolio of technology stocks. This portfolio is designed to provide long-term growth potential while minimizing risk. These stocks have been selected based on their strong fundamentals, growth potential, and market leadership.",
	"name": "$1,000 investment in a portfolio of technology stocks",
}
\`\`\``;

	prompt;
	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
