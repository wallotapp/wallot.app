import { statSync } from 'fs';
import { GeneralizedSecretData, getSecretData } from 'ergonomic-node';
import { directoryPath } from './directoryPath.js';

export type SecretData = GeneralizedSecretData & {
	SECRET_CRED_ALPACA_BROKER_API_BASE_URL: string;
	SECRET_CRED_ALPACA_BROKER_API_KEY: string;
	SECRET_CRED_ALPACA_BROKER_API_SECRET: string;
	SECRET_CRED_ALPHA_VANTAGE_API_KEY: string;
	SECRET_CRED_OPENAI_API_KEY: string;
	SECRET_CRED_STRIPE_API_KEY: string;
	SECRET_CRED_STRIPE_PRO_LICENSE_PRODUCT_ID: string;
	SECRET_CRED_STRIPE_PRO_LICENSE_PRODUCT_MONTHLY_PRICE_ID: string;
};

const envPath = `${directoryPath}/../.env`;
if (!statSync(envPath).isFile()) {
	throw new Error(`${envPath} is not a file`);
}

const secretData = getSecretData<SecretData>(envPath);
if (secretData === null) {
	throw new Error('Incomplete or missing secrets');
}

export const secrets = secretData;
