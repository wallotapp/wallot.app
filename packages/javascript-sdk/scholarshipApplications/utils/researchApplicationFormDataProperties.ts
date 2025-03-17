import {
	EnumMember,
	GeneralizedFieldTypeEnum,
	getEnum,
	getFieldSpecByFieldKey,
	Keys,
	YupHelpers,
} from 'ergonomic';
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

const checkbox = () =>
	yup
		.mixed()
		.oneOf([true, false, null, ''])
		.default(null)
		.optional()
		.meta({ type: GeneralizedFieldTypeEnum.obj.boolean });
const list = () =>
	YupHelpers.array(
		yup.object({
			details: yup.string().default('').defined(),
			title: yup.string().default('').defined(),
		}),
	).defined();

export const researchApplicationFormDataPropertiesSource = {
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
	research_application_s1_q0: YupHelpers.array(
		yup.string().defined(),
	).defined(),
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
	research_application_s3_q0: yup.string().default('').required().meta({
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	research_application_s3_q1: yup.string().default('').required().meta({
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	research_application_s3_q2: yup.string().default('').optional().meta({
		type: GeneralizedFieldTypeEnum.obj.long_text,
	}),
	research_application_s4_q0: yup.string().default('').required().meta({
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	research_application_s4_q1: yup.string().default('').required().meta({
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	research_application_s4_q2: list(),
	research_application_s4_q3: list(),
	research_application_s4_q4: yup.string().default('').optional().meta({
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	research_application_s4_q5: yup.string().default('').optional().meta({
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	research_application_s5_q0: yup.string().default('').required().meta({
		type: GeneralizedFieldTypeEnum.obj.long_text,
	}),
	research_application_s6_q0: checkbox(),
	research_application_s6_q1: checkbox(),
	research_application_s6_q2: checkbox(),
	research_application_s6_q3: checkbox(),
	research_application_s6_q4: checkbox(),
};

export const ResearchApplicationFormDataFieldEnum = getEnum(
	Keys(researchApplicationFormDataPropertiesSource),
);
export type ResearchApplicationFormDataField = EnumMember<
	typeof ResearchApplicationFormDataFieldEnum
>;
export const researchApplicationFormDataSchema = yup.object(
	researchApplicationFormDataPropertiesSource,
);
export const researchApplicationFormDataSchemaFieldSpecByFieldKey =
	getFieldSpecByFieldKey(
		researchApplicationFormDataSchema,
		ResearchApplicationFormDataFieldEnum.arr,
	);
export type ResearchApplicationFormDataParams = yup.InferType<
	typeof researchApplicationFormDataSchema
>;
export type ResearchApplicationFormDataRouteParams = {
	scholarshipApplicationId: string;
};
export type ResearchApplicationFormDataResponse = Record<string, never>;

export const researchFieldsBySection = {
	0: [
		'research_application_s0_q0',
		'research_application_s0_q1',
		'research_application_s0_q2',
		'research_application_s0_q3',
	],
} as const;

export type ResearchApplicationArrayField =
	| 'research_application_s1_q0'
	| 'research_application_s4_q2'
	| 'research_application_s4_q3';
