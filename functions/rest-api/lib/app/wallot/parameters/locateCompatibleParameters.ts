import { ActivateUserParams, Parameter } from '@wallot/js';

export const locateCompatibleParameters = async ({
	age_range,
	capital_level,
	investing_goals,
	risk_level,
}: ActivateUserParams): Promise<Parameter[]> => {
	age_range;
	capital_level;
	investing_goals;
	risk_level;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	return [];
};
