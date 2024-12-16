import { getEnum } from 'ergonomic';

export const RiskLevelEnum = getEnum(['low', 'medium', 'high']);
export type RiskLevel = keyof typeof RiskLevelEnum.obj;
