import { handleKyError } from 'ergonomic';
import { defaultKyInstance } from '@wallot/react/src/lib/ky';
import { RegisterUserParams, RegisterUserResponse } from '@wallot/js';

export const registerUser = async (params: RegisterUserParams) => {
	try {
		const data = await defaultKyInstance
			.post('v0/users', {
				headers: {
					'X-Obfuscate-Request-Body-Properties': 'password',
				},
				json: params,
			})
			.json<RegisterUserResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
