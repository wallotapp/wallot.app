import { getEnum } from 'ergonomic';

export const RiskPreferenceEnum = getEnum(['low', 'medium', 'high']);
export type RiskPreference = keyof typeof RiskPreferenceEnum.obj;

export const riskPreferenceLabelDictionary: Record<RiskPreference, string> = {
	low: 'Risk-averse',
	medium: 'Balanced',
	high: 'Growth-oriented',
};
