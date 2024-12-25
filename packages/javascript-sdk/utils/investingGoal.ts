import { getEnum } from 'ergonomic';

export const InvestingGoalEnum = getEnum(['buying_a_house', 'buying_a_car', 'vacation', 'education', 'retirement', 'other']);
export type InvestingGoal = keyof typeof InvestingGoalEnum.obj;

export const investingGoalLabelDictionary: Record<InvestingGoal, string> = {
	buying_a_house: 'Saving for a house',
	buying_a_car: 'Saving for a car',
	vacation: 'Saving for a vacation',
	education: 'Saving for education',
	retirement: 'Saving for retirement',
	other: 'Saving for nest egg',
};
