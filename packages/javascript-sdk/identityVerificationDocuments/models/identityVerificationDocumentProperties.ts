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

export const IdentityVerificationDocumentCategoryEnum = getEnum([
	'drivers_license',
	'passport',
	'state_id',
]);
export type IdentityVerificationDocumentCategory =
	keyof typeof IdentityVerificationDocumentCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'image_front',
	'image_back',
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'identity_verification_document';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: IdentityVerificationDocumentCategoryEnum.getDefinedSchema(),
	image_front: YupHelpers.url().defined().min(1).meta({ unique_key: true }),
	image_back: YupHelpers.url().defined().min(1).meta({ unique_key: true }),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: false }),
} as const;
type U = typeof properties;

export const identityVerificationDocumentsApi = getApiResourceSpec<
	keyof U,
	U,
	T
>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type IdentityVerificationDocument = yup.InferType<
	typeof identityVerificationDocumentsApi.apiResourceJsonSchema
>;
export type CreateIdentityVerificationDocumentParams = CreateParams<
	IdentityVerificationDocument,
	T
>;
export type UpdateIdentityVerificationDocumentParams =
	UpdateParams<IdentityVerificationDocument>;
