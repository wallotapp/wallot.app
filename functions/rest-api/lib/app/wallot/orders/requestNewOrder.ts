import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	assetsApi,
	assetOrdersApi,
	CreateAssetOrderParams,
	CreateOrderParams,
	ordersApi,
	RequestNewOrderParams,
	RequestNewOrderResponse,
	usersApi,
	User,
	isKycUser,
} from '@wallot/js';
import { db, gcp } from '../../../services.js';

export const requestNewOrder = async (
	{ amount: amountInCents, side, symbol }: RequestNewOrderParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<RequestNewOrderResponse>> => {
	if (firebaseUser == null) throw new Error('Unauthorized');

	// Create a batch
	const batch = db.batch();

	// Query the asset where the symbol matches
	const assetSnapshot = await db
		.collection(assetsApi.collectionId)
		.where('symbol', '==', symbol)
		.limit(1)
		.get();
	const assetDoc = assetSnapshot.docs[0];
	if (assetDoc == null) throw new Error('Asset not found');
	const assetId = assetDoc.id;

	// Query the user where the _id matches
	const userSnapshot = await db
		.collection(usersApi.collectionId)
		.where('_id', '==', firebaseUser.uid)
		.limit(1)
		.get();
	const userDoc = userSnapshot.docs[0];
	if (userDoc == null) throw new Error('Asset not found');
	const user = userDoc.data() as User;
	if (!isKycUser(user)) throw new Error('User is not KYC verified');
	const { default_bank_account: defaultBankAccountId } = user;

	// Create the asset order
	const orderId = ordersApi.generateId();
	const assetOrderId = assetOrdersApi.generateId();
	const createAssetOrderParams: CreateAssetOrderParams = {
		amount: amountInCents,
		asset: assetId,
		order: orderId,
		category: 'default',
		name: '',
		recommendations: [],
		alpaca_order_side: side,
		alpaca_order_symbol: symbol,
	};
	const assetOrder = assetOrdersApi.mergeCreateParams({
		createParams: createAssetOrderParams,
	});
	const assetOrderCollectionId = assetOrdersApi.collectionId;
	const assetOrderDocRef = db
		.collection(assetOrderCollectionId)
		.doc(assetOrderId);
	batch.set(assetOrderDocRef, assetOrder);

	// Create the order
	const createOrderParams: CreateOrderParams = {
		bank_account: defaultBankAccountId,
		user: firebaseUser.uid,
		name: '',
		category: 'default',
		_id: orderId,
	};
	const order = ordersApi.mergeCreateParams({
		createParams: createOrderParams,
	});
	const orderCollectionId = ordersApi.collectionId;
	const orderDocRef = db.collection(orderCollectionId).doc(orderId);
	batch.set(orderDocRef, order);

	// Commit the batch
	await batch.commit();

	// Enqueue the place alpaca orders task
	await gcp.tasks.enqueuePlaceAlpacaOrders({
		orderId,
	});
	return { json: {} };
};
