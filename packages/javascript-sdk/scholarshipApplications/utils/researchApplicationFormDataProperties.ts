export type ResearchApplicationFormSchema = {
	label_data_by_field_key: Record<
		string,
		{ label: string; label_message?: string }
	>;
	steps: string[];
};
export const fallbackResearchApplicationFormSchema: ResearchApplicationFormSchema =
	{
		label_data_by_field_key: {},
		steps: [],
	};
export type ResearchApplicationServerData = Record<string, never>;
export type ResearchApplicationClientData = Record<string, never>;

export const researchApplicationFormDataPropertiesBySection = {
	0: {
		research_application_q0: '',
	},
	1: {
		research_application_q: '',
	},
	2: {
		research_application_q: '',
	},
	3: {
		research_application_q: '',
	},
	4: {
		research_application_q: '',
	},
	5: {
		research_application_q: '',
	},
	6: {
		research_application_q: '',
	},
};
