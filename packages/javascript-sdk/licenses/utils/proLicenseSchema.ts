import * as yup from 'yup';
import { YupHelpers } from 'ergonomic';
import { License, licensesApi } from '../models/licenseProperties.js';

export const proLicenseProperties = {
	plan: YupHelpers.constant('pro'),
	stripe_subscription_id: licensesApi.properties.stripe_subscription_id
		.nullable(false)
		.defined()
		.min(1),
};
export const proLicenseSchema = yup.object(proLicenseProperties);

export type ProLicenseParams = yup.InferType<typeof proLicenseSchema>;
export type ProLicense = License & ProLicenseParams;

export const isProLicense = (license: License): license is ProLicense => {
	try {
		proLicenseSchema.validateSync(license);
		return true;
	} catch (error) {
		console.error('Error detected in isProLicense', error);
		return false;
	}
};
