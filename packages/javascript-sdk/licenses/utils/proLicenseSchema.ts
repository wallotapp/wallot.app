import * as yup from 'yup';
import { YupHelpers } from 'ergonomic';
import { License } from '../models/licenseProperties.js';

export const proLicenseProperties = {
	plan: YupHelpers.constant('pro'),
};
export const proLicenseSchema = yup.object(proLicenseProperties);

export type ProLicenseParams = yup.InferType<typeof proLicenseSchema>;
export type ProLicense = License & ProLicenseParams;

export const isProLicense = (license: License): license is ProLicense => {
	try {
		proLicenseSchema.validateSync(license);
		return true;
	} catch (error) {
		return false;
	}
};
