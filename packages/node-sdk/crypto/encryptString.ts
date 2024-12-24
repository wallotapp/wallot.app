import { default as crypto } from 'crypto';
import { encryptionAlgorithm } from './encryptionAlgorithm.js';

export type EncryptedData = {
	ivHex: string;
	data: string;
};

/**
 * Encrypt a plaintext string.
 * Returns an object containing:
 *    { iv: string, data: string }
 */
export const encryptString =
	(encryptionKey: string) =>
	(plainText: string): EncryptedData => {
		// Generate a new IV for each encryption
		const iv = crypto.randomBytes(16);

		const cipher = crypto.createCipheriv(
			encryptionAlgorithm,
			encryptionKey,
			iv,
		);
		let encrypted = cipher.update(plainText, 'utf8', 'hex');
		encrypted += cipher.final('hex');

		return {
			ivHex: iv.toString('hex'),
			data: encrypted,
		};
	};
