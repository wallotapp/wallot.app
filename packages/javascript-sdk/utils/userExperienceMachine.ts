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
	/** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4FEAeAHDAlmAHYDGYAdFMnAC4DEAwgPICyACgDKYAqmA+gCVMAcQCSAZR6CAgjzHMAcvwBizQawDaABgC6iULgD2sArQJHiBkNkQBmAOwBGCk4AcjgGwOArABYATj8-H20HABoQAE9ENxcAJm1PeL83VJ87JycHAIBfXMjUDBx8dCIySnQwKAJYWgxIJjYuXgEZRnkANTkFZTUNHX0kEGNTc0trWwQ-ZIp4gO1tFJ83Hx8Azx9ImIQ7NwcKbQ3loJ9PTM98wrQsPEIScgoAQ1JzADcn+ogmjm4+fgAIphWMwRLJ2AAJMSMCSqdRaPTWUZmCxWYZTeLZAIUDZxQKpTxuDwRaKIBz7Cj7ZJ+bRuTzJZzxK4gIq3UrlR4vd6fRosRSKTAdfgAIRkigA0vx2iwAKqKHiDJEmFETdGIeKJNwUOwzeJxJwZZxObaITwBeI4ukpHXadY+Jx+Zmskr3CrPV4ED5fJqKFRiDT8dRAwSK4bI8Zo0BTDIuNzaQI+eZEkJ7E0IIkHbJJRJ+A3xFZOJ03F1lB6UWjoF4AawIxCg7HQRigVVgsAoAHcnii6yojOhmOgIBgeEZhWAVAQADaTyAdrvmHt9mST3AvJ4yUikIzIYi0EeMAAWTzr48bAFsJMgAEZnsxfEcb95gegSGXC1hiHh8AFSzjsdoyFKjCyvKIqCjIrBtB0YidJgoaGMqEaTKa8R2Ja+ZONoTjePacRptk8SeIcZr4n4Dg6mkbhFsUdylm6FbVrW9aNs2cBtp23ZQL2-aDsOo7jlOM4QHOnHccuq6kOum7bru+5HieKjnpeN53pAD4em8z6vu+n7fr+-6MIB0rMHKPD8BCMg-mK-CYIIgjqPBIyIaiyG7JsFreHs7gpLadL4fsmYOIRqFBOR-jUWyrqPAxpA1nWDZNi27Hzkx3EDkO6AjmOE7TrOHELlxS4rmuG4HoIYCTp8qKwAeBC4HJx4wIpRhngAijQNAQA+uC4I2mnfK1MqYENVl-gBQEQkImCcD0SgSFC7BgYZkFSuw7D2bBAKOeGLlqgg2FHBQfiEe4DhkYmBp2PhDiHdodj2libiYgEPgRSWHLlpWsVMQlrGtiJBVpbxmX8TlQkA6lRUSVJZUVVVlg1XVDUKee7VgJ13W9UY-X0INw2YKNBlGYwk3CDN8hzQt5mWVKyi2fZIaImGzmqlG9juRQnlxE9NIrJ411Ba4OShLSd1OAsTIFCyxa0R9FAxXFzGJWxEOLjxGVZQJuXCflkPoOJJWkAePCVsQsAAGZ8YejWni1aMY0YjAtbgM71LjQ0jfp43tJN0hihIKi2UtEECCwvytNtLORjY6rnNiQQBc45zZFdpL7WaFqLGEuaBEctp2G9stlvLX2K79SWq4V6t8dlgl5SlasG5JpUm8eFtW-JTWox1amO87rvPnjnsyGNhkTfwfuKAHQcWVZdN2Q5TMIWMu1s25iac+R3M+Xz10apSNJnQEQUbOLlxS86Rf0aXP0sRXutq+lNda+DD9V03TxPyD1soy17AkBAJiigwDthHGDRo7BMCKABGIRQIh+ACgAOpezHkGIOwpwIrT9JwbgW0l5ORXqzGObljqby8jzXy-M05ODsHYbE9JxZ6n8PaBkhd2TFwVrfZW-035Aw1qDOuOsG7v2KpJL+yMu5-wAUAkBYDBH0EgdA2B8CkEoMAmgwQ1M542QXozIYy8VTRymHYDmXNvK8z8tQzyFBQjiwCHSM48Y8gXxluw6+jF4p3xVi2Iwk43hcKvDOM8iCzAHi-vQYQEhmCcFgvwdazBhTcFYPwRBn5JoaMjoQoxiBj74XsT4bUx8s6+DoTkSWUtiBGCHPAYYl83HkCVFk1yABaJw8Q0zNPPtcGi9TKDUDoI0wxrljppjiJSLCCxPB5yOMdSW3TIp0UeFUGodQGgQEGUhPaPgSQ7D2AcM07hzirDNJ4GYbCoqUC5J6Hk6zmZNL2mRUZFIHD0lQh4Qi6wsjnMWZ9DxSs-o1IMZsteJj8LZAKUkJI2R9hrAcHC75ctOGeO4clUSfZxECO1hs1exC0j4RWB5B0qRcwGltJsBFHCb7IoBZXPhz9wFCLRfrURUktw7j3I7TutsLzXlvLQe8RhHyejANiohUwaHtOoUaIWWEszxBeZMil7jvrUvvsIulINa7a1pVDQ2sNKoRkRvVTlNtmptR7l1QVPU+qQFFdk-atoCn7BSMfe0hE0ipx2NhIIrh7pnXzqcrCSropUv+WqplGKtWv3Vbq5uRtW5m0tt-LlZr7a9ydmeF2YB6h2tcpiA0FBfC+EWEEOw8Z8LeEzFhExNIQhZBocG35Kqw0q14ei4GmsGU6uZdDDFP9JFnn-sQQBdZgGgKMAy3Ne1MgFpeosFh8qPBbCsWaSkiRyLJFpHSPYjaS5-PLt4uAvj-HIsCWAYJoSv5TrXiSi0wRkiEiPmaAI+FcxoXcHYVC8ryRxioi4npFy93NoPf9HxfiAlBJCbQMJwMKBgZPVAD+G42W7iFV6VEmB0CNnQNe4huYplHV1I+wIz7-IbzNE9OhWRzj5gLv+hZiLQ0gbbPBiD56oMwYynBo94G6xIaNuVA11Vaq4Ew9h3DUx8PaEIw+-YJGAgvqlYEHECn7T3XOMkcK9H3qUv3V40DPGEMJTPRe6DX9uOwGPUxfjxtTbtywFhvsEnEBSZk+6p9CmK1kW1IsXwjD1jOD-fMnTyqy76ZY4ZtjpnOMYAs1ZvjLKv5iac3coZDyDpueIxsTz1D-B+E5hMiWRJMjwu01fENemUUUAPC1MAJhaBPFMICghaWb1JCIt5M49jMJ6j8PhMtREyIBEcBkVYtJSv5CAA */
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
