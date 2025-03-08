import * as yup from 'yup';
import {
	EnumMember,
	GeneralizedFieldTypeEnum,
	getEnum,
	getFieldSpecByFieldKey,
	Keys,
	YupHelpers,
} from 'ergonomic';

export const ScholarshipApplicationFormDataSectionEnum = getEnum([
	'Contact Details',
	'College Information',
	'Student Profile',
	'Personal Essays',
	'Summer Research',
]);
export type ScholarshipApplicationFormDataSection = EnumMember<
	typeof ScholarshipApplicationFormDataSectionEnum
>;

export const CollegeTypeEnum = getEnum([
	'2-Year College',
	'4-Year College',
	'Community College',
	'Technical College',
]);
export type CollegeType = EnumMember<typeof CollegeTypeEnum>;

export const scholarshipApplicationFormDataPropertiesBySection = {
	'Contact Details': {
		given_name: yup.string().default('').required().label('First Name').meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}), // user
		family_name: yup.string().default('').required().label('Last Name').meta({
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}), // user
		phone_number: YupHelpers.unitedStatesPhoneNumber().required(), // user
		date_of_birth: YupHelpers.date().label('Date of Birth').required(), // user
		high_school: yup.string().default('').required().meta({
			label_message_user_text: 'Enter the name of your current high school',
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}), // scholarship_application
	},
	'College Information': {
		college_name: yup
			.string()
			.default('')
			.required()
			.label('Anticipated College')
			.meta({
				label_message_user_text:
					'Enter the name of the college you plan to attend. If you are undecided, enter the names of the colleges you are considering attending.',
				type: GeneralizedFieldTypeEnum.obj.long_text,
			}), // scholarship_application
		college_type: CollegeTypeEnum.getDefinedSchema()
			.required()
			.label('Type of College')
			.default('' as CollegeType), // scholarship_application
	},
	'Student Profile': {
		academic_achievement: yup.string().default('').required().meta({
			label_message_user_text:
				'What is your current cumulative GPA? If available, please also include your class rank or percentile.',
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}), // scholarship_application
		honors_and_awards: yup
			.string()
			.default('')
			.required()
			.label('Honors & Awards')
			.meta({
				label_message_user_text:
					'List any academic, athletic, or extracurricular honors or awards you have received.',
				type: GeneralizedFieldTypeEnum.obj.long_text,
			}), // scholarship_application
		extracurricular_activities: yup.string().default('').required().meta({
			label_message_user_text:
				'Briefly describe your involvement in activities such as clubs, sports, community service, or entrepreneurial projects.',
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}), // scholarship_application
		future_goals: yup.string().default('').required().meta({
			label_message_user_text:
				'Describe your primary area of interest for college studies and your intended career path.',
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}), // scholarship_application
	},
	'Personal Essays': {
		common_essay: yup
			.string()
			.required()
			.default('')
			.label('Common Essay Prompt for All Applicants')
			.meta({
				label_message_user_text:
					"Florida is a place of innovation, resilience, and community spirit. Please share your vision for Florida's future and describe how your academic pursuits, extracurricular activities, and personal experiences position you to contribute positively to that future. In your essay, consider any challenges you've overcome, leadership roles you've undertaken, or unique perspectives you bring, and explain how these will shape your impact on your community and beyond.",
				type: GeneralizedFieldTypeEnum.obj.long_text,
			}), // scholarship_application
		academic_achievement_award_essay: yup
			.string()
			.default('')
			.label('Academic Achievement Award: "Excellence in Learning"')
			.meta({
				label_message_user_text:
					'Describe a significant academic challenge or project that required you to push your intellectual boundaries. What strategies did you use to overcome obstacles, and what did this experience teach you about the value of persistence and curiosity? Additionally, explain how you plan to continue your academic journey at college and contribute to an environment of rigorous learning and innovative research.',
				type: GeneralizedFieldTypeEnum.obj.long_text,
			}), // scholarship_application
		outstanding_student_athlete_award_essay: yup
			.string()
			.default('')
			.label(
				'Outstanding Student-Athlete Award: "Balancing the Game and the Books"',
			)
			.meta({
				label_message_user_text:
					'Share an experience that highlights your ability to balance academic responsibilities with athletic commitments. Describe a time when you faced a demanding situation in either or both areas, how you managed your time and energy, and the lessons you learned about teamwork, leadership, and resilience. How will these experiences guide you in your future academic and athletic endeavors?',
				type: GeneralizedFieldTypeEnum.obj.long_text,
			}), // scholarship_application
		community_leadership_award_essay: yup
			.string()
			.default('')
			.label('Community Leadership Award: "Leading with Impact"')
			.meta({
				label_message_user_text:
					'Provide an example of a community project or initiative where you demonstrated leadership and made a tangible impact. What motivated you to take action, what challenges did you encounter, and what outcomes resulted from your involvement? Reflect on how this experience has shaped your understanding of civic responsibility, and describe how you plan to continue serving and inspiring your community in the future.',
				type: GeneralizedFieldTypeEnum.obj.long_text,
			}), // scholarship_application
		entrepreneurial_excellence_award_essay: yup
			.string()
			.default('')
			.label('Entrepreneurial Excellence Award: "Innovate for the Future"')
			.meta({
				label_message_user_text:
					"Discuss an idea or project that you developed which embodies your entrepreneurial spirit. Explain how you identified a need or opportunity, the steps you took to bring your idea to life, and any challenges you faced along the way. Additionally, describe how this experience has influenced your perspective on innovation and how you plan to leverage your entrepreneurial mindset to contribute to Florida's growth and progress.",
				type: GeneralizedFieldTypeEnum.obj.long_text,
			}), // scholarship_application
	},
	'Summer Research': {
		is_looking_for_summer_program: yup
			.mixed()
			.oneOf([true, false, null, ''])
			.default(null)
			.optional()
			.meta({ type: GeneralizedFieldTypeEnum.obj.boolean }), // scholarship_application
		prefers_summer_program_housing: yup
			.mixed()
			.oneOf([true, false, null, ''])
			.default(null)
			.optional()
			.meta({ type: GeneralizedFieldTypeEnum.obj.boolean }), // scholarship_application
		summer_plans: yup.string().default('').meta({
			label_message_user_text:
				'Have you made any other plans for the summer during June or July? Include the start and end dates of your prior commitments. (required)',
			type: GeneralizedFieldTypeEnum.obj.long_text,
		}), // scholarship_application
	},
};
export const scholarshipApplicationFormDataProperties = {
	...scholarshipApplicationFormDataPropertiesBySection['Contact Details'],
	...scholarshipApplicationFormDataPropertiesBySection['College Information'],
	...scholarshipApplicationFormDataPropertiesBySection['Student Profile'],
	...scholarshipApplicationFormDataPropertiesBySection['Personal Essays'],
	...scholarshipApplicationFormDataPropertiesBySection['Summer Research'],
};
export const ScholarshipApplicationFormDataFieldEnum = getEnum(
	Keys(scholarshipApplicationFormDataProperties),
);
export type ScholarshipApplicationFormDataField = EnumMember<
	typeof ScholarshipApplicationFormDataFieldEnum
>;
export const ScholarshipApplicationFormDataFieldFromUserDataEnum = getEnum([
	'given_name',
	'family_name',
	'phone_number',
	'date_of_birth',
]);
export const scholarshipApplicationFormDataSchema = yup.object(
	scholarshipApplicationFormDataProperties,
);
export const scholarshipApplicationFormDataSchemaFieldSpecByFieldKey =
	getFieldSpecByFieldKey(
		scholarshipApplicationFormDataSchema,
		Keys(scholarshipApplicationFormDataProperties),
	);
export type ScholarshipApplicationFormDataParams = yup.InferType<
	typeof scholarshipApplicationFormDataSchema
>;
export type ScholarshipApplicationFormDataRouteParams = {
	scholarshipApplicationId: string;
};
export type ScholarshipApplicationFormDataResponse = Record<string, never>;
