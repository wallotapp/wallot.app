import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import {
	AlpacaAchRelationship,
	TokenizedBankAccount,
	UserActivatedByAlpaca,
} from '@wallot/js';
import { EncryptedData } from '../../crypto/encryptString.js';

export const createAlpacaAchRelationship =
	(
		alpacaBrokerClient: KyInstance,
		decrypt: (params: EncryptedData) => string,
	) =>
	async (user: UserActivatedByAlpaca, bankAccount: TokenizedBankAccount) => {
		try {
			const createAlpacaAchRelationshipParams: CreateAlpacaAchRelationshipParams =
				{
					account_owner_name: bankAccount.account_owner_name,
					bank_account_type: bankAccount.account_type,
					bank_account_number: decrypt({
						data: bankAccount.account_number_data,
						ivHex: bankAccount.account_number_iv_hex,
					}),
					bank_routing_number: bankAccount.routing_number,
					// nickname: '',
				};
			const response = await alpacaBrokerClient.post<AlpacaAchRelationship>(
				`v1/accounts/${user.alpaca_account_id}/ach_relationships`,
				{
					json: createAlpacaAchRelationshipParams,
				},
			);
			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};

type CreateAlpacaAchRelationshipParams = {
	account_owner_name: string;
	bank_account_type: string;
	bank_account_number: string;
	bank_routing_number: string;
	// nickname: string;
};
