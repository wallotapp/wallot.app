import * as R from 'ramda';
import * as yup from 'yup';
import { Keys, UsaStateCodeEnum, UsaStateCode, GeneralizedFieldTypeEnum, getFieldSpecByFieldKey, YupHelpers, USA_STATE_BY_CODE } from 'ergonomic';
import { ActivatedUser } from './activateUserSchema.js';
import { User, usersApi } from '../models/userProperties.js';
import { alpacaAccountAgreementsProperties, alpacaAccountContactProperties, alpacaAccountIdentityProperties, AlpacaAccountTaxIdType } from './alpacaAccounts.js';

// ==== Form Schema ==== //
export const kycFormDataProperties = {
	// Contact
	city: alpacaAccountContactProperties.city.nullable(false).min(1).required().defined().default('').meta({ type: GeneralizedFieldTypeEnum.obj.address_field }),
	email_address: YupHelpers.emailAddress().required().min(1),
	phone_number: YupHelpers.unitedStatesPhoneNumber().nullable(false).min(1).required().defined(),
	postal_code: YupHelpers.unitedStatesPostalCode().nullable(false).min(1).required().defined(),
	state: UsaStateCodeEnum.getDefinedSchema()
		.required()
		.default('' as UsaStateCode)
		.meta({ label_by_enum_option: USA_STATE_BY_CODE }),
	street_address_line_1: yup.string().min(1).required().defined().default('').meta({ type: GeneralizedFieldTypeEnum.obj.address_field }), // "20 N San Mateo Dr"
	street_address_line_2: yup.string().optional().default('').meta({ type: GeneralizedFieldTypeEnum.obj.address_field }),
	// Disclosures
	immediate_family_exposed: YupHelpers.booleanDefaultFalse().label('Does a member of your immediate family hold a controlling position, a position on the board of directors, or a position with policy making abilities in a publicly traded company?'),
	is_affiliated_exchange_or_finra: YupHelpers.booleanDefaultFalse().label('Are you are affiliated with an exchange or FINRA?'),
	is_affiliated_exchange_or_iiroc: YupHelpers.booleanDefaultFalse().label('Are you are affiliated with an exchange or IIROC?'),
	is_control_person: YupHelpers.booleanDefaultFalse().label('Do you hold a controlling position, a position on the board of directors, or a position with policy making abilities in a publicly traded company?'),
	is_politically_exposed: YupHelpers.booleanDefaultFalse().label('Are you politically exposed?'),
	// Identity
	country_of_birth: alpacaAccountIdentityProperties.country_of_birth.default('USA').nullable(false).min(1).required().defined(),
	country_of_citizenship: alpacaAccountIdentityProperties.country_of_citizenship.default('USA').nullable(false).min(1).required().defined(),
	country_of_tax_residence: alpacaAccountIdentityProperties.country_of_tax_residence.default('USA').nullable(false).min(1).required().defined(),
	date_of_birth: YupHelpers.date().required().min(1),
	family_name: alpacaAccountIdentityProperties.family_name.default('').nullable(false).min(1).required().defined().label('Last Name').meta({ type: GeneralizedFieldTypeEnum.obj.short_text }),
	given_name: alpacaAccountIdentityProperties.given_name.default('').nullable(false).min(1).required().defined().label('First Name').meta({ type: GeneralizedFieldTypeEnum.obj.short_text }),
	tax_id: alpacaAccountIdentityProperties.tax_id.default('').nullable(false).min(1).required().defined().label('Tax ID Number').meta({ type: GeneralizedFieldTypeEnum.obj.short_text }),
	tax_id_type: alpacaAccountIdentityProperties.tax_id_type
		.default('' as AlpacaAccountTaxIdType)
		.nullable(false)
		.required()
		.defined()
		.label('Tax ID Type'),
} as const;
export const kycFormDataSchema = yup.object(kycFormDataProperties);
export const kycFormDataSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(kycFormDataSchema, Keys(kycFormDataProperties));
export type KycFormDataParams = yup.InferType<typeof kycFormDataSchema>;

// ==== Data Schemas ==== //
export const completeUserKycProperties = {
	// agreements (at least one object in the array containing)
	// - agreement (e.g. "customer_agreement")
	// - signed_at
	// - ip_address
	alpaca_account_agreements: yup
		.array()
		.of(
			yup.object({
				agreement: alpacaAccountAgreementsProperties.agreement.nullable(false),
				ip_address: alpacaAccountAgreementsProperties.ip_address.nullable(false).min(1),
				signed_at: alpacaAccountAgreementsProperties.signed_at.nullable(false),
			}),
		)
		.min(1)
		.defined()
		.default([])
		.nullable(false),
	// contact
	// - email_address
	// - street_address[]
	// - city
	// - state
	// - postal_code
	// - phone_number
	alpaca_account_contact: yup
		.object({
			...R.pick(['city', 'email_address', 'phone_number', 'postal_code', 'state'] as const, kycFormDataProperties),
			street_address: yup.array().of(yup.string().nullable(false).min(1).defined()).nullable(false).min(1).required().defined(),
		})
		.nullable(false)
		.defined()
		.default({
			city: '',
			email_address: '',
			phone_number: '',
			postal_code: '',
			state: '',
			street_address: [],
		}),
	// disclosures
	// 	- is_control_person
	// 	- is_affiliated_exchange_or_finra
	// 	- is_politically_exposed
	// 	- immediate_family_exposed
	alpaca_account_disclosures: yup
		.object(R.pick(['immediate_family_exposed', 'is_affiliated_exchange_or_finra', 'is_affiliated_exchange_or_iiroc', 'is_control_person', 'is_politically_exposed'] as const, kycFormDataProperties))
		.nullable(false)
		.default({
			immediate_family_exposed: false,
			is_affiliated_exchange_or_finra: false,
			is_affiliated_exchange_or_iiroc: false,
			is_control_person: false,
			is_politically_exposed: false,
		}),
	// identity
	// - given_name
	// - family_name
	// - date_of_birth
	// - country_of_citizenship
	// - country_of_birth
	// - country_of_tax_residence
	// - tax_id
	// - tax_id_type
	alpaca_account_identity: yup
		.object(R.pick(['country_of_birth', 'country_of_citizenship', 'country_of_tax_residence', 'date_of_birth', 'family_name', 'given_name', 'tax_id', 'tax_id_type'] as const, kycFormDataProperties))
		.nullable(false)
		.defined()
		.default({
			country_of_birth: '',
			country_of_citizenship: '',
			country_of_tax_residence: '',
			date_of_birth: '',
			family_name: '',
			given_name: '',
			tax_id: '',
			tax_id_type: '',
		}),
	default_bank_account: usersApi.properties.default_bank_account.min(1).nullable(false).default(''),
} as const;
export const completeUserKycSchema = yup.object(completeUserKycProperties);
export const completeUserKycSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(completeUserKycSchema, Keys(completeUserKycProperties));

export type CompleteUserKycParams = yup.InferType<typeof completeUserKycSchema>;
export type CompleteUserKycResponse = {
	redirect_url: string;
};

export type KycUser = ActivatedUser & CompleteUserKycParams;
export const isKycUser = (user: User): user is KycUser => {
	try {
		completeUserKycSchema.validateSync(user);
		return true;
	} catch (error) {
		console.error('Error detected in isKycUser', error);
		return false;
	}
};
