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

export const FundingAccountCategoryEnum = getEnum(['default']);
export type FundingAccountCategory = keyof typeof FundingAccountCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
  ...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'funding_account';
const properties = {
  ...GeneralizedApiResourceProperties,
  _id: apiYupHelpers.id(_object),
  _object: YupHelpers.constant(_object),
  category: FundingAccountCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const fundingAccountsApi = getApiResourceSpec<keyof U, U, T>({
  createParamsRequiredFieldEnum,
  idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type FundingAccount = yup.InferType<typeof fundingAccountsApi.apiResourceJsonSchema>;
export type CreateFundingAccountParams = CreateParams<FundingAccount, T>;
export type UpdateFundingAccountParams = UpdateParams<FundingAccount>;
