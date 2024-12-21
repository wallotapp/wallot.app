import { createMachine } from 'xstate';

export type UserExperienceContext = Record<string, unknown>;
export type UserExperienceEvent = {
	type:
		| 'USER_COMPLETED_REGISTRATION_FORM'
		| 'USER_COMPLETED_ACTIVATION_FORM'
		| 'USER_COMPLETED_DEMOGRAPHICS_FORM'
		| 'USER_CONNECTED_BANK_ACCOUNT'
		| 'USER_CONFIRMED_ORDER'
		| 'SUBMITTED_ALPACA_ACCOUNT_BECAME_ACTIVE'
		| 'SUBMITTED_ALPACA_ACCOUNT_HAD_AN_ERROR'
		| 'QUEUED_ALPACA_ACH_RELATIONSHIP_BECAME_APPROVED'
		| 'QUEUED_ALPACA_ACH_RELATIONSHIP_HAD_AN_ERROR'
		| 'QUEUED_ALPACA_ACH_TRANSFER_BECAME_COMPLETE'
		| 'QUEUED_ALPACA_ACH_TRANSFER_HAD_AN_ERROR'
		| 'PENDING_NEW_ALPACA_ORDER_BECAME_FILLED'
		| 'PENDING_NEW_ALPACA_ORDER_HAD_AN_ERROR'
		| 'USER_RESOLVED_ERROR_WITH_SUBMITTED_ALPACA_ACCOUNT'
		| 'USER_RESOLVED_ERROR_WITH_QUEUED_ALPACA_ACH_RELATIONSHIP'
		| 'USER_RESOLVED_ERROR_WITH_QUEUED_ALPACA_ACH_TRANSFER'
		| 'USER_RESOLVED_ERROR_WITH_PENDING_NEW_ALPACA_ORDER';
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
	/** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4FEAeAHDAlmAHYDGYAdFMnAC4DEAwgPICyACgDKYAqmA+gCVMAcQCSAZR6CAgjzHMAcvwBizQawDaABgC6iULgD2sArQJHiBkNkQBmAOwBGCk4Acdt9o92AbABZ-JwCAGhAAT0Q3FwAmbV8Yp20AVn83X3cATgcAXxyw1AwcfHQiMkp0MCgCWFoMSCY2Ll4BGUZ5ADU5BWU1DR19JBBjU3NLa1sEfwSKGLdMtwcY6cyY33mwyIRPBwptTISYh2SYu20nf2S7PIK0LDxCEnIKAENScwA3F7qIRo5uPj8AAimFYzBEsnYAAkxIwJKp1Fo9NYRmYLFYhpNEtkKNM3HNTjFMmlMnZNogHIsKIsEhl-M4vMlfDcQIV7iUys83p9vg0WIpFJh2vwAEIyRQAaX4bRYAFVFDwBiiTGjxpjEDFNclqdNLqcPCknA5yQhfKsKAsEoF-NkgucWWzio9yq93gQvj9GooVGINPx1CDBEqhqixhjQJMri5Gdp9skUucHGSIlEqUb4tp6XNztpcvlWXcnaUnpRaOg3gBrAjEKDsdBGKCVWCwCgAdxeaJrKiM6GY6AgGB4RhFYBUBAANuPIG2O+Yuz2ZOPcG8XjJSKQjMhiLQh4wABYvGuj+sAWwkyAARiezD8h2vPmB6BJZSLWGIeHwgdLOOw2jJpYwcoKqKQoyKwrTtGIHSYMGhgqmGEyIAEbgWviJzxh4CS5ia7jJLsCyZIR-jnNE+KZA6hYPMWLplpW1a1vWjZwC27adlA3a9v2g7DqOE5ThAM5sRxi7LqQq7rpu267geR4qKe55XjekB3m6HyPs+r7vp+36-ow-4ysw8o8PwUIyF+4r8JggiCOosHDPB6KIdsvi+LsrnEZkyRuNMvjJMkJpxHY2pOMsZpHJSTiERRRRUZypblqQVY1nWDZNixs70RxfYDugQ4jmOk7Tqxc7sQuS4rmue6CGA47fOisB7gQuDSYeMByUYJ4AIo0DQEB3rguD1mpvydbKmBjeZP5-gBUJCJgnDdEoEgwuwIF6eB0rsOwNnQUCdmho56oIMEdj+LiaxBW4XmZPENo4UsdgWokpxmsc-hBck0Xss6zy0Yl9EpUxzaCSVWVcblPEFfxIOZWVoniVVNV1ZYDVNS1smnt1YC9f1g1GMN9CjeNmCTbp+mMLNwgLfIS0rSZZnSsoVk2UGyIhg5aoRvYLluQ4HleT5fk4aSMTnckpKOGkqSUl9RZxRQf1JQxqXMTD86cTleW8YVAnFbD6AiRVpB7jw5bELAABm3H7q1x4dVjONGIwHW4FOdSE2NE06dNbSzdI4oSCoVlrWBAgsP8LT7Rz4Y2BqLlncSbheIEkUJAcOHi74FBBWkfNZBcJyy7FJYKwlSuA2laulRr3H5XxRUZerhtiZVpuHpb1syW1mM9cpTsu27j5E17MhTXpM38P7iiB8HpnmUz1m2WzcGjIdXPOa5FDuXG3kuULKbHQ9eyLDdfj+Ik2gxEXHIl4rAOMZXevq9ltfa9DT-V83LwvxDNsYx17ASAQHoooMArYhxQwaOwTAiggRiEUCIfggoADq3tx4BmDiKUCG0fScG4HtZe9lV6c1jhvXm-Nd6+X8gfC4hELTeDwraK4lpr4-XinRZKD9VYfzBprSG9ddaN0-uVMSP90bdwAUAkBYCIECPoNA2B8DEEoLQf+DBgh6bz0sovVmgwV6qhjpMPwm9t6eUofvLYwQkwUD5pkJI71NTn01Kw6iv0y73xVsDJsRhxwfA8ReKcJ5kFmD3D-Cg3jfH0S-muDcW5aD3ndMjYgmB0D1nQPQWUEhg7CAkMwTgu1tEs34Mg98s0NJvg-CTVRAEgKKkIQdEhkwnDBAtIRNp7TCIWI1E4PysxiRODsH4TMkUnAuPlnfThniWwRL8ZMgJYAgkhLCTMqJIiEbVVqmGVGuAUlpIyVkjROS8kFOZuoYppT+DDyqaPMmE8qaLWnitKOxDDGICSFnDpnzPLUK2JqTMW87BzHjOLHpLkxm33cZMoG0y4A+NmcreZizaChPBuE2FkSazRONm3c2VssCpJ7Ps7JmBcn5KqacjRJSeCzSuaTH2FNJ6yGnkHXRyoXlOQOK0r5bSukIC1I9bIoLjiUmJLmcFNFIXK2hWi2AcL-GBOCci5Z6L4Vfx-rswlmTiWkpOTo851L+AKLgQgpBmBUE3Omuo55BiOUfO5Tyn5byzhZ3pKSQ0eIdh5HzMQIwA54BDEdMXcobKbVHQALS+BNBG8VzxqB0BDQhI658TTRGpCRIIdgkj4iCMyfMgab4ukqNUWo9QIAJrXqQvCJodhbzsSfBwvhAUhVOjGyg3JEk-HLY0xA9IU1UgbRkVYVxz7OtbaXDhUq0pdteVMFC9qeWXBwkabUGYriMMzEFXNtwYoFrcROiu3ChG8NfpAst7N2VHSSJkHCWZs4nGCDdcW8REhjomZOw9QkexiP4TrKuwk1kxMkjuJ2Xc7ZnkvNeWgt4jAJLUtOpyPTjQ0OJKLGIeE-kHAOI4V9kqD3Ax4V+8GWtT1-rhkbRGmz6qNWaiB227Uuq9z6jBgaQ1IDwcvd4bQ1IlheSZB6jIOEvAoXcLvOwqx1jzDzNu76rj2H-ShY-I9hG+F11-QRg2AHsVmw7r-UD9GHZ92dieV2YA6jsfXokYiNi8IJE8JcSWOF3KuEig4eIScgjn0+nmyiu65Ply4fhpTNcIaqffkFtVRHaP-xPIA4gwCaygPAUYU95nSGZqs55S+px4g3XOBncWFA-IeAcAcXM6wQo4f3QFmFsqMUIoVUs8GqXJhBCOLiXURwjQDMZBnax59sikj8uLaI5FvM7rYeO+T76vEqvlQsxVKKcoyrlZizTsTtywaSRq9AzWe3LvawETrzhPApACucUWxJpjOGFfEUZY2ZPjNw9V5bdWUqIoW8q2rqrNMUaSds7bu2pjuFiEnQFcQUinTcMLJIsxLidJSIKpklWpt4Zqyt+r83GtLZWat+GrdtN4oB+e0N68gieQtGcSK8wBknEE7mQr9JM2YVOFJgs43ZOTf81Ml78K3sNaVainHUAIs5SJ-oxNpO4hZ20ICjIcuAgXHuv87y6Qc2+UvtMZHXPpV7g6mAEwtAXimH9eLitLX9guHcHMAZLkjiNqQ5YnyNi1jeCJJqSKYqvVAA */
	context: {},
	id: 'userExperience',
	initial: 'guest',
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
			on: {
				USER_COMPLETED_DEMOGRAPHICS_FORM: {
					actions: (_context, _event) => {
						// Fulfill KYC requirements
					},
				},
				USER_CONNECTED_BANK_ACCOUNT: {
					actions: (_context, _event) => {
						// Connect bank account for ACH transfers
					},
				},
				USER_CONFIRMED_ORDER: {
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
							on: {
								USER_RESOLVED_ERROR_WITH_SUBMITTED_ALPACA_ACCOUNT:
									'#userExperience.trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAccountToChangeFromSubmittedToActive',
							},
							description: 'Resolving issues with Alpaca account activation',
						},
						resolvingAlpacaAchRelationshipError: {
							on: {
								USER_RESOLVED_ERROR_WITH_QUEUED_ALPACA_ACH_RELATIONSHIP:
									'#userExperience.trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved',
							},
							description: 'Resolving issues with ACH relationship setup',
						},
						resolvingAlpacaAchTransferError: {
							on: {
								USER_RESOLVED_ERROR_WITH_QUEUED_ALPACA_ACH_TRANSFER:
									'#userExperience.trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchTransferToChangeFromQueuedToComplete',
							},
							description: 'Resolving issues with ACH transfer',
						},
						resolvingAlpacaOrderError: {
							on: {
								USER_RESOLVED_ERROR_WITH_PENDING_NEW_ALPACA_ORDER:
									'#userExperience.trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaOrderToChangeFromPendingNewToFilled',
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
