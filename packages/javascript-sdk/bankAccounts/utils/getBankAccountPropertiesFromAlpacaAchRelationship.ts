import {
	BankAccount,
	AlpacaAchRelationship,
} from '../models/bankAccountProperties.js';
import { AlpacaAchRelationshipPropertyNameEnum } from './alpacaAchRelationships.js';
import { AlpacaAchRelationshipPropertyName } from './alpacaAchRelationships.js';

export const getBankAccountPropertiesFromAlpacaAchRelationship = (
	alpacaAchRelationship: AlpacaAchRelationship,
): Pick<BankAccount, AlpacaAchRelationshipPropertyName> => {
	return AlpacaAchRelationshipPropertyNameEnum.arr.reduce(
		(acc, propertyName) => {
			const originalPropertyName = propertyName.replace(
				'alpaca_ach_relationship_',
				'',
			) as keyof AlpacaAchRelationship;
			const value = alpacaAchRelationship[originalPropertyName] ?? null;
			return {
				...acc,
				[propertyName]: value,
			};
		},
		{} as Pick<BankAccount, AlpacaAchRelationshipPropertyName>,
	);
};
