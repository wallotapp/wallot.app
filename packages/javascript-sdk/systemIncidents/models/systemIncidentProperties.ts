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

export const SystemIncidentCategoryEnum = getEnum(['default']);
export type SystemIncidentCategory = keyof typeof SystemIncidentCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
  ...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'system_incident';
const properties = {
  ...GeneralizedApiResourceProperties,
  _id: apiYupHelpers.id(_object),
  _object: YupHelpers.constant(_object),
  category: SystemIncidentCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const systemIncidentsApi = getApiResourceSpec<keyof U, U, T>({
  createParamsRequiredFieldEnum,
  idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type SystemIncident = yup.InferType<typeof systemIncidentsApi.apiResourceJsonSchema>;
export type CreateSystemIncidentParams = CreateParams<SystemIncident, T>;
export type UpdateSystemIncidentParams = UpdateParams<SystemIncident>;
