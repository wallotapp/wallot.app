import { default as crypto } from 'crypto';
import { encryptionAlgorithm } from './encryptionAlgorithm.js';
import { EncryptedData } from './encryptString.js';

/**
 * Decrypt an encrypted string, given the IV.
 */
export const decryptString =
	(encryptionKey: string) =>
	({ data, ivHex }: EncryptedData) => {
		const iv = Buffer.from(ivHex, 'hex');
		const decipher = crypto.createDecipheriv(
			encryptionAlgorithm,
			Buffer.from(encryptionKey, 'hex'),
			iv,
		);
		let decrypted = decipher.update(data, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	};
