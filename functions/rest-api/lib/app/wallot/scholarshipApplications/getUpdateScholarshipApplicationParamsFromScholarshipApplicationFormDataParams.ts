import * as R from 'ramda';
import {
	ScholarshipApplicationFormDataParams,
	UpdateScholarshipApplicationParams,
	ScholarshipApplicationFormDataFieldFromUserDataEnum,
} from '@wallot/js';

export function getUpdateScholarshipApplicationParamsFromScholarshipApplicationFormDataParams(
	params: ScholarshipApplicationFormDataParams,
	operation: 'save' | 'submit',
): UpdateScholarshipApplicationParams {
	return {
		...R.omit(ScholarshipApplicationFormDataFieldFromUserDataEnum.arr, params),
		...(operation === 'submit' ? { status: 'submitted' } : {}),
	};
}
