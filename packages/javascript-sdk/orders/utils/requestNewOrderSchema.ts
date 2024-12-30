import { AlpacaOrderSide } from '../../assetOrders/utils/alpacaOrders.js';

export type RequestNewOrderParams = {
	amount: number;
	symbol: string;
	side: AlpacaOrderSide;
};
export type RequestNewOrderResponse = Record<string, never>;
