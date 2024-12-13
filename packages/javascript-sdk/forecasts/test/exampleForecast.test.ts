import { Forecast, forecastsApi } from '../models/index.js';

describe('Forecast', () => {
	test('exampleForecast', () => {
		const { apiResourceDefaultJson } = forecastsApi;
		const exampleForecast: Forecast = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Forecast',
		};
		expect(exampleForecast).toEqual<typeof exampleForecast>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'forecast',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Forecast',
		});
	});
});
