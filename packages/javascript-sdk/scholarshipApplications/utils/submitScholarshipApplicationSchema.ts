import * as yup from 'yup';
import { Keys, getEnum, getFieldSpecByFieldKey } from 'ergonomic';
import {
	ScholarshipApplication,
	ScholarshipApplicationStatusEnum,
} from '../models/scholarshipApplicationProperties.js';

export const SubmittedScholarshipApplicationStatusEnum = getEnum([
	ScholarshipApplicationStatusEnum.obj.submitted,
	ScholarshipApplicationStatusEnum.obj.reviewed,
]);

export const submitScholarshipApplicationProperties = {
	status: SubmittedScholarshipApplicationStatusEnum.getDefinedSchema(),
} as const;
export const submitScholarshipApplicationSchema = yup.object(
	submitScholarshipApplicationProperties,
);
export const submitScholarshipApplicationSchemaFieldSpecByFieldKey =
	getFieldSpecByFieldKey(
		submitScholarshipApplicationSchema,
		Keys(submitScholarshipApplicationProperties),
	);

export type SubmitScholarshipApplicationParams = yup.InferType<
	typeof submitScholarshipApplicationSchema
>;
export type SubmitScholarshipApplicationResponse = Record<string, never>;

export type SubmittedScholarshipApplication = ScholarshipApplication &
	SubmitScholarshipApplicationParams;
export const isSubmittedScholarshipApplication = (
	scholarshipApplication: ScholarshipApplication,
): scholarshipApplication is SubmittedScholarshipApplication => {
	try {
		submitScholarshipApplicationSchema.validateSync(scholarshipApplication);
		return true;
	} catch (error) {
		console.error('Error detected in isSubmittedScholarshipApplication', error);
		return false;
	}
};
