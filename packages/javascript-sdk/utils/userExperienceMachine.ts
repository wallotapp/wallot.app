import { createMachine } from 'xstate';

export type UserExperienceContext = Record<string, unknown>;

export type UserExperienceEvent = {
	type:
		| 'USER_COMPLETED_REGISTRATION_FORM'
		| 'USER_COMPLETED_ACTIVATION_FORM' // UserCompletedActivationFormContextUpdates
		| 'USER_COMPLETED_KYC_AND_BANK' // UserCompletedKycAndBankContextUpdates
		| 'USER_CONFIRMED_ORDER' // UserConfirmedOrderContextUpdates
		| 'SUBMITTED_ALPACA_ACCOUNT_BECAME_ACTIVE' // SubmittedAlpacaAccountBecameActiveContextUpdates
		| 'SUBMITTED_ALPACA_ACCOUNT_HAD_AN_ERROR' // SubmittedAlpacaAccountHadAnErrorContextUpdates
		| 'QUEUED_ALPACA_ACH_RELATIONSHIP_BECAME_APPROVED' // QueuedAlpacaAchRelationshipBecameApprovedContextUpdates
		| 'QUEUED_ALPACA_ACH_RELATIONSHIP_HAD_AN_ERROR' // QueuedAlpacaAchRelationshipHadAnErrorContextUpdates
		| 'QUEUED_ALPACA_ACH_TRANSFER_BECAME_COMPLETE' // QueuedAlpacaAchTransferBecameCompleteContextUpdates
		| 'QUEUED_ALPACA_ACH_TRANSFER_HAD_AN_ERROR' // QueuedAlpacaAchTransferHadAnErrorContextUpdates
		| 'PENDING_NEW_ALPACA_ORDER_BECAME_FILLED' // PendingNewAlpacaOrderBecameFilledContextUpdates
		| 'PENDING_NEW_ALPACA_ORDER_HAD_AN_ERROR' // PendingNewAlpacaOrderHadAnErrorContextUpdates
		| 'USER_RESOLVED_ERROR_WITH_SUBMITTED_ALPACA_ACCOUNT' // UserResolvedErrorWithSubmittedAlpacaAccountContextUpdates
		| 'USER_RESOLVED_ERROR_WITH_QUEUED_ALPACA_ACH_RELATIONSHIP' // UserResolvedErrorWithQueuedAlpacaAchRelationshipContextUpdates
		| 'USER_RESOLVED_ERROR_WITH_QUEUED_ALPACA_ACH_TRANSFER' // UserResolvedErrorWithQueuedAlpacaAchTransferContextUpdates
		| 'USER_RESOLVED_ERROR_WITH_PENDING_NEW_ALPACA_ORDER'; // UserResolvedErrorWithPendingNewAlpacaOrderContextUpdates
};

// UserCompletedActivationFormContextUpdates
import { ActivatedUser } from '../users/utils/activateUserSchema.js';
import { Recommendation } from '../recommendations/models/recommendationProperties.js';
import { Order } from '../orders/models/orderProperties.js';
import { AssetOrder } from '../assetOrders/models/assetOrderProperties.js';
export type UserCompletedActivationFormContextUpdates = {
	activatedUser: ActivatedUser;
	recommendationFromWallotFinancialModel: Recommendation;
	orderContainerForAssetOrders: Order;
	assetOrdersMappedFromRecommendationBestChoices: AssetOrder[];
};

// UserCompletedKycAndBankContextUpdates
import { BankAccount } from '../bankAccounts/models/bankAccountProperties.js';
import { IdentityVerificationDocument } from '../identityVerificationDocuments/models/identityVerificationDocumentProperties.js';
import { KycUser } from '../users/utils/completeUserKycSchema.js';
export type UserCompletedKycAndBankContextUpdates = {
	connectedBankAccounts: BankAccount[];
	uploadedIdentityVerificationDocument: IdentityVerificationDocument;
	kycUser: KycUser;
};

// UserConfirmedOrderContextUpdates
import { UserPendingAlpacaAccount } from '../users/utils/userPendingAlpacaAccountSchema.js';
import { ProLicense } from '../licenses/utils/proLicenseSchema.js';
import { Invoice } from '../invoices/models/invoiceProperties.js';
import { OrderConfirmedByUser } from '../orders/utils/orderConfirmedByUserSchema.js';
export type UserConfirmedOrderContextUpdates = {
	userPendingAlpacaAccount: UserPendingAlpacaAccount;
	proLicense: ProLicense;
	invoice: Invoice;
	orderConfirmedByUser: OrderConfirmedByUser;
};

// SubmittedAlpacaAccountBecameActiveContextUpdates
import { UserActivatedByAlpaca } from '../users/utils/userActivatedByAlpacaSchema.js';
import { BankAccountPendingAlpacaAchRelationship } from '../bankAccounts/utils/bankAccountPendingAlpacaAchRelationshipSchema.js';
export type SubmittedAlpacaAccountBecameActiveContextUpdates = {
	userActivatedByAlpaca: UserActivatedByAlpaca;
	bankAccountPendingAlpacaAchRelationship: BankAccountPendingAlpacaAchRelationship;
};

// SubmittedAlpacaAccountHadAnErrorContextUpdates
import { UserRejectedByAlpaca } from '../users/utils/userRejectedByAlpacaSchema.js';
export type SubmittedAlpacaAccountHadAnErrorContextUpdates = {
	userRejectedByAlpaca: UserRejectedByAlpaca;
};

// QueuedAlpacaAchRelationshipBecameApprovedContextUpdates
import { BankAccountApprovedByAlpaca } from '../bankAccounts/utils/bankAccountApprovedByAlpacaSchema.js';
import { AchTransfer } from '../achTransfers/models/achTransferProperties.js';
export type QueuedAlpacaAchRelationshipBecameApprovedContextUpdates = {
	bankAccountApprovedByAlpaca: BankAccountApprovedByAlpaca;
	achTransfer: AchTransfer;
};

// QueuedAlpacaAchRelationshipHadAnErrorContextUpdates
import { BankAccountRejectedByAlpaca } from '../bankAccounts/utils/bankAccountRejectedByAlpacaSchema.js';
export type QueuedAlpacaAchRelationshipHadAnErrorContextUpdates = {
	bankAccountRejectedByAlpaca: BankAccountRejectedByAlpaca;
};

// QueuedAlpacaAchTransferBecameCompleteContextUpdates
import { AchTransferWithFundsReceivedByAlpaca } from '../achTransfers/utils/achTransferWithFundsReceivedByAlpacaSchema.js';
import { AssetOrderPendingAlpacaFill } from '../assetOrders/utils/assetOrderPendingAlpacaFillSchema.js';
export type QueuedAlpacaAchTransferBecameCompleteContextUpdates = {
	achTransferWithFundsReceivedByAlpaca: AchTransferWithFundsReceivedByAlpaca;
	assetOrdersPendingAlpacaFill: AssetOrderPendingAlpacaFill[];
};

// QueuedAlpacaAchTransferHadAnErrorContextUpdates
import { AchTransferRejectedByAlpaca } from '../achTransfers/utils/achTransferRejectedByAlpacaSchema.js';
export type QueuedAlpacaAchTransferHadAnErrorContextUpdates = {
	achTransferRejectedByAlpaca: AchTransferRejectedByAlpaca;
};

// PendingNewAlpacaOrderBecameFilledContextUpdates
import { AssetOrderFilledByAlpaca } from '../assetOrders/utils/assetOrderFilledByAlpacaSchema.js';
import { AssetOrderRejectedByAlpaca } from '../assetOrders/utils/assetOrderRejectedByAlpacaSchema.js';
export type PendingNewAlpacaOrderBecameFilledContextUpdates = {
	assetOrdersFilledByAlpaca: AssetOrderFilledByAlpaca[];
	assetOrdersRejectedByAlpaca: AssetOrderRejectedByAlpaca[];
};

// PendingNewAlpacaOrderHadAnErrorContextUpdates
export type PendingNewAlpacaOrderHadAnErrorContextUpdates = {
	assetOrdersRejectedByAlpaca: AssetOrderRejectedByAlpaca[];
};

// Resolution updates use the same context updates as `UserCompletedKycAndBankContextUpdates`
export type UserResolvedErrorWithSubmittedAlpacaAccountContextUpdates =
	UserCompletedKycAndBankContextUpdates;
export type UserResolvedErrorWithQueuedAlpacaAchRelationshipContextUpdates =
	UserCompletedKycAndBankContextUpdates;
export type UserResolvedErrorWithQueuedAlpacaAchTransferContextUpdates =
	UserCompletedKycAndBankContextUpdates;
export type UserResolvedErrorWithPendingNewAlpacaOrderContextUpdates =
	UserCompletedKycAndBankContextUpdates;

export type UserExperienceState =
	| 'guest'
	| 'registered'
	| 'activated.inputting_kyc_and_bank'
	| 'activated.ready_to_confirm_order'
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
	predictableActionArguments: true,
	states: {
		guest: {
			on: {
				USER_COMPLETED_REGISTRATION_FORM: {
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
				USER_COMPLETED_ACTIVATION_FORM: {
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
			initial: 'inputting_kyc_and_bank',
			states: {
				inputting_kyc_and_bank: {
					on: {
						USER_COMPLETED_KYC_AND_BANK: {
							target: 'ready_to_confirm_order',
							actions: (_context, _event) => {
								// Save KYC and bank details
							},
						},
					},
				},
				ready_to_confirm_order: {
					on: {
						USER_CONFIRMED_ORDER: {
							target: '#userExperience.trackingProgress',
							actions: (_context, _event) => {
								// Subscribe user to Wallot Pro license
								// Queue tasks to purchase stocks
								// Redirect user to Assets Screen
							},
						},
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
								SUBMITTED_ALPACA_ACCOUNT_BECAME_ACTIVE: {
									target:
										'waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved',
									actions: (_context, _event) => {
										// Queue tasks to approve ACH relationship
									},
								},
								SUBMITTED_ALPACA_ACCOUNT_HAD_AN_ERROR: {
									target:
										'#userExperience.trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAccountActivationError',
									actions: (_context, _event) => {
										// Notify user of error and prompt to resolve
									},
								},
							},
							description:
								'Waiting for the Alpaca account status to change from Submitted to Active.',
						},
						waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved: {
							on: {
								QUEUED_ALPACA_ACH_RELATIONSHIP_BECAME_APPROVED: {
									target:
										'waitingForAlpacaAchTransferToChangeFromQueuedToComplete',
									actions: (_context, _event) => {
										// Queue tasks to complete ACH transfer
									},
								},
								QUEUED_ALPACA_ACH_RELATIONSHIP_HAD_AN_ERROR: {
									target:
										'#userExperience.trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchRelationshipError',
									actions: (_context, _event) => {
										// Notify user of error and prompt to resolve
									},
								},
							},
							description:
								'Waiting for the Alpaca ACH relationship status to change from Queued to Approved.',
						},
						waitingForAlpacaAchTransferToChangeFromQueuedToComplete: {
							on: {
								QUEUED_ALPACA_ACH_TRANSFER_BECAME_COMPLETE: {
									target: 'waitingForAlpacaOrderToChangeFromPendingNewToFilled',
									actions: (_context, _event) => {
										// Queue tasks to fill order
									},
								},
								QUEUED_ALPACA_ACH_TRANSFER_HAD_AN_ERROR: {
									target:
										'#userExperience.trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchTransferError',
									actions: (_context, _event) => {
										// Notify user of error and prompt to resolve
									},
								},
							},
							description:
								'Waiting for the Alpaca ACH transfer status to change from Queued to Complete.',
						},
						waitingForAlpacaOrderToChangeFromPendingNewToFilled: {
							on: {
								PENDING_NEW_ALPACA_ORDER_BECAME_FILLED: {
									target: '#userExperience.trackingProgress.homeostasis',
									actions: (_context, _event) => {
										// Notify user via email that order was successful
									},
								},
								PENDING_NEW_ALPACA_ORDER_HAD_AN_ERROR: {
									target:
										'#userExperience.trackingProgress.resolvingProblemWithOrder.resolvingAlpacaOrderError',
									actions: (_context, _event) => {
										// Notify user of error and prompt to resolve
									},
								},
							},
							description:
								'Waiting for the Alpaca order status to change from PendingNew to Filled.',
						},
					},
				},
				resolvingProblemWithOrder: {
					states: {
						resolvingAlpacaAccountActivationError: {
							on: {
								USER_RESOLVED_ERROR_WITH_SUBMITTED_ALPACA_ACCOUNT: {
									target:
										'#userExperience.trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAccountToChangeFromSubmittedToActive',
									actions: (_context, _event) => {
										// Queue tasks to resubmit Alpaca account
									},
								},
							},
							description: 'Resolving issues with Alpaca account activation',
						},
						resolvingAlpacaAchRelationshipError: {
							on: {
								USER_RESOLVED_ERROR_WITH_QUEUED_ALPACA_ACH_RELATIONSHIP: {
									target:
										'#userExperience.trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved',
									actions: (_context, _event) => {
										// Queue tasks to resubmit ACH relationship
									},
								},
							},
							description: 'Resolving issues with ACH relationship setup',
						},
						resolvingAlpacaAchTransferError: {
							on: {
								USER_RESOLVED_ERROR_WITH_QUEUED_ALPACA_ACH_TRANSFER: {
									target:
										'#userExperience.trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchTransferToChangeFromQueuedToComplete',
									actions: (_context, _event) => {
										// Queue tasks to resubmit ACH transfer
									},
								},
							},
							description: 'Resolving issues with ACH transfer',
						},
						resolvingAlpacaOrderError: {
							on: {
								USER_RESOLVED_ERROR_WITH_PENDING_NEW_ALPACA_ORDER: {
									target:
										'#userExperience.trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaOrderToChangeFromPendingNewToFilled',
									actions: (_context, _event) => {
										// Queue tasks to resubmit order
									},
								},
							},
							description: 'Resolving issues with order execution',
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
