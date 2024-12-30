import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	ordersApi,
	RequestNewOrderParams,
	RequestNewOrderResponse,
} from '@wallot/js';
import { gcp } from '../../../services.js';

export const requestNewOrder = async (
	{
		amount: amountInCents,
		bank_account: bankAccountId,
		side,
	}: RequestNewOrderParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<RequestNewOrderResponse>> => {
	if (firebaseUser == null) throw new Error('Unauthorized');
	amountInCents;
	side;
	bankAccountId;
	const orderId = ordersApi.generateId();
	// todo
	await gcp.tasks.enqueuePlaceAlpacaOrders({
		orderId,
	});
	return { json: {} };
};
