import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import {
	ordersApi,
	Order,
	bankAccountsApi,
	BankAccount,
	isOrderConfirmedByUser,
	isBankAccountApprovedByAlpaca,
	AlpacaAchRelationship,
	UserWithAlpacaEquity,
	TokenizedBankAccount,
} from '@wallot/js';
import { PlaceAlpacaOrdersTaskParams } from '@wallot/node';
import { alpaca, crypto, db, gcp } from '../../services.js';

export const handleRequestAlpacaAchTransferTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

/**
 * Preconditions:
 *  - ORDER is confirmed by user
 *  - BANK_ACCOUNT is approved by Alpaca
 */
export const handleRequestAlpacaAchTransfer: CloudTaskHandler<
	PlaceAlpacaOrdersTaskParams
> = async ({ data: { orderId } }) => {
	// Get ORDER
	const orderDoc = await db
		.collection(ordersApi.collectionId)
		.doc(orderId)
		.get();
	if (!orderDoc.exists) throw new Error('Order not found');
	const order = orderDoc.data() as Order;

	if (!isOrderConfirmedByUser(order)) {
		throw new firebaseFunctions.https.HttpsError(
			'failed-precondition',
			'Order is not confirmed by user',
		);
	}

	// Get BANK_ACCOUNT
	const bankAccountDoc = await db
		.collection(bankAccountsApi.collectionId)
		.doc(order.bank_account)
		.get();
	if (!bankAccountDoc.exists) throw new Error('Bank account not found');
	const bankAccount = bankAccountDoc.data() as BankAccount;

	if (!isBankAccountApprovedByAlpaca(bankAccount)) {
		// Precondition 1 failed
		// Kick to the `create_alpaca_ach_relationship` task
		await gcp.tasks.enqueueCreateAlpacaAchRelationship({ orderId });
		return Promise.resolve();
	}

	// ...rest TODO

	// Task complete
	return Promise.resolve();
};

async function createAlpacaAchRelationship(
	user: UserWithAlpacaEquity,
	bankAccount: TokenizedBankAccount,
) {
	const response = await alpaca.broker.post<AlpacaAchRelationship>(
		`v1/accounts/${user.alpaca_account_id}/ach_relationships`,
		{
			json: {
				account_owner_name: bankAccount.account_owner_name,
				bank_account_type: bankAccount.account_type,
				bank_account_number: crypto.decrypt({
					data: bankAccount.account_number_data,
					ivHex: bankAccount.account_number_iv_hex,
				}),
				bank_routing_number: bankAccount.routing_number,
				// nickname: '',
			},
		},
	);
	return response.json();
}
createAlpacaAchRelationship;
