import { readFileSync, statSync } from 'fs';
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

const rootPackageJsonPath = `${directoryPath}/../../../package.json`;
if (!statSync(rootPackageJsonPath).isFile()) {
	throw new Error(`${rootPackageJsonPath} is not a file`);
}
const { version: PLATFORM_VERSION } = JSON.parse(
	readFileSync(rootPackageJsonPath, 'utf-8'),
) as {
	version: string;
};

export const secrets = { ...secretData, PLATFORM_VERSION };
