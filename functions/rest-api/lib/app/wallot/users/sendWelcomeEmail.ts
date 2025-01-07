export type SendWelcomeEmailParams = unknown;
export type SendWelcomeEmailResponse = void;
export const sendWelcomeEmail = async (
	params: SendWelcomeEmailParams,
): Promise<SendWelcomeEmailResponse> => {
	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
