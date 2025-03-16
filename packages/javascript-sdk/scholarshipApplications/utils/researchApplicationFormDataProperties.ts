import { EnumMember, GeneralizedFieldTypeEnum, getEnum } from 'ergonomic';
import * as yup from 'yup';

export type ResearchApplicationFormSchema = {
	steps: { subtitle?: string; title: string }[];
	label_data_by_field_key: Record<
		string,
		{ label: string; label_message?: string }
	>;
	research_application_s1_q0_entries: {
		category: string;
		subtitle?: string;
		title: string;
	}[];
	research_application_s4_q2_entries: { subtitle?: string; title: string }[];
	research_application_s4_q3_entries: { subtitle?: string; title: string }[];
};
export const fallbackResearchApplicationFormSchema: ResearchApplicationFormSchema =
	{
		label_data_by_field_key: {},
		steps: [],
		research_application_s1_q0_entries: [],
		research_application_s4_q2_entries: [],
		research_application_s4_q3_entries: [],
	};
export type ResearchApplicationServerData = Record<string, never>;
export type ResearchApplicationClientData = Record<string, never>;

export const researchApplicationFormDataPropertiesBySectionSource = {
	0: {
		research_application_s0_q0: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
		research_application_s0_q1: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
		research_application_s0_q2: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		research_application_s0_q3: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
	},
	2: {
		research_application_s2_q0: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
		research_application_s2_q1: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		research_application_s2_q2: yup.string().default('').optional().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
		research_application_s2_q3: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
		research_application_s2_q5: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		research_application_s2_q4: yup.string().default('').optional().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
	},
	3: {
		research_application_s3_q0: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		research_application_s3_q1: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		research_application_s3_q2: yup.string().default('').optional().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
	},
	4: {
		research_application_s4_q0: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		research_application_s4_q1: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		research_application_s4_q4: yup.string().default('').optional().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		research_application_s4_q5: yup.string().default('').optional().meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
	},
	5: {
		research_application_s5_q0: yup.string().default('').required().meta({
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}),
	},
};

export const ResearchApplicationFormDataFieldKeyEnum = getEnum([
	'research_application_s0_q0',
	'research_application_s0_q1',
	'research_application_s0_q2',
	'research_application_s0_q3',
	'research_application_s1_q0',
	'research_application_s2_q0',
	'research_application_s2_q1',
	'research_application_s2_q2',
	'research_application_s2_q3',
	'research_application_s2_q4',
	'research_application_s2_q5',
	'research_application_s3_q0',
	'research_application_s3_q1',
	'research_application_s3_q2',
	'research_application_s4_q0',
	'research_application_s4_q1',
	'research_application_s4_q2',
	'research_application_s4_q3',
	'research_application_s4_q4',
	'research_application_s4_q5',
	'research_application_s5_q0',
	'research_application_s6_q0',
	'research_application_s6_q1',
	'research_application_s6_q2',
	'research_application_s6_q3',
	'research_application_s6_q4',
]);
export type ResearchApplicationFormDataFieldKey = EnumMember<
	typeof ResearchApplicationFormDataFieldKeyEnum
>;

export type ResearchApplicationFormData = Record<
	ResearchApplicationFormDataFieldKey,
	string
>;
