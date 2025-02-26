import * as R from 'ramda';
import {
	FunctionResponse,
	CreateEventWithGoogleCalendarAPIParams,
} from '@wallot/node';
import {
	ScholarshipOpenHouseRsvpFormDataResponse,
	ScholarshipOpenHouseRsvpFormDataParams,
	usersApi,
	scholarshipApplicationsApi,
	scholarshipOpenHouseEvents,
} from '@wallot/js';
import { db, gcal, gmail, log } from '../../../services.js';
import { FieldValue } from 'firebase-admin/firestore';
import { variables } from '../../../variables.js';
import { secrets } from '../../../secrets.js';

export const submitScholarshipOpenHouseRsvp = async ({
	accessibility_requests,
	email,
	is_attending_with_parent,
	parent_emails = [],
	open_house_lookup_key,
}: ScholarshipOpenHouseRsvpFormDataParams): Promise<
	FunctionResponse<ScholarshipOpenHouseRsvpFormDataResponse>
> => {
	const match = scholarshipOpenHouseEvents.find(
		({ lookup_key }) => lookup_key === open_house_lookup_key,
	);
	if (!match) {
		log(
			{ message: 'Invalid open house lookup key', open_house_lookup_key },
			{ type: 'error' },
		);
		throw new Error('There was an error with your RSVP');
	}

	const userWithEmail = await db
		.collection(usersApi.collectionId)
		.where('firebase_auth_email', '==', email)
		.get();
	const userId = userWithEmail.docs[0]?.id;

	if (userId) {
		// Logged in user RSVP
		const scholarshipApplicationForUser = await db
			.collection(scholarshipApplicationsApi.collectionId)
			.where('user', '==', userId)
			.get();
		const scholarshipApplicationId = scholarshipApplicationForUser.docs[0]?.id;
		if (scholarshipApplicationId) {
			// Append lookup key `open_house_rsvps` field
			await db
				.collection(scholarshipApplicationsApi.collectionId)
				.doc(scholarshipApplicationId)
				.update({
					open_house_rsvps: FieldValue.arrayUnion(open_house_lookup_key),
				});
		}
	}

	const onFinished = async () => {
		// Create Google Calendar event
		const createEventWithGoogleCalendarAPIParams: CreateEventWithGoogleCalendarAPIParams =
			{
				attendees: R.uniq(
					[email, ...parent_emails].map((email) => email.trim().toLowerCase()),
				),
				calendar_id: variables.SERVER_VAR_GMAIL_NOTIFICATIONS_USER_ID,
				description: `The Florida Visionary Scholarship program committee is hosting informal open house events both in-person and virtually to help applicants learn more about the scholarship and get to know our team.

${match.type === 'Virtual' ? 'Conference Call Link' : 'Event Location'}:
${match.type === 'Virtual' ? '' : match.address_title + '\n'}${
					match.type === 'Virtual'
						? `https://meet.google.com/${match.meets_id}`
						: match.address
				}

${
	match.type === 'Virtual'
		? ''
		: `Attire:
Casual

`
}Attendee${is_attending_with_parent ? 's' : ''}:
${email}

Additional Guests:
${parent_emails.length ? parent_emails.join('\n') : 'None'}

${
	match.type === 'Virtual'
		? ''
		: `Food:
Light refreshments will be served

`
}Accessibility Requests:
${accessibility_requests || 'None'}
`,
				end_time_nyc: match.end_time_nyc,
				location:
					match.type === 'Virtual'
						? `https://meet.google.com/${match.meets_id}`
						: match.address,
				start_time_nyc: match.start_time_nyc,
				title: `Florida Visionary Scholarship ${
					match.metro_area
				} Open House – ${match.time.replace('·', 'at')}`,
			};

		if (secrets.SECRET_CRED_SERVER_PROTOCOL === 'https') {
			await gcal.createEvent(createEventWithGoogleCalendarAPIParams);
		} else {
			console.log(
				'Skipping Google Calendar event creation in local environment',
			);
		}

		// Log event
		const logData = {
			message: 'RSVP submitted for Scholarship Open House',
			open_house_lookup_key,
			createEventWithGoogleCalendarAPIParams: {
				...createEventWithGoogleCalendarAPIParams,
				description:
					(createEventWithGoogleCalendarAPIParams.description?.slice(0, 50) ??
						'') + '...',
			},
		};
		log(logData, { type: 'normal' });

		if (secrets.SECRET_CRED_DEPLOYMENT_ENVIRONMENT == 'live') {
			// Send developer alert
			await gmail.sendDeveloperAlert({
				message: `RSVP submitted for Scholarship Open House from ${email}.\
<br/><br/>\
${JSON.stringify(logData, null, 2)}`,
				subject: '[Wallot Developer Alerts] New Scholarship Open House RSVP',
			});
		}

		return Promise.resolve();
	};

	return { json: { open_house_lookup_key }, onFinished };
};
