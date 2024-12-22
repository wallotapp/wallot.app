import { KycUser } from './completeUserKycSchema';

export type UserPendingAlpacaAccount = KycUser & {
	alpaca_account_status: 'SUBMITTED';
};
