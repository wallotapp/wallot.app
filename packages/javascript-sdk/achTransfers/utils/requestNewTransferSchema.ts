import { AlpacaAchTransferDirection } from './alpacaAchTransfers.js';

export type RequestNewTransferParams = {
	alpaca_ach_relationship_id: string;
	amount: number;
	direction: AlpacaAchTransferDirection;
};
export type RequestNewTransferResponse = Record<string, never>;
