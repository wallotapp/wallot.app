import { KyInstance } from 'ky-universal';
import {
	AlpacaAchRelationship,
	BankAccountPendingAlpacaAchRelationship,
	UserActivatedByAlpaca,
} from '@wallot/js';

export const retrieveAlpacaAchRelationship =
	(alpacaBrokerClient: KyInstance) =>
	async (
		user: UserActivatedByAlpaca,
		bankAccount: BankAccountPendingAlpacaAchRelationship,
	) => {
		const response = await alpacaBrokerClient.get<AlpacaAchRelationship[]>(
			`v1/accounts/${user.alpaca_account_id}/ach_relationships`,
		);
		const achRelationships = await response.json();
		const match = achRelationships.find(
			({ id }) => id === bankAccount.alpaca_ach_relationship_id,
		);
		if (match == null) {
			throw new Error(
				`Alpaca ACH relationship ${bankAccount.alpaca_ach_relationship_id} not found`,
			);
		}
		return match;
	};
