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

export const PositionCategoryEnum = getEnum(['default']);
export type PositionCategory = keyof typeof PositionCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'alpaca_position',
	'asset',
	'equity_account',
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
	asset: apiYupHelpers
		.idRef(['asset'])
		.min(1)
		.meta({
			unique_by: ['equity_account'],
			unique_key: false,
		}),
	category: PositionCategoryEnum.getDefinedSchema(),
	equity_account: apiYupHelpers
		.idRef(['equity_account'])
		.min(1)
		.meta({ unique_key: false }),
} as const;
type U = typeof properties;

export const positionsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type Position = yup.InferType<typeof positionsApi.apiResourceJsonSchema>;
export type CreatePositionParams = CreateParams<Position, T>;
export type UpdatePositionParams = UpdateParams<Position>;
