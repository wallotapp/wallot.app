export type ConnectBankAccountsParams<
	TStripeFinancialConnectionsAccount = unknown,
> = {
	stripe_financial_connections_accounts: TStripeFinancialConnectionsAccount[];
};
export type ConnectBankAccountsResponse = Record<string, never>;
