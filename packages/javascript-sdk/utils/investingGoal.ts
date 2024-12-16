import { getEnum } from 'ergonomic';

export const InvestingGoalEnum = getEnum([
	'buying_a_house',
	'buying_a_car',
	'vacation',
	'education',
	'retirement',
	'other',
]);
export type InvestingGoal = keyof typeof InvestingGoalEnum.obj;
