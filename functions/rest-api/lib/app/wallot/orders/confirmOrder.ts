import { secrets } from '../../../secrets.js';
import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	achTransfersApi,
	bankAccountsApi,
	BankAccount,
	getHomeSiteRoute,
	ConfirmOrderParams,
	ConfirmOrderRouteParams,
	ConfirmOrderResponse,
	OrderConfirmedByUserParams,
	ordersApi,
	UpdateOrderParams,
	licensesApi,
	License,
	isProLicense,
	usersApi,
	User,
	ProLicenseParams,
	FALLBACK_IP_ADDRESS,
	UpdateUserParams,
	CompleteUserKycParams,
} from '@wallot/js';
import { db, gcp, log, stripe } from '../../../services.js';
import { siteOriginByTarget, variables } from '../../../variables.js';
import { getUtcDateNow } from 'ergonomic';

export const confirmOrder = async (
	{ bank_account }: ConfirmOrderParams,
	{ orderId }: ConfirmOrderRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
	headers: Record<string, unknown>,
): Promise<FunctionResponse<ConfirmOrderResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');

	// Get BANK_ACCOUNT and USER concurrently
	const [bankAccountDoc, userDoc] = await Promise.all([
		db.collection(bankAccountsApi.collectionId).doc(bank_account).get(),
		db.collection(usersApi.collectionId).doc(firebaseUser.uid).get(),
	]);

	if (!bankAccountDoc.exists) throw new Error('Bank account not found');
	const bankAccount = bankAccountDoc.data() as BankAccount;

	if (!userDoc.exists) throw new Error('User not found');
	const user = userDoc.data() as User;

	// Create a batch
	const batch = db.batch();

	// Create agreements object
	const ipAddress = String(
		headers['x-forwarded-for'] ?? headers['x-real-ip'] ?? FALLBACK_IP_ADDRESS,
	);
	const customerAgreement = (
		(user.alpaca_account_agreements ??
			[]) as CompleteUserKycParams['alpaca_account_agreements']
	).find((agreement) => agreement?.agreement === 'customer_agreement');
	if (customerAgreement == null || ipAddress !== customerAgreement.ip_address) {
		const updatedAgreements = (
			(user.alpaca_account_agreements ??
				[]) as CompleteUserKycParams['alpaca_account_agreements']
		)
			.filter((agreement) => agreement?.agreement !== 'customer_agreement')
			.concat({
				...(customerAgreement ?? {
					agreement: 'customer_agreement',
					signed_at: getUtcDateNow(),
				}),
				ip_address: ipAddress,
			});
		const updateUserParams: UpdateUserParams = {
			alpaca_account_agreements: updatedAgreements,
		};
		log({
			message: 'Updating customer agreement for user',
			updateUserParams,
			userId: user._id,
		});
		batch.update(
			db.collection(usersApi.collectionId).doc(user._id),
			updateUserParams,
		);
	}

	// Subscribe the user to Wallot Pro if they are on free plan
	const licensesQuerySnapshot = await db
		.collection(licensesApi.collectionId)
		.where('user', '==', firebaseUser.uid)
		.get();
	const licenseDoc = licensesQuerySnapshot.docs[0];
	if (!licenseDoc) throw new Error('License not found');
	const license = licenseDoc.data() as License;
	log({ message: 'License found', license });
	if (!isProLicense(license)) {
		log({ message: 'User does not have a pro license' });
		if (user.stripe_customer_id == null) {
			throw new Error('User does not have a Stripe customer ID');
		}
		// 1. Create and confirm a SetupIntent with mandate data
		const userAgent = String(headers['user-agent'] ?? 'user-agent not found');
		const setupIntent = await stripe.setupIntents.create({
			payment_method_types: ['us_bank_account'],
			customer: user.stripe_customer_id,
			payment_method_data: {
				type: 'us_bank_account',
				us_bank_account: {
					financial_connections_account:
						bankAccount.stripe_financial_connections_account_id,
				},
				billing_details: {
					email: user.firebase_auth_email,
					name: user.name,
				},
			},
			mandate_data: {
				customer_acceptance: {
					type: 'online',
					online: {
						ip_address: ipAddress,
						user_agent: userAgent,
					},
				},
			},
			confirm: true,
		});
		log({ message: 'SetupIntent created', setupIntent });
		if (setupIntent.payment_method == null) {
			throw new Error('Payment method not found');
		}

		const stripeSubscription = await stripe.subscriptions.create({
			customer: user.stripe_customer_id,
			default_payment_method:
				typeof setupIntent.payment_method === 'string'
					? setupIntent.payment_method
					: setupIntent.payment_method.id,
			expand: ['latest_invoice.payment_intent'],
			items: [
				{
					price:
						secrets.SECRET_CRED_STRIPE_PRO_LICENSE_PRODUCT_MONTHLY_PRICE_ID,
					quantity: 1,
				},
			],
			metadata: {
				user_id: user._id,
				firebase_auth_email: user.firebase_auth_email || 'No email',
				license_id: license._id,
			},
			payment_behavior: 'error_if_incomplete',
			payment_settings: {
				payment_method_types: ['us_bank_account'],
				payment_method_options: {
					us_bank_account: {
						verification_method: 'automatic',
					},
				},
				save_default_payment_method: 'on_subscription',
			},
		});
		const licenseUpdateParams: ProLicenseParams = {
			stripe_subscription_id: stripeSubscription.id,
			plan: 'pro',
		};
		log({
			message: 'Stripe subscription created',
			licenseUpdateParams,
			stripeSubscription,
		});
		batch.update(
			db.collection(licensesApi.collectionId).doc(license._id),
			licenseUpdateParams,
		);
	} else {
		log({ message: 'User already has a pro license' });
	}

	// Update ORDER status
	const orderUpdateParams: UpdateOrderParams & OrderConfirmedByUserParams = {
		bank_account,
		status: 'confirmed_by_user',
	};
	log({ message: 'Updating order', orderUpdateParams });
	batch.update(
		db.collection(ordersApi.collectionId).doc(orderId),
		orderUpdateParams,
	);

	// Commit batch
	await batch.commit();

	// Construct redirect URL
	const redirectUrl = getHomeSiteRoute({
		origin: siteOriginByTarget.HOME_SITE,
		includeOrigin: true,
		queryParams: { order_id: orderId },
		routeStaticId: 'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS',
	});

	const onFinished = async () => {
		if (variables.SERVER_VAR_FEATURE_FLAGS.ENABLE_ALPACA) {
			// Enqueue placeAlpacaOrders task
			await gcp.tasks.enqueuePlaceAlpacaOrders({
				achTransferId: achTransfersApi.generateId(),
				orderId,
			});
		}
	};

	return { json: { redirect_url: redirectUrl }, onFinished };
};
