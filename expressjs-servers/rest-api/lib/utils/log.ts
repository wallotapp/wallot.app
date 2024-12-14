import * as util from 'util';
import { firebaseFunctions } from 'ergonomic-node';
import { secrets } from '../secrets.js';
const { SECRET_CRED_SERVER_PROTOCOL } = secrets;

export const log = (
	log: unknown,
	{ type }: { type: 'error' | 'normal' } = { type: 'normal' },
) => {
	if (SECRET_CRED_SERVER_PROTOCOL === 'http') {
		const logger = type === 'error' ? console.error : console.log;
		logger(
			util.inspect(log, {
				showHidden: false,
				depth: null,
				colors: true,
			}),
		);
	} else {
		const logger =
			type === 'error'
				? firebaseFunctions.logger.error
				: firebaseFunctions.logger.log;
		logger(log);
	}
};
