import { getCurrencyUsdStringFromCents } from 'ergonomic';
import {
	ActivateUserParams,
	Recommendation,
	riskPreferenceLabelDictionary,
} from '@wallot/js';

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
	const prompt = `Act as an expert stock analyst whose goal is to recommend stocks trading on NYSE or NASDAQ for me to purchase that you believe will see an increase in share price. My risk tolerance is ${risk_preference}, i.e. I prefer a ${riskPreferenceLabelDictionary[risk_preference]} investing strategy. I am investing ${capitalFormatted} of capital.

Instructions:
- You are allowed to choose 2-5 stocks trading on the NASDAQ or NYSE.
- Provide your response in JSON format.
- Include a summary title and detailed description of your investment recommendation.
- Include the official tickers of the stocks that you recommend.
- Factor in my capital investment budget when recommending stocks. Divide the budget in the way that you believe will produce the best results.
- Use investment strategies that proved successful before.

For example, if you were to recommend investing in Microsoft (MSFT), Apple (AAPL), and Amazon (AMZN) with a budget of $1,000 your response should have the following structure:

\`\`\`json
{
	"best_orders": [
		{ "symbol": "MSFT", "amount": "500" },
		{ "symbol": "AAPL", "amount": "100" },
		{ "symbol": "AMZN", "amount": "400" },
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
