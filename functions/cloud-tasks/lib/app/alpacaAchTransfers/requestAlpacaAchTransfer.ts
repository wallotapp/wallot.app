import {
	AlpacaAchTransfer,
	UserWithAlpacaEquity,
	BankAccountApprovedByAlpaca,
} from '@wallot/js';
import { CloudTaskHandler } from 'ergonomic-node';
import {
	ordersApi,
	Order,
	bankAccountsApi,
	BankAccount,
	isOrderConfirmedByUser,
	isBankAccountApprovedByAlpaca,
} from '@wallot/js';
import { PlaceAlpacaOrdersTaskParams } from '@wallot/node';
import { alpaca, db, gcp } from '../../services.js';
import { getCurrencyUsdStringFromCents } from 'ergonomic';

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
		// Precondition 1 failed
		// The order is still in cart, so this task is not necessary
		return Promise.resolve();
	}

	// Get BANK_ACCOUNT
	const bankAccountDoc = await db
		.collection(bankAccountsApi.collectionId)
		.doc(order.bank_account)
		.get();
	if (!bankAccountDoc.exists) throw new Error('Bank account not found');
	const bankAccount = bankAccountDoc.data() as BankAccount;

	if (!isBankAccountApprovedByAlpaca(bankAccount)) {
		// Precondition 2 failed
		// Kick to the `create_alpaca_ach_relationship` task
		await gcp.tasks.enqueueCreateAlpacaAchRelationship({ orderId });
		return Promise.resolve();
	}

	// ...rest TODO

	// Task complete
	return Promise.resolve();
};

async function requestAlpacaAchTransfer(
	user: UserWithAlpacaEquity,
	bankAccount: BankAccountApprovedByAlpaca,
	amountInCents: number,
) {
	if (amountInCents <= 0) {
		throw new Error('Amount must be greater than 0');
	}

	const response = await alpaca.broker.post<AlpacaAchTransfer>(
		`v1/accounts/${user.alpaca_account_id}/transfers`,
		{
			json: {
				transfer_type: 'ach',
				relationship_id: bankAccount.alpaca_ach_relationship_id,
				amount: getCurrencyUsdStringFromCents(amountInCents)
					.replace('$', '')
					.replace(/,/g, ''),
				direction: 'INCOMING',
			},
		},
	);
	return response.json();
}
requestAlpacaAchTransfer;
