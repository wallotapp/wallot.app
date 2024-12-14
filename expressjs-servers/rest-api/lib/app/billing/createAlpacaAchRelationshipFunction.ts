import * as express from 'express';
import { getGeneralizedError } from 'ergonomic';
import {
	CreateStripeFinancialConnectionSessionParams,
	StripeFinancialConnectionSession,
} from '@wallot/js';

export const createAlpacaAchRelationshipFunction =
	(
		_req: express.Request<
			unknown,
			unknown,
			CreateStripeFinancialConnectionSessionParams
		>,
		res: express.Response<unknown, StripeFinancialConnectionSession>,
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
