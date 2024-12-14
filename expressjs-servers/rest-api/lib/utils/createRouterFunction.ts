import * as express from 'express';
import { GeneralizedResponse } from 'ergonomic';
import { handleRouterFunctionError } from './handleRouterFunctionError.js';

export const createRouterFunction = <TResponseData, TParams>(
	mainLogicFn: (args: TParams) => Promise<TResponseData[]>,
) => {
	return (
			req: express.Request<unknown, unknown, TParams>,
			res: express.Response<unknown, GeneralizedResponse<TResponseData>>,
			next: express.NextFunction,
		) =>
		() => {
			return void (async () => {
				try {
					// Extract the ID token from the request body
					const params = req.body;

					// Store the custom token in the response locals
					res.locals.data = await mainLogicFn(params);

					// Proceed to the next middleware
					return next();
				} catch (err) {
					return handleRouterFunctionError(res, next, err);
				}
			});
		};
};
