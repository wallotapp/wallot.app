import { Forecast } from '@wallot/js';

export type LocateRecentForecastsProducedByModelParams = unknown;
export const locateRecentForecastsProducedByModel = async (
	params: LocateRecentForecastsProducedByModelParams,
): Promise<Forecast[]> => {
	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
