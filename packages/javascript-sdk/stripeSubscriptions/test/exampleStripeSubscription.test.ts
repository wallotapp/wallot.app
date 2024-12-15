import { StripeSubscription, stripeSubscriptionsApi } from '../models/index.js';

describe('StripeSubscription', () => {
	test('exampleStripeSubscription', () => {
		const { apiResourceDefaultJson } = stripeSubscriptionsApi;
		const exampleStripeSubscription: StripeSubscription = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My StripeSubscription',
		};
		expect(exampleStripeSubscription).toEqual<typeof exampleStripeSubscription>(
			{
				_id: expect.any(String),
				_date_last_modified: expect.any(String),
				_created_by: expect.any(String),
				_object: 'stripe_subscription',
				category: 'default',
				_archived: false,
				_date_created: expect.any(String),
				_deleted: false,
				description: '',
				name: 'My StripeSubscription',
			},
		);
	});
});
