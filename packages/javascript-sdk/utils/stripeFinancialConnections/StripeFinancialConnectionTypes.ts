import { GeneralizedResponse } from 'ergonomic';

export type CreateStripeFinancialConnectionSessionFormData = Record<
	string,
	never
>;
export type StripeFinancialConnectionSessionResponseData = GeneralizedResponse<{
	client_secret: string;
}>;
