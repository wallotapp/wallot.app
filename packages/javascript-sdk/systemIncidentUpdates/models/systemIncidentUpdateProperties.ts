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

export const SystemIncidentUpdateCategoryEnum = getEnum(['default']);
export type SystemIncidentUpdateCategory =
	keyof typeof SystemIncidentUpdateCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'system_incident_update';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: SystemIncidentUpdateCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const systemIncidentUpdatesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type SystemIncidentUpdate = yup.InferType<
	typeof systemIncidentUpdatesApi.apiResourceJsonSchema
>;
export type CreateSystemIncidentUpdateParams = CreateParams<
	SystemIncidentUpdate,
	T
>;
export type UpdateSystemIncidentUpdateParams =
	UpdateParams<SystemIncidentUpdate>;
