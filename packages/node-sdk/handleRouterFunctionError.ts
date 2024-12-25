import * as express from 'express';
import { GeneralizedResLocals } from 'ergonomic-node';
import { getGeneralizedError } from 'ergonomic';

export const handleRouterFunctionError = <TResponseData>(res: express.Response<TResponseData, GeneralizedResLocals>, err: unknown) => {
	const message = (err as Error)?.message || 'Unknown error';
	res.locals.json = getGeneralizedError({ message });
};
