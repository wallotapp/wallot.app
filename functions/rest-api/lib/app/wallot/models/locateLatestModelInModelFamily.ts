import { Model } from '@wallot/js';

export type LocateLatestModelInModelFamilyParams = unknown;
export const locateLatestModelInModelFamily = async (
	params: LocateLatestModelInModelFamilyParams,
): Promise<Model> => {
	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
