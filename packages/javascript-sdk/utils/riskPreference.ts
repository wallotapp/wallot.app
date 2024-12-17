import { getEnum } from 'ergonomic';

export const RiskPreferenceEnum = getEnum([
	'low',
	'balanced',
	'growth_oriented',
]);
export type RiskPreference = keyof typeof RiskPreferenceEnum.obj;
