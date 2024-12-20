import * as yup from 'yup';
import {
	GeneralizedApiResourceCreateParamsRequiredFieldEnum,
	GeneralizedApiResourceProperties,
	CreateParams,
	UpdateParams,
	YupHelpers,
	getApiResourceSpec,
	getEnum,
	GeneralizedFieldTypeEnum,
} from 'ergonomic';
import {
	apiYupHelpers,
	idPrefixByResourceName,
} from '../../utils/apiYupHelpers.js';

export const InvoiceCategoryEnum = getEnum(['default']);
export type InvoiceCategory = keyof typeof InvoiceCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'bank_account',
	'license',
	'stripe_invoice_id',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'invoice';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	bank_account: apiYupHelpers
		.idRef(['bank_account'])
		.min(1)
		.meta({ unique_key: false }),
	category: InvoiceCategoryEnum.getDefinedSchema(),
	license: apiYupHelpers.idRef(['license']).min(1).meta({ unique_key: false }),
	stripe_invoice_id: yup.string().defined().min(1).meta({
		unique_key: true,
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
} as const;
type U = typeof properties;

export const invoicesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type Invoice = yup.InferType<typeof invoicesApi.apiResourceJsonSchema>;
export type CreateInvoiceParams = CreateParams<Invoice, T>;
export type UpdateInvoiceParams = UpdateParams<Invoice>;
