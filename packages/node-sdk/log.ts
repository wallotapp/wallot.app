import * as util from 'util';
import { firebaseFunctions } from 'ergonomic-node';

export const log =
	(protocol: 'http' | 'https') =>
	(log: unknown, { type }: { type: 'error' | 'normal' } = { type: 'normal' }) => {
		if (protocol === 'http') {
			const logger = type === 'error' ? console.error : console.log;
			logger(
				util.inspect(log, {
					showHidden: false,
					depth: null,
					colors: true,
				}),
			);
		} else {
			const logger = type === 'error' ? firebaseFunctions.logger.error : firebaseFunctions.logger.log;
			logger(log);
		}
	};
