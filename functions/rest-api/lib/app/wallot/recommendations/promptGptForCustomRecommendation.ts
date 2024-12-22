import { z } from 'zod';
import { zodResponseFormat as zodResponseFormatFromOpenAI } from 'openai/helpers/zod.js';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import {
	ActivateUserParams,
	CreateRecommendationParams,
	Model,
	Recommendation,
	recommendationsApi,
	riskPreferenceLabelDictionary,
} from '@wallot/js';
import { variables } from '../../../variables.js';
import { openAI } from '../../../services.js';

const zodResponseFormat = zodResponseFormatFromOpenAI as unknown as (
	arg1: unknown,
	arg2: string,
) => undefined;

const gptRecommendationSchema = z.object({
	best_orders: z.array(
		z.object({
			symbol: z.string(),
			amount: z.string(),
			rationale: z.string(),
		}),
	),
	name: z.string(),
	description: z.string(),
});
type GptRecommendation = z.infer<typeof gptRecommendationSchema>;

export type PromptGptForCustomRecommendationParams = unknown;
export const promptGptForCustomRecommendation = async (
	params: PromptGptForCustomRecommendationParams,
): Promise<Recommendation> => {
	const {
		age_range,
		investing_goals,
		risk_preference,
		capital_level,
		bestModel,
		userId,
	} = params as ActivateUserParams & { userId: string; bestModel: Model };
	const capitalFormatted = getCurrencyUsdStringFromCents(Number(capital_level));
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
	const prompt = `Act as an expert stock analyst whose goal is to recommend stocks trading on NYSE or NASDAQ for me to purchase that you believe will see an increase in share price.
	
Here is a bit of information about me:
1. I am in the ${age_range} age range.
2. My investing goals include: ${investing_goals.join(', ')}.
3. I am investing ${capitalFormatted} of capital.
4. My risk tolerance is ${risk_preference}, i.e. I prefer a ${
		riskPreferenceLabelDictionary[risk_preference]
	} investing strategy. 

Instructions:
${stockTradingInstruction}
- Provide your response in JSON format.
- Include a summary title and detailed description of your investment recommendation.
- Include the official tickers of the stocks that you recommend, the amount of capital to invest in each stock, and the rationale for each recommendation.
- Factor in my capital investment budget when recommending stocks. Divide the budget in the way that you believe will produce the best results.
- Use investment strategies that proved successful before.

For example, if you were to recommend allocating a $1,000 budget toward investing $500 in Microsoft (MSFT), $100 in Apple (AAPL), and $400 in Amazon (AMZN) your response would have the following structure:

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

	const completion = await openAI.beta.chat.completions.parse({
		model: 'gpt-4o-2024-08-06',
		messages: [{ role: 'user', content: prompt }],
		response_format: zodResponseFormat(
			gptRecommendationSchema,
			'investment_recommendation',
		),
	});

	// Extract the parsed recommendation from the response
	const gptRecommendation = completion.choices?.[0]?.message
		.parsed as unknown as GptRecommendation | undefined;

	if (!gptRecommendation) {
		throw new Error('Failed to parse GPT response');
	}

	const recommendationParams: CreateRecommendationParams = {
		best_orders: gptRecommendation.best_orders.map((order) => ({
			...order,
			side: 'buy',
		})),
		category: 'default',
		description: gptRecommendation.description,
		name: gptRecommendation.name,
		model: bestModel._id,
		news_reports: [],
		open_ai_api_request_ids: [completion.id],
		user: userId,
	};
	const recommendation: Recommendation = recommendationsApi.mergeCreateParams({
		createParams: recommendationParams,
	});
	return recommendation;
};
