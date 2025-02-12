import { EnumMember, getEnum } from 'ergonomic';

export const ScholarshipApplicationFormSectionEnum = getEnum([
	'Contact Details',
	'Short Answer Questions',
	'Personal Essays',
]);
export type ScholarshipApplicationFormSectionEnum = EnumMember<
	typeof ScholarshipApplicationFormSectionEnum.obj
>;
