import { google } from 'googleapis';
import { GeneralizedServerVariables } from 'ergonomic-node';

export type CreateEventWithGoogleCalendarAPIParams = {
	attendees: string[];
	calendar_id: string;
	description?: string;
	end_time_nyc: string;
	guests_can_invite_others?: boolean;
	guests_can_modify?: boolean;
	guests_can_see_other_guests?: boolean;
	location?: string;
	start_time_nyc: string;
	title: string;
	sender_user_id: string;
};
export function createEventWithGoogleCalendarAPI(
	serviceAccountPath: string,
	variables: GeneralizedServerVariables,
) {
	const { SERVER_VAR_GMAIL_NOTIFICATIONS_USER_ID: defaultUserId } = variables;
	return async function ({
		attendees,
		calendar_id,
		description,
		end_time_nyc,
		guests_can_invite_others = false,
		guests_can_modify = false,
		guests_can_see_other_guests = true,
		location,
		start_time_nyc,
		title,
		sender_user_id = defaultUserId,
	}: CreateEventWithGoogleCalendarAPIParams): Promise<Record<string, unknown>> {
		const auth = new google.auth.JWT({
			keyFile: serviceAccountPath,
			scopes: ['https://www.googleapis.com/auth/calendar.events'],
			subject: sender_user_id,
		});
		const calendar = google.calendar({ version: 'v3', auth });

		// Build the event resource.
		const event: GoogleCalendarEventParams = {
			attendees: attendees.map((email) => ({
				email,
				responseStatus: 'accepted',
			})),
			end: {
				dateTime: end_time_nyc,
				timeZone: 'America/New_York',
			},
			guestsCanInviteOthers: guests_can_invite_others,
			guestsCanModify: guests_can_modify,
			guestsCanSeeOtherGuests: guests_can_see_other_guests,
			start: {
				dateTime: start_time_nyc,
				timeZone: 'America/New_York',
			},
			summary: title,
			status: 'confirmed',
		};
		if (description) event.description = description;
		if (location) event.location = location;

		// Insert the event.
		const { data = {} } = (await calendar.events.insert({
			auth,
			calendarId: calendar_id,
			sendUpdates: 'all', // This ensures invitations are emailed to guests.
			requestBody: event,
		})) as Record<'data', unknown>;
		return data as Record<string, unknown>;
	};
}

type GoogleCalendarEventParams = {
	attendees: {
		email: string;
		responseStatus: string;
	}[];
	description?: string;
	end: {
		dateTime: string;
		timeZone: string;
	};
	guestsCanInviteOthers: boolean;
	guestsCanModify: boolean;
	guestsCanSeeOtherGuests: boolean;
	location?: string;
	start: {
		dateTime: string;
		timeZone: string;
	};
	summary: string;
	status: string;
};
