import { GeneralizedResponse } from 'ergonomic';

export type CreateStripeFinancialConnectionSessionFormData = {
	stripe_customer_id: string;
};
export type StripeFinancialConnectionSessionResponseData = GeneralizedResponse<{
	client_secret: string;
}>;
