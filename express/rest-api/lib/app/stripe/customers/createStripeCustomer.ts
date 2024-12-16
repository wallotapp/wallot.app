import { RegisterUserParams } from '@wallot/js';
import { stripe } from '../../../services.js';

export const createStripeCustomer = ({
	email,
	metadata,
	username,
}: RegisterUserParams & { metadata: { _id: string; user_id: string } }) =>
	stripe.customers.create({
		email: email,
		metadata,
		name: username,
	});
