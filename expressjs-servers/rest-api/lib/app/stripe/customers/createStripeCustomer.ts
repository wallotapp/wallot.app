import * as express from 'express';
import { GeneralizedResponse, getGeneralizedError } from 'ergonomic';

export const createStripeCustomer =
	(
		_req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResponse<unknown>>,
		next: express.NextFunction,
	) =>
	() => {
		return void (async () => {
			try {
				// Wait 1 second
				await new Promise((resolve) => setTimeout(resolve, 2500));
				// Response
				res.locals.data = [];
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
