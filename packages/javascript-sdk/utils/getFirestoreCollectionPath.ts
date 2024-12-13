export const getFirestoreCollectionPath = <T extends string = string>(
	collectionName: T,
) => {
	return `${collectionName}` as const;
};
