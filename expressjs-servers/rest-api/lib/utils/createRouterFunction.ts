import * as express from 'express';
import { GeneralizedResponse } from 'ergonomic';
import { handleRouterFunctionError } from './handleRouterFunctionError.js';

/**
 * Creates an Express router function that handles asynchronous operations.
 *
 * @template TResponseData - The type of the response data.
 * @template TParams - The type of the parameters.
 * @param {function(TParams): Promise<TResponseData[]>} fn - The asynchronous function to be executed.
 * @returns An Express middleware function.
 */
export const createRouterFunction = <TResponseData, TParams>(
	fn: (args: TParams) => Promise<TResponseData[]>,
) => {
	return (
			req: express.Request<unknown, unknown, TParams>,
			res: express.Response<unknown, GeneralizedResponse<TResponseData>>,
			next: express.NextFunction,
		) =>
		() => {
			return void (async () => {
				try {
					// Extract the parameters from the request body
					const params = req.body;

					// Call the router function
					res.locals.data = await fn(params);

					// Proceed to the next middleware
					return next();
				} catch (err) {
					return handleRouterFunctionError(res, next, err);
				}
			});
		};
};
