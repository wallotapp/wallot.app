import { createMachine } from 'xstate';

export type UserExperienceContext = {
	order?: {
		status: 'pending' | 'success' | 'failure';
	};
};
export type UserExperienceEvent = {
	type:
		| 'COMPLETE_REGISTRATION_FORM'
		| 'COMPLETE_ACTIVATION_FORM'
		| 'COMPLETE_DEMOGRAPHICS_FORM'
		| 'CONNECT_BANK_ACCOUNT'
		| 'CONFIRM_ORDER'
		| 'ORDER_RESULT_COMPLETE'
		| 'RESOLVE_PROBLEM_WITH_ORDER';
};
export type UserExperienceState =
	| 'registered'
	| 'activated'
	| 'trackingProgress.waitingForOrderToBeFilled'
	| 'trackingProgress.resolvingProblemWithOrder'
	| 'trackingProgress.homeostasis';
export const userExperienceMachine = createMachine<
	UserExperienceContext,
	UserExperienceEvent
>({
	context: {},
	id: 'userExperience',
	initial: 'guest',
	states: {
		guest: {
			on: {
				COMPLETE_REGISTRATION_FORM: {
					target: 'registered',
					actions: (_context, _event) => {
						// Redirect user to Account Activation Screen
					},
				},
			},
			description: 'The user is a guest and has not yet registered.',
		},
		registered: {
			on: {
				COMPLETE_ACTIVATION_FORM: {
					target: 'activated',
					actions: (_context, _event) => {
						// Generate personalized list of stocks and redirect to Checkout Screen
					},
				},
			},
			description:
				'The user has registered and is awaiting account activation.',
		},
		activated: {
			on: {
				COMPLETE_DEMOGRAPHICS_FORM: {
					actions: (_context, _event) => {
						// Fulfill KYC requirements
					},
				},
				CONNECT_BANK_ACCOUNT: {
					actions: (_context, _event) => {
						// Connect bank account for ACH transfers
					},
				},
				CONFIRM_ORDER: {
					target: 'trackingProgress',
					actions: (_context, _event) => {
						// Queue tasks to purchase stocks and redirect to Stocks Progress Dashboard Screen
					},
				},
			},
			description:
				'The user has activated their account and is ready to confirm their order.',
		},
		trackingProgress: {
			initial: 'waitingForOrderToBeFilled',
			description:
				'The user is tracking the progress of their stock purchase orders.',
			states: {
				waitingForOrderToBeFilled: {
					on: {
						ORDER_RESULT_COMPLETE: [
							{
								target: 'resolvingProblemWithOrder',
								actions: (_context, _event) => {
									// Handle unsuccessful order
								},
								cond: 'isOrderUnsuccessful',
							},
							{
								target: 'homeostasis',
								actions: (_context, _event) => {
									// Handle successful order
								},
								cond: 'isOrderSuccessful',
							},
						],
					},
					description: 'The order has been placed and is waiting to be filled.',
				},
				resolvingProblemWithOrder: {
					on: {
						RESOLVE_PROBLEM_WITH_ORDER: {
							target: 'waitingForOrderToBeFilled',
							actions: (_context, _event) => {
								// Queue tasks to resolve issue
							},
						},
					},
					description:
						'The order was unsuccessful, and the user is resolving the issue.',
				},
				homeostasis: {
					type: 'final',
					description:
						'The user has successfully purchased stocks and has reached a stable state.',
				},
			},
		},
	},
}).withConfig({
	guards: {
		isOrderSuccessful: ({ order }) => order?.status === 'success',
		isOrderUnsuccessful: ({ order }) => order?.status === 'failure',
	},
});
