import * as express from 'express';
import { GeneralizedResLocals } from 'ergonomic-node';
import { handleRouterFunctionError } from '../../../utils/handleRouterFunctionError';

export const createUser =
	(
		_req: express.Request<unknown, unknown, unknown>,
		res: express.Response<unknown, GeneralizedResLocals>,
		next: express.NextFunction,
	) =>
	() => {
		return void (async () => {
			try {
				// Wait 1 second
				await new Promise((resolve) => setTimeout(resolve, 2500));
				// Response
				res.locals.json = [];
				return next();
			} catch (err) {
				return handleRouterFunctionError(res, next, err);
			}
		})();
	};
