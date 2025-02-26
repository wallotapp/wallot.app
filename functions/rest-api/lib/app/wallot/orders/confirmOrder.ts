import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	ConfirmOrderParams,
	ConfirmOrderRouteParams,
	ConfirmOrderResponse,
} from '@wallot/js';

export const confirmOrder = async (
	_params: ConfirmOrderParams,
	_routeParams: ConfirmOrderRouteParams,
	_query: Record<string, never>,
	_firebaseUser: FirebaseUser | null,
	_headers: Record<string, unknown>,
): Promise<FunctionResponse<ConfirmOrderResponse>> => {
	throw new Error('Not implemented yet');
};
