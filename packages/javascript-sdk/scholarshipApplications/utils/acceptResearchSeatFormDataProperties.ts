import { DateTime } from 'luxon';
import * as yup from 'yup';
import {
	EnumMember,
	GeneralizedFieldTypeEnum,
	getEnum,
	getFieldSpecByFieldKey,
	Keys,
	YupHelpers,
} from 'ergonomic';

export const acceptResearchSeatFormDataProperties = {
	client_verification: yup.string().default(''),
	date: YupHelpers.date().default(DateTime.local().toFormat('yyyy-MM-dd')), // user
	parent_email: YupHelpers.emailAddress().required().trim().lowercase(),
	parent_name: yup
		.string()
		.default('')
		.required()
		.label('Parent or Guardian Full Name')
		.trim()
		.meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
	parent_relationship_to_student: yup
		.string()
		.default('')
		.required()
		.label('Relationship to Student')
		.trim()
		.meta({
			label_message_user_text: 'e.g. Father, Mother or Legal Guardian',
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
	student_name: yup
		.string()
		.default('')
		.required()
		.label('Full Name')
		.trim()
		.meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
};

export const AcceptResearchSeatFormDataFieldEnum = getEnum(
	Keys(acceptResearchSeatFormDataProperties),
);
export type AcceptResearchSeatFormDataField = EnumMember<
	typeof AcceptResearchSeatFormDataFieldEnum
>;
export const AcceptResearchSeatFormDataFieldFromUserDataEnum = getEnum([
	'parent_email',
	'parent_name',
	'parent_relationship_to_student',
	'student_name',
]);
export type AcceptResearchSeatFormDataFieldFromUser = EnumMember<
	typeof AcceptResearchSeatFormDataFieldFromUserDataEnum
>;

export const acceptResearchSeatFormDataSchema = yup.object(
	acceptResearchSeatFormDataProperties,
);
export const acceptResearchSeatFormDataSchemaFieldSpecByFieldKey =
	getFieldSpecByFieldKey(
		acceptResearchSeatFormDataSchema,
		Keys(acceptResearchSeatFormDataProperties),
	);
export type AcceptResearchSeatFormDataParams = yup.InferType<
	typeof acceptResearchSeatFormDataSchema
>;
export type AcceptResearchSeatFormDataResponse = Record<string, never>;

export type ResearchAcceptanceLetter = {
	research_seat_acceptance_letter: string;
	research_seat_signed_acceptance_letter: string | null;
};
