import { AlpacaOrderSide } from '../../assetOrders/utils/alpacaOrders.js';

export type RequestNewOrderParams = {
	bank_account: string;
	amount: number;
	symbol: string;
	side: AlpacaOrderSide;
};
export type RequestNewOrderResponse = Record<string, never>;
