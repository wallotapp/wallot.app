import * as R from 'ramda';
import {
	AlpacaAchTransfer,
	BankAccountApprovedByAlpaca,
	assetOrdersApi,
	AssetOrder,
	isAssetOrderPendingAlpacaFill,
	User,
	usersApi,
	UserActivatedByAlpaca,
	isUserActivatedByAlpaca,
	achTransfersApi,
	CreateAchTransferParams,
	getAchTransferPropertiesFromAlpacaAchTransfer,
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
 *  - No ACH_TRANSFER is already pending
 *  - BANK_ACCOUNT is approved by Alpaca
 *  - ORDER is confirmed by user
 *  - USER does not already have Alpaca equity
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
		// Precondition failed
		// The order is still in cart, so this task is not necessary
		return Promise.resolve();
	}

	// Query the ACH_TRANSFERs where bank_account = order.bank_account
	const achTransfersQuery = await db
		.collection(achTransfersApi.collectionId)
		.where('bank_account', '==', order.bank_account)
		.get();
	if (!achTransfersQuery.empty) {
		// Precondition failed
		// There is already an ACH_TRANSFER pending, so this task is not necessary
		return Promise.resolve();
	}

	// Query the BANK_ACCOUNT where _id = order.bank_account
	const bankAccountDoc = await db
		.collection(bankAccountsApi.collectionId)
		.doc(order.bank_account)
		.get();
	if (!bankAccountDoc.exists) throw new Error('Bank account not found');
	const bankAccount = bankAccountDoc.data() as BankAccount;

	if (!isBankAccountApprovedByAlpaca(bankAccount)) {
		// Precondition failed
		// Kick to the `create_alpaca_ach_relationship` task
		await gcp.tasks.enqueueCreateAlpacaAchRelationship({ orderId });
		return Promise.resolve();
	}

	// Query the ASSET_ORDERs
	const assetOrdersQuery = await db
		.collection(assetOrdersApi.collectionId)
		.where('order', '==', orderId)
		.get();
	if (assetOrdersQuery.empty) {
		// The ORDER has no ASSET_ORDERs, so this task is not necessary
		return Promise.resolve();
	}
	const assetOrders = assetOrdersQuery.docs
		.map((doc) => doc.data() as AssetOrder)
		.filter(R.complement(isAssetOrderPendingAlpacaFill));
	if (assetOrders.length === 0) {
		// All the ASSET_ORDERs are already pending Alpaca fills, so this task is not necessary
		return Promise.resolve();
	}

	// Query the USER via the ORDER.user field
	const userDoc = await db
		.collection(usersApi.collectionId)
		.doc(order.user)
		.get();
	if (!userDoc.exists) throw new Error('User not found');
	const user = userDoc.data() as User;
	if (!isUserActivatedByAlpaca(user)) {
		// This will never happen -- the user must be activated by Alpaca to have a BANK_ACCOUNT approved by Alpaca
		return Promise.resolve();
	}

	// Derive the amount to transfer
	const orderSubtotalAmount = assetOrders.reduce((acc, assetOrder) => {
		return acc + Number(assetOrder.amount);
	}, 0);

	// Request the ACH_TRANSFER
	const alpacaAchTransfer = await requestAlpacaAchTransfer(
		user,
		bankAccount,
		orderSubtotalAmount,
	);
	const achTransferCreateParams: CreateAchTransferParams = {
		bank_account: bankAccount._id,
		name: '',
		category: 'incoming',
		...getAchTransferPropertiesFromAlpacaAchTransfer(alpacaAchTransfer),
	};
	const achTransfer = achTransfersApi.mergeCreateParams({
		createParams: achTransferCreateParams,
	});
	await db
		.collection(achTransfersApi.collectionId)
		.doc(achTransfer._id)
		.set(achTransfer);

	// Kick to the `refresh_alpaca_ach_transfer_status` task
	await gcp.tasks.enqueueRefreshAlpacaAchTransferStatus({ orderId });

	// Task complete
	return Promise.resolve();
};

async function requestAlpacaAchTransfer(
	user: UserActivatedByAlpaca,
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
