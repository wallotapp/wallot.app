import * as yup from 'yup';
import {
	GeneralizedApiResourceCreateParamsRequiredFieldEnum,
	GeneralizedApiResourceProperties,
	CreateParams,
	UpdateParams,
	YupHelpers,
	getApiResourceSpec,
	getEnum,
} from 'ergonomic';
import {
	apiYupHelpers,
	idPrefixByCollection,
} from '../../utils/apiYupHelpers.js';

export const InvoiceCategoryEnum = getEnum(['default']);
export type InvoiceCategory = keyof typeof InvoiceCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'license',
	'payment_method',
	'stripe_invoice',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'invoice';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: InvoiceCategoryEnum.getDefinedSchema(),
	license: apiYupHelpers.idRef(['license']).min(1).meta({ unique_key: false }),
	payment_method: apiYupHelpers
		.idRef(['payment_method'])
		.min(1)
		.meta({ unique_key: false }),
	stripe_invoice: apiYupHelpers
		.idRef(['stripe_invoice'])
		.min(1)
		.meta({ unique_key: true }),
} as const;
type U = typeof properties;

export const invoicesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type Invoice = yup.InferType<typeof invoicesApi.apiResourceJsonSchema>;
export type CreateInvoiceParams = CreateParams<Invoice, T>;
export type UpdateInvoiceParams = UpdateParams<Invoice>;
