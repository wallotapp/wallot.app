import * as R from 'ramda';
import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlpacaAccount, UpdateAlpacaAccountParams } from '@wallot/js';

export const updateAlpacaAccount =
	(alpacaBrokerClient: KyInstance) =>
	async (params: UpdateAlpacaAccountParams) => {
		try {
			const updateAlpacaAccountParams: Pick<
				AlpacaAccount,
				'contact' | 'disclosures' | 'identity'
			> = {
				contact: {
					...R.pick(
						[
							'email_address',
							'phone_number',
							'city',
							'postal_code',
							'state',
						] as const,
						params,
					),
					street_address: [
						params.street_address_line_1,
						params.street_address_line_2,
					].filter(Boolean as unknown as (x: string) => x is string),
				},
				disclosures: R.pick(
					[
						'immediate_family_exposed',
						'is_affiliated_exchange_or_finra',
						'is_affiliated_exchange_or_iiroc',
						'is_control_person',
						'is_politically_exposed',
					] as const,
					params,
				),
				identity: R.pick(
					[
						'country_of_birth',
						'country_of_citizenship',
						'country_of_tax_residence',
						'date_of_birth',
						'family_name',
						'given_name',
						'tax_id',
						'tax_id_type',
					] as const,
					params,
				),
			};
			const response = await alpacaBrokerClient.patch<AlpacaAccount>(
				`v1/accounts/${params.alpaca_account_id}`,
				{
					json: updateAlpacaAccountParams,
				},
			);
			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
