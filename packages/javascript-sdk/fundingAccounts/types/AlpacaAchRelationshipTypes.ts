export type CreateAlpacaAchRelationshipParams = {
	stripe_financial_account_id: string;
};

export type AlpacaAchRelationship = {
	bank_account_number_last4: string;
	bank_account_type: string;
	id: string;
	status: string;
};
