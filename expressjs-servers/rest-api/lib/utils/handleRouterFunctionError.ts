import * as express from 'express';
import { GeneralizedResponse, getGeneralizedError } from 'ergonomic';

export const handleRouterFunctionError = (
	res: express.Response<unknown, GeneralizedResponse<unknown>>,
	next: express.NextFunction,
	err: unknown,
) => {
	const message = (err as Error)?.message || 'Unknown error';
	res.locals.errors = res.locals.errors?.length
		? res.locals.errors
		: [getGeneralizedError({ message })];
	return next();
};
