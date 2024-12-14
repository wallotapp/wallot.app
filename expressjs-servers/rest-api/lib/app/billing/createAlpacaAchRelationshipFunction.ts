import * as express from 'express';
import { GeneralizedResponse, getGeneralizedError } from 'ergonomic';
import {
	CreateAlpacaAchRelationshipsParams,
	AlpacaAchRelationship,
} from '@wallot/js';

export const createAlpacaAchRelationshipFunction =
	(
		_req: express.Request<unknown, unknown, CreateAlpacaAchRelationshipsParams>,
		res: express.Response<unknown, GeneralizedResponse<AlpacaAchRelationship>>,
		next: express.NextFunction,
	) =>
	() => {
		return void (async () => {
			try {
				// Wait 1 second
				await new Promise((resolve) => setTimeout(resolve, 2500));
				// Response
				res.locals.data = [
					{
						bank_account_number_last4: '1234',
						bank_account_type: 'checking',
						id: 'relationship_1',
						status: 'QUEUED',
					},
				];
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
