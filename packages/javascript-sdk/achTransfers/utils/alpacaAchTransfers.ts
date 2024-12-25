import * as yup from 'yup';
import { GeneralizedFieldTypeEnum, Keys, getEnum } from 'ergonomic';

// Direction
export const AlpacaAchTransferDirectionEnum = getEnum([
	'INCOMING', // Funds incoming to user’s account (deposit).
	'OUTGOING', // Funds outgoing from user’s account (withdrawal).
]);
export type AlpacaAchTransferDirection = keyof typeof AlpacaAchTransferDirectionEnum.obj;

// Status
export const AlpacaAchTransferStatusEnum = getEnum([
	'QUEUED', // Transfer is in queue to be processed.
	'APPROVAL_PENDING', // Transfer is pending approval.
	'PENDING', // Transfer is pending processing.
	'SENT_TO_CLEARING', // Transfer is being processed by the clearing firm.
	'REJECTED', // Transfer is rejected.
	'CANCELED', // Client initiated transfer cancellation.
	'APPROVED', // Transfer is approved.
	'COMPLETE', // Transfer is completed.
	'RETURNED', // The bank issued an ACH return for the transfer.
]);
export type AlpacaAchTransferStatus = keyof typeof AlpacaAchTransferStatusEnum.obj;

// Type
export const AlpacaAchTransferTypeEnum = getEnum([
	'ach', // Transfer via ACH (US Only).
	'instant_ach',
	'wire', // Transfer via wire (international).
]);
export type AlpacaAchTransferType = keyof typeof AlpacaAchTransferTypeEnum.obj;

// Wire Fee Payment Method
export const AlpacaAchTransferWireFeePaymentMethodEnum = getEnum([
	'user', // User pays the wire fee.
	'invoice', // Alpaca pays the wire fee.
]);
export type AlpacaAchTransferWireFeePaymentMethod = keyof typeof AlpacaAchTransferWireFeePaymentMethodEnum.obj;

export const alpacaAchTransferProperties = {
	alpaca_ach_transfer_account_id: yup.string().nullable().default(null),
	alpaca_ach_transfer_amount: yup.string().defined().min(1).nullable(false), // "1234.56" for $1,234.56 (Must be > 0.00)
	alpaca_ach_transfer_created_at: yup.string().nullable().default(null),
	alpaca_ach_transfer_direction: AlpacaAchTransferDirectionEnum.getDefinedSchema(),
	alpaca_ach_transfer_expires_at: yup.string().nullable().default(null),
	alpaca_ach_transfer_hold_until: yup.string().nullable().default(null),
	alpaca_ach_transfer_id: yup.string().min(1).defined().meta({
		unique_key: true,
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	alpaca_ach_transfer_instant_amount: yup.string().nullable().default(null),
	alpaca_ach_transfer_reason: yup.string().nullable().default(null), // Cause of the status
	alpaca_ach_transfer_relationship_id: yup.string().nullable().default(null), // The ACH relationship ID only present if type = "ach"
	alpaca_ach_transfer_status: AlpacaAchTransferStatusEnum.getDefinedSchema(),
	alpaca_ach_transfer_updated_at: yup.string().nullable().default(null),

	// ===  Properties for Wire Transfers === //
	alpaca_ach_transfer_additional_information: yup.string().nullable().default(null),
	alpaca_ach_transfer_bank_id: yup.string().nullable().default(null), // The ID of the Bank, only present if type = "wire"
	alpaca_ach_transfer_fee: yup.string().nullable().default(null),
	alpaca_ach_transfer_fee_payment_method: AlpacaAchTransferWireFeePaymentMethodEnum.getOptionalSchema().nullable().default(null),
	alpaca_ach_transfer_requested_amount: yup.string().nullable().default(null), // "1234.56" for $1,234.56 (Must be > 0.00)
};

export const AlpacaAchTransferPropertyNameEnum = getEnum(Keys(alpacaAchTransferProperties));
export type AlpacaAchTransferPropertyName = keyof typeof AlpacaAchTransferPropertyNameEnum.obj;

export type RemoveAlpacaAchTransferPrefix<T> = {
	[K in keyof T as K extends `alpaca_ach_transfer_${infer Rest}` ? Rest : K]: T[K];
};
