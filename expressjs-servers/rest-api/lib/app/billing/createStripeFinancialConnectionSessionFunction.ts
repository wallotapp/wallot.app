import * as express from 'express';
import { getGeneralizedError } from 'ergonomic';
import {
	CreateStripeFinancialConnectionSessionFormData,
	StripeFinancialConnectionSessionResponseData,
} from '@wallot/js';

export const createStripeFinancialConnectionSessionFunction =
	(
		req: express.Request<
			unknown,
			unknown,
			CreateStripeFinancialConnectionSessionFormData
		>,
		res: express.Response<
			unknown,
			StripeFinancialConnectionSessionResponseData
		>,
		next: express.NextFunction,
	) =>
	() => {
		return void (async () => {
			try {
				const { stripe_customer_id } = req.body;
				console.log(
					'stripe_customer_id',
					stripe_customer_id.slice(0, 7) + '...',
				);
				// Wait 1 second
				await new Promise((resolve) => setTimeout(resolve, 2500));
				// Response
				res.locals.data = [{ client_secret: 'todo' }];
				return next();
			} catch (err) {
				const message = (err as Error)?.message || 'Unknown error';
				res.locals.errors = res.locals.errors?.length
					? res.locals.errors
					: [getGeneralizedError({ message })];
				return next();
			}
		})();
	};
