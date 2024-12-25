import { ActivateUserParams, Parameter, parametersApi } from '@wallot/js';
import { db } from '../../../services.js';

export const locateCompatibleParameters = async ({ age_range, capital_level, investing_goals, risk_preference }: ActivateUserParams): Promise<Parameter[]> => {
	const queries = [
		db.collection(parametersApi.collectionId).where('category', '==', 'age_range').where('values', 'array-contains', age_range).get(),
		db.collection(parametersApi.collectionId).where('category', '==', 'capital_level').where('values', 'array-contains', capital_level).get(),
		db.collection(parametersApi.collectionId).where('category', '==', 'risk_preference').where('values', 'array-contains', risk_preference).get(),
		db.collection(parametersApi.collectionId).where('category', '==', 'investment_goal').where('values', 'array-contains-any', investing_goals).get(),
	];

	const snapshots = await Promise.all(queries);
	const compatibleParameters: Parameter[] = [];

	snapshots.forEach((snapshot) => {
		snapshot.forEach((doc) => {
			compatibleParameters.push(doc.data() as Parameter);
		});
	});

	return compatibleParameters;
};
