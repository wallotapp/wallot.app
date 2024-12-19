import { ModelFamily } from '@wallot/js';

export type LocateBestModelFamiliesForParameterSetParams = unknown;
export const locateBestModelFamiliesForParameterSet = async (
	params: LocateBestModelFamiliesForParameterSetParams,
): Promise<ModelFamily[]> => {
	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
