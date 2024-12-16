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

export const PositionCategoryEnum = getEnum(['default']);
export type PositionCategory = keyof typeof PositionCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'alpaca_position',
	'equity_account',
	'stock',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'position';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpaca_position: apiYupHelpers
		.idRef(['alpaca_position'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	category: PositionCategoryEnum.getDefinedSchema(),
	equity_account: apiYupHelpers.idRef(['equity_account']).min(1),
	stock: apiYupHelpers
		.idRef(['stock'])
		.min(1)
		.meta({
			unique_by: ['equity_account'],
		}),
} as const;
type U = typeof properties;

export const positionsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type Position = yup.InferType<typeof positionsApi.apiResourceJsonSchema>;
export type CreatePositionParams = CreateParams<Position, T>;
export type UpdatePositionParams = UpdateParams<Position>;
