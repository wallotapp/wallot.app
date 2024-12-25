export type CancelActivationReminderEmailsParams = unknown;
export type CancelActivationReminderEmailsResponse = void;
export const cancelActivationReminderEmails = async (
	params: CancelActivationReminderEmailsParams,
): Promise<CancelActivationReminderEmailsResponse> => {
	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
