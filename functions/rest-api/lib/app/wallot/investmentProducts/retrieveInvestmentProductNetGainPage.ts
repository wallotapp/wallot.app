import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	InvestmentProductNetGain,
	InvestmentProductNetGainPage,
	partitionInvestmentProductsByResult,
} from '@wallot/js';
import { db } from '../../../services.js';

export const retrieveInvestmentProductNetGainPage = async (
	_body: Record<string, never>,
	_params: Record<string, never>,
	_query: Record<string, never>,
	_firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<InvestmentProductNetGainPage>> => {
	// Query the database for the investment product net gains
	const investmentProductNetGainsSnapshot = await db
		.collection('investment_product_net_gains_after_one_month')
		.get();
	if (investmentProductNetGainsSnapshot.empty) {
		throw new Error('No investment product net gains');
	}
	const investmentProductNetGainsUnsorted =
		investmentProductNetGainsSnapshot.docs.map(
			(doc) => doc.data() as InvestmentProductNetGain,
		);

	// Sort the investment product net gains by most recent entry date
	const investmentProductNetGainsWithMostRecentFirst =
		investmentProductNetGainsUnsorted.sort((a, b) => {
			return (
				new Date(b.investment_product.entry_date).getTime() -
				new Date(a.investment_product.entry_date).getTime()
			);
		});

	// Construct the investment product net gains page
	const numProducts = investmentProductNetGainsWithMostRecentFirst.length;
	const [winners, losers] = partitionInvestmentProductsByResult(
		investmentProductNetGainsWithMostRecentFirst,
	);
	const numWinners = winners.length;
	const numLosers = losers.length;
	const hitRate = numWinners / numProducts;
	const avgReturnRateForWins =
		winners.reduce((acc, curr) => acc + curr.results.net_gain_rate, 0) /
		numWinners;
	const avgLossRateForLosses =
		losers.reduce((acc, curr) => acc + curr.results.net_gain_rate, 0) /
		numLosers;
	const investmentProductNetGainsPage: InvestmentProductNetGainPage = {
		page: 1,
		num_pages: 1,
		page_size: numProducts,
		products: investmentProductNetGainsWithMostRecentFirst,
		summary: {
			description: `Wallot AI has generated ${numProducts} investment products historically. ${numWinners} of these products have posted positive returns, and ${numLosers} have posted negative returns, resulting in a hit rate of ${hitRate}. The average return rate for products in the green is ${avgReturnRateForWins}, and the average loss rate for products in the red is ${avgLossRateForLosses}.`,
			num_wins: numWinners,
			num_losses: numLosers,
			num_total: numProducts,
			hit_rate: hitRate, // Percentage
			avg_return_rate_for_wins: avgReturnRateForWins, // Percentage
			avg_loss_rate_for_losses: avgLossRateForLosses, // Percentage
		},
	};

	return { json: investmentProductNetGainsPage };
};
