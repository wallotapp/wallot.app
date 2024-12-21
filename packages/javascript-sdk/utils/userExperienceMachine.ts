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
		| 'SUBMITTED_ALPACA_ACCOUNT_BECAME_ACTIVE'
		| 'SUBMITTED_ALPACA_ACCOUNT_HAD_AN_ERROR'
		| 'QUEUED_ALPACA_ACH_RELATIONSHIP_BECAME_APPROVED'
		| 'QUEUED_ALPACA_ACH_RELATIONSHIP_HAD_AN_ERROR'
		| 'QUEUED_ALPACA_ACH_TRANSFER_BECAME_COMPLETE'
		| 'QUEUED_ALPACA_ACH_TRANSFER_HAD_AN_ERROR'
		| 'PENDING_NEW_ALPACA_ORDER_BECAME_FILLED'
		| 'PENDING_NEW_ALPACA_ORDER_HAD_AN_ERROR'
		| 'RESOLVE_PROBLEM_WITH_ORDER';
};
export type UserExperienceState =
	| 'registered'
	| 'activated'
	| 'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAccountToChangeFromSubmittedToActive'
	| 'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved'
	| 'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchTransferToChangeFromQueuedToComplete'
	| 'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaOrderToChangeFromPendingNewToFilled'
	| 'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAccountActivationError'
	| 'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchRelationshipError'
	| 'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchTransferError'
	| 'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaOrderError'
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
					initial: 'waitingForAlpacaAccountToChangeFromSubmittedToActive',
					states: {
						waitingForAlpacaAccountToChangeFromSubmittedToActive: {
							on: {
								SUBMITTED_ALPACA_ACCOUNT_BECAME_ACTIVE:
									'waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved',
								SUBMITTED_ALPACA_ACCOUNT_HAD_AN_ERROR:
									'#userExperience.trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAccountActivationError',
							},
							description:
								'Waiting for the Alpaca account status to change from Submitted to Active.',
						},
						waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved: {
							on: {
								QUEUED_ALPACA_ACH_RELATIONSHIP_BECAME_APPROVED:
									'waitingForAlpacaAchTransferToChangeFromQueuedToComplete',
								QUEUED_ALPACA_ACH_RELATIONSHIP_HAD_AN_ERROR:
									'#userExperience.trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchRelationshipError',
							},
							description:
								'Waiting for the Alpaca ACH relationship status to change from Queued to Approved.',
						},
						waitingForAlpacaAchTransferToChangeFromQueuedToComplete: {
							on: {
								QUEUED_ALPACA_ACH_TRANSFER_BECAME_COMPLETE:
									'waitingForAlpacaOrderToChangeFromPendingNewToFilled',
								QUEUED_ALPACA_ACH_TRANSFER_HAD_AN_ERROR:
									'#userExperience.trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchTransferError',
							},
							description:
								'Waiting for the Alpaca ACH transfer status to change from Queued to Complete.',
						},
						waitingForAlpacaOrderToChangeFromPendingNewToFilled: {
							on: {
								PENDING_NEW_ALPACA_ORDER_BECAME_FILLED:
									'#userExperience.trackingProgress.homeostasis',
								PENDING_NEW_ALPACA_ORDER_HAD_AN_ERROR:
									'#userExperience.trackingProgress.resolvingProblemWithOrder.resolvingAlpacaOrderError',
							},
							description:
								'Waiting for the Alpaca order status to change from PendingNew to Filled.',
						},
					},
				},
				resolvingProblemWithOrder: {
					states: {
						resolvingAlpacaAccountActivationError: {
							description: 'Resolving issues with Alpaca account activation',
						},
						resolvingAlpacaAchRelationshipError: {
							description: 'Resolving issues with ACH relationship setup',
						},
						resolvingAlpacaAchTransferError: {
							description: 'Resolving issues with ACH transfer',
						},
						resolvingAlpacaOrderError: {
							description: 'Resolving issues with order execution',
						},
					},
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
	guards: {},
});
