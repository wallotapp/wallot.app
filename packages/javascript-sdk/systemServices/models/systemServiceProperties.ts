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

export const SystemServiceCategoryEnum = getEnum(['default']);
export type SystemServiceCategory = keyof typeof SystemServiceCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
  ...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'system_service';
const properties = {
  ...GeneralizedApiResourceProperties,
  _id: apiYupHelpers.id(_object),
  _object: YupHelpers.constant(_object),
  category: SystemServiceCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const systemServicesApi = getApiResourceSpec<keyof U, U, T>({
  createParamsRequiredFieldEnum,
  idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type SystemService = yup.InferType<typeof systemServicesApi.apiResourceJsonSchema>;
export type CreateSystemServiceParams = CreateParams<SystemService, T>;
export type UpdateSystemServiceParams = UpdateParams<SystemService>;
