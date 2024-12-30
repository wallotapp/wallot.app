import { AlpacaAchTransferDirection } from './alpacaAchTransfers.js';

export type RequestNewTransferParams = {
	bank_account_id: string;
	amount: number;
	direction: AlpacaAchTransferDirection;
};
export type RequestNewTransferResponse = Record<string, never>;
