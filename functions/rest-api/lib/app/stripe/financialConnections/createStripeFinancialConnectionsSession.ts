import { type Stripe } from 'stripe';
import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	CreateStripeFinancialConnectionsSessionParams,
	CreateStripeFinancialConnectionsSessionResponse,
	User,
	usersApi,
} from '@wallot/js';
import { db, log, stripe } from '../../../services.js';
import { variables } from '../../../variables.js';

export const createStripeFinancialConnectionsSession = async (
	_body: CreateStripeFinancialConnectionsSessionParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<
	FunctionResponse<CreateStripeFinancialConnectionsSessionResponse>
> => {
	if (!firebaseUser) throw new Error('Unauthorized');

	// Locate USER by Firebase UID
	const usersCollectionId = usersApi.collectionId;
	const user = (
		await db.collection(usersCollectionId).doc(firebaseUser.uid).get()
	).data() as User;
	const { stripe_customer_id } = user;

	// Create a Financial Connections session
	const session = await stripe.financialConnections.sessions.create({
		account_holder: {
			customer: stripe_customer_id,
			type: 'customer',
		},
		permissions: [
			'balances' as const,
			'ownership' as const,
			'payment_method' as const,
			'transactions' as const,
			variables.SERVER_VAR_FEATURE_FLAGS.ENABLE_ACCOUNT_NUMBERS_STRIPE_PERMISSION
				? ('account_numbers' as unknown as Stripe.FinancialConnections.SessionCreateParams.Permission)
				: null,
		].filter(
			(permission): permission is Exclude<typeof permission, null> =>
				permission != null,
		),
	});
	log({
		message: 'Stripe Financial Connections session created',
		session,
	});
	if (session.client_secret == null)
		throw new Error('Session does not have a client secret');

	// Return the session client secret
	return { json: { client_secret: session.client_secret } };
};
