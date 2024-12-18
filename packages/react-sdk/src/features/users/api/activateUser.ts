import { handleKyError } from 'ergonomic';
import { defaultKyInstance } from '@wallot/react/src/lib/ky';
import { ActivateUserParams, ActivateUserResponse } from '@wallot/js';

export const activateUser = async (params: ActivateUserParams) => {
	try {
		const data = await defaultKyInstance
			.post('v0/users/activate', {
				json: params,
			})
			.json<ActivateUserResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
