import { getEnum } from 'ergonomic';

export const AgeRangeEnum = getEnum(['1-18', '19-30', '31-50', '51-70', '71+']);
export type AgeRange = keyof typeof AgeRangeEnum.obj;
