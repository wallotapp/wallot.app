import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import { RefreshAlpacaOrderStatusTaskParams } from '@wallot/node';
import {
	AssetOrder,
	assetOrdersApi,
	getAssetOrderPropertiesFromAlpacaOrder,
	isAssetOrderPendingAlpacaFill,
	isAssetOrderFilledByAlpacaParams,
	isUserActivatedByAlpaca,
	User,
	isAssetOrderFilledByAlpaca,
	isAssetOrderRejectedByAlpaca,
	isAssetOrderRejectedByAlpacaParams,
} from '@wallot/js';
import { alpaca, db, log } from '../../services.js';

export const handleRefreshAlpacaOrderStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
};

export const handleRefreshAlpacaOrderStatusTask: CloudTaskHandler<
	RefreshAlpacaOrderStatusTaskParams
> = async ({ data: { assetOrderId, userId } }) => {
	// Query the ASSET_ORDER
	const assetOrderDoc = await db
		.collection(assetOrdersApi.collectionId)
		.doc(assetOrderId)
		.get();
	if (!assetOrderDoc.exists) {
		// AssetOrder not found, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca order status, but assetOrder not found',
		});
		return Promise.resolve();
	}
	const assetOrderInitialData = assetOrderDoc.data() as AssetOrder;
	const isPending = isAssetOrderPendingAlpacaFill(assetOrderInitialData);
	const isFilled = isAssetOrderFilledByAlpaca(assetOrderInitialData);
	const isRejected = isAssetOrderRejectedByAlpaca(assetOrderInitialData);

	// Precondition check
	if (!isPending || isFilled || isRejected) {
		if (!isPending) {
			// AssetOrder is not pending Alpaca fill, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca order status, but assetOrder is not pending Alpaca fill',
			});
		} else if (isFilled) {
			// AssetOrder is already filled by Alpaca, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca order status, but assetOrder is already filled by Alpaca',
			});
		} else {
			// AssetOrder is already rejected by Alpaca, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca order status, but assetOrder is already rejected by Alpaca',
			});
		}
		return Promise.resolve();
	}

	// Query the USER
	const userDoc = await db.collection('users').doc(userId).get();
	if (!userDoc.exists) {
		// User not found, so this task is not possible
		log({
			message: 'Requested refresh of Alpaca order status, but user not found',
		});
		return Promise.resolve();
	}
	const userInitialData = userDoc.data() as User;
	if (!isUserActivatedByAlpaca(userInitialData)) {
		// User is not activated by Alpaca, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca order status, but user not activated by Alpaca',
		});
		return Promise.resolve();
	}

	// Retrieve the Alpaca Order
	const alpacaOrder = await alpaca.broker.retrieveAlpacaOrder(
		userInitialData,
		assetOrderInitialData,
	);

	// Update the ASSET_ORDER
	const updateAssetOrderParams =
		getAssetOrderPropertiesFromAlpacaOrder(alpacaOrder);
	await db
		.collection(assetOrdersApi.collectionId)
		.doc(assetOrderId)
		.update(updateAssetOrderParams);

	// Check if Alpaca filled the order
	if (isAssetOrderFilledByAlpacaParams(updateAssetOrderParams)) {
		// Alpaca filled the order
		log({
			message: 'Alpaca filled the order. AssetOrder updated with fill status',
			assetOrderInitialData,
		});
		return Promise.resolve();
	}
	if (isAssetOrderRejectedByAlpacaParams(updateAssetOrderParams)) {
		// Alpaca rejected the order
		log({
			code: 'ALPACA_ORDER_FAILED',
			message: 'Alpaca rejected the order. AssetOrder updated with rejection',
			assetOrderInitialData,
		});
		return Promise.resolve();
	}

	// Alpaca is still processing the order
	throw new firebaseFunctions.https.HttpsError(
		'internal',
		'Alpaca order still processing',
	);
};
