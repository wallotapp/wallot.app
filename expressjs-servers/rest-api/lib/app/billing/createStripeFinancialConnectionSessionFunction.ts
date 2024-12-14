import * as express from 'express';
import { getGeneralizedError } from 'ergonomic';
import {
	CreateStripeFinancialConnectionSessionFormData,
	StripeFinancialConnectionSessionResponseData,
} from '@wallot/js';

export const createStripeFinancialConnectionSessionFunction =
	(
		_req: express.Request<
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
