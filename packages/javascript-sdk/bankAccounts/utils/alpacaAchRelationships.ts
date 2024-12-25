import * as yup from 'yup';
import { GeneralizedFieldTypeEnum, Keys, getEnum } from 'ergonomic';

// Status
export const AlpacaAchRelationshipStatusEnum = getEnum([
	'QUEUED',
	'SENT_TO_CLEARING',
	'APPROVED',
	'CANCELED',
]);
export type AlpacaAchRelationshipStatus =
	keyof typeof AlpacaAchRelationshipStatusEnum.obj;

export const alpacaAchRelationshipProperties = {
	alpaca_ach_relationship_id: yup.string().default(null).nullable().meta({
		unique_key: true,
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	alpaca_ach_relationship_status:
		AlpacaAchRelationshipStatusEnum.getOptionalSchema()
			.nullable()
			.default(null),
};

export const AlpacaAchRelationshipPropertyNameEnum = getEnum(
	Keys(alpacaAchRelationshipProperties),
);
export type AlpacaAchRelationshipPropertyName =
	keyof typeof AlpacaAchRelationshipPropertyNameEnum.obj;

export type RemoveAlpacaAchRelationshipPrefix<T> = {
	[K in keyof T as K extends `alpaca_ach_relationship_${infer Rest}`
		? Rest
		: K]: T[K];
};
