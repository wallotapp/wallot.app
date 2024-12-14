import { GeneralizedResponse } from 'ergonomic';

export type CreateAlpacaAchRelationshipsParams = {
	stripe_financial_account_ids: string[];
};

export type AlpacaAchRelationship = {
	bank_account_number_last4: string;
	bank_account_type: string;
	id: string;
	status: string;
};
export type AlpacaAchRelationships = GeneralizedResponse<{
	ach_relationships: AlpacaAchRelationship[];
}>;
