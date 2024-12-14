import * as express from 'express';
import { getGeneralizedError } from 'ergonomic';

export const handleRouterFunctionError = (
	res: express.Response,
	next: express.NextFunction,
	err: unknown,
) => {
	const message = (err as Error)?.message || 'Unknown error';
	res.locals.errors = res.locals.errors?.length
		? res.locals.errors
		: [getGeneralizedError({ message })];
	return next();
};
