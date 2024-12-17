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
	idPrefixByResourceName,
} from '../../utils/apiYupHelpers.js';

export const AlpacaAchTransferCategoryEnum = getEnum(['default']);
export type AlpacaAchTransferCategory =
	keyof typeof AlpacaAchTransferCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'alpaca_ach_transfer';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AlpacaAchTransferCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const alpacaAchTransfersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type AlpacaAchTransfer = yup.InferType<
	typeof alpacaAchTransfersApi.apiResourceJsonSchema
>;
export type CreateAlpacaAchTransferParams = CreateParams<AlpacaAchTransfer, T>;
export type UpdateAlpacaAchTransferParams = UpdateParams<AlpacaAchTransfer>;
