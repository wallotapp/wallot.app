import { AlpacaAccount } from '../models/userProperties.js';
import { KycFormDataParams } from './completeUserKycSchema.js';

export type UpdateAlpacaAccountParams = Omit<
	KycFormDataParams,
	'alpaca_account_agreements'
> & {
	alpaca_account_id: string;
};
export type UpdateAlpacaAccountResponse = AlpacaAccount;
