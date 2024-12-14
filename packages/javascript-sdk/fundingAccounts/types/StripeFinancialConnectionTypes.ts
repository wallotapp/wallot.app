import { GeneralizedResponse } from 'ergonomic';

export type CreateStripeFinancialConnectionSessionParams = Record<
	string,
	never
>;
export type StripeFinancialConnectionSession = GeneralizedResponse<{
	client_secret: string;
}>;
