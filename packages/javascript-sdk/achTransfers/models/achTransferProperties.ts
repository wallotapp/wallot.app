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
import {
	AlpacaAchTransferPropertyNameEnum,
	alpacaAchTransferProperties,
	RemoveAlpacaAchTransferPrefix,
	AlpacaAchTransferPropertyName,
} from '../utils/alpacaAchTransfers.js';

export const AchTransferCategoryEnum = getEnum(['incoming', 'outgoing']);
export type AchTransferCategory = keyof typeof AchTransferCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	...AlpacaAchTransferPropertyNameEnum.arr,
	'bank_account',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'ach_transfer';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	bank_account: apiYupHelpers
		.idRef(['bank_account'])
		.min(1)
		.meta({ unique_key: false }),
	category: AchTransferCategoryEnum.getDefinedSchema(),
	...alpacaAchTransferProperties,
} as const;
type U = typeof properties;

export const achTransfersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type AchTransfer = yup.InferType<
	typeof achTransfersApi.apiResourceJsonSchema
>;
export type CreateAchTransferParams = CreateParams<AchTransfer, T>;
export type UpdateAchTransferParams = UpdateParams<AchTransfer>;

export type AlpacaAchTransfer = RemoveAlpacaAchTransferPrefix<
	Pick<AchTransfer, AlpacaAchTransferPropertyName>
>;
