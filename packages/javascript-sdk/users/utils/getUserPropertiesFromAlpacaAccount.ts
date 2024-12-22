import { User, AlpacaAccount } from '../models/userProperties.js';
import { AlpacaAccountPropertyNameEnum } from './alpacaAccounts.js';
import { AlpacaAccountPropertyName } from './alpacaAccounts.js';

export const getUserPropertiesFromAlpacaAccount = (
	alpacaAccount: AlpacaAccount,
): Pick<User, AlpacaAccountPropertyName> => {
	return AlpacaAccountPropertyNameEnum.arr.reduce((acc, propertyName) => {
		const originalPropertyName = propertyName.replace(
			'alpaca_account_',
			'',
		) as keyof AlpacaAccount;
		const value = alpacaAccount[originalPropertyName] ?? null;
		return {
			...acc,
			[propertyName]: value,
		};
	}, {} as Pick<User, AlpacaAccountPropertyName>);
};
