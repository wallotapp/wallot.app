import { modelFamiliesApi, ModelFamily, Parameter } from '@wallot/js';
import { db } from '../../../services.js';

export type LocateBestModelFamiliesForParameterSetParams = unknown;
export const locateBestModelFamiliesForParameterSet = async ({ compatibleParameters }: { compatibleParameters: Parameter[] }): Promise<ModelFamily[]> => {
	try {
		const parameterIds = compatibleParameters.map((parameter) => parameter._id);
		const modelFamilies = (await db.collection(modelFamiliesApi.collectionId).where('parameters', 'array-contains-any', parameterIds).get()).docs.map((doc) => doc.data() as ModelFamily);

		if (modelFamilies.length === 0) {
			throw new Error('No model family found');
		}

		return modelFamilies.sort((a, b) => {
			const aMatches = a.parameters.filter((parameter) => parameterIds.includes(parameter)).length;
			const bMatches = b.parameters.filter((parameter) => parameterIds.includes(parameter)).length;
			return bMatches - aMatches;
		});
	} catch (err) {
		const modelFamiliesWithoutFilter = await db.collection(modelFamiliesApi.collectionId).limit(1).get();
		const modelFamily = modelFamiliesWithoutFilter.docs[0];
		if (modelFamily == null) {
			throw new Error('No model family found');
		}
		return [modelFamily.data() as ModelFamily];
	}
};
