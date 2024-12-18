export type SendUserWelcomeEmailParams = unknown;
export type SendUserWelcomeEmailResponse = void;
export const sendUserWelcomeEmail = async (
	params: SendUserWelcomeEmailParams,
): Promise<SendUserWelcomeEmailResponse> => {
	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
