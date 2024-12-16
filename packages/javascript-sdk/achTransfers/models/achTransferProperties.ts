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

export const AchTransferCategoryEnum = getEnum(['default']);
export type AchTransferCategory = keyof typeof AchTransferCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'bank_account',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'ach_transfer';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpaca_ach_transfer: apiYupHelpers
		.idRef(['alpaca_ach_transfer'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	bank_account: apiYupHelpers.idRef(['bank_account']).min(1),
	category: AchTransferCategoryEnum.getDefinedSchema(),
} as const;
type U = typeof properties;

export const achTransfersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type AchTransfer = yup.InferType<
	typeof achTransfersApi.apiResourceJsonSchema
>;
export type CreateAchTransferParams = CreateParams<AchTransfer, T>;
export type UpdateAchTransferParams = UpdateParams<AchTransfer>;
