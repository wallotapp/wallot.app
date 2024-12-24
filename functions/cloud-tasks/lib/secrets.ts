import { statSync } from 'fs';
import { getSecretData } from 'ergonomic-node';
import { SecretData } from '@wallot/node';
import { directoryPath } from './directoryPath.js';

const envPath = `${directoryPath}/../.env`;
if (!statSync(envPath).isFile()) {
	throw new Error(`${envPath} is not a file`);
}

const secretData = getSecretData<SecretData>(envPath);
if (secretData === null) {
	throw new Error('Incomplete or missing secrets');
}

export const secrets = secretData;
