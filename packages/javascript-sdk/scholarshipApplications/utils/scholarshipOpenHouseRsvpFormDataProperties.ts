import * as yup from 'yup';
import {
	EnumMember,
	GeneralizedFieldTypeEnum,
	getEnum,
	getFieldSpecByFieldKey,
	Keys,
	YupHelpers,
} from 'ergonomic';

export const scholarshipOpenHouseRsvpFormDataProperties = {
	accessibility_requests: yup.string().default('').meta({
		label_message_user_text:
			'Please let us know if you have any accessibility requirements in order to attend the event. We will do our best to accommodate your needs.',
		type: GeneralizedFieldTypeEnum.obj.long_text,
	}),
	email: YupHelpers.emailAddress()
		.required()
		.trim()
		.lowercase()
		.label('RSVP Email'),
	is_attending_with_parent: YupHelpers.booleanDefaultFalse().label(
		'Will you be attending with a parent or guardian?',
	),
	parent_emails: YupHelpers.array(yup.string().defined())
		.label('Parent or Guardian RSVP Email')
		.defined(),
	open_house_lookup_key: yup.string().default(''),
};
export const ScholarshipOpenHouseRsvpFormDataFieldEnum = getEnum(
	Keys(scholarshipOpenHouseRsvpFormDataProperties),
);
export type ScholarshipOpenHouseRsvpFormDataField = EnumMember<
	typeof ScholarshipOpenHouseRsvpFormDataFieldEnum
>;
export const ScholarshipOpenHouseRsvpFormDataFieldFromUserDataEnum = getEnum([
	'email',
	'accessibility_requests',
	'is_attending_with_parent',
	'parent_emails',
]);
export const scholarshipOpenHouseRsvpFormDataSchema = yup.object(
	scholarshipOpenHouseRsvpFormDataProperties,
);
export const scholarshipOpenHouseRsvpFormDataSchemaFieldSpecByFieldKey =
	getFieldSpecByFieldKey(
		scholarshipOpenHouseRsvpFormDataSchema,
		Keys(scholarshipOpenHouseRsvpFormDataProperties),
	);
export type ScholarshipOpenHouseRsvpFormDataParams = yup.InferType<
	typeof scholarshipOpenHouseRsvpFormDataSchema
>;
export type ScholarshipOpenHouseRsvpFormDataRouteParams = {
	scholarshipOpenHouseRsvpId: string;
};
export type ScholarshipOpenHouseRsvpFormDataResponse = Record<string, never>;
