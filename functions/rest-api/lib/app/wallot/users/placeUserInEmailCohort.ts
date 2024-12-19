export type PlaceUserInEmailCohortParams = unknown;
export type PlaceUserInEmailCohortResponse = void;
export const placeUserInEmailCohort = async (
	params: PlaceUserInEmailCohortParams,
): Promise<PlaceUserInEmailCohortResponse> => {
	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
