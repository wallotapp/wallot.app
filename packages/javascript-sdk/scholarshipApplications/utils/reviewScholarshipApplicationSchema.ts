import * as yup from 'yup';
import { Keys, getFieldSpecByFieldKey, YupHelpers } from 'ergonomic';
import {
	ScholarshipApplication,
	ScholarshipApplicationStatusEnum,
} from '../models/scholarshipApplicationProperties.js';

export const reviewScholarshipApplicationProperties = {
	status: YupHelpers.constant(ScholarshipApplicationStatusEnum.obj.reviewed),
} as const;
export const reviewScholarshipApplicationSchema = yup.object(
	reviewScholarshipApplicationProperties,
);
export const reviewScholarshipApplicationSchemaFieldSpecByFieldKey =
	getFieldSpecByFieldKey(
		reviewScholarshipApplicationSchema,
		Keys(reviewScholarshipApplicationProperties),
	);

export type ReviewScholarshipApplicationParams = yup.InferType<
	typeof reviewScholarshipApplicationSchema
>;
export type ReviewScholarshipApplicationResponse = Record<string, never>;

export type ReviewedScholarshipApplication = ScholarshipApplication &
	ReviewScholarshipApplicationParams;
export const isReviewedScholarshipApplication = (
	scholarshipApplication: ScholarshipApplication,
): scholarshipApplication is ReviewedScholarshipApplication => {
	try {
		reviewScholarshipApplicationSchema.validateSync(scholarshipApplication);
		return true;
	} catch (error) {
		console.error('Error detected in isReviewedScholarshipApplication', error);
		return false;
	}
};
