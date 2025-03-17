import {
	ScholarshipApplication,
	scholarshipApplicationsApi,
} from '../models/index.js';

describe('ScholarshipApplication', () => {
	test('exampleScholarshipApplication', () => {
		const { apiResourceDefaultJson } = scholarshipApplicationsApi;
		const exampleScholarshipApplication: ScholarshipApplication = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My ScholarshipApplication',
			user: '',
			open_house_rsvps: [],
			research_application_s1_q0: [],
			research_application_s4_q2: [],
			research_application_s4_q3: [],
		};
		expect(exampleScholarshipApplication).toEqual<
			typeof exampleScholarshipApplication
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'scholarship_application',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My ScholarshipApplication',
			decision: null,
			open_house_rsvps: [],
			reminder_emails_sent_for_application_completion: 0,
			research_status: 'in_progress',
			status: 'in_progress',
			user: '',
			// Scholarship application form
			common_essay: '',
			academic_achievement_award_essay: '',
			outstanding_student_athlete_award_essay: '',
			community_leadership_award_essay: '',
			entrepreneurial_excellence_award_essay: '',
			academic_achievement: '',
			honors_and_awards: '',
			extracurricular_activities: '',
			future_goals: '',
			is_looking_for_summer_program: false,
			prefers_summer_program_housing: false,
			summer_plans: '',
			college_name: '',
			college_type: '2-Year College',
			high_school: '',
			// Research application form
			research_application_s0_q0: '',
			research_application_s0_q1: '',
			research_application_s0_q2: '',
			research_application_s0_q3: '',
			research_application_s1_q0: [],
			research_application_s2_q0: '',
			research_application_s2_q1: '',
			research_application_s2_q2: '',
			research_application_s2_q3: '',
			research_application_s2_q5: '',
			research_application_s2_q4: '',
			research_application_s3_q0: '',
			research_application_s3_q1: '',
			research_application_s3_q2: '',
			research_application_s4_q0: '',
			research_application_s4_q1: '',
			research_application_s4_q2: [],
			research_application_s4_q3: [],
			research_application_s4_q4: '',
			research_application_s4_q5: '',
			research_application_s5_q0: '',
			research_application_s6_q0: '',
			research_application_s6_q1: '',
			research_application_s6_q2: '',
			research_application_s6_q3: '',
			research_application_s6_q4: '',
		});
	});
});
