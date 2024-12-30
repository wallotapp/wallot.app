import { AlpacaAchTransferDirection } from './alpacaAchTransfers.js';

export type RequestNewAchTransferParams = {
	bank_account: string;
	amount: number;
	direction: AlpacaAchTransferDirection;
};
export type RequestNewAchTransferResponse = Record<string, never>;
