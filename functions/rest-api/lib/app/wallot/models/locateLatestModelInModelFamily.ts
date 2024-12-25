import { Model, ModelFamily, modelsApi } from '@wallot/js';
import { db } from '../../../services.js';

export const locateLatestModelInModelFamily = async ({
	modelFamily,
}: {
	modelFamily: ModelFamily;
}): Promise<Model> => {
	// Locate the latest MODEL in the MODEL_FAMILY
	const modelsSnapshot = await db
		.collection(modelsApi.collectionId)
		.where('model_family', '==', modelFamily._id)
		.orderBy('date_published', 'desc')
		.limit(1)
		.get();
	const modelDoc = modelsSnapshot.docs[0];
	if (modelDoc == null) {
		throw new Error('No model found');
	}

	return modelDoc.data() as Model;
};
